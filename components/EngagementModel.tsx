'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function EngagementModel() {
  return (
    <section id="pricing" className="py-32 px-6 bg-white border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-zinc-100 text-zinc-500 text-[10px] font-mono font-bold uppercase tracking-widest mb-8">
              The Engagement
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
              Structured for ROI,<br />
              <span className="text-zinc-400">Not Lock-In.</span>
            </h2>
            <p className="text-xl text-zinc-600 leading-relaxed mb-12 max-w-xl">
              We don&apos;t ask you to commit to 12 months on faith. Start with a 30-day pilot to validate targeting and generate your first qualified conversations.
            </p>
            <Link 
              href="/strategy-call" 
              className="group inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/10"
            >
              Book Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-zinc-50 border border-zinc-200 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
          >
            <div className="relative z-10 space-y-8">
              {[
                { title: "The 2-Week Pilot", desc: "Prove the system with a low-risk initial launch." },
                { title: "Monthly Engagement", desc: "Transition to a flat monthly retainer once targets are met." },
                { title: "Transparent Pricing", desc: "Flat monthly retainer. No hidden costs or percentages." },
                { title: "Month-to-Month", desc: "No long-term contracts. We earn your business every 30 days." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-zinc-400">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-zinc-200">
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest text-center">
                  Start with a 14-day free pilot. We only win when you win.
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-200/50 -mr-32 -mt-32 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
