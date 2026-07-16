"use client";

import Link from "next/link";
import { Shield, ArrowRight, Clock } from "lucide-react";
import { motion } from "motion/react";

export function PricingSummaryStrip() {
  return (
    <section className="py-14 md:py-20 px-6 bg-zinc-50 border-y border-zinc-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse inline-block" />
            The Performance Pilot
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
            $499 setup · $1,499/mo
          </h2>
          <p className="text-zinc-500 mt-2 text-lg">
            5+ qualified demos/mo — guaranteed or your money back.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-zinc-900 mb-1">1-month commit</div>
            <div className="text-sm text-zinc-500 mt-2 leading-relaxed">Month 1 starts after the 14-21 day setup period.</div>
          </div>
          <div className="bg-white border border-teal-200 rounded-2xl p-6 text-center shadow-sm">
            <Shield className="w-5 h-5 text-teal-600 mx-auto mb-2" />
            <div className="text-sm font-semibold text-teal-700">Demo guarantee</div>
            <div className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Fewer than 5 demos → retainer refunded. No argument.
            </div>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">Founding rate</span>
            </div>
            <div className="text-sm text-zinc-500 leading-relaxed">
              $1,499/mo for first 3 clients only. Moves to $4,000/mo from client #4.
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-zinc-300 text-zinc-700 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white hover:border-zinc-400 transition-all"
          >
            See full Performance Pilot details <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/strategy-call"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all shadow-md"
          >
            Book a strategy call
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
