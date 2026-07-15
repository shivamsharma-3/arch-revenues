"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function PricingCTAStrip() {
  return (
    <section className="py-20 px-6 bg-zinc-950 text-white border-b border-zinc-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-zinc-900 text-zinc-400 text-xs font-mono font-bold uppercase tracking-widest mb-6 border border-zinc-800">
            Pricing
          </div>
          
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            $499 setup &middot; $1,499/mo &middot; 1-month commit
          </h2>
          
          <p className="text-xl md:text-2xl text-zinc-400 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            5-12 demos/mo guaranteed — or that month's retainer is refunded.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-zinc-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-100 transition-all shadow-sm"
            >
              See full pricing →
            </Link>
            <Link
              href="/strategy-call"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 border border-zinc-800 transition-all shadow-sm"
            >
              Book a strategy call →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
