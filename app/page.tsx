"use client";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Problem } from "@/components/Problem";
import { SystemDiagram } from "@/components/SystemDiagram";
import { Positioning } from "@/components/Positioning";
import { EngagementModel } from "@/components/EngagementModel";
import { Comparison } from "@/components/Comparison";
import { FinalCTA } from "@/components/FinalCTA";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <SocialProof />
        <Problem />
        <SystemDiagram />
        <Positioning />
        <Comparison />
        <EngagementModel />
        <FAQ />
        <FinalCTA />
      </main>
    </div>
  );
}
