'use client';

import { motion } from 'motion/react';
import { Users, Clock, TrendingDown, Mail, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function Problem() {
  const problems = [
    {
      title: "Inconsistent Referrals",
      description: "Relying on word-of-mouth means you can't forecast revenue or scale with any certainty. When the network dries up, growth stops.",
      icon: Users
    },
    {
      title: "Founder-Led Prospecting",
      description: "You're the best closer in the building, but you're wasting 15+ hours a week on manual outreach instead of closing deals.",
      icon: Clock
    },
    {
      title: "Expensive SDR Hiring",
      description: "Hiring internally costs $60k+, takes 4 months to ramp, and often yields zero ROI before they churn.",
      icon: TrendingDown
    },
    {
      title: "Poor Outreach Results",
      description: "Generic 'spray and pray' campaigns damage your brand and get ignored by the high-value decision-makers you actually want.",
      icon: Mail
    },
    {
      title: "No Repeatable System",
      description: "You lack a structured, automated engine that generates qualified meetings on demand. Your pipeline is a black box.",
      icon: AlertCircle
    }
  ];

  return (
    <section id="problem" className="py-32 px-6 bg-white border-b border-zinc-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-10"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
              Why Most B2B Agencies <span className="text-zinc-400">Struggle to Scale</span>
            </h2>
            <p className="text-xl text-zinc-600 leading-relaxed mb-10">
              You don&apos;t need more leads. You need a predictable revenue system that removes the guesswork from your pipeline.
            </p>
            <div className="flex flex-col gap-6 p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <p className="text-sm text-zinc-600 font-medium">
                  Most agencies are one referral drought away from a crisis.
                </p>
              </div>
              <div className="pt-4 border-t border-zinc-200">
                <p className="text-lg font-semibold text-zinc-900 leading-tight mb-2">
                  Ready to build your engine?
                </p>
                <p className="text-zinc-500 text-xs mb-4">
                  Join 12+ agencies using ARCH to scale their outbound.
                </p>
                <Link 
                  href="/strategy-call"
                  className="inline-flex bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all text-sm"
                >
                  Apply for a Pilot
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-50 border border-zinc-200 p-6 rounded-3xl"
              >
                <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center mb-4">
                  <problem.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-2">{problem.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
