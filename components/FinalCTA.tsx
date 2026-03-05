'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section id="strategy-call" className="py-32 px-6 bg-zinc-900 text-zinc-50 text-center">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-8">
            Stop hoping for referrals.<br />
            Start engineering predictable revenue.
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed mb-12 max-w-2xl mx-auto">
            You already know how to deliver exceptional work. It&apos;s time to build the predictable acquisition system that scales your agency.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link 
              href="/strategy-call" 
              className="group flex items-center gap-2 bg-white text-zinc-900 px-8 py-4 rounded-md font-medium hover:bg-zinc-100 transition-all text-lg"
            >
              Book Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest">
              No long-term contract. No paid ads. Just predictable pipeline.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
