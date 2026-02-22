'use client';

import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

export function Positioning() {
  return (
    <section id="system" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 max-w-2xl">
          We Are Not an Agency.<br />
          We Are Infrastructure.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-50 p-10 md:p-16"
        >
          <h3 className="text-sm font-mono font-semibold text-zinc-500 uppercase tracking-widest mb-8">What We Are Not</h3>
          <ul className="space-y-6">
            {[
              "A marketing agency running paid ads.",
              "A content creation or branding firm.",
              "A lead gen agency that blasts generic templates.",
              "A software tool you have to learn and manage."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-zinc-600">
                <X className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-zinc-900 p-10 md:p-16 text-zinc-100"
        >
          <h3 className="text-sm font-mono font-semibold text-zinc-400 uppercase tracking-widest mb-8">What We Are</h3>
          <ul className="space-y-6">
            {[
              "An end-to-end outbound acquisition system.",
              "Built exclusively for web design agencies.",
              "Operated entirely on your behalf.",
              "Focused purely on booking qualified meetings onto your calendar."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-zinc-300">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
