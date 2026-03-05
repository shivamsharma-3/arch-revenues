"use client";

import { FinalCTA } from "@/components/FinalCTA";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const included = [
    "Positioning & ICP Optimization",
    "Multi-Channel Infrastructure Setup",
    "Domain Purchasing & Warmup",
    "Verified B2B Data Sourcing",
    "Copywriting & Sequence Design",
    "A/B Testing & Optimization",
    "Inbox Management & Reply Handling",
    "Direct Calendar Booking",
    "Bi-Weekly Strategy Calls",
    "Real-Time Performance Dashboard"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6"
          >
            Structured for ROI.
          </h1>
          <p 
            className="text-xl text-zinc-600 leading-relaxed"
          >
            We don&apos;t ask you to commit to 12 months on faith. Start with a pilot and see the system in action.
          </p>
        </section>

        <section className="py-24 px-6 bg-white border-y border-zinc-200/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-start">
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-semibold text-zinc-900 mb-6">The Engagement Model</h2>
                  <p className="text-lg text-zinc-600 leading-relaxed mb-8">
                    We operate as a specialized extension of your revenue team. Our pricing is structured to align our incentives with your growth, without the bloat of a traditional agency or the risk of a full-time hire.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono font-bold">01</div>
                      <h3 className="text-xl font-semibold text-zinc-900">The 2-Week Pilot</h3>
                    </div>
                    <p className="text-zinc-600 leading-relaxed">
                      We build the infrastructure, define the positioning, and launch the initial campaigns. The goal of the pilot is to validate targeting, messaging, and generate the first qualified conversations before moving into a full engagement.
                    </p>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono font-bold">02</div>
                      <h3 className="text-xl font-semibold text-zinc-900">Monthly Engagement</h3>
                    </div>
                    <p className="text-zinc-600 leading-relaxed">
                      If performance targets are met during the pilot, we transition into a flat monthly retainer. No hidden costs. No long-term contracts. We operate on a month-to-month basis, earning your business every 30 days.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 font-medium italic text-center md:text-left">
                  Typical engagements range between $500–$1k per month depending on campaign scope.
                </p>
              </div>

              <div className="bg-zinc-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl sticky top-32">
                <h3 className="text-2xl font-semibold mb-2">The Revenue Engine</h3>
                <p className="text-zinc-400 mb-8">Everything required to build a predictable outbound pipeline.</p>
                
                <div className="space-y-4 mb-12">
                  {included.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-zinc-400 shrink-0" />
                      <span className="text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-zinc-800">
                  <h4 className="font-semibold text-zinc-100 mb-4">Best Suited For:</h4>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0 mt-2" />
                      <span>Web Design Agencies</span>
                    </li>
                    <li className="flex items-start gap-3 text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0 mt-2" />
                      <span>Marketing Agencies</span>
                    </li>
                    <li className="flex items-start gap-3 text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0 mt-2" />
                      <span>Development Agencies</span>
                    </li>
                    <li className="flex items-start gap-3 text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0 mt-2" />
                      <span>Automation Agencies</span>
                    </li>
                    <li className="flex items-start gap-3 text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0 mt-2" />
                      <span>Consulting Agencies</span>
                    </li>
                  </ul>
                  
                  <Link 
                    href="/strategy-call" 
                    className="group flex items-center justify-center gap-2 w-full bg-white text-zinc-950 px-6 py-4 rounded-xl font-semibold hover:bg-zinc-200 transition-all"
                  >
                    Apply for a Pilot
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
    </div>
  );
}
