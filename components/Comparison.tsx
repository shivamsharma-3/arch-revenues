'use client';

import { motion } from 'motion/react';

export function Comparison() {
  return (
    <section id="comparison" className="py-24 px-6 bg-white border-b border-zinc-200/50">
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
            <div className="bg-zinc-100 p-6 font-semibold text-zinc-900">Large Lead-Gen Agency</div>
            <div className="bg-zinc-900 p-6 font-semibold text-white">ARCH Revenues</div>

            {/* Cost Row */}
            <div className="bg-white p-6 font-medium text-zinc-600">Cost</div>
            <div className="bg-white p-6 text-zinc-600">$5,000-$8,000/mo + commissions</div>
            <div className="bg-white p-6 text-zinc-600">$4,000-$6,000/mo + setup fees</div>
            <div className="bg-zinc-50 p-6 text-zinc-900 font-medium">Lean, performance-aligned pricing</div>

            {/* Ramp Time Row */}
            <div className="bg-white p-6 font-medium text-zinc-600">Time to Value</div>
            <div className="bg-white p-6 text-zinc-600">3-6 months</div>
            <div className="bg-white p-6 text-zinc-600">60+ days</div>
            <div className="bg-zinc-50 p-6 text-zinc-900 font-medium">14 days to launch</div>

            {/* Approach Row */}
            <div className="bg-white p-6 font-medium text-zinc-600">Approach</div>
            <div className="bg-white p-6 text-zinc-600">Manual, unscalable effort</div>
            <div className="bg-white p-6 text-zinc-600">Volume-based generic templates</div>
            <div className="bg-zinc-50 p-6 text-zinc-900 font-medium">Targeted, multi-channel system</div>

            {/* Focus Row */}
            <div className="bg-white p-6 font-medium text-zinc-600">Specialization</div>
            <div className="bg-white p-6 text-zinc-600">Generalist (often entry-level)</div>
            <div className="bg-white p-6 text-zinc-600">Works with any industry</div>
            <div className="bg-zinc-50 p-6 text-zinc-900 font-medium">B2B Agencies & Service Companies</div>

            {/* System Ownership Row */}
            <div className="bg-white p-6 font-medium text-zinc-600">Focus</div>
            <div className="bg-white p-6 text-zinc-600">Activity (calls made, emails sent)</div>
            <div className="bg-white p-6 text-zinc-600">Leads (often unqualified)</div>
            <div className="bg-zinc-50 p-6 text-zinc-900 font-medium">Revenue (qualified pipeline)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
