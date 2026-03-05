'use client';

import { motion } from 'motion/react';

import Link from 'next/link';
import { ArrowRight, Monitor, Megaphone, Code } from 'lucide-react';

export function Results() {
  const results = [
    {
      clientType: "Web Design Agency",
      icon: Monitor,
      before: "Relying mostly on referrals for new clients.",
      after: "Consistent flow of meetings with companies needing website redesign.",
      strategy: "Targeted companies whose websites showed clear design and performance improvement opportunities.",
      meetings: "8",
      timeframe: "60 Days"
    },
    {
      clientType: "Marketing Agency",
      icon: Megaphone,
      before: "Founder manually prospecting and inconsistent inbound leads.",
      after: "Predictable meetings with marketing leaders at growth-stage companies.",
      strategy: "Targeted companies actively expanding their marketing teams using intent-based signals.",
      meetings: "18",
      timeframe: "90 Days"
    },
    {
      clientType: "Development Agency",
      icon: Code,
      before: "New projects came mainly from word-of-mouth.",
      after: "Regular meetings with companies looking for development partners.",
      strategy: "Targeted startups and companies building new digital products.",
      meetings: "9",
      timeframe: "60 Days"
    }
  ];

  return (
    <section id="results" className="py-32 px-6 bg-white border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
              Predictable <span className="text-zinc-400">Pipeline</span>
            </h2>
            <p className="text-xl text-zinc-600 leading-relaxed">
              We don&apos;t just generate leads. We engineer qualified pipeline for specialized B2B agencies.
            </p>
          </motion.div>
          <Link 
            href="/case-studies"
            className="group inline-flex items-center gap-3 text-zinc-900 font-bold hover:text-zinc-600 transition-all bg-zinc-50 px-6 py-3 rounded-xl border border-zinc-200 hover:border-zinc-300"
          >
            Full Case Studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 shrink-0">
                    <result.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">{result.clientType}</h3>
                </div>
                <div className="px-2 py-1 rounded bg-zinc-100 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                  Verified
                </div>
              </div>
              
              <div className="space-y-4 mb-6 flex-grow">
                <div className="relative pl-5 border-l border-zinc-100">
                  <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">Before</div>
                  <p className="text-zinc-500 text-xs leading-relaxed">{result.before}</p>
                </div>
                <div className="relative pl-5 border-l-2 border-zinc-900">
                  <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-zinc-900" />
                  <div className="text-[10px] font-mono text-zinc-900 uppercase tracking-wider mb-1 font-bold">After</div>
                  <p className="text-zinc-900 text-xs font-medium leading-relaxed">{result.after}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-zinc-100">
                <div className="bg-zinc-50 p-3 rounded-2xl">
                  <div className="text-xl font-bold text-zinc-900">{result.meetings}</div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Meetings</div>
                </div>
                <div className="bg-zinc-50 p-3 rounded-2xl">
                  <div className="text-xl font-bold text-zinc-900">{result.timeframe.split(' ')[0]}<span className="text-xs font-medium text-zinc-500 ml-1">{result.timeframe.split(' ')[1]}</span></div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Timeframe</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
