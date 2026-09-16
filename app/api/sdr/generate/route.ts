import { NextResponse } from 'next/server';
import { fetchPage, validateUrl } from '@/lib/crawler/fetch-page';
import { Groq } from 'groq-sdk';

export const maxDuration = 60;

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured. Set it in .env.local.');
  }
  return new Groq({ apiKey });
}

function cleanJson(text: string) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  }
  return JSON.parse(cleaned);
}

export async function GET() {
  return NextResponse.json({
    tool: "arch_sdr_agent",
    version: "2.0.0",
    description: "Autonomous B2B outbound research and sequence generator for ARCH Revenues. Scrapes target website, extracts buyer triggers, computes ICP fit score, and drafts 5-step cold outreach sequence.",
    authentication: {
      required: true,
      passkey_header: "x-passkey",
      bearer_auth: "Authorization: Bearer <passkey>",
      json_body_field: "passkey",
      query_param: "?passkey=<passkey>",
    },
    endpoints: {
      post_generate: {
        method: "POST",
        path: "/api/sdr/generate",
        parameters: {
          url: { type: "string", required: true, description: "Target website URL (e.g. 'https://linear.app')" },
          value_prop: { type: "string", required: false, description: "Your core value proposition" },
          tone: { type: "string", required: false, description: "Voice tone: 'founder-to-founder', 'consultative', 'technical'" },
          offer: { type: "string", required: false, description: "Call-to-action offer" }
        },
        response_schema: {
          research: {
            company_name: "string",
            decision_maker: { name: "string|null", title: "string|null", linkedin: "string|null" },
            services: "string[]",
            tech_stack: "string[]",
            personalization_hooks: [{ type: "string", detail: "string" }],
            icp_fit_score: "number (0-100)",
            icp_fit_reason: "string"
          },
          sequence: {
            email_1: "string (<80 words)",
            linkedin_note: "string (<300 chars)",
            followup_day3: "string",
            followup_day7: "string",
            followup_day14: "string"
          }
        }
      }
    }
  });
}

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const rawBody = await req.json().catch(() => ({}));
    const { url, value_prop, icp_description, tone, offer, passkey: bodyPasskey } = rawBody;

    // Check passkey from Headers, Bearer Token, or Body
    const headerPasskey = req.headers.get('x-passkey') ||
      req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    const reqUrl = new URL(req.url);
    const queryPasskey = reqUrl.searchParams.get('passkey') || reqUrl.searchParams.get('key');
    const providedPasskey = headerPasskey || bodyPasskey || queryPasskey;

    const expectedPasscode = process.env.DASHBOARD_PASSCODE || 'arch2026';
    if (!providedPasskey || providedPasskey.trim() !== expectedPasscode) {
      return NextResponse.json({
        error: "Unauthorized: Invalid or missing founder passkey. Provide via header 'x-passkey', 'Authorization: Bearer <key>', query '?passkey=<key>', or JSON body { 'passkey': '<key>' }."
      }, { status: 401 });
    }

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    if (!validateUrl(normalizedUrl)) {
      return NextResponse.json({ error: 'Invalid URL provided or target is unreachable' }, { status: 400 });
    }

    // 1. Scrape Website
    const page = await fetchPage(normalizedUrl);
    if (!page || !page.text) {
      return NextResponse.json({
        error: `Could not extract text from ${normalizedUrl}. Site may be blocking scrapers or offline.`
      }, { status: 422 });
    }

    const groq = getGroqClient();
    const researcherModel = process.env.GROQ_RESEARCHER_MODEL || 'openai/gpt-oss-20b';
    const writerModel = process.env.GROQ_WRITER_MODEL || 'openai/gpt-oss-120b';

    const icpTarget = icp_description || 'Founder-led agencies, $500K-$5M revenue';
    const clientValueProp = value_prop || 'We build AI SDR agents that book qualified sales meetings on autopilot';
    const clientTone = tone || 'Confident, concise, founder-to-founder';
    const clientOffer = offer || 'Free 30-min outbound growth strategy call';

    // 2. Researcher Agent Call
    const researcherSystemPrompt = `You are a B2B prospect research agent. Your job is to extract buying signals from a prospect's digital footprint (scraped website text).

Given scraped website content, return ONLY a valid JSON object with this exact shape and nothing else — no preamble, no markdown fences:
{
  "company_name": "",
  "decision_maker": {"name": null, "title": null, "linkedin": null},
  "company_size": null,
  "services": [],
  "recent_news": [],
  "tech_stack": [],
  "personalization_hooks": [
    {"type": "funding|hire|launch|post|award|other", "detail": ""}
  ],
  "icp_fit_score": 0,
  "icp_fit_reason": ""
}

Rules:
- Only include facts that are actually present in the scraped content. Do not invent a decision-maker, news item, or hook that isn't there.
- If you cannot find a decision-maker, leave those fields null.
- personalization_hooks must be specific ("raised a $4M seed round in March" — not "they have a website" or "they seem successful").
- icp_fit_score: 90-100 = perfect fit, 70-89 = good, 50-69 = stretch, below 50 = likely reject. Base this only on the ICP description given in the user message.
- Output valid JSON only. No commentary before or after it.`;

    const researcherUserContent = `<icp_description>
${icpTarget}
</icp_description>

<scraped_page title="${page.url}" url="${page.url}">
${page.text.slice(0, 7500)}
</scraped_page>

Extract the research data as instructed.`;

    let research: any = null;
    try {
      const researchCompletion = await groq.chat.completions.create({
        model: researcherModel,
        messages: [
          { role: 'system', content: researcherSystemPrompt },
          { role: 'user', content: researcherUserContent }
        ],
        temperature: 0.2,
        max_tokens: 1200,
      });

      const rawResearchText = researchCompletion.choices[0]?.message?.content || '{}';
      research = cleanJson(rawResearchText);
    } catch (rErr: any) {
      console.error('Researcher agent fallback to 120b:', rErr);
      const fallbackCompletion = await groq.chat.completions.create({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: researcherSystemPrompt },
          { role: 'user', content: researcherUserContent }
        ],
        temperature: 0.2,
      });
      research = cleanJson(fallbackCompletion.choices[0]?.message?.content || '{}');
    }

    research.source_url = normalizedUrl;
    if (!research.company_name) {
      research.company_name = new URL(normalizedUrl).hostname.replace('www.', '').split('.')[0].toUpperCase();
    }

    // 3. Writer Agent Call
    const writerSystemPrompt = `You are an elite B2B cold outreach copywriter. You write short, high-converting sequences that read like a smart founder wrote them — not a marketing automation blast.

Write 5 distinct assets based on the provided prospect research and client brief:
1. email_1: Cold email (under 80 words). Pattern-interrupt opening referencing a specific research hook. High-pain, low-friction ask.
2. linkedin_note: LinkedIn connection request note (under 300 characters, strictly enforced). Mention the specific hook or compliment.
3. followup_day3: 3-day follow-up (under 40 words). Friendly bump referencing the initial observation.
4. followup_day7: 7-day follow-up (under 50 words). Value drop: a relevant case study angle or tactical insight.
5. followup_day14: 14-day breakup email (under 35 words). Graceful exit removing pressure while leaving the door open.

Style Rules:
- Under 80 words for email_1.
- No corporate jargon ("synergy", "streamline", "game-changer", "delve", "testament").
- Never open with "I hope this email finds you well" or "My name is...".
- Plain text only. No exclamation marks.
- Return ONLY a valid JSON object matching this exact shape:
{
  "email_1": "",
  "linkedin_note": "",
  "followup_day3": "",
  "followup_day7": "",
  "followup_day14": ""
}`;

    const writerUserContent = `<prospect_research>
${JSON.stringify(research, null, 2)}
</prospect_research>

<client_brief>
Value Prop: ${clientValueProp}
Voice/Tone: ${clientTone}
Offer: ${clientOffer}
Target ICP: ${icpTarget}
Signature: Shivam\nARCH Revenues
</client_brief>

Write the 5-part outreach sequence as instructed in valid JSON only.`;

    const writerCompletion = await groq.chat.completions.create({
      model: writerModel,
      messages: [
        { role: 'system', content: writerSystemPrompt },
        { role: 'user', content: writerUserContent }
      ],
      temperature: 0.4,
      max_tokens: 1500,
    });

    const rawWriterText = writerCompletion.choices[0]?.message?.content || '{}';
    const sequence = cleanJson(rawWriterText);

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      url: normalizedUrl,
      research,
      sequence,
      latency_ms: latencyMs,
      models_used: {
        researcher: researcherModel,
        writer: writerModel,
      }
    });

  } catch (error: any) {
    console.error('SDR pipeline failed:', error);
    return NextResponse.json({
      error: error?.message || 'Failed to execute SDR pipeline',
      latency_ms: Date.now() - startTime
    }, { status: 500 });
  }
}
