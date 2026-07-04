'use client';

import Link from 'next/link';

export function CaseStudyPipeline() {
  return (
    <section id="case-studies" className="py-12 md:py-24 px-6 bg-[#F8F0EB] border-b border-zinc-200/50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-[32px] md:text-[48px] font-bold text-[#1A2330] tracking-tight mb-8">
          Case Study Pipeline
        </h2>
        
        <div className="bg-white border border-[#D4875A]/30 rounded-2xl p-8 shadow-sm text-left mb-10">
          <div className="inline-block bg-zinc-100 text-zinc-600 text-[12px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            UPDATED MONTHLY
          </div>
          
          <p className="text-[18px] text-[#1A2330] leading-relaxed font-medium">
            Founding client #1: Onboarding (SaaS, project management tool, US). First case study to be published by September 1, 2026. Founding client #2 and #3 spots open. Apply on the fit-call page.
          </p>
        </div>

        <Link
          href="/strategy-call"
          className="inline-flex w-full sm:w-auto items-center justify-center bg-[#D4875A] text-white px-8 py-4 rounded-xl text-[18px] font-bold hover:bg-[#c2794e] transition-all shadow-lg hover:shadow-[#D4875A]/20"
        >
          Apply for a founding spot →
        </Link>
      </div>
    </section>
  );
}
