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
            className="w-full sm:w-auto inline-flex items-center justify-center bg-zinc-900 border border-zinc-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 hover:border-zinc-400 transition-all shadow-lg"
          >
            Book a 20-min strategy call →
          </Link>
        </div>
      </div>
    </section>
  );
}
