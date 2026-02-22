import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured on the server' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // The system instruction for the ARCH Revenues assistant
    const systemInstruction = `You are the ARCH Revenues assistant. 
ARCH Revenues is a Revenue Infrastructure company 
that builds and operates outbound acquisition 
systems exclusively for web design agencies 
(2-15 employees) in the US, UK, Canada, and Australia.

What ARCH does:
- Defines Ideal Customer Profile (ICP)
- Builds targeted lead lists
- Writes and manages cold email outreach
- Handles all follow-ups
- Books qualified meetings directly on client calendar
- Tracks and optimizes performance

What ARCH is NOT:
- Not a marketing agency
- Not a branding agency  
- Not a content agency
- Not a social media agency
- Does not run paid ads
- Does not create content

Pricing: Monthly retainer starting at $400-$750/month.
No setup fees. No long-term contracts.
Starts with a 30-day pilot.
Expected results: 8-15 qualified calls/month by Month 2-3.

Bad fit clients:
- Solo freelancers under $10k/month
- Agencies wanting commission-only deals
- Agencies expecting guaranteed closed deals
- Low-ticket service providers

Your job is to answer questions about ARCH Revenues 
clearly and confidently. If someone asks something 
unrelated to ARCH Revenues or outbound sales, 
politely redirect them back to what you can help with.

If someone seems interested or ready, 
guide them to apply for the free audit at /audit.

Tone: Sharp, professional, direct. 
No hype. No filler words. 
Answer in 2-4 sentences maximum unless 
the question genuinely requires more detail.
Never use bullet points in responses — 
write in clean, confident prose.`;

    // Convert messages to Gemini format
    // Note: The SDK expects 'user' and 'model' (not 'assistant')
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const lastMessage = messages[messages.length - 1].content;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: 'user', parts: [{ text: lastMessage }] }],
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during the chat request' },
      { status: 500 }
    );
  }
}
