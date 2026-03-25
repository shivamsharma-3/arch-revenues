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
              The Engagement Model
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
              Predictable <span className="text-zinc-400 italic font-serif">Retainer</span> Model.<br />
              <span className="text-zinc-400">No Long-Term Contracts.</span>
            </h2>
            <p className="text-xl text-zinc-600 leading-relaxed mb-8 max-w-xl">
              We are currently looking for our first 7 partners to join our Founding Client Program for free. After those spots are filled, we&apos;ll be moving to a standard monthly retainer model.
            </p>

            <div className="inline-flex items-center gap-3 bg-zinc-100/80 border border-zinc-200 px-4 py-2.5 rounded-xl mb-12">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-900 text-white shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-zinc-900 font-bold text-sm md:text-base tracking-tight">
                No revenue share. No setup fees. Just results.
              </span>
            </div>

            <div>
              <Link 
                href="/strategy-call" 
                className="group inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/10"
              >
                Book a Strategy Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
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
                { title: "Founding Client Program", desc: "Free for the first 7 agencies in exchange for feedback and case studies." },
                { title: "Monthly Retainer", desc: "Transition to a flat monthly rate once we hit your targets." },
                { title: "Transparent Pricing", desc: "A flat monthly rate with no hidden costs or percentages." },
                { title: "Month-to-Month", desc: "No long-term lock-in. We earn your business every 30 days." }
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
                  Founding Client Program: Free for the first 7 clients.
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
