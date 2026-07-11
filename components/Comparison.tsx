"use client";

import { motion } from 'motion/react';
import Link from 'next/link';

export function Comparison() {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} id="comparison" className="py-8 md:py-24 px-6 bg-white border-b border-zinc-200/50">
      <div className="max-w-[88rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            Why SaaS Founders Choose Us Over Hiring or Going DIY
          </h2>
        </motion.div>

        <div className="overflow-x-auto pb-8">
          <div className="min-w-[800px] grid grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
            {/* Header Row */}
            <div className="bg-zinc-100 p-4 sm:p-5 font-semibold text-zinc-900"></div>
            <div className="bg-zinc-100 p-4 sm:p-5 font-semibold text-zinc-900">Hire Full-Time SDR</div>
            <div className="bg-zinc-100 p-4 sm:p-5 font-semibold text-zinc-900">Generic Agency</div>
            <div className="bg-zinc-900 p-4 sm:p-5 font-semibold text-white">ARCH Revenues</div>

            {/* Upfront Cost */}
            <div className="bg-white p-4 sm:p-5 font-medium text-zinc-600">Upfront Cost</div>
            <div className="bg-white p-4 sm:p-5 text-zinc-600">$60-100k/year <br/>+ benefits</div>
            <div className="bg-white p-4 sm:p-5 text-zinc-600">$5-10k setup <br/>fee</div>
            <div className="bg-zinc-50 p-4 sm:p-5 text-zinc-900 font-medium">$1,500/mo (Founding rate) <br/>+ setup fee <br/>first month billed only after we book 5+ demos</div>

            {/* Outreach Approach */}
            <div className="bg-white p-4 sm:p-5 font-medium text-zinc-600">Outreach Approach</div>
            <div className="bg-white p-4 sm:p-5 text-zinc-600">Manual <br/>prospecting</div>
            <div className="bg-white p-4 sm:p-5 text-zinc-600">Generic <br/>templates</div>
            <div className="bg-zinc-50 p-4 sm:p-5 text-zinc-900 font-medium">AI-driven <br/>personalization</div>

            {/* Time to First Meeting */}
            <div className="bg-white p-4 sm:p-5 font-medium text-zinc-600">Time to First Meeting</div>
            <div className="bg-white p-4 sm:p-5 text-zinc-600">90-120 days <br/>(hire + train)</div>
            <div className="bg-white p-4 sm:p-5 text-zinc-600">45-60 days</div>
            <div className="bg-zinc-50 p-4 sm:p-5 text-zinc-900 font-medium">Week 3 (21 days) <br/>(setup & launch)</div>

            {/* Lead Quality */}
            <div className="bg-white p-4 sm:p-5 font-medium text-zinc-600">Lead Quality</div>
            <div className="bg-white p-4 sm:p-5 text-zinc-600">Depends on SDR <br/>skill & effort</div>
            <div className="bg-white p-4 sm:p-5 text-zinc-600">High volume, <br/>low quality</div>
            <div className="bg-zinc-50 p-4 sm:p-5 text-zinc-900 font-medium">Every lead <br/>manually verified</div>

            {/* Risk/Contract */}
            <div className="bg-white p-4 sm:p-5 font-medium text-zinc-600">Risk/Contract</div>
            <div className="bg-white p-4 sm:p-5 text-zinc-600">12+ months <br/>commitment</div>
            <div className="bg-white p-4 sm:p-5 text-zinc-600">3-6 month <br/>contracts</div>
            <div className="bg-zinc-50 p-4 sm:p-5 text-zinc-900 font-medium">Month-to-month <br/>(cancel anytime)</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 max-w-5xl"
        >
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-6">
            The Bottom Line:
          </h3>
          <div className="space-y-2 text-lg text-zinc-600">
            <p><strong className="text-zinc-900 font-semibold">Hire an SDR:</strong> Viable only if you have $100k+ and 6 months to wait.</p>
            <p><strong className="text-zinc-900 font-semibold">Generic agency:</strong> You get 100 junk leads. They get paid either way.</p>
            <p><strong className="text-zinc-900 font-semibold">ARCH Revenues:</strong> Setup fee + performance retainer. Don&apos;t pay if we miss.</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
