"use client";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Proof } from "@/components/Proof";
import { Problem } from "@/components/Problem";
import { Teardown } from "@/components/Teardown";
import { HowItWorks } from "@/components/HowItWorks";
import { Positioning } from "@/components/Positioning";
import { Comparison } from "@/components/Comparison";
import { Calculator } from "@/components/Calculator";
import { PricingSummaryStrip } from "@/components/PricingSummaryStrip";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <SocialProof />
        <Proof />
        <Problem />
        <Teardown />
        <HowItWorks />
        <Positioning />
        <Comparison />
        <Calculator />
        <PricingSummaryStrip />
        <FAQ />
        <FinalCTA />
      </main>
    </div>
  );
}
