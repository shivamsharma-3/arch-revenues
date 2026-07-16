import { EMAIL_COMPOSITION_PROMPT } from './prompts';
import { generateContentWithFallback } from './generate-content';

export interface ComposedEmail {
  subject: string;
  body: string;
}

function parseEmailResponse(rawText: string): ComposedEmail {
  let subject = '';
  // Cut off everything after the second "SUBJECT:" (case-insensitive) to prevent duplicates
  const firstBlock = rawText.split(/\nsubject:/i)[0].trim();
  
  let body = firstBlock;

  const subjectMatch = firstBlock.match(/SUBJECT:\s*(.*?)\nBODY:\s*([\s\S]*)/i);
  if (subjectMatch) {
    subject = subjectMatch[1].trim();
    body = subjectMatch[2].trim();
  } else if (firstBlock.toLowerCase().startsWith('subject:')) {
    // If "BODY:" is missing, try splitting by "Body:", else split by newline
    const parts = firstBlock.split(/body:/i);
    if (parts.length > 1) {
      subject = parts[0].replace(/subject:/i, '').trim();
      body = parts[1].trim();
    } else {
      const lines = firstBlock.split('\n');
      subject = lines[0].replace(/subject:/i, '').trim();
      body = lines.slice(1).join('\n').trim();
    }
  }

  return { subject, body };
}

export async function composeEmail(url: string, painPoints: string, senderBusiness: string): Promise<ComposedEmail> {
  const prompt = EMAIL_COMPOSITION_PROMPT
    .replace(/{company_url}/g, url)
    .replace('{pain_points}', painPoints)
    .replace('{sender_business}', senderBusiness);

  let rawText = "";
  try {
    rawText = await generateContentWithFallback(prompt);
  } catch (e) {
    console.error("LLM composeEmail threw. Error:", e);
    rawText = "";
  }

  // Validate: count content lines (ignore blank separator lines used in the new format)
  const parsed = parseEmailResponse(rawText);
  const contentLines = parsed.body.split('\n').filter(l => l.trim().length > 0);
  if (contentLines.length < 5 || !parsed.subject) {
    console.warn(
      `composeEmail: LLM produced ${contentLines.length} content lines, subject="${parsed.subject}". Retrying.`
    );

    const retryPrompt =
      prompt +
      `\n\nYOUR PREVIOUS RESPONSE WAS INCOMPLETE OR MISSING THE SUBJECT LINE. ` +
      `You produced ${contentLines.length} content lines. ` +
      `Rewrite following the SHAPE exactly: HOOK -> COST -> OFFER -> PROOF (optional) -> CLOSE -> SIGN-OFF. ` +
      `One idea per line, blank line between each. Include the SUBJECT: line.`;

    let retryRaw = "";
    try {
      retryRaw = await generateContentWithFallback(retryPrompt);
    } catch (e) {
      console.error("LLM composeEmail retry threw. Error:", e);
    }

    if (retryRaw.trim()) {
      return parseEmailResponse(retryRaw);
    }
  }

  return parsed;
}
