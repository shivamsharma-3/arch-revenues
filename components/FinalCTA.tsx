'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section id="strategy-call" className="py-16 px-6 bg-zinc-950 text-zinc-50 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-mono font-bold uppercase tracking-widest mb-6 border border-white/10">
            Ready to Scale?
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6 leading-[1.1]">
            Stop hoping for referrals.<br />
            <span className="text-zinc-500">Start engineering revenue.</span>
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed mb-8 max-w-lg mx-auto">
            You already know how to deliver exceptional work. It&apos;s time to build the predictable acquisition system that scales your agency.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link 
              href="/strategy-call" 
              className="group flex items-center gap-3 bg-white text-zinc-900 px-6 py-3 rounded-xl font-bold hover:bg-zinc-100 transition-all text-base shadow-xl shadow-white/5"
            >
              Book Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
              Founding Client Program: Free for the first 7 clients.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
