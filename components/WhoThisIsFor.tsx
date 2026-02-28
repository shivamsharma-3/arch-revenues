'use client';

import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';

export function WhoThisIsFor() {
  return (
    <section id="fit" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
          Built for Operators, Not Beginners.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-zinc-900 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </span>
            This is built for...
          </h3>
          <ul className="space-y-6">
            {[
              "Web design agencies generating $10k+/month.",
              "Founders who are exceptional at closing but lack consistent at-bats.",
              "Teams that want predictable pipeline, not hustle tips.",
              "Agencies ready to invest in long-term revenue infrastructure."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-zinc-600">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0 mt-2" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-lg font-semibold text-zinc-900 mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <X className="w-4 h-4" />
            </span>
            This is not for...
          </h3>
          <ul className="space-y-6">
            {[
              "Solo freelancers making under $10k/month.",
              "Agencies looking for commission-only or pay-per-meeting models.",
              "Low-ticket service providers selling $500 websites.",
              "Founders who aren't prepared to take and close sales calls."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-zinc-600">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0 mt-2" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
