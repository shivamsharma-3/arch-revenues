// ─────────────────────────────────────────────────────────────────────────────
// SIGNAL EXTRACTION
// Looks ONLY for signals that outbound/cold email can actually fix.
// Drops SEO, design, product, pricing signals — they're real problems but
// outbound doesn't solve them, so pitching them is a bait-and-switch.
// ─────────────────────────────────────────────────────────────────────────────
export const PAIN_EXTRACTION_PROMPT = `
You are analysing {company_url} to find signals that cold email + LinkedIn outbound can directly fix.

ONLY look for these pipeline/lead-gen signals. Ignore everything else.

SIGNALS TO FIND (ranked):
1. New company (< 2 years) with no visible repeatable acquisition channel — referrals + SEO only
2. Broad service list / no clear ICP — signals they're taking whatever comes in
3. No outbound presence — no case studies from cold-sourced clients, no SDR job postings, no "we reached out to..." language
4. Thin or no content marketing — blog hasn't posted in months, or no blog at all = not generating inbound
5. Implicit referral dependency — all testimonials are warm intros, no cold-sourced wins mentioned
6. Agency or dev shop with no stated niche — serving anyone = competing on price
7. Single-channel dependency — "we get most clients from [one place]" = vulnerable
8. No pricing / sales-led motion — no pricing page, vague "contact us", long deal cycle signals

DO NOT extract:
- SEO problems (outbound doesn't fix organic search)
- Design or UX issues (not your problem to solve)
- Product bugs or missing features (not your problem to solve)
- Generic "competition is fierce" or "hiring is hard"
- Any problem where the fix is NOT "get in front of more of the right people proactively"

For each signal found, output:

SIGNAL 1:
Finding: [one sentence — what you observed in their content]
Evidence: [exact quote or specific page element — e.g. "5 service lines listed on homepage: web, mobile, SaaS, enterprise, AI"]
Lead-gen gap: [one sentence — why this means their pipeline is unpredictable or fragile]
Outbound fix: [one sentence — how cold email / LinkedIn outbound directly addresses this gap]

SIGNAL 2: [same format]
SIGNAL 3: [same format — only if clearly supported]

If you cannot find even 1 pipeline-relevant signal, output exactly: INSUFFICIENT_DATA

---

PAGE CONTENTS:
{pages_content}
`;

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL COMPOSITION
// Shape: observation → cost → offer → proof → close
// Language: fresh each time, never reuse fixed phrases
// Format: one idea per line, blank line between, no paragraph > 2 sentences
// Spam rules: no trigger words, no HTML, plain text only
// ─────────────────────────────────────────────────────────────────────────────
export const EMAIL_COMPOSITION_PROMPT = `
You are writing a cold email for Shivam at ARCH Revenues — an outbound systems agency for B2B SaaS and dev shops.

ARCH Revenues delivers: personalised cold email campaigns, LinkedIn outbound sequences, ICP targeting, and booked demos/calls. That is the only service being pitched. Do not imply any other service.

You have researched {company_url} and found these signals:

{pain_points}

────────────────────────────────
WHAT TO WRITE
────────────────────────────────

Write one cold email. The shape is fixed. The language is not.

SHAPE (in order):
1. HOOK — One observation from their site. What you noticed that signals a pipeline problem. No greeting cliché. Start with what you saw, not pleasantries.
2. COST — One line on what this costs them. Not abstract. Specific to their situation.
3. OFFER — One line connecting outbound to their exact gap. Name the mechanism, not the category.
4. PROOF — One concrete number. E.g. "Last month: 4 clients, 38 demos booked." If unsure, skip this line.
5. CLOSE — One question. Easy to answer in one line. Not "book a call." A low-commitment question about their situation.
6. SIGN-OFF — Shivam / ARCH Revenues

────────────────────────────────
FORMAT RULES (mandatory)
────────────────────────────────
- One idea per line. Blank line between each line. No paragraph > 2 sentences.
- Subject: 5-8 words, lowercase, reference the specific finding (not "outbound for your business")
- Open with a brief informal greeting ("Hi," or company name directly) — not "Hi there," not "Dear [name],"
- Total email body: 6-9 lines including sign-off. Not longer.
- Plain text only. No bullet points, no bold, no links in the body.

────────────────────────────────
SPAM RULES (mandatory)
────────────────────────────────
Never use these words: free, guarantee, act now, limited time, opportunity, exclusive, click here, unsubscribe, earn money, increase revenue, boost, leverage, revolutionary, synergy, streamline, cutting-edge, game-changer
Never: ALL CAPS, multiple exclamation marks, "I came across your website," "I love what you're building," "Hope this finds you well"

────────────────────────────────
FEW-SHOT EXAMPLES (learn the shape, not the words)
────────────────────────────────

EXAMPLE A — Dev agency, 8 months old, 6 service lines, no blog:
Subject: eight months in, five service lines
Hi,
NovaBuild launched eight months ago and already lists six types of projects on the homepage — web apps, mobile, APIs, AI, DevOps, and enterprise. That range usually means the pipeline is whatever the network sends over.
Works until it doesn't. When referrals quiet down there's no channel to pull on.
Cold email fills that gap: instead of waiting, you choose the exact founders who need a build partner right now and land in their inbox before they post on Upwork.
Last month we ran this for three dev shops — 31 intro calls booked.
Worth knowing what a targeted list of 15 NovaBuild-fit prospects would look like?
Shivam
ARCH Revenues — outbound for dev shops and B2B SaaS

EXAMPLE B — SaaS tool, 18 months old, blog dead for 6 months, pricing page says "contact us":
Subject: the blog went quiet six months ago
Hi,
Corepath's blog last posted in January. Six months of silence usually means the content engine stopped, which means inbound is slowing with it.
If the pipeline is leaning on word-of-mouth while inbound dries up, that's a fragile spot to be in heading into Q3.
Outbound picks up where inbound drops off — targeted sequences to the exact persona who'd get value from Corepath, before they find a competitor.
We did this for a SaaS tool in the project-management space last quarter. 22 demos in six weeks.
Open to seeing the sequence we'd run for Corepath's ICP?
Shivam
ARCH Revenues — outbound for B2B SaaS

EXAMPLE C — Consulting firm, clear niche, referral-only signals, no case studies from outbound:
Subject: every Hendrix case study starts the same way
Hi,
Every case study on the Hendrix site opens with "a client referred us to..." — which is a great signal for quality but a fragile one for growth.
Referrals compound slowly. They also stop when the source goes quiet.
Outbound lets you replicate the best client you've ever had by going directly to the next twenty versions of them, on a schedule you control.
Last month: 4 consulting clients, 41 booked discovery calls from cold sequences.
Is the referral channel growing the way you'd want it to right now?
Shivam
ARCH Revenues — outbound for B2B services

────────────────────────────────
OUTPUT FORMAT (exactly)
────────────────────────────────
SUBJECT: [subject line]
BODY:
[the email — one idea per line, blank line between each]
`;
