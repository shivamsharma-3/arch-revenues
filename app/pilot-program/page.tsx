"use client";

import Link from "next/link";

export default function PilotProgramPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6"
          >
            Founding Client Program
          </h1>
          <p 
            className="text-xl text-zinc-600 leading-relaxed"
          >
            How we prove our system works before you pay a dime.
          </p>
        </section>

        <section className="py-16 px-6 bg-zinc-50 border-y border-zinc-200/50">
          <div className="max-w-3xl mx-auto bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="inline-flex items-center gap-3 bg-zinc-100/80 border border-zinc-200 px-4 py-2.5 rounded-xl mb-8">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-900 text-white shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-zinc-900 font-bold text-sm md:text-base tracking-tight">
                Guarantee: 10 Meetings in 60 Days or You Don&apos;t Pay.
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">We&apos;re Just Getting Started</h2>
            <div className="space-y-4 text-lg text-zinc-600 leading-relaxed">
              <p>
                We&apos;re a brand-new service. But we&apos;re serious about building predictable outbound pipelines for B2B agencies.
              </p>
              <p>
                To prove the system works, the first 7 agencies get the full program completely free in exchange for feedback and permission to create case studies. No credit card. No contracts. No fluff.
              </p>
              <p>
                We&apos;ll show you everything live: the lead lists we build using tools like Apollo and Crunchbase, the exact LinkedIn messages and emails we send, the replies we get, and any meetings that come from it.
              </p>
              <p>
                If it generates real qualified calls for your agency, great—we can talk about a monthly engagement after. If not, no hard feelings.
              </p>
              <p className="font-medium text-zinc-900 pt-4">
                Sound fair? Grab one of the 7 founding spots.
              </p>
            </div>
            <div className="mt-8">
              <Link 
                href="/strategy-call"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Book Strategy Call
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
