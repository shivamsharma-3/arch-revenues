'use client';

import { motion } from 'motion/react';

export function Results() {
  const results = [
    {
      label: "Pipeline Stability",
      headline: "20 Qualified Meetings/Month",
      body: "Systems like this typically stabilize pipeline within 60 days for design agencies selling $10k+ projects — moving from referral dependency to consistent inbound call flow."
    },
    {
      label: "Sales Velocity",
      headline: "Shortened Sales Cycle by 34%",
      body: "A well-structured targeting and messaging system reduces time-to-close by eliminating unqualified prospects before the first call. Pipeline quality improves alongside volume."
    },
    {
      label: "Acquisition Efficiency",
      headline: "14 Qualified Calls in 60 Days",
      body: "Without paid ads. Without hiring an SDR. Outbound infrastructure, when operated correctly, generates compounding results as messaging and targeting sharpen over time."
    }
  ];

  return (
    <section id="results" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="mb-16"
        >
          <span className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-4 block">
            What Structured Outbound Produces
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">
            Results From Revenue Infrastructure
          </h2>
          <p className="text-zinc-600 max-w-2xl">
            Real outcomes from structured outbound systems — not random tactics, not paid ads, not luck.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98], delay: index * 0.1 }}
              className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm"
            >
              <div className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-widest mb-4">
                {result.label}
              </div>
              <h3 className="text-2xl font-semibold text-zinc-900 mb-4">
                {result.headline}
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                {result.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center font-mono text-xs text-zinc-400 italic"
        >
          Outcomes reflect what structured outbound systems typically produce. Results vary based on offer, market, and execution quality.
        </motion.p>
      </div>
    </section>
  );
}
