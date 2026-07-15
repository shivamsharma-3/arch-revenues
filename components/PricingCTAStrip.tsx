"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Check } from "lucide-react";

export function PricingCTAStrip() {
  const features = [
    "5-12 qualified demos/mo guaranteed",
    "If we miss 5 demos, retainer is refunded",
    "3 domains & Google Workspace inboxes",
    "Apollo data & bespoke ICP build",
    "Complete sequence writing & testing",
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-mono font-bold uppercase tracking-widest mb-6 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Predictable growth, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">guaranteed.</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Stop guessing where your next meeting is coming from.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-b from-teal-500/50 to-zinc-800 rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
              
              <div className="flex flex-col items-center border-b border-zinc-800 pb-8 mb-8 text-center">
                <div className="flex items-end justify-center gap-2 mb-4">
                  <span className="text-6xl font-semibold text-white tracking-tight">$1,499</span>
                  <span className="text-xl text-zinc-500 font-medium mb-2">/ mo</span>
                </div>
                <div className="text-zinc-400 font-medium">
                  + $499 one-time infrastructure setup
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/strategy-call"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-teal-400 hover:to-teal-500 transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
                >
                  Book a strategy call
                </Link>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-zinc-800 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-700 transition-all border border-zinc-700"
                >
                  See full details
                </Link>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
