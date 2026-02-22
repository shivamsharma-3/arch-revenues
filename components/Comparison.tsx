'use client';

import { motion } from 'motion/react';

export function Comparison() {
  return (
    <section className="py-24 px-6 bg-zinc-50 border-y border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
            The Cost of Acquisition
          </h2>
        </motion.div>

        <div className="overflow-x-auto pb-8">
          <div className="min-w-[800px] grid grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
            {/* Header Row */}
            <div className="bg-zinc-100 p-6 font-semibold text-zinc-900"></div>
            <div className="bg-zinc-100 p-6 font-semibold text-zinc-900">Hire an SDR</div>
            <div className="bg-zinc-100 p-6 font-semibold text-zinc-900">Do It Yourself</div>
            <div className="bg-zinc-900 p-6 font-semibold text-white">ARCH Revenues</div>

            {/* Cost Row */}
            <div className="bg-white p-6 font-medium text-zinc-600">Cost</div>
            <div className="bg-white p-6 text-zinc-600">$4,000-$6,000/mo + commissions</div>
            <div className="bg-white p-6 text-zinc-600">$200-$500/mo (tools only)</div>
            <div className="bg-zinc-50 p-6 text-zinc-900 font-medium">$400-$750/mo</div>

            {/* Ramp Time Row */}
            <div className="bg-white p-6 font-medium text-zinc-600">Ramp Time</div>
            <div className="bg-white p-6 text-zinc-600">3-6 months</div>
            <div className="bg-white p-6 text-zinc-600">You have to learn it</div>
            <div className="bg-zinc-50 p-6 text-zinc-900 font-medium">30 days</div>

            {/* Management Row */}
            <div className="bg-white p-6 font-medium text-zinc-600">Management</div>
            <div className="bg-white p-6 text-zinc-600">High (training, managing, turnover)</div>
            <div className="bg-white p-6 text-zinc-600">High (you do everything)</div>
            <div className="bg-zinc-50 p-6 text-zinc-900 font-medium">Zero (we operate it)</div>

            {/* Focus Row */}
            <div className="bg-white p-6 font-medium text-zinc-600">Focus</div>
            <div className="bg-white p-6 text-zinc-600">Often generalist</div>
            <div className="bg-white p-6 text-zinc-600">Split between delivery and sales</div>
            <div className="bg-zinc-50 p-6 text-zinc-900 font-medium">100% outbound acquisition</div>

            {/* System Ownership Row */}
            <div className="bg-white p-6 font-medium text-zinc-600">System Ownership</div>
            <div className="bg-white p-6 text-zinc-600">They take it when they leave</div>
            <div className="bg-white p-6 text-zinc-600">You own it, but must run it</div>
            <div className="bg-zinc-50 p-6 text-zinc-900 font-medium">You own the results, we run the system</div>
          </div>
        </div>
      </div>
    </section>
  );
}
