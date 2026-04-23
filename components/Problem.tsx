'use client';

import { motion } from 'motion/react';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export function Problem() {
  const problems = [
    {
      title: "Referral Roulette",
      description: "You get 2-3 referrals one month, zero the next. You can't scale a business on hope.",
      icon: XCircle
    },
    {
      title: "Outreach Burnout",
      description: "You've tried cold email. Spent 10 hours building lists. Got 2% reply rates. Gave up after 3 weeks.",
      icon: XCircle
    },
    {
      title: "Can't Afford an SDR",
      description: "$60-100k/year for a full-time hire? Plus 3-4 months to train? You don't have that kind of runway.",
      icon: XCircle
    },
    {
      title: "\"Spray and Pray\" Returns",
      description: "Generic LinkedIn messages and mass emails destroy your reputation and get zero responses.",
      icon: XCircle
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
              The <span className="text-zinc-400 italic font-serif">Feast-or-Famine</span> Cycle Ends Here.
            </h2>
            <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
              Most agency founders are stuck in a cycle: they focus on delivery until the pipeline dries up, then scramble for leads, only to stop prospecting once they land a client. We build the system that keeps your calendar full while you focus on what you do best.
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
                <div className="w-10 h-10 rounded-xl bg-white border border-red-100 text-red-500 flex items-center justify-center mb-4 shadow-sm">
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
