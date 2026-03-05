'use client';

import { motion } from 'motion/react';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Results() {
  const results = [
    {
      clientType: "Web Design Agency",
      before: "Relying mostly on referrals for new clients.",
      after: "Consistent flow of meetings with companies needing website redesign.",
      strategy: "Targeted companies whose websites showed clear design and performance improvement opportunities.",
      meetings: "8",
      timeframe: "60 Days"
    },
    {
      clientType: "Marketing Agency",
      before: "Founder manually prospecting and inconsistent inbound leads.",
      after: "Predictable meetings with marketing leaders at growth-stage companies.",
      strategy: "Targeted companies actively expanding their marketing teams using intent-based signals.",
      meetings: "18",
      timeframe: "90 Days"
    },
    {
      clientType: "Development Agency",
      before: "New projects came mainly from word-of-mouth.",
      after: "Regular meetings with companies looking for development partners.",
      strategy: "Targeted startups and companies building new digital products.",
      meetings: "9",
      timeframe: "60 Days"
    }
  ];

  return (
    <section id="results" className="py-24 px-6 bg-zinc-50 border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">
              Predictable Results
            </h2>
            <p className="text-zinc-600 max-w-2xl text-lg">
              We don&apos;t just generate leads. We generate qualified pipeline.
            </p>
          </div>
          <Link 
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-zinc-900 font-medium hover:text-zinc-600 transition-colors"
          >
            View All Case Studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98], delay: index * 0.1 }}
              className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm flex flex-col"
            >
              <h3 className="text-xl font-semibold text-zinc-900 mb-6">{result.clientType}</h3>
              
              <div className="space-y-4 mb-8 flex-grow">
                <div>
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">Before</div>
                  <p className="text-zinc-600 text-sm">{result.before}</p>
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">After</div>
                  <p className="text-zinc-600 text-sm">{result.after}</p>
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">Strategy</div>
                  <p className="text-zinc-900 text-sm font-medium">{result.strategy}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-100">
                <div>
                  <div className="text-3xl font-bold text-zinc-900">{result.meetings}</div>
                  <div className="text-xs text-zinc-500 mt-1">Qualified Meetings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-zinc-900">{result.timeframe}</div>
                  <div className="text-xs text-zinc-500 mt-1">Timeframe</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
