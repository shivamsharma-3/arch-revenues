'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export function Pricing() {
  const features = [
    "8-12 qualified demos booked per month (or you don't pay)",
    "Cold email + LinkedIn multi-channel sequence",
    "3 warmed sending domains + full infra setup",
    "Weekly Monday report — opens, replies, meetings",
    "Cancel anytime after first 30 days — no annual contract"
  ];

  return (
    <section id="pricing" className="py-12 md:py-20 px-6 bg-white border-b border-zinc-200/50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border-2 border-[#D4875A] rounded-2xl p-8 md:p-12 shadow-xl shadow-[#D4875A]/5">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#F8F0EB] text-[#D4875A] text-[12px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
              FOUNDING CLIENT RATE — 3 SPOTS ONLY
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-[56px] font-bold text-[#1A2330] leading-none">$1,000</span>
              <span className="text-[20px] text-zinc-500 font-medium">/ month</span>
            </div>
            <p className="text-[16px] text-[#506070]">
              Locked for 90 days. Increases to $1,750/mo for client #4.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {features.map((feature, i) => (
              <div key={i} className="flex gap-3 items-start">
                <Check className="w-5 h-5 text-[#D4875A] shrink-0 mt-0.5" />
                <span className="text-[#1A2330] font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/strategy-call"
              className="group inline-flex items-center justify-center gap-2 w-full bg-[#D4875A] text-white px-8 py-5 rounded-xl text-[18px] font-semibold hover:bg-[#c2794e] transition-all shadow-lg hover:shadow-[#D4875A]/20 mb-4"
            >
              Book a 20-min fit call →
            </Link>
            <p className="text-[12px] text-zinc-500 max-w-lg mx-auto leading-relaxed">
              In exchange for the founding rate, you agree to be featured as a public case study once we hit your first 8 booked meetings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
