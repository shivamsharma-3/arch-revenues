"use client";

import Link from "next/link";
import { Shield, ArrowRight, Clock } from "lucide-react";
import { motion } from "motion/react";

export function PricingSummaryStrip() {
  return (
    <section className="py-14 md:py-20 px-6 bg-zinc-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse inline-block" />
            The Performance Pilot
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            $499 setup · $1,499/mo
          </h2>
          <p className="text-zinc-400 mt-2 text-lg">
            5+ qualified demos/mo — guaranteed or your money back.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">1-month</div>
            <div className="text-sm text-zinc-400">commit — cancel anytime after</div>
          </div>
          <div className="bg-zinc-800/50 border border-teal-500/20 rounded-2xl p-6 text-center relative">
            <Shield className="w-5 h-5 text-teal-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-teal-300">Demo guarantee</div>
            <div className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Fewer than 5 demos → retainer refunded. No argument.
            </div>
          </div>
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Founding rate</span>
            </div>
            <div className="text-sm text-zinc-400 leading-relaxed">
              $1,499/mo for first 3 clients only. Moves to $4,000/mo from client #4.
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-zinc-600 text-zinc-200 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-zinc-800 hover:border-zinc-500 transition-all"
          >
            See full Performance Pilot details <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/strategy-call"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-teal-400 hover:to-teal-500 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
          >
            Book a strategy call
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
