"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Hero() {
  return (
    <section
      id="hero"
      className="pt-24 pb-12 md:pt-28 md:pb-24 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-zinc-100 text-zinc-600 text-xs font-mono font-bold tracking-wider uppercase mb-8 border border-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
              B2B SaaS Outbound Growth
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-semibold text-zinc-900 leading-[1.1] mb-6"
          >
            We book 5-12 qualified demos per month for B2B SaaS founders — or you don&apos;t pay.
          </motion.h1>

          <div className="mb-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-zinc-600 font-normal leading-relaxed max-w-3xl"
            >
              Cold email + LinkedIn outbound, run by a specialist (not an account manager). Built for SaaS companies between $20K and $200K MRR who can&apos;t afford a full-time SDR but need to stop relying on referrals.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
          >
            <Link
              href="/strategy-call"
              className="w-full sm:w-auto flex items-center justify-center bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-zinc-900/20"
            >
              Book a 20-min strategy call →
            </Link>
            <Link
              href="/how-it-works"
              className="text-zinc-900 text-base underline hover:text-zinc-600 transition-colors"
            >
              See how it works
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
