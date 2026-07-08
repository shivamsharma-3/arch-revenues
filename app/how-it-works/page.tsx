"use client";
import { motion } from "motion/react";

import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    { 
      number: "1",
      title: "We map your ICP", 
      bullets: [
        "200-account list of SaaS companies matching your ICP",
        "Named decision-makers verified on LinkedIn (not scraped databases)",
        "Each account manually checked against your revenue + headcount criteria"
      ],
      timing: "Week 1"
    },
    { 
      number: "2",
      title: "We build the infrastructure", 
      bullets: [
        "3 lookalike sending domains purchased and configured",
        "SPF, DKIM, and DMARC set up to protect your main domain",
        "Rigorous inbox warmup process started for high deliverability"
      ],
      timing: "Week 1"
    },
    { 
      number: "3",
      title: "We launch the sequence", 
      bullets: [
        "7-touch email + LinkedIn sequence tailored to SaaS buyer pain points",
        "30-50 emails/day sent per domain to maintain perfect health",
        "Every reply logged and monitored daily"
      ],
      timing: "Week 2"
    },
    { 
      number: "4",
      title: "We book and report", 
      bullets: [
        "Replies qualified, objections handled, and routed to your calendar",
        "Weekly no-fluff report every Monday showing exact metrics",
        "You focus on closing, we handle the inbox management"
      ],
      timing: "Week 3 (21 days)"
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
    "description": "Done-for-you outbound systems. We build and refine a powerful outbound system in real conditions for B2B SaaS-focused web design agencies.",
    "serviceType": "B2B Lead Generation"
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex-grow pt-20 pb-12 md:pt-32 md:pb-24 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-16 text-center">
          How It Works
        </h1>
        
        <div className="space-y-12 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-white border border-zinc-200 rounded-xl p-8 md:p-12">
              <div className="text-5xl font-semibold text-zinc-900 leading-none mb-6">
                {step.number}
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
                {step.title}
              </h2>
              <ul className="space-y-4 mb-8">
                {step.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-zinc-600 text-lg">
                    <span className="text-zinc-400 mt-2 w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="text-sm text-zinc-500 italic">
                {step.timing}
              </div>
            </div>
          ))}
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
