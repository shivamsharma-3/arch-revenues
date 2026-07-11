"use client";
import { motion } from "motion/react";

import Link from 'next/link';

export function HowItWorks() {
  const steps = [
    {
      timing: "Week 1",
      title: "Map your ICP + build infrastructure",
      bullets: [
        "200-account prospect list, named decision-makers verified on LinkedIn",
        "3 sending domains, SPF/DKIM/DMARC, Apollo + Brevo wired up",
        "Inbox warmup started"
      ]
    },
    {
      timing: "Week 2",
      title: "Sequence live",
      bullets: [
        "7-touch email + LinkedIn sequence",
        "30–50 emails/day per domain",
        "Every reply logged in shared inbox"
      ]
    },
    {
      timing: "Week 3",
      title: "Meetings on your calendar",
      bullets: [
        "Replies qualified, objections handled, routed to your calendar",
        "First Monday report: opens, replies, meetings booked",
        "Then weekly cadence every Monday"
      ]
    }
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
    <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} id="how-it-works" className="py-12 md:py-24 px-6 bg-white overflow-hidden border-b border-zinc-200/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-zinc-50 text-zinc-900 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            HOW IT WORKS — 3 WEEKS TO YOUR FIRST MEETING
          </div>
        </div>

        <div className="space-y-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-semibold text-zinc-900 mb-4">
                <span className="text-zinc-500 mr-2">{step.timing} —</span>
                {step.title}
              </h3>
              <ul className="space-y-3">
                {step.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-zinc-600">
                    <span className="text-zinc-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/how-it-works"
            className="inline-flex w-full sm:w-auto items-center justify-center text-zinc-900 font-semibold hover:text-zinc-600 transition-colors"
          >
            See the full breakdown →
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
