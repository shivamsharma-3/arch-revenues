"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const phrases = ["Revenue by Design", "Acquisition, Systematized"];

export function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="pt-32 pb-24 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center gap-16">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-mono font-bold tracking-wider uppercase mb-8 border border-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
              B2B Outbound Revenue Systems
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-zinc-900 leading-[1.05] mb-8"
          >
            Predictable pipeline for <span className="text-zinc-400">B2B Agencies.</span>
          </motion.h1>

          <div className="space-y-6 mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-zinc-600 leading-relaxed max-w-xl"
            >
              We build and operate outbound acquisition systems that generate qualified sales meetings.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-row flex-wrap items-center gap-4"
          >
            <Link
              href="/strategy-call"
              className="group flex items-center justify-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-zinc-900/20"
            >
              Book Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/audit"
              className="flex items-center justify-center gap-2 text-zinc-600 font-semibold px-8 py-4 rounded-xl hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-200"
            >
              Get Free Revenue Audit
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Founding Client Program: Free for the first 7 clients.
            </p>
          </motion.div>
        </div>

        <div className="relative hidden lg:flex items-center justify-center lg:pr-8 xl:pr-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[400px] aspect-square"
          >
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 to-transparent rounded-full opacity-50 blur-3xl" />
            
            {/* Animated Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-zinc-200 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2 + i * 0.2, opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1.2,
                  ease: "linear"
                }}
              />
            ))}

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-3/5 h-3/5 flex items-center justify-center"
              >
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-zinc-900 drop-shadow-xl">
                  <path d="M50 2 L56 12 L50 22 L44 12 Z" />
                  <path d="M43 28 L12 95 L38 95 L48 55 Z" />
                  <path d="M57 28 L88 95 L62 95 L52 55 Z" />
                  <path d="M49 28 L51 28 L51 65 L49 65 Z" />
                  <path d="M50 75 L56 85 L50 95 L44 85 Z" />
                </svg>
              </motion.div>
            </div>

            {/* Floating Stats/Labels */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute top-1/4 -right-2 bg-white p-3 rounded-xl border border-zinc-200 shadow-lg"
            >
              <div className="text-[8px] font-mono uppercase tracking-widest text-zinc-400 mb-0.5">Status</div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-900">System Active</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-1/4 -left-2 bg-white p-3 rounded-xl border border-zinc-200 shadow-lg"
            >
              <div className="text-[8px] font-mono uppercase tracking-widest text-zinc-400 mb-0.5">Performance</div>
              <div className="text-[10px] font-bold text-zinc-900">8-18 Meetings / Month</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}