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

Write a cold email that:

1. Opens by naming ONE pain (the most specific one) — not all three.
2. References the evidence (quote or specific page) so they know you actually read their stuff.
3. Explains in plain English how cold email + LinkedIn outbound solves THIS specific pain. Don't list features. Don't mention your company name until after the pain is established.
4. Soft CTA. No "15 minute demo." No "book a call."

TONE RULES:
- Like a founder talking to a founder
- No buzzwords: revolutionary, leverage, synergy, streamline
- No flattery: "love what you're building", "great company"
- No "we are a leading..."
- Short sentences. Plain words.
- 5-7 sentences total. No longer.

SIGNATURE:
Shivam
ARCH Revenues

OUTPUT FORMAT:
SUBJECT: [4-7 word subject line, lowercase, no caps, no spam words]
BODY:
[email body]

Do not add extra explanation or placeholders.
`;
