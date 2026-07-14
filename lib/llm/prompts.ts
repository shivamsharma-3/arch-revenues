export const PAIN_EXTRACTION_PROMPT = `
You are researching {company_url} to write a personalized cold email.

I crawled their website and read multiple pages. The content is below.

Your job: Identify the 3 most specific, painful friction points this company is currently experiencing, based ONLY on the content below.

What counts as a pain signal — ranked best to worst:
1. STRONGEST: Help docs about a workaround, FAQ entries, changelog fixing a bug = specific product gap
2. STRONG: Job posting for a specific role = gap in their org right now
3. STRONG: Blog post explaining how to do X = users struggle with X
4. MEDIUM: Case study "before" state = real pain their customer (often they themselves) had
5. MEDIUM: Pricing page missing a feature = they're avoiding it or can't build it
6. MEDIUM: Hero text / tagline / positioning = reveals what problem they THINK is their customers' pain (often the founder's real frustration)
7. USABLE: "We help [persona] who struggle with [X]" on homepage = named pain even if general
8. USABLE: Page title / meta description / OG title = signals what they lead with

Use signal types 1-5 if available. If the site is JS-rendered and only meta/heading content is available, use types 6-8.

For EACH pain, extract:
- A specific sentence (not a generic industry problem)
- The actual evidence (direct quote from their content, or specific page element)
- Why it hurts for THIS company specifically

HARD RULES:
- Do NOT output "scaling challenges", "competition is fierce", "hiring is hard" — these are forbidden
- Do NOT invent pains not visible in the content
- Do NOT describe what their product does — describe what THEY are struggling with
- If the content is too thin to find even 1 specific pain, output exactly: INSUFFICIENT_DATA

Output format (when content is usable):

PAIN 1:
Description: [one specific sentence about THEIR pain]
Evidence: [direct quote or specific element from their content]
Source: [URL of the page]
Why it hurts: [one sentence — consequence for them specifically]

PAIN 2: [same format]
PAIN 3: [same format]

Rank by specificity (most specific first). Fewer than 3 is OK if the content only supports 1 or 2 clear signals.

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
`;
