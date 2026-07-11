"use client";

import Link from "next/link";

export default function PilotProgramPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-5xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6"
          >
            Performance Pilot
          </h1>
          <p 
            className="text-xl text-zinc-600 leading-relaxed"
          >
            A setup fee covers our infrastructure, and you only pay the full retainer when we deliver.
          </p>
        </section>

        <section className="py-16 px-6 bg-zinc-50 border-y border-zinc-200/50">
          <div className="max-w-4xl mx-auto bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="inline-flex items-center gap-3 bg-zinc-100/80 border border-zinc-200 px-4 py-2.5 rounded-xl mb-8">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-900 text-white shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-zinc-900 font-bold text-sm md:text-base tracking-tight">
                We aim to build and run a consistent AI + human outbound system.
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Why a Performance Pilot?</h2>
            <div className="space-y-4 text-lg text-zinc-600 leading-relaxed">
              <ul className="list-disc list-inside space-y-4 marker:text-zinc-400">
                <li><strong className="text-zinc-900 font-semibold">$1,500/mo flat retainer</strong> — our Founding Client Rate. Small one-time setup fee covers domains + infrastructure.</li>
                <li><strong className="text-zinc-900 font-semibold">Pay only when we deliver</strong> — the retainer is earned only when qualified meetings land on your calendar.</li>
                <li><strong className="text-zinc-900 font-semibold">Full transparency</strong> — see every lead list, every message, every reply, every meeting. Nothing hidden.</li>
              </ul>
              <p className="font-medium text-zinc-900 pt-4">
                If it works, we transition to a standard monthly engagement. Sound fair? Apply for the pilot today.
              </p>
            </div>
            <div className="mt-8">
              <Link 
                href="/strategy-call"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Book a 20-min strategy call →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
