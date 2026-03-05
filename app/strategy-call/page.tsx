"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function StrategyCallPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6"
          >
            Book Your Strategy Call
          </h1>
          <p 
            className="text-xl text-zinc-600 leading-relaxed"
          >
            Stop hoping for referrals. Start engineering predictable revenue.
          </p>
        </section>

        <section className="py-24 px-6 bg-white border-y border-zinc-200/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
              
              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-12 sticky top-32">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-8">What Happens Next</h2>
                
                <ul className="space-y-8">
                  <li className="flex items-start gap-4">
                    <span className="text-2xl shrink-0">1️⃣</span>
                    <div>
                      <h3 className="font-semibold text-zinc-900 mb-1">Audit Your Current Motion</h3>
                      <p className="text-sm text-zinc-600">We&apos;ll review your current lead sources, offer positioning, and sales process.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-2xl shrink-0">2️⃣</span>
                    <div>
                      <h3 className="font-semibold text-zinc-900 mb-1">Map The Addressable Market</h3>
                      <p className="text-sm text-zinc-600">We&apos;ll identify exactly who you should be targeting and the intent signals we can use.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-2xl shrink-0">3️⃣</span>
                    <div>
                      <h3 className="font-semibold text-zinc-900 mb-1">Determine Fit</h3>
                      <p className="text-sm text-zinc-600">If we can help you scale, we&apos;ll outline what a 2-week pilot would look like.</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-12 pt-8 border-t border-zinc-200">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-6">What to Expect on the Call</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      <span className="text-sm">30-minute strategic conversation</span>
                    </li>
                    <li className="flex items-center gap-3 text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      <span className="text-sm">No sales pressure</span>
                    </li>
                    <li className="flex items-center gap-3 text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      <span className="text-sm">Pipeline analysis + outbound opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col items-center text-center">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Schedule Your 30-Minute Strategy Call</h2>
                <p className="text-zinc-600 mb-8">Choose a time that works for you.</p>
                
                <a 
                  href="https://calendly.com/archrevenues/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-sm inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] mb-4"
                >
                  Book Strategy Call
                </a>
                <p className="text-xs text-zinc-400">30-minute call • No obligation</p>

                <div className="mt-16 pt-8 border-t border-zinc-100 w-full">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-3">Not ready for a call yet?</h3>
                  <p className="text-sm text-zinc-600 mb-6">
                    Get a comprehensive teardown of your current outbound strategy and actionable steps to improve it.
                  </p>
                  <Link 
                    href="/audit" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors text-sm"
                  >
                    Get Free Revenue Audit
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
