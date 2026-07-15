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
              Founders stop prospecting after landing a big deal and panic when the pipeline dries up. You tried cold email but got poor reply rates and gave up.
            </p>
            <p>
              Hiring an SDR costs $100K/year and takes months to train. Relying only on referrals is a coin flip.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
