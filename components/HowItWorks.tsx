"use client";
import { motion } from "motion/react";

import Link from 'next/link';

export function HowItWorks() {
  const steps = [
    { 
      number: "1",
      title: "We map your ICP", 
      desc: "We build a 200-account list of SaaS companies matching your ICP — with named decision-makers verified on LinkedIn.", 
      timing: "Week 1"
    },
    { 
      number: "2",
      title: "We build the infrastructure", 
      desc: "3 sending domains, SPF/DKIM/DMARC configured, Brevo + Apollo wired up, inbox warmup started.", 
      timing: "Week 1"
    },
    { 
      number: "3",
      title: "We launch the sequence", 
      desc: "7-touch email + LinkedIn sequence goes live. 30-50 emails/day per domain. Every reply logged.", 
      timing: "Week 2"
    },
    { 
      number: "4",
      title: "We book and report", 
      desc: "Replies converted to meetings on your calendar. Weekly report every Monday — opens, replies, meetings booked.", 
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
    <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} id="how-it-works" className="py-12 md:py-24 px-6 bg-white overflow-hidden border-b border-zinc-200/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-4">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {steps.map((step, index) => (
            <div key={index} className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 flex flex-col h-full">
              <div className="text-4xl font-semibold text-zinc-900 leading-none mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-4">
                {step.title}
              </h3>
              <p className="text-zinc-600 font-normal leading-relaxed mb-8 flex-grow">
                {step.desc}
              </p>
              <div className="text-sm text-zinc-500 italic">
                {step.timing}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/strategy-call"
            className="inline-flex w-full sm:w-auto items-center justify-center bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-zinc-900/20"
          >
            Book a 20-min strategy call →
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
