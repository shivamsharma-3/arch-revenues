'use client';

import { motion } from 'motion/react';
import { Users, Clock, TrendingDown, Mail, AlertCircle } from 'lucide-react';

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
    <section id="problem" className="py-24 px-6 bg-zinc-50 border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-6">
              Why Most B2B Agencies Struggle With Predictable Growth
            </h2>
            <p className="text-xl text-zinc-600 max-w-2xl">
              You don&apos;t need more leads. You need a predictable revenue system that removes the guesswork from your pipeline.
            </p>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-zinc-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-6">
                <problem.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-3">{problem.title}</h3>
              <p className="text-zinc-600 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-zinc-900 p-8 rounded-2xl shadow-sm flex flex-col justify-center border border-zinc-800 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <p className="text-2xl font-semibold text-white leading-tight mb-4">
                Stop hoping for growth. Start engineering it.
              </p>
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
