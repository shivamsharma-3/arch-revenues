'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export function Commitment() {
  return (
    <section id="commitment" className="bg-zinc-900 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-6 block"
        >
          Our Commitment
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white text-4xl md:text-5xl font-semibold tracking-tight mb-8"
        >
          We Don&apos;t Sell Effort.<br />
          We Build Outcomes.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-16"
        >
          If your outbound system does not generate qualified meetings within 90 days, we continue operating at no additional cost until it does. No long contracts. No retainers without performance. Just measurable pipeline growth.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mb-16">
          <div className="md:border-r md:border-zinc-800 px-8">
            <div className="text-3xl font-semibold text-white mb-2">90 Days</div>
            <div className="text-sm text-zinc-500 font-mono uppercase tracking-wider">Performance Window</div>
          </div>
          <div className="md:border-r md:border-zinc-800 px-8">
            <div className="text-3xl font-semibold text-white mb-2">0</div>
            <div className="text-sm text-zinc-500 font-mono uppercase tracking-wider">Extra Cost If We Miss</div>
          </div>
          <div className="px-8">
            <div className="text-3xl font-semibold text-white mb-2">30 Days</div>
            <div className="text-sm text-zinc-500 font-mono uppercase tracking-wider">Minimum Commitment</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link 
            href="/audit"
            className="inline-block bg-white text-zinc-900 rounded-full px-10 py-4 font-medium hover:bg-zinc-200 transition-all hover:scale-105"
          >
            Apply for Your Free Audit
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
