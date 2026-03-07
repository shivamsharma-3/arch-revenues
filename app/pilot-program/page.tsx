"use client";

import { FinalCTA } from "@/components/FinalCTA";
import Link from "next/link";

export default function PilotProgramPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6"
          >
            Pilot Program
          </h1>
          <p 
            className="text-xl text-zinc-600 leading-relaxed"
          >
            How we prove our system works before you pay a dime.
          </p>
        </section>

        <section className="py-16 px-6 bg-zinc-50 border-y border-zinc-200/50">
          <div className="max-w-3xl mx-auto bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-6">We&apos;re Just Getting Started</h2>
            <div className="space-y-4 text-lg text-zinc-600 leading-relaxed">
              <p>
                We&apos;re a brand-new service—no paying clients yet. But we&apos;re serious about building predictable outbound pipelines for B2B agencies.
              </p>
              <p>
                To prove the system works, the first five agencies get the full 14-day pilot completely free. No credit card. No contracts. No fluff.
              </p>
              <p>
                We&apos;ll show you everything live: the lead lists we build using tools like Apollo and Crunchbase, the exact LinkedIn messages and emails we send, the replies we get, and any meetings that come from it.
              </p>
              <p>
                If it generates real qualified calls for your agency, great—we can talk about a monthly engagement after. If not, no hard feelings.
              </p>
              <p className="font-medium text-zinc-900 pt-4">
                Sound fair? Grab one of the five pilot spots.
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

        <FinalCTA />
      </main>
    </div>
  );
}
