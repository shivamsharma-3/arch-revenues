import { GoogleGenAI } from '@google/genai';
import { EMAIL_COMPOSITION_PROMPT } from './prompts';

let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY?.replace(/^"|"$/g, '') || '';
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export interface ComposedEmail {
  subject: string;
  body: string;
}

export async function composeEmail(url: string, painPoints: string): Promise<ComposedEmail> {
  const ai = getAI();
  
  const prompt = EMAIL_COMPOSITION_PROMPT
    .replace('{company_url}', url)
    .replace('{pain_points}', painPoints);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let rawText = "";
  try {
    rawText = response.text || "";
  } catch (e) {
    console.error("Gemini returned no text", e);
    rawText = "";
  }

  // Parse SUBJECT and BODY
  let subject = "Quick question";
  let body = rawText;
  
  const subjectMatch = rawText.match(/SUBJECT:\s*(.*?)\nBODY:\s*([\s\S]*)/i);
  if (subjectMatch) {
    subject = subjectMatch[1].trim();
    body = subjectMatch[2].trim();
  } else if (rawText.toLowerCase().startsWith('subject:')) {
    const parts = rawText.split(/body:/i);
    subject = parts[0].replace(/subject:/i, '').trim();
    if (parts.length > 1) {
      body = parts[1].trim();
    }
  }

  return { subject, body };
}
