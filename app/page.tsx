"use client";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Positioning } from "@/components/Positioning";
import { Comparison } from "@/components/Comparison";
import { Pricing } from "@/components/Pricing";
import { CaseStudyPipeline } from "@/components/CaseStudyPipeline";
import { FinalCTA } from "@/components/FinalCTA";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <Positioning />
        <Comparison />
        <Pricing />
        <CaseStudyPipeline />
        <FAQ />
        <FinalCTA />
      </main>
    </div>
  );
}
