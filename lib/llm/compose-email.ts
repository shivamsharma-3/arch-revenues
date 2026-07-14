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

function parseEmailResponse(rawText: string): ComposedEmail {
  let subject = "quick question";
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

export async function composeEmail(url: string, painPoints: string): Promise<ComposedEmail> {
  const ai = getAI();

  const prompt = EMAIL_COMPOSITION_PROMPT
    .replace(/{company_url}/g, url)
    .replace('{pain_points}', painPoints);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let rawText = "";
  try {
    rawText = response.text || "";
    if (!rawText.trim()) {
      console.error("Gemini composeEmail returned empty text. Full response:", JSON.stringify(response, null, 2));
    }
  } catch (e) {
    console.error("Gemini composeEmail response.text threw. Response:", JSON.stringify(response, null, 2), "Error:", e);
    rawText = "";
  }

  const parsed = parseEmailResponse(rawText);

  // Validate structure: need at least 6 non-empty lines (greeting + 4 body + signature)
  const bodyLines = parsed.body.split('\n').filter(l => l.trim().length > 0);
  if (bodyLines.length < 6) {
    console.warn(
      `composeEmail: LLM only produced ${bodyLines.length} lines. Retrying with stricter prompt.`
    );

    const retryPrompt =
      prompt +
      `\n\nYOUR PREVIOUS RESPONSE DID NOT FOLLOW THE 8-LINE STRUCTURE. You output ${bodyLines.length} non-empty lines. ` +
      `Rewrite following the structure EXACTLY. Every line listed (GREETING, PAIN OPENING, EVIDENCE, BRIDGE, SOLUTION, CTA, SIGNATURE) is mandatory. Do not collapse them.`;

    const retryResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: retryPrompt,
    });

    let retryRaw = "";
    try {
      retryRaw = retryResponse.text || "";
      if (!retryRaw.trim()) {
        console.error("Gemini composeEmail retry returned empty text. Response:", JSON.stringify(retryResponse, null, 2));
      }
    } catch (e) {
      console.error("Gemini composeEmail retry threw. Response:", JSON.stringify(retryResponse, null, 2), "Error:", e);
    }

    if (retryRaw.trim()) {
      return parseEmailResponse(retryRaw);
    }
  }

  return parsed;
}
