"use client";
import { motion } from "motion/react";

import Link from 'next/link';

export function CaseStudyPipeline() {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} id="case-studies" className="py-8 md:py-24 px-6 bg-zinc-50 border-b border-zinc-200/50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-8">
          Case Study Pipeline
        </h2>
        
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm text-left mb-10">
          <div className="inline-block bg-zinc-100 text-zinc-600 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            UPDATED MONTHLY
          </div>
          
          <p className="text-lg text-zinc-900 leading-relaxed font-medium">
            Founding client #1: Onboarding (SaaS, project management tool, US). First case study to be published by September 1, 2026. Founding client #2 and #3 spots open. Apply on the fit-call page.
          </p>
        </div>

        <Link
          href="/strategy-call"
          className="inline-flex w-full sm:w-auto items-center justify-center bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-zinc-900/20"
        >
          Book a 20-min fit call →
        </Link>
      </div>
    </motion.section>
  );
}
