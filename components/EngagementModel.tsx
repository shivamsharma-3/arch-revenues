'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function EngagementModel() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-8">
              Structured for ROI,<br />
              Not Lock-In.
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed mb-8">
              We don&apos;t ask you to commit to 12 months on faith. Start with a 30-day pilot to validate targeting and generate your first qualified conversations.
            </p>
            <Link 
              href="/strategy-call" 
              className="group inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3.5 rounded-md font-medium hover:bg-zinc-800 transition-all"
            >
              Book Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 md:p-12"
          >
            <ul className="space-y-8">
              {[
                "Option A: 2-Week Pilot Program to prove the system.",
                "If performance targets are met, we transition into a monthly engagement.",
                "Flat monthly retainer. No hidden costs.",
                "No long-term contracts. We operate on a month-to-month basis."
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-zinc-400 font-medium mt-0.5">0{i + 1}</span>
                  <span className="text-zinc-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
