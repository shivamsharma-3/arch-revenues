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
              Most SaaS founders fall into a dangerous cycle. You stop prospecting the moment you land a big customer. Then, when that project wraps up, you panic because your pipeline has completely dried up. You might have tried cold email in the past, spent 10 exhausting hours building lead lists, got terrible 2% reply rates, and ultimately gave up after just a few weeks. 
            </p>
            <p>
              The traditional solutions aren't much better. Hiring a full-time SDR costs $100K/year, takes 6 months to train, and carries massive churn risk. Relying purely on word-of-mouth and referrals is completely unpredictable. It's a coin flip for your revenue. You need a reliable, predictable acquisition channel that works while you sleep.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
