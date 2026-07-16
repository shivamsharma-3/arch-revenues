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
            <div className="inline-block px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-mono font-bold tracking-wider uppercase mb-6 border border-zinc-200">
              Agency Results
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-4">
              Real pipeline built for agencies.
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
              Our founding cohort is currently live. Case studies will be published here once we cross 8 booked meetings for Client #1.
            </p>
          </motion.div>
        </div>

        {/* Empty state / placeholder for future case study */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-zinc-50 border border-zinc-200 rounded-3xl p-12 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
            <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Live Campaign</span>
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 mb-2">Cohort 1 is in progress</h3>
          <p className="text-zinc-500 max-w-md mx-auto">
            We are actively running outbound systems for our founding clients. Data and results will be transparently shared here soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
