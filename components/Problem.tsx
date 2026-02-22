'use client';

import { motion } from 'motion/react';

export function Problem() {
  const problems = [
    "You are exceptional at delivery, but inconsistent at acquisition.",
    "Your pipeline depends entirely on word-of-mouth and referrals. When they slow down, your revenue stalls.",
    "You know you need a predictable outbound system, but you don't have the time to build one or the budget to waste on a $6,000/month SDR.",
    "You've tried cold email before, but it was a side project, not a system."
  ];

  return (
    <section className="py-24 px-6 bg-zinc-100 border-y border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
              The Referral Trap
            </h2>
          </motion.div>
          
          <div className="space-y-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98], delay: index * 0.1 }}
                className="flex gap-6"
              >
                <span className="font-mono text-zinc-400 font-medium">0{index + 1}</span>
                <p className="text-xl text-zinc-700 leading-relaxed">
                  {problem}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
