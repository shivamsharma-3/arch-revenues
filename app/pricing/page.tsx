"use client";

import { Pricing } from "@/components/Pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-5xl mx-auto text-center">
          <h1 className="text-[32px] md:text-[48px] font-bold text-[#1A2330] tracking-tight mb-6">
            Pricing
          </h1>
          <p className="text-[18px] text-[#506070]">
            One simple, transparent price.
          </p>
        </section>
        <Pricing />
      </main>
    </div>
  );
}
