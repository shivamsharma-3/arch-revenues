import { GoogleGenAI } from '@google/genai';
import { PAIN_EXTRACTION_PROMPT } from './prompts';

export class InsufficientDataError extends Error {
  constructor(url: string) {
    super(`Not enough readable content on ${url} to generate a personalized email. The site may be JavaScript-rendered or have very little public text.`);
    this.name = 'InsufficientDataError';
  }
}

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

  // Check total content length — if pages are all empty, fail fast
  const totalContentLength = pages.reduce((sum, p) => sum + p.text.length, 0);
  if (totalContentLength < 200) {
    console.error(`extractPains: total crawled content too thin (${totalContentLength} chars) for ${url}`);
    throw new InsufficientDataError(url);
  }
  
  const prompt = PAIN_EXTRACTION_PROMPT
    .replace('{company_url}', url)
    .replace('{pages_content}', pagesContent);

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  let text = '';
  try {
    text = response.text || '';
    if (!text.trim()) {
      console.error('Gemini extractPains returned empty text. Full response:', JSON.stringify(response, null, 2));
      throw new InsufficientDataError(url);
    }
  } catch (e) {
    if (e instanceof InsufficientDataError) throw e;
    console.error('Gemini extractPains response.text threw. Response object:', JSON.stringify(response, null, 2), 'Error:', e);
    throw new InsufficientDataError(url);
  }

  // Model explicitly said it has nothing to work with
  if (text.trim() === 'INSUFFICIENT_DATA' || text.includes('INSUFFICIENT_DATA')) {
    console.warn(`extractPains: Gemini returned INSUFFICIENT_DATA for ${url}`);
    throw new InsufficientDataError(url);
  }

  return text;
}
