"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const phrases = ["Revenue by Design", "Acquisition, Systematized", "B2B Outbound Systems"];

export function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 4000);
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
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-mono font-bold tracking-wider uppercase border border-zinc-200 overflow-hidden relative">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse shrink-0" />
              <div className="relative h-4 w-[200px] sm:w-[220px]">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={currentPhrase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 whitespace-nowrap"
                  >
                    {phrases[currentPhrase]}
                  </motion.span>
                </AnimatePresence>
              </div>
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
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
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

            {/* Pipeline UI Mockup */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl border border-zinc-200/80 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-zinc-200 rounded-full" />
                    <div className="h-2 w-16 bg-zinc-100 rounded-full" />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
                
                <div className="space-y-5">
                  {[
                    { label: "Prospects", value: "2,400", width: "100%" },
                    { label: "Contacted", value: "1,850", width: "75%" },
                    { label: "Replies", value: "142", width: "35%" },
                    { label: "Meetings", value: "18", width: "15%" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-500">
                        <span>{stat.label}</span>
                        <span className="text-zinc-900">{stat.value}</span>
                      </div>
                      <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: stat.width }}
                          transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                          className="h-full bg-zinc-900 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Stats/Labels */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute top-1/4 -right-6 bg-white p-4 rounded-2xl border border-zinc-200 shadow-xl"
            >
              <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-zinc-900">System Active</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-1/4 -left-6 bg-white p-4 rounded-2xl border border-zinc-200 shadow-xl"
            >
              <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Performance</div>
              <div className="text-xs font-bold text-zinc-900">8-18 Meetings / Mo</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
