"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    { 
      number: "1",
      title: "We map your ICP", 
      sections: [
        {
          heading: "What we do:",
          bullets: [
            "Build a 200-account list of SaaS companies matching your ICP — pulled from Apollo, cross-referenced with LinkedIn",
            "Each account manually verified against your revenue range, headcount, and industry criteria",
            "Identify the named decision-maker for each account (CEO, Founder, Head of Growth, CMO — whoever owns the problem you solve)",
            "Verify each contact's email deliverability with a 4-step verification process (syntax → domain → mailbox → catch-all)",
            "Flag accounts showing trigger events (recent funding, leadership change, product launch) for prioritized outreach",
            "Tag each prospect with 2-3 personalization hooks from their LinkedIn profile (recent post, role change, company news)",
          ]
        },
        {
          heading: "What you do:",
          bullets: [
            "Approve the final list before any email goes out — you have veto power on every account",
            "Provide 1-2 example clients you'd like us to model the ICP on (optional but speeds things up)",
          ]
        },
        {
          heading: "What you'll see:",
          bullets: [
            "A shared Google Sheet with all 200 accounts, decision-makers, emails, and personalization hooks",
            "Time investment on your side: 30-45 minutes to review and approve",
          ]
        }
      ],
      timing: "Week 1"
    },
    { 
      number: "2",
      title: "We build the infrastructure", 
      sections: [
        {
          heading: "What we do:",
          bullets: [
            "Purchase 3 lookalike sending domains (e.g. yoursaas-mail.com, try-yoursaas.com, get-yoursaas.com) — never send from your main domain",
            "Set up Google Workspace inboxes for each sending domain (3 inboxes total)",
            "Configure SPF, DKIM, and DMARC DNS records on each sending domain — the technical layer that prevents emails from landing in spam",
            "Connect Brevo (SMTP relay) for high-volume sending + Apollo for sequence orchestration",
            "Start inbox warmup on all 3 inboxes — 2-3 weeks of gradual volume ramping before any cold email goes out",
            "Set up deliverability monitoring (Inbox Insights, Mail-Tester) so we catch any spam-folder placement within 24 hours",
            "Configure reply routing — every reply lands in a shared inbox you have access to",
          ]
        },
        {
          heading: "What we do NOT do:",
          bullets: [
            "Send from your main domain (puts your business email at risk)",
            "Use your existing contact list (we build fresh, verified lists)",
            "Skip warmup (cold domains sending 50 emails/day = instant spam folder)",
          ]
        },
        {
          heading: "What you'll see:",
          bullets: [
            "DNS records documented in a shared Notion page (so you own the infrastructure, not us)",
            "Warmup progress dashboard showing inbox placement scores",
            "Time investment on your side: 10 minutes to forward DNS access",
          ]
        }
      ],
      timing: "Week 1"
    },
    { 
      number: "3",
      title: "We launch the sequence", 
      sections: [
        {
          heading: "What we do:",
          bullets: [
            "Write a 7-touch email + LinkedIn sequence tailored to your ICP's specific pain points (not generic templates)",
            "Each email personalized with 2-3 prospect-specific data points (recent role change, company news, podcast appearance, etc.)",
            "Send 30-50 emails per day per domain (90-150/day total across 3 domains) — the sweet spot for deliverability",
            "Layer in LinkedIn touches (connection request → voice note → engagement on their posts) between email touches",
            "Monitor deliverability daily — if any domain's open rate drops below 40%, we pause sending and investigate",
            "A/B test subject lines on the first 200 emails to find your ICP's highest-reply variant",
            "Every reply logged in the shared inbox with timestamp, sentiment (positive/negative/neutral), and next-step recommendation",
          ]
        },
        {
          heading: "Sequence structure (7 touches over 14 days):",
          bullets: [
            "Day 1: Email #1 — pattern-interrupt opener",
            "Day 3: LinkedIn connection request",
            "Day 5: Email #2 — value-add follow-up",
            "Day 7: LinkedIn voice note",
            "Day 9: Email #3 — case study / proof point",
            "Day 12: Email #4 — soft breakup",
            "Day 14: LinkedIn engagement on their recent post",
          ]
        },
        {
          heading: "What you'll see:",
          bullets: [
            "Live sequence document with every email draft (you approve before launch)",
            "Real-time reply dashboard",
            "Time investment on your side: 20 minutes to review and approve copy",
          ]
        }
      ],
      timing: "Week 2"
    },
    { 
      number: "4",
      title: "We book and report", 
      sections: [
        {
          heading: "What we do:",
          bullets: [
            "Reply to every prospect within 4 business hours — positive, negative, and unsubscribe",
            "Qualify leads against your ICP criteria before they ever hit your calendar (no junk demos)",
            "Handle common objections (timing, budget, \"send me some info\") without losing the lead",
            "Route qualified prospects directly to your Calendly with a pre-meeting brief (their pain, their stack, why they said yes)",
            "Send you a Monday morning report every week:\n- Emails sent, open rate, reply rate, positive reply rate\n- Meetings booked, meetings held, no-shows\n- Domain health scores for all 3 sending domains\n- Top 3 performing subject lines + bottom 3 (so we double down on what works)",
            "Monthly strategy call (30 min) to review pipeline, refine ICP, plan next month's sequence",
          ]
        },
        {
          heading: "What you do:",
          bullets: [
            "Show up to the demos we book",
            "Close the deals",
            "Tell us when a meeting wasn't qualified so we tighten the filters",
          ]
        },
        {
          heading: "What you'll see:",
          bullets: [
            "Monday report in your inbox by 9 AM your time",
            "Shared dashboard with all metrics (updated daily)",
            "Time investment on your side: 5 min/week to read the report, 30 min/month for the strategy call",
          ]
        }
      ],
      timing: "Week 3+"
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "B2B Outbound Acquisition",
    "provider": {
      "@type": "Organization",
      "name": "ARCH Revenues"
    },
    "description": "Done-for-you outbound systems. We build and refine a powerful outbound system in real conditions for B2B SaaS companies in the $20K-$100K MRR range.",
    "serviceType": "B2B Lead Generation"
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex-grow pt-20 pb-12 md:pt-32 md:pb-24 px-6 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 tracking-tight mb-20 text-center">
          How It Works
        </h1>
        
        <div className="space-y-16 md:space-y-24 mb-24 relative">
          {/* Vertical connecting line for desktop */}
          <div className="hidden lg:block absolute left-[25%] xl:left-[30%] top-0 bottom-0 w-px bg-zinc-200"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative">
              
              {/* Left Column (Sticky info) */}
              <div className="lg:w-[25%] xl:w-[30%] shrink-0 pt-2 relative z-10 lg:pr-8">
                <div className="lg:sticky lg:top-32 bg-zinc-50 lg:bg-transparent pb-4 lg:pb-0">
                  <div className="text-7xl font-bold text-zinc-200 leading-none mb-4 tracking-tighter">
                    {step.number}
                  </div>
                  <h2 className="text-3xl font-semibold text-zinc-900 mb-3 tracking-tight">
                    {step.title}
                  </h2>
                  <div className="inline-block px-3 py-1 bg-zinc-200/50 text-zinc-700 text-sm font-mono tracking-wide uppercase rounded-full">
                    {step.timing}
                  </div>
                </div>
              </div>
              
              {/* Right Column (Content) */}
              <div className="lg:w-[75%] xl:w-[70%] bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm relative z-10">
                <div className="space-y-10">
                  {step.sections.map((section, secIdx) => (
                    <div key={secIdx}>
                      <h3 className="text-xl font-medium text-zinc-900 mb-5">{section.heading}</h3>
                      <ul className="space-y-4">
                        {section.bullets.map((bullet, i) => {
                          const lines = bullet.split('\n');
                          return (
                            <li key={i} className="flex gap-4 text-zinc-600 text-[1.05rem] leading-relaxed">
                              <span className="text-zinc-400 mt-2.5 w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                              <div>
                                {lines.map((line, lineIdx) => (
                                  <div key={lineIdx} className={lineIdx > 0 ? "mt-1.5 text-zinc-500" : ""}>
                                    {line}
                                  </div>
                                ))}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-12 shadow-xl mb-16 text-white">
          <h2 className="text-2xl font-semibold mb-6">What we need from you to start (Week 1 kickoff checklist):</h2>
          <ul className="space-y-4 mb-8">
            {[
              "Calendly link for booking demos",
              "1-2 example clients you'd like us to model the ICP on (optional)",
              "30-min kickoff call to align on ICP, messaging angles, and offer positioning",
              "DNS access for sending domains (we'll send instructions)",
              "Approval of the 200-account prospect list before we launch",
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 text-zinc-300 text-lg">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="pt-8 border-t border-zinc-800">
            <p className="text-xl font-semibold text-white mb-2">
              Total time investment from you over 3 weeks: ~75 minutes.
            </p>
            <p className="text-zinc-400">
              Everything else is on us.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/strategy-call"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-zinc-900/20"
          >
            Book a 20-min strategy call →
          </Link>
          <Link
            href="/audit"
            className="text-zinc-900 text-base underline hover:text-zinc-600 transition-colors"
          >
            Fill out the ICP worksheet →
          </Link>
        </div>
      </motion.main>
    </div>
  );
}
