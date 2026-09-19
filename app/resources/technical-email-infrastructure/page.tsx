import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  Server, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  Terminal, 
  FileText,
  Mail,
  Zap,
  Clock,
  ExternalLink
} from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Email Infrastructure Blueprint: 95%+ Deliverability Guide",
  description:
    "The definitive technical architecture for B2B outbound email: Secondary lookalike domains, Google Workspace & M365 tenant isolation, SPF, DKIM, DMARC, Custom Tracking Domains, and 14-day warmup protocols.",
  alternates: {
    canonical: "https://www.archrevenues.com/resources/technical-email-infrastructure",
  },
  openGraph: {
    title: "Technical Email Infrastructure Blueprint | ARCH Revenues",
    description:
      "Why 90% of agency cold email lands in spam and how to engineer bulletproof DNS, isolation, and warmup for 95%+ inbox placement.",
    url: "https://www.archrevenues.com/resources/technical-email-infrastructure",
    type: "article",
  },
};

export default function TechnicalEmailInfrastructurePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Technical Email Infrastructure Blueprint: 95%+ Deliverability for Agency Outbound",
    "description": "Step-by-step technical architecture for secondary sending domains, Google Workspace inboxes, SPF/DKIM/DMARC/CTD DNS setup, and automated 14-day warmup schedules.",
    "author": {
      "@type": "Organization",
      "name": "ARCH Revenues",
      "url": "https://www.archrevenues.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ARCH Revenues",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.archrevenues.com/icon.svg"
      }
    }
  };

  const dnsRecords = [
    {
      type: "TXT",
      host: "@",
      value: "v=spf1 include:_spf.google.com ~all",
      purpose: "SPF (Sender Policy Framework) - Authorizes Google Workspace mail servers to send email on behalf of your domain.",
      ttl: "3600 (1 Hour)"
    },
    {
      type: "TXT",
      host: "google._domainkey",
      value: "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz87...",
      purpose: "DKIM (2048-bit RSA) - Cryptographically signs outgoing emails, verifying the message was not forged or altered in transit.",
      ttl: "3600 (1 Hour)"
    },
    {
      type: "TXT",
      host: "_dmarc",
      value: "v=DMARC1; p=quarantine; sp=quarantine; pct=100; rua=mailto:dmarc-reports@archrevenues.com; fo=1",
      purpose: "DMARC Policy - Instructs receiving mailboxes how to handle unauthenticated mail and sends daily diagnostic aggregate telemetry.",
      ttl: "3600 (1 Hour)"
    },
    {
      type: "CNAME",
      host: "track",
      value: "prox.customtrackingdomain.com",
      purpose: "Custom Tracking Domain (CTD) - Eliminates shared domain tracking pixel flags so open & click tracking uses your authenticated domain.",
      ttl: "Auto / 300"
    },
    {
      type: "MX",
      host: "@",
      value: "10 smtpin.google.com (or ASPMX.L.GOOGLE.COM)",
      purpose: "Mail Exchanger - Routes incoming prospect replies, bounces, and auto-responders to your authenticated mailbox.",
      ttl: "3600 (1 Hour)"
    }
  ];

  const warmupSchedule = [
    {
      days: "Days 1 – 4",
      coldPerDay: "0 emails/day",
      warmupPerDay: "5 – 8 emails/day",
      focus: "Warmup network peer exchange only. Verify SPF, DKIM, and DMARC passing 100% on Mail-Tester.",
      status: "DNS Burn-in"
    },
    {
      days: "Days 5 – 8",
      coldPerDay: "5 – 10 emails/day",
      warmupPerDay: "12 – 18 emails/day",
      focus: "First live cold sends to tier-1 validated accounts (0% bounce rate verified). Keep warm reply rate above 40%.",
      status: "Initial Ramp"
    },
    {
      days: "Days 9 – 14",
      coldPerDay: "15 – 25 emails/day",
      warmupPerDay: "25 – 30 emails/day",
      focus: "Scale volume gradually. Monitor spam complaint telemetry via Google Postmaster Tools.",
      status: "Accelerated Ramp"
    },
    {
      days: "Day 15+ (Production)",
      coldPerDay: "30 – 35 emails/day",
      warmupPerDay: "15 emails/day (continuous)",
      focus: "Steady-state operation. Never exceed 40 cold emails per inbox per day. Spread remaining volume across secondary inboxes.",
      status: "Production Cruising"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Back Link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Resources
        </Link>

        {/* Hero Title */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
              Technical Infrastructure
            </span>
            <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-mono border border-zinc-200">
              Updated September 2026
            </span>
            <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-mono border border-zinc-200">
              10 Min Read
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-6 leading-tight">
            Technical Email Infrastructure Blueprint: 95%+ Deliverability for Agency Outbound
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
            Why 90% of agency cold emails silently land in spam before prospects ever see them, and how to engineer secondary lookalike domains, isolated Google Workspace inboxes, cryptographic DNS authentication, and automated warmups that bypass modern 2026 spam filters.
          </p>
        </div>

        {/* Core Warning Banner */}
        <div className="p-6 bg-amber-50/80 border border-amber-200/80 rounded-2xl mb-12 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-900 mb-1">
              Cardinal Rule: Never Send Cold Outreach from Your Primary Domain
            </h3>
            <p className="text-xs md:text-sm text-amber-800/90 leading-relaxed">
              If your primary domain (<code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-amber-900">youragency.com</code>) receives a spam complaint spike above Google & Yahoo’s strict 0.3% threshold, your routine client invoices, pitch decks, and internal emails will immediately land in client spam folders. Always isolate cold outbound onto secondary sending domains.
            </p>
          </div>
        </div>

        {/* Main Content Articles */}
        <article className="space-y-12 text-zinc-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              1. The 2026 Deliverability Reality & Spam Filter Thresholds
            </h2>
            <p>
              Since Google and Yahoo implemented strict sender enforcement, deliverability is no longer about clever subject line formatting or avoidance of trigger words like &ldquo;free&rdquo; or &ldquo;opportunity.&rdquo; Modern spam filters (Google SpamBrain, Microsoft Defender SmartScreen, Mimecast) rely on <strong>reputational machine learning at the domain, IP, and mailbox level</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="p-5 bg-white border border-zinc-200 rounded-xl shadow-xs">
                <div className="text-xs font-mono uppercase text-zinc-500 font-semibold mb-1">Max Spam Complaints</div>
                <div className="text-2xl font-bold text-red-600 mb-1">&lt; 0.30%</div>
                <p className="text-xs text-zinc-500">More than 3 spam reports per 1,000 emails triggers domain-wide blacklisting.</p>
              </div>
              <div className="p-5 bg-white border border-zinc-200 rounded-xl shadow-xs">
                <div className="text-xs font-mono uppercase text-zinc-500 font-semibold mb-1">Max Hard Bounce Rate</div>
                <div className="text-2xl font-bold text-amber-600 mb-1">&lt; 2.0%</div>
                <p className="text-xs text-zinc-500">Sending to invalid or unverified inboxes burns domain reputation within 72 hours.</p>
              </div>
              <div className="p-5 bg-white border border-zinc-200 rounded-xl shadow-xs">
                <div className="text-xs font-mono uppercase text-zinc-500 font-semibold mb-1">Max Volume / Inbox</div>
                <div className="text-2xl font-bold text-emerald-600 mb-1">30 – 40/day</div>
                <p className="text-xs text-zinc-500">Human sending patterns require capping individual mailbox volume and scaling horizontally.</p>
              </div>
            </div>
            <p>
              To safely scale outbound acquisition without risking your corporate domain, you must build an <strong>Isolated Infrastructure Cluster</strong>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight flex items-center gap-2.5">
              <Server className="w-6 h-6 text-indigo-600" />
              2. The Multi-Tenant Secondary Domain Architecture
            </h2>
            <p>
              Instead of sending 200 emails a day from one account, high-performing outbound systems purchase 3 to 5 secondary &ldquo;lookalike&rdquo; domains and provision 2 inboxes per domain.
            </p>
            <div className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl font-mono text-xs overflow-x-auto space-y-2 border border-zinc-800">
              <div className="text-zinc-400 font-bold mb-2"># ARCH Cluster Architecture for &ldquo;acmeagency.com&rdquo;</div>
              <div className="text-emerald-400">Primary Domain (Untouched): acmeagency.com</div>
              <div className="text-zinc-300">├── Secondary Domain 1: getacmeagency.com  → 2 Google Workspace inboxes (shivam@, team@)</div>
              <div className="text-zinc-300">├── Secondary Domain 2: acmeagencylab.com → 2 Google Workspace inboxes (shivam.s@, hello@)</div>
              <div className="text-zinc-300">└── Secondary Domain 3: acmeagencyhq.com  → 2 Google Workspace inboxes (s.sharma@, partnerships@)</div>
              <div className="text-zinc-400 mt-3 pt-3 border-t border-zinc-800">
                Total Capacity: 6 inboxes × 35 cold emails/day = 210 targeted prospects/day (4,200/month) with zero risk to primary domain.
              </div>
            </div>

            <div className="p-4 bg-zinc-100 border border-zinc-200 rounded-xl text-xs md:text-sm text-zinc-700">
              <strong>Domain Forwarding Setup:</strong> Configure an HTTP 301 Permanent Redirect on every secondary domain pointing back to your main website (<code className="font-mono bg-white px-1 py-0.5 rounded border border-zinc-200">https://acmeagency.com</code>). When a curious prospect strips the subdomain or types the URL into their browser, they land directly on your primary portfolio.
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight flex items-center gap-2.5">
              <Terminal className="w-6 h-6 text-zinc-900" />
              3. The DNS Authentication Master Table
            </h2>
            <p>
              Receiving mail servers run four distinct cryptographic handshakes before allowing an email into the primary inbox. Every single one of your secondary domains must have these exact DNS records populated in Cloudflare or Namecheap:
            </p>

            <div className="overflow-x-auto border border-zinc-200 rounded-2xl bg-white shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-100 border-b border-zinc-200 font-mono text-zinc-600 uppercase">
                    <th className="p-3.5 font-bold">Type</th>
                    <th className="p-3.5 font-bold">Host / Name</th>
                    <th className="p-3.5 font-bold">Value / Content</th>
                    <th className="p-3.5 font-bold">Why It Matters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-mono text-zinc-700">
                  {dnsRecords.map((rec, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-3.5 font-bold text-indigo-600 whitespace-nowrap">{rec.type}</td>
                      <td className="p-3.5 font-bold text-zinc-900 whitespace-nowrap">{rec.host}</td>
                      <td className="p-3.5 text-zinc-800 break-all font-sans text-xs">{rec.value}</td>
                      <td className="p-3.5 text-zinc-600 font-sans text-xs min-w-[200px]">{rec.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs md:text-sm text-blue-900">
              <strong className="block mb-1 text-blue-950 font-semibold">Why Custom Tracking Domains (CTD) Are Crucial:</strong>
              When using sending platforms like Instantly, Apollo, or Smartlead, open and link clicks are tracked by a pixel hosted on their default shared domain. Because thousands of spammers use those exact same shared links, spam filters flag them. By creating a CNAME record (<code className="bg-white/80 px-1 py-0.5 rounded font-mono">track.yourdomain.com</code>), all tracking URLs resolve to your verified domain name, preserving 98%+ deliverability.
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight flex items-center gap-2.5">
              <Flame className="w-6 h-6 text-amber-600" />
              4. The 14-Day Automated Warmup & Ramping Protocol
            </h2>
            <p>
              New email inboxes have zero sender history. If you buy a domain on Monday and blast 50 emails on Tuesday, the mailbox will be immediately blacklisted. Deliverability warmup services simulate natural human conversation by exchanging encrypted emails with thousands of peer inboxes.
            </p>

            <div className="overflow-x-auto border border-zinc-200 rounded-2xl bg-white shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-100 border-b border-zinc-200 font-mono text-zinc-600 uppercase">
                    <th className="p-3.5 font-bold">Phase</th>
                    <th className="p-3.5 font-bold">Cold Volume</th>
                    <th className="p-3.5 font-bold">Warmup Volume</th>
                    <th className="p-3.5 font-bold">Operational Focus</th>
                    <th className="p-3.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  {warmupSchedule.map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-3.5 font-semibold text-zinc-900 whitespace-nowrap font-mono">{row.days}</td>
                      <td className="p-3.5 font-mono text-red-600 font-bold">{row.coldPerDay}</td>
                      <td className="p-3.5 font-mono text-emerald-600 font-semibold">{row.warmupPerDay}</td>
                      <td className="p-3.5 text-xs text-zinc-600">{row.focus}</td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono text-[11px]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-zinc-600">
              <strong>The Ongoing Rule:</strong> Never turn off warmup. Even when in full production sending 35 cold emails/day, keep warmup active at 10–15 emails/day. This maintains a steady positive reply ratio that protects your domain reputation through cold campaign fluctuations.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight flex items-center gap-2.5">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              5. Automated Deliverability Monitoring & Health Checks
            </h2>
            <p>
              Deliverability is not a set-it-and-forget-it task. Reputation drifts if prospect lists are poorly scrubbed or emails lack relevance. Implement these three weekly monitoring audits:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-zinc-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-zinc-900 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Google Postmaster Tools
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Direct telemetry from Google. Tracks IP Reputation, Domain Reputation, Feedback Loop, and User Spam Rate. Any dip from &ldquo;High&rdquo; to &ldquo;Medium&rdquo; signals immediate need to pause sending and adjust list quality.
                </p>
              </div>

              <div className="p-5 bg-white border border-zinc-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-zinc-900 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Inbox Placement Seed Tests
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Run a weekly seed test using Mailreach or GlockApps across 30 real inboxes (Google Workspace, Outlook 365, iCloud, Yahoo). If placement falls below 92%, rotate the offending inbox out of the sequence immediately.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 - ARCH Comparison */}
          <section className="mt-12 p-8 bg-zinc-900 text-white rounded-3xl space-y-6">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              Done-For-You Architecture
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Don’t want to spend 15 hours configuring DNS records and managing inbox warmup?
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              At ARCH Revenues, we build this entire infrastructure cluster for you in Week 1 of your onboarding. We acquire 3 secondary domains, configure Google Workspace inboxes, write all SPF/DKIM/DMARC/CTD records, run the 14-day warmup ramp, and verify 95%+ inbox placement before sending your first live outbound email.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/strategy-call"
                className="px-6 py-3 rounded-full bg-emerald-500 text-zinc-950 font-semibold text-sm hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Book an Outbound Architecture Call
              </Link>
              <Link
                href="/how-it-works"
                className="px-6 py-3 rounded-full bg-zinc-800 text-zinc-200 font-semibold text-sm hover:bg-zinc-700 transition-colors border border-zinc-700"
              >
                See Full 30-Day Implementation
              </Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
