"use client";

import Link from 'next/link';

export function FinalCTA() {
  return (
    <section id="strategy-call" className="py-12 md:py-24 px-6 bg-zinc-950 text-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
          Ready to stop relying on referrals?
        </h2>
        <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Book a strategy call to audit your current motion, map your addressable market, and see if our performance-based outbound engine is a fit for your SaaS.
        </p>
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/strategy-call"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0 px-8 py-4 rounded-xl text-lg font-bold hover:from-teal-400 hover:to-teal-500 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all shadow-lg"
          >
            Book a 20-min strategy call →
          </Link>
        </div>
      </div>
    </section>
  );
}
