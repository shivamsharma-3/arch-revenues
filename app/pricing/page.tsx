"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const included = [
    "Positioning & ICP",
    "Infrastructure Setup",
    "Domain Warmup",
    "B2B Data Sourcing",
    "Copy & Sequences",
    "A/B Testing",
    "Inbox Management",
    "Calendar Booking",
    "Strategy Calls",
    "Performance Dashboard"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6">
            Structured for ROI.
          </h1>
          <p className="text-xl text-zinc-600">
            Start with our Founding Client Program. No 12-month commitments.
          </p>
        </section>

        <section className="py-24 px-6 bg-white border-y border-zinc-200/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-start">
              <div className="space-y-10">
                <div>
                  <h2 className="text-3xl font-semibold text-zinc-900 mb-4">The Model</h2>
                  <p className="text-zinc-600">
                    We act as your dedicated growth team. Pricing aligns with your success.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">01. Founding Client Program</h3>
                    <p className="text-sm text-zinc-600">
                      Free for 7 agencies. We build and launch your campaigns for feedback and case studies.
                    </p>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">02. Monthly Engagement</h3>
                    <p className="text-sm text-zinc-600">
                      Flat monthly retainer. No hidden costs. Month-to-month.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 italic">
                  Typically $1000–$2000/mo based on scope.
                </p>
              </div>

              <div className="bg-zinc-900 text-white rounded-3xl p-8 shadow-xl sticky top-32">
                <h3 className="text-xl font-semibold mb-6">The Revenue Engine</h3>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-10">
                  {included.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-zinc-800">
                  <p className="text-sm text-zinc-400 mb-6">
                    Best for: Web Design, Marketing, Dev, Automation, & Consulting Agencies.
                  </p>
                  
                  <Link 
                    href="/strategy-call" 
                    className="group flex items-center justify-center gap-2 w-full bg-white text-zinc-950 px-6 py-4 rounded-xl font-semibold hover:bg-zinc-200 transition-all"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
