"use client";

import { motion } from "motion/react";

export function Proof() {
  return (
    <section className="py-24 px-6 bg-white border-y border-zinc-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-mono font-bold tracking-wider uppercase mb-6 border border-zinc-200">
              Building In Public
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-4">
              Transparent Cohort Dashboard
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
              Our founding cohort is currently live. Case studies will be published here once we cross 8 booked meetings for Client #1.
            </p>
          </motion.div>
        </div>

        {/* Transparent Building in Public Cohort Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-zinc-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-zinc-800"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-800 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                </span>
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
                  Building In Public — Founding Cohort Status
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">Cohort 1 Infrastructure & Campaign Metrics</h3>
            </div>
            <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-700">
              Last updated: 27 July 2026
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-zinc-800/60 p-5 rounded-2xl border border-zinc-700/50">
              <span className="text-xs text-zinc-400 font-mono block mb-1">Primary Deliverability</span>
              <span className="text-3xl font-bold text-teal-400 font-mono">96.8%</span>
              <span className="text-[11px] text-zinc-500 block mt-1">SPF/DKIM/DMARC Pass</span>
            </div>
            <div className="bg-zinc-800/60 p-5 rounded-2xl border border-zinc-700/50">
              <span className="text-xs text-zinc-400 font-mono block mb-1">Inbox Warmup</span>
              <span className="text-3xl font-bold text-white font-mono">3 / 3</span>
              <span className="text-[11px] text-zinc-500 block mt-1">Sending Domains Active</span>
            </div>
            <div className="bg-zinc-800/60 p-5 rounded-2xl border border-zinc-700/50">
              <span className="text-xs text-zinc-400 font-mono block mb-1">Reply Window SLA</span>
              <span className="text-3xl font-bold text-white font-mono">&lt; 4 Hours</span>
              <span className="text-[11px] text-zinc-500 block mt-1">Qualification Protocol</span>
            </div>
            <div className="bg-zinc-800/60 p-5 rounded-2xl border border-zinc-700/50">
              <span className="text-xs text-zinc-400 font-mono block mb-1">Performance Benchmark</span>
              <span className="text-3xl font-bold text-teal-400 font-mono">5-12 Demos</span>
              <span className="text-[11px] text-zinc-500 block mt-1">Refund Guarantee Active</span>
            </div>
          </div>

          <div className="bg-zinc-800/40 p-6 rounded-2xl border border-zinc-700/40 text-sm text-zinc-300 leading-relaxed flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="max-w-2xl text-xs text-zinc-400">
              We publish campaign performance transparently. In exchange for our $1,499/mo founding rate, early cohort agency clients agree to publish a verified case study once 5+ qualified meetings are hit.
            </p>
            <a
              href="/strategy-call"
              className="shrink-0 bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all"
            >
              Reserve Founding Spot →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
