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
You are writing a cold outbound email on behalf of the sender described below.

SENDER: {sender_business}

You have researched {company_url} (the prospect) and found these signals:

{pain_points}

The email must read as if the SENDER is reaching out to the PROSPECT. Do not mention ARCH Revenues. Do not mention any company or person other than the sender and the prospect.

────────────────────────────────
WHAT TO WRITE
────────────────────────────────

Write one cold email. The shape is fixed. The language is not.

SHAPE (in order):
1. HOOK -- One observation from the prospect's site. What the sender noticed that signals a problem the sender can solve. No greeting cliche. Start with what was observed, not pleasantries.
2. COST -- One line on what this costs the prospect. Not abstract. Specific to their situation.
3. OFFER -- One line connecting the sender's product/service to the prospect's exact gap. Name the mechanism, not the category.
4. PROOF -- One concrete result the sender has achieved for similar clients. E.g. "Last month: helped 3 clients like you land 12 new deals." If no proof is plausible from the sender description, skip this line entirely.
5. CLOSE -- One question. Easy to answer in one line. Not "book a call." A low-commitment question about the prospect's situation.
6. SIGN-OFF -- First name only, then a 1-line description of the sender's business (derived from SENDER above).

────────────────────────────────
FORMAT RULES (mandatory)
────────────────────────────────
- One idea per line. Blank line between each line. No paragraph > 2 sentences.
- Subject: 5-8 words, lowercase, reference the specific finding about the prospect (not generic like "quick question")
- Open with a brief informal greeting ("Hi," or the company name directly) — not "Hi there," not "Dear [name],"
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

EXAMPLE A — Sender: "Web dev agency for DTC brands". Prospect: dev shop, 8 months old, 6 service lines, no blog.
Subject: eight months in, six service lines
Hi,
NovaBuild launched eight months ago and already lists six project types on the homepage — web, mobile, APIs, AI, DevOps, and enterprise. That spread usually means the pipeline is whatever the network sends.
Works until it doesn't. When referrals slow, there's no channel to pull on.
We help DTC-focused dev shops cut their service list to 2-3 and go direct to the exact brand operators who need that build — before they post on Upwork.
Last quarter we did this for two shops. One landed a $40K retainer inside six weeks.
Is NovaBuild deliberately staying broad, or is that more of a "take what comes" situation?
Alex
DTC Dev Co — web builds for consumer brands

EXAMPLE B — Sender: "B2B SaaS tool for construction PMs". Prospect: SaaS, blog dead 6 months, pricing says "contact us".
Subject: the blog went quiet six months ago
Hi,
Corepath's blog last posted in January. Six months of silence usually means inbound has slowed with it.
If the pipeline is leaning on word-of-mouth while inbound dries up, that's a fragile spot heading into Q3.
Our tool steps in exactly there — construction PMs moving off spreadsheets are actively searching right now, and you're not showing up.
We onboarded 4 similar SaaS tools this quarter. Average time-to-first-trial: 18 days from signup.
Open to a quick look at where Corepath's ICP is actually searching?
Jordan
BuildTrack — project management for construction teams

EXAMPLE C — Sender: "Fractional CFO for Series A startups". Prospect: consulting firm, all testimonials from warm intros.
Subject: every case study starts the same way
Hi,
Every testimonial on the Hendrix site opens with "a client referred us to..." — a great quality signal but a fragile growth one.
Referrals compound slowly and stop when the source goes quiet.
Series A founders in your ICP are raising right now and need exactly what you do — but they're not finding you unless someone sends them your way.
I've helped 3 firms like Hendrix get in front of 20 warm-fit founders in under 60 days without cold outreach that feels cold.
Is the referral pipeline growing the way you'd want it to right now?
Maya
Series A CFO Partners — fractional finance for early-stage founders

────────────────────────────────
OUTPUT FORMAT (exactly)
────────────────────────────────
SUBJECT: [subject line]
BODY:
[the email — one idea per line, blank line between each]
`;
