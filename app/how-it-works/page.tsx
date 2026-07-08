"use client";
import { motion } from "motion/react";

import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    { 
      number: "1",
      title: "We map your ICP", 
      desc: "We build a 200-account list of SaaS companies matching your ICP — with named decision-makers verified on LinkedIn. We don't use generic lists or scraped databases that are years out of date. Instead, we manually verify each account fits your exact revenue range and headcount requirements, and we find the specific founder or sales leader who is doing the outreach themselves.", 
      timing: "Week 1"
    },
    { 
      number: "2",
      title: "We build the infrastructure", 
      desc: "3 sending domains, SPF/DKIM/DMARC configured, Brevo + Apollo wired up, inbox warmup started. We handle the entire technical setup so your main domain is never put at risk. We purchase lookalike domains, configure all necessary DNS records for deliverability, set up the Google Workspaces, and connect the sending infrastructure. Then we begin a rigorous warmup process to ensure high inbox placement.", 
      timing: "Week 1"
    },
    { 
      number: "3",
      title: "We launch the sequence", 
      desc: "7-touch email + LinkedIn sequence goes live. 30-50 emails/day per domain. Every reply logged. We write the copy based on your specific value proposition, focusing on the pain points of your SaaS buyers. The sequence uses a multi-channel approach to stay top-of-mind without being annoying. We monitor deliverability daily and adjust sending volumes to maintain perfect domain health.", 
      timing: "Week 2"
    },
    { 
      number: "4",
      title: "We book and report", 
      desc: "Replies converted to meetings on your calendar. Weekly report every Monday — opens, replies, meetings booked. When prospects reply, we handle the inbox management. We qualify the lead, handle common objections, and route them directly to your calendar. You receive a transparent, no-fluff report every Monday showing exactly what happened the previous week.", 
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
              <p className="text-lg text-zinc-600 font-normal leading-relaxed mb-6">
                {step.desc}
              </p>
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
