"use client";
import { motion } from "motion/react";

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export function Pricing() {
  const features = [
    "5-12 qualified demos booked per month (or you don't pay)",
    "Cold email + LinkedIn multi-channel sequence",
    "3 warmed sending domains + full infra setup",
    "Weekly Monday report — opens, replies, meetings",
    "Cancel anytime after first 30 days — no annual contract"
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
    <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} id="pricing" className="py-12 md:py-20 px-6 bg-white border-b border-zinc-200/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border-2 border-zinc-900 rounded-2xl p-6 md:p-8 shadow-xl shadow-zinc-900/5">
          <div className="text-center mb-8">
            <div className="inline-block bg-zinc-50 text-zinc-900 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
              FOUNDING CLIENT RATE (PERFORMANCE PILOT) — 3 SPOTS ONLY
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-6xl font-semibold text-zinc-900 leading-none">$1,500</span>
              <span className="text-xl text-zinc-500 font-medium">/ month</span>
            </div>
            <p className="text-base text-zinc-600">
              Locked for 90 days. Increases to $4,000/mo for client #4.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {features.map((feature, i) => (
              <div key={i} className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-zinc-900 shrink-0 mt-0.5" />
                <span className="text-zinc-900 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/strategy-call"
              className="group inline-flex items-center justify-center gap-2 w-full bg-zinc-900 text-white px-8 py-5 rounded-xl text-lg font-semibold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-zinc-900/20 mb-4"
            >
              Book a 20-min strategy call →
            </Link>
            <p className="text-xs text-zinc-500 max-w-lg mx-auto leading-relaxed">
              In exchange for the founding rate, you agree to be featured as a public case study once we hit your first 5 booked meetings.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
