import { GoogleGenAI } from '@google/genai';
import Groq from 'groq-sdk';

let aiInstance: GoogleGenAI | null = null;
function getGemini() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY?.replace(/^"|"$/g, '') || '';
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

let groqInstance: Groq | null = null;
function getGroq() {
  if (!groqInstance) {
    const apiKey = process.env.GROQ_API_KEY?.replace(/^"|"$/g, '') || '';
    groqInstance = new Groq({ apiKey });
  }
  return groqInstance;
}

/**
 * Attempts to generate content using Gemini 2.5 Flash first.
 * If it fails (e.g. 429 Quota Exceeded), falls back to Groq (llama-3.3-70b-versatile).
 */
export async function generateContentWithFallback(prompt: string, systemPrompt?: string): Promise<string> {
  const gemini = getGemini();
  const groq = getGroq();

  try {
    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt,
    });
    const text = response.text || '';
    if (text.trim()) {
      return text;
    }
  } catch (error: any) {
    console.warn('Gemini failed, falling back to Groq:', error?.message || error);
  }

  // Fallback to Groq
  try {
    const messages: any[] = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    } else {
      messages.push({ role: 'system', content: 'You are an expert copywriter and analyst. Output EXACTLY what is requested according to the strict format rules. Do not include any conversational filler, introductory text, or concluding remarks.' });
    }
    messages.push({ role: 'user', content: prompt });

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
    });

    const text = chatCompletion.choices[0]?.message?.content || '';
    return text;
  } catch (error: any) {
    console.error('Groq also failed:', error?.message || error);
    throw error;
  }
}
