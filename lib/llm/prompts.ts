// ─────────────────────────────────────────────────────────────────────────────
// SIGNAL & CONTEXT EXTRACTION
// Extracts real, verifiable observations from the prospect's website and
// bridges them specifically to the sender's service/product.
// ─────────────────────────────────────────────────────────────────────────────
export const PAIN_EXTRACTION_PROMPT = `
You are an expert outbound strategist researching a prospect's website ({company_url}) on behalf of a B2B sender:
SENDER BUSINESS: {sender_business}

Analyze the prospect's crawled website pages and find 2-3 specific, factual, and verifiable observations that create a natural, credible bridge to what the SENDER offers.

LOOK FOR THESE SPECIFIC SIGNALS:
1. Core Value Proposition & Target Market: What exactly do they build/sell, and who is their primary target customer?
2. Specific Service Offerings or Products: Specific features, packages, or specialized service tiers they highlight.
3. Tech Stack, Platforms, or Tools: Specific frameworks, cloud platforms, e-commerce engines, CRM, or developer tooling mentioned (e.g. AWS, Next.js, Shopify, HubSpot, Kubernetes, Stripe).
4. Hiring, Team Scaling, or Capacity Clues: Open roles, career postings, or newly expanded team capabilities.
5. Case Studies, Client Verticals, or Portfolio Work: Specific client outcomes, industries, or logos they showcase.
6. Friction, Operational Bottlenecks, or Growth Gaps: Specific areas where companies with their model typically run into bottlenecks that {sender_business} solves.

CRITICAL RULES:
- DO NOT invent facts, fake client names, or hallucinated awards.
- DO NOT use shallow compliments ("your website looks great", "congrats on success", "love your product").
- If the sender solves marketing/outbound: look for acquisition channels, target audience clarity, and service spread.
- If the sender solves dev/engineering/DevOps: look for their tech stack, infrastructure, cloud providers, and scalability bottlenecks.
- If the sender solves design/branding/UI: look for customer experience, conversion focus, and product UI.

OUTPUT FORMAT:
For each signal found, output:

SIGNAL 1:
Observation: [1 sentence citing a specific, verifiable detail from their site — e.g. "Lists enterprise AWS migration and Kubernetes consulting for FinTech SaaS on their services page."]
Relevance Bridge: [1 sentence explaining why this detail is important right now or where friction commonly occurs.]
Sender Opportunity: [1 sentence on how {sender_business} directly solves this or accelerates their goal.]

SIGNAL 2:
Observation: [...]
Relevance Bridge: [...]
Sender Opportunity: [...]

If the crawled pages contain no readable content or are completely empty, output exactly: INSUFFICIENT_DATA

---
PROSPECT CRAWLED PAGES:
{pages_content}
`;

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL COMPOSITION (2026 Signal-Based Framework)
// Shape: Observation Hook → Relevance Bridge → Value Proposition → Social Proof → Low-Friction CTA
// Tone: Peer-to-peer, conversational, humanized (no em dashes, no AI fluff)
// Length: Strictly 50 to 90 words. 3-4 short paragraphs.
// ─────────────────────────────────────────────────────────────────────────────
export const EMAIL_COMPOSITION_PROMPT = `
You are an elite B2B copywriter writing a high-converting personalized cold outbound email.

SENDER:
{sender_business}

PROSPECT WEBSITE:
{company_url}

VERIFIED SIGNALS EXTRACTED FROM PROSPECT:
{pain_points}

The email MUST be written from the SENDER reaching out to the PROSPECT.
Do not mention ARCH Revenues unless the sender is explicitly ARCH Revenues.

────────────────────────────────
THE 2026 COLD EMAIL FRAMEWORK
────────────────────────────────

1. SUBJECT LINE:
- 2 to 4 words only.
- Lowercase, conversational, no punctuation.
- Sounds like an internal email or a message from a peer (e.g. "quick question for [company]", "[prospect name] + [topic]", "[specific feature] inquiry").
- NEVER use clickbait or generic words ("synergy", "partnership", "quick question about revenue", "opportunity").

2. THE HOOK (Paragraph 1 - 1 to 2 sentences):
- Open with an informal greeting: "Hi," or "Hey,".
- Lead IMMEDIATELY with a specific, factual observation from the prospect's website.
- NEVER use pleasantries ("Hope you're well", "I came across your site", "I love what you're doing").
- Example: "Saw [Company] recently launched your new Shopify B2B wholesale portal." or "Noticed you're expanding your senior DevOps consulting services for fintech teams."

3. THE RELEVANCE BRIDGE & OFFER (Paragraph 2 - 2 sentences):
- Connect the observation directly to a common friction point, opportunity, or capacity bottleneck.
- State specifically what the SENDER delivers (the exact mechanism and outcome, not generic category buzzwords).
- Example: "When rolling that out, handling custom tier pricing without breaking inventory sync usually becomes a headache. We build dedicated sync middleware that keeps wholesale orders automated in real time."

4. SOCIAL PROOF (Paragraph 3 - 1 sentence):
- One quick, credible metric or client outcome for a similar company.
- Example: "Recently helped two DTC brands cut manual order processing time by 80% in their first month."
- (If no proof is plausible from the sender description, keep this sentence focused on a concrete outcome).

5. LOW-FRICTION CTA (Paragraph 4 - 1 simple question):
- Ask ONE low-pressure, interest-based question.
- NEVER ask for "30 minutes on Tuesday", "hop on a call", or drop a calendar link.
- Examples:
  * "Worth sending over a 2-minute video breakdown of how it works?"
  * "Open to seeing how we handled this for [similar company]?"
  * "Are you handling this in-house, or open to taking a look at a few examples?"

6. SIGN-OFF:
- Casual first name only, followed by a one-line descriptor of the sender's business.
- Example:
  Alex
  DTC Dev Labs | Custom Shopify infrastructure

────────────────────────────────
HUMANIZER ENGINE RULES (ZERO AI TELLS)
────────────────────────────────
Based on Wikipedia's "Signs of AI Writing", modern spam filters and human executives instantly flag AI-generated text. You must strictly avoid all AI tells:

1. NO "NOT X, BUT Y" CONTRASTS: Never write "It's not just about X, it's about Y", "not only X, but Y", or "X rather than Y". State the factual point directly.
2. NO DRAMATIC ONE-LINE CLOSERS OR FRAGMENTS: Never write "That is the real win", "Let that sink in", "No guessing", or dramatic one-word lines.
3. NO APHORISMS OR DEEP SOUNDING PHRASES: Never write "at its core", "in reality", "what really matters", "the language of trust", "becomes a trap".
4. NO STAGED RUN-UPS: Never write "Hope this finds you well", "Let's dive in", "Real talk", "Honestly", "Here's the thing", or "Quick question".
5. NO ARGUING WITH PHANTOM OBJECTIONS: Never write "This isn't about X", "Don't get me wrong", or "You might think X, but Y".
6. NO FORCED TRIADS: Never force three parallel words or examples (e.g. "speed, reliability, and security"). Use two items or one specific detail.
7. ZERO DASHES: NEVER use em dashes (—) or en dashes (–). Use commas, periods, or parentheses.
8. BANNED AI VOCABULARY: delve, crucial, robust, pivotal, testament, tapestry, landscape, elevate, revolutionize, seamless, foster, streamline, showcase, underscore, actually, vibrant, game-changer, bespoke, holistic, empower.
9. RHYTHM AND LENGTH: 50 to 80 words total. Alternate short and longer sentences. Sounds like a concise message sent from a phone between meetings.
10. PLAIN TEXT ONLY: No bullet points, no bold tags, no HTML, no tracking links.

────────────────────────────────
FEW-SHOT EXAMPLES
────────────────────────────────

EXAMPLE 1 — Sender: "Custom Web & API Development for Shopify Brands". Prospect: apparel brand launching wholesale.
Subject: wholesale portal setup
Hi,

Saw your team recently added wholesale B2B ordering alongside your main DTC store.

Usually, managing tier pricing and inventory sync between retail and wholesale ends up requiring manual spreadsheet reconciliation. We build automated Shopify-to-ERP connectors that keep wholesale orders, custom net terms, and inventory synced in real time.

Recently helped a streetwear brand eliminate 15 hours of manual order entry every week.

Worth sending a 2-minute video showing how we set up the sync?

Alex
Shopify Engineering Partner

---

EXAMPLE 2 — Sender: "DevOps & Cloud Cost Optimization Agency". Prospect: healthtech SaaS scaling on AWS.
Subject: aws infrastructure question
Hi,

Saw MedFlow has been expanding your patient intake platform across multiple US healthcare networks.

As HIPAA-compliant workloads scale, unoptimized container clusters and cross-region data transfer fees often quietly double monthly cloud bills. We run targeted AWS infrastructure audits that cut idle compute costs by 25-40% without touching uptime or compliance.

Last month we helped a similar healthtech platform save $9,200/mo on their EKS cluster within two weeks.

Open to seeing a quick breakdown of where teams usually find the biggest cloud savings?

Shivam
Cloud Infrastructure Group

---

EXAMPLE 3 — Sender: "B2B Outbound Lead Generation". Prospect: boutique UX design studio.
Subject: design client pipeline
Hi,

Saw your case study on the fintech dashboard redesign for Alto.

For boutique studios doing high-tier product design, client demand often fluctuates between intense project delivery and referral lulls. We set up outbound email and LinkedIn systems that book 5-12 discovery calls monthly with funded tech founders who need immediate design sprints.

Recently helped a 6-person studio book 8 qualified founder calls in their first 3 weeks.

Worth sending over a few sample target accounts we could reach for you?

Jordan
ARCH Revenues | Outbound Systems for Agencies

────────────────────────────────
OUTPUT FORMAT (exact)
────────────────────────────────
SUBJECT: [subject line]
BODY:
[the email body adhering strictly to the 50-90 word framework]
`;

