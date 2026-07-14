"use client";

import { motion } from "motion/react";

export function Problem() {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-8">
            The Problem
          </h2>
          <div className="text-lg md:text-xl text-zinc-600 leading-relaxed text-left md:text-center space-y-6">
            <p>
              Most SaaS founders stop prospecting the moment they land a big customer — then panic when the pipeline dries up. You've tried cold email, spent 10 hours building lists, got 2% reply rates, and gave up after 3 weeks.
            </p>
            <p>
              Hiring an SDR costs $100K/year plus 6 months to train. So you keep relying on referrals, and referrals are a coin flip.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
