'use client';

import { motion } from 'motion/react';
import { Users, Clock, TrendingDown, Mail } from 'lucide-react';
import Link from 'next/link';

export function Problem() {
  const problems = [
    {
      title: "Inconsistent Referrals",
      description: "Word-of-mouth doesn't scale.",
      icon: Users
    },
    {
      title: "Founder-Led Sales",
      description: "Wasting hours on manual outreach.",
      icon: Clock
    },
    {
      title: "Expensive SDRs",
      description: "Internal hires cost $60k+ and take months to ramp.",
      icon: TrendingDown
    },
    {
      title: "Poor Outreach",
      description: "Generic campaigns damage your brand.",
      icon: Mail
    }
  ];

  return (
    <section id="problem" className="py-24 px-6 bg-white border-b border-zinc-200/50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24"
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
              Why Agencies <span className="text-zinc-400">Struggle</span>
            </h2>
            <p className="text-lg text-zinc-600 mb-8">
              You don&apos;t need more leads. You need a predictable revenue system.
            </p>
            <Link 
              href="/strategy-call"
              className="inline-flex bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all text-sm"
            >
              Apply Now
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center mb-4">
                  <problem.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-1">{problem.title}</h3>
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
