import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      console.error('Chat API Error: GEMINI_API_KEY is not set in environment variables.');
      return NextResponse.json(
        { error: 'API Configuration Error: Please ensure GEMINI_API_KEY is set in your Vercel environment variables.' }, 
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages.map((m: {role: string; content: string}) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          systemInstruction: {
            parts: [{
              text: `You are the ARCH Revenues assistant. 
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
- Solo freelancers under $5k/month
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
write in clean, confident prose.`
            }]
          },
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7
          }
        })
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Gemini API error details:', JSON.stringify(data));
      return NextResponse.json(
        { error: data.error?.message || 'The AI service returned an error. Please check your API key and billing status.' }, 
        { status: response.status }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text 
      || 'I could not generate a response.';

    return NextResponse.json({ message: text });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}
