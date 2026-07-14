export const PAIN_EXTRACTION_PROMPT = `
You are researching {company_url} to write a personalized cold email.

I crawled their website and read multiple pages. The content is below.

Your job: Identify the 3 most specific, painful friction points this company is currently experiencing, based ONLY on the content below. Not generic industry pains — pains visible in their actual content.

What counts as a pain signal:
- A help article about a workaround = the product doesn't solve it natively
- A job posting for a specific role = a gap in their org
- A blog post explaining how to do something = users struggle with it
- A changelog entry fixing X = X was broken
- A pricing page missing a feature competitors have = they're avoiding it
- A case study "before" = pain their customer had (often their own pain too)
- An FAQ entry = confusion users have

What does NOT count as a pain:
- "Scaling challenges" (generic)
- "Competition is fierce" (generic)
- "Hiring is hard" (generic)
- Anything that could apply to any SaaS company

For each pain, output exactly in this format (do not add extra text):

PAIN 1:
Description: [one specific sentence]
Evidence: [direct quote from their content]
Source: [URL of the page]
Why it hurts: [one sentence — why this matters for them specifically]

PAIN 2: ...
PAIN 3: ...

Rank by specificity (most specific first).

---

PAGE CONTENTS:
{pages_content}
`;

export const EMAIL_COMPOSITION_PROMPT = `
You are writing a personalized cold email to a founder at {company_url}.

You've researched their website and identified 3 specific pain points:

{pain_points}

You MUST follow this exact structure. Do not skip any line. Do not add any line not listed here.

LINE 1 (GREETING):
Hi [first name or "there" if no name found],

LINE 2 (PAIN OPENING — one sentence):
[Open by naming ONE specific pain from the pain points above. Use the exact phrasing from the Description field. Do not paraphrase into generic language. Do not say "for many" or "most companies" — name THEIR specific pain.]

LINE 3 (EVIDENCE — one sentence):
[Reference the specific evidence from the pain point. Format: "I saw [specific thing on their site/page]." Quote their actual content where possible. This line must prove you read their stuff — generic descriptions of their homepage are forbidden.]

LINE 4 (BRIDGE — one sentence):
[Explain in plain English why this pain costs them — what they're losing every week it goes unfixed. No mention of your solution yet. No "we" or "our".]

LINE 5 (SOLUTION — one sentence):
[Explain how cold email + LinkedIn outbound directly solves THIS pain. Plain English. No buzzwords. No feature list. Reference the pain explicitly.]

LINE 6 (PROOF — one sentence, optional):
[One concrete number or fact. E.g., "Last month we booked 38 demos for 4 SaaS clients." If no proof available, skip this line entirely.]

LINE 7 (SOFT CTA — one short sentence):
[End with a question that's easy to answer in one line. Not "book a call." Not "15 min demo." Something like "Worth a quick chat?" or "Open to seeing what this looks like for {company_url}?"]

LINE 8 (SIGNATURE):
Shivam
ARCH Revenues — outbound systems for B2B SaaS
archrevenues.com

HARD RULES:
- 8 lines maximum, including greeting and signature. No exceptions.
- No buzzwords: revolutionary, leverage, synergy, streamline, cutting-edge
- No flattery: "love what you're building", "great company", "impressive"
- No "we are a leading..." or "we help companies..."
- No "AI-driven" or "AI-powered" anywhere in the email
- Plain words. Short sentences. Founder to founder tone.
- If a pain point has no usable evidence, pick a different pain point.
- Do NOT mention your company name (ARCH Revenues) before line 8.

SUBJECT LINE RULES:
- 4-7 words
- All lowercase, no caps
- Reference the specific pain (not "ai revenue customers" — that's generic)
- No spam words: free, opportunity, exclusive, limited
- Examples of good subjects: "your help docs page", "the integration gap", "scaling outbound past $50k mrr"

OUTPUT FORMAT (exactly):
SUBJECT: [subject line]
BODY:
[the 8 lines, separated by single newlines]

If the pain_points field above is empty or contains no specific pain, output:
SUBJECT: quick question
BODY:
Hi there,

I was reading through {company_url} and noticed a few things worth flagging. Worth a quick chat?

Shivam
ARCH Revenues — outbound systems for B2B SaaS
archrevenues.com
`;

