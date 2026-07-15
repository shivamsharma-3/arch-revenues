"use client";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Problem } from "@/components/Problem";
import { Teardown } from "@/components/Teardown";
import { HowItWorks } from "@/components/HowItWorks";
import { Positioning } from "@/components/Positioning";
import { Comparison } from "@/components/Comparison";
import { Calculator } from "@/components/Calculator";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <SocialProof />
        <Problem />
        <Teardown />
        <HowItWorks />
        <Positioning />
        <Comparison />
        <Calculator />
        <FinalCTA />
      </main>
    </div>
  );
}
