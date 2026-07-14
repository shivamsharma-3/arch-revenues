import { GoogleGenAI } from '@google/genai';
import { PAIN_EXTRACTION_PROMPT } from './prompts';

let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY?.replace(/^"|"$/g, '') || '';
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function extractPains(url: string, pages: {url: string, text: string}[]) {
  const ai = getAI();
  
  let pagesContent = '';
  for (const page of pages) {
    pagesContent += `\n\n[PAGE]\nURL: ${page.url}\nContent: ${page.text}\n`;
  }
  
  const prompt = PAIN_EXTRACTION_PROMPT
    .replace('{company_url}', url)
    .replace('{pages_content}', pagesContent);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  try {
    const text = response.text;
    if (!text || text.trim().length === 0) {
      console.error("Gemini extractPains returned empty text. Full response:", JSON.stringify(response, null, 2));
      return "";
    }
    return text;
  } catch (e) {
    console.error("Gemini extractPains response.text threw. Response object:", JSON.stringify(response, null, 2), "Error:", e);
    return "";
  }
}
