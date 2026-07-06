"use client";

import Link from 'next/link';

export function FinalCTA() {
  return (
    <section id="strategy-call" className="py-12 md:py-24 px-6 bg-zinc-950 text-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
          Ready to stop relying on referrals?
        </h2>
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/strategy-call"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-zinc-900/20"
          >
            Book a 20-min fit call →
          </Link>
        </div>
      </div>
    </section>
  );
}
