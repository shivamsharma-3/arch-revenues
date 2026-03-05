"use client";

import { FinalCTA } from "@/components/FinalCTA";

export default function FounderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6"
          >
            The Philosophy
          </h1>
          <p 
            className="text-xl text-zinc-600 leading-relaxed"
          >
            Why we built ARCH Revenues.
          </p>
        </section>

        <section className="py-24 px-6 bg-white border-y border-zinc-200/50">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12 text-lg text-zinc-600 leading-relaxed">
              <p className="text-2xl font-medium text-zinc-900 leading-snug">
                Most lead generation agencies are run by operators who know how to send a million emails, but don&apos;t understand B2B sales. They focus on activity—emails sent, open rates, and generic replies.
              </p>
              
              <p>
                I built ARCH Revenues because I saw exceptional B2B agencies struggling to grow simply because they lacked a predictable acquisition system. They had the delivery dialed in, but their pipeline was a rollercoaster.
              </p>
              
              <p>
                Founders were spending hours every week manually prospecting on LinkedIn, or worse, relying entirely on unpredictable referrals. When they tried to scale, they either hired expensive SDRs who burned through their total addressable market with generic messaging, or they hired &quot;spray and pray&quot; lead gen agencies that damaged their brand reputation.
              </p>

              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-12 my-16">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-6">The Core Belief</h2>
                <p className="text-xl text-zinc-800 font-medium italic">
                  &quot;Outbound is not a numbers game. It is a positioning and relevance system.&quot;
                </p>
                <div className="mt-8 space-y-4 text-zinc-600">
                  <p>
                    You don&apos;t need to email 10,000 people a month to grow a B2B service business. You need to email the right 500 people, at the right time, with a message that perfectly intersects their current pain points.
                  </p>
                  <p>
                    We don&apos;t just generate leads; we engineer predictable revenue systems that scale. We act as a strategic growth partner, aligning your unique value proposition with highly targeted data infrastructure.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-semibold text-zinc-900 mb-6">The Mission</h2>
              <p>
                Our mission is simple: To help B2B agencies build predictable acquisition systems. We want to remove the anxiety of &quot;where is the next deal coming from&quot; so founders can focus on what they do best—delivering exceptional results for their clients.
              </p>
              
              <p>
                If you have a proven offer and a track record of success, but you&apos;re struggling to get enough at-bats with your ideal clients, we should talk.
              </p>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
    </div>
  );
}
