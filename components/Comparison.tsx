"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";

export function Comparison() {
  return (
    <section className="py-16 md:py-24 px-6 bg-zinc-50 border-y border-zinc-200/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-4"
          >
            The Alternative
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto"
          >
            If you have the capital and time to build an in-house team, you should do that. If you need qualified meetings next month, that&apos;s where I come in.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* In-House SDR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-zinc-200 p-8 md:p-10 rounded-3xl opacity-80"
          >
            <h3 className="text-2xl font-semibold text-zinc-900 mb-6">In-House SDR</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <X className="w-6 h-6 text-red-500 shrink-0" />
                <span className="text-zinc-600"><strong className="text-zinc-900">$100K+/year</strong> base salary + commissions</span>
              </li>
              <li className="flex gap-3">
                <X className="w-6 h-6 text-red-500 shrink-0" />
                <span className="text-zinc-600"><strong className="text-zinc-900">6 months</strong> of ramp up and training time</span>
              </li>
              <li className="flex gap-3">
                <X className="w-6 h-6 text-red-500 shrink-0" />
                <span className="text-zinc-600">You still have to manage them and buy the software</span>
              </li>
              <li className="flex gap-3">
                <X className="w-6 h-6 text-red-500 shrink-0" />
                <span className="text-zinc-600">High churn risk — if they leave, you start over</span>
              </li>
            </ul>
          </motion.div>

          {/* ARCH Revenues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-zinc-900 text-white border border-zinc-800 p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden"
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 blur-3xl rounded-full pointer-events-none" />
            
            <h3 className="text-2xl font-semibold mb-6">ARCH Revenues</h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-teal-400 shrink-0" />
                <span className="text-zinc-300"><strong className="text-white">$1,499/mo</strong> flat retainer (less than 20% the cost)</span>
              </li>
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-teal-400 shrink-0" />
                <span className="text-zinc-300"><strong className="text-white">Live in 3 weeks</strong> — campaigns launching fast</span>
              </li>
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-teal-400 shrink-0" />
                <span className="text-zinc-300">I build the infrastructure and write the sequences</span>
              </li>
              <li className="flex gap-3">
                <Check className="w-6 h-6 text-teal-400 shrink-0" />
                <span className="text-zinc-300">You just show up to the qualified meetings</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Pricing link — close the loop while cost comparison is fresh */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-zinc-700 font-semibold hover:text-zinc-900 transition-colors border-b border-zinc-300 hover:border-zinc-900 pb-0.5"
          >
            See Performance Pilot pricing →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
