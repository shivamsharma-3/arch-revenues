"use client";

import { FinalCTA } from "@/components/FinalCTA";
import { Check } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Strategy and ICP Research",
      description: "We identify your ideal customers and find the exact reasons they buy. This ensures our outreach is highly relevant and lands with the right decision-makers.",
    },
    {
      title: "Data Infrastructure Setup",
      description: "We build a dedicated outbound system with multiple domains and warmed-up inboxes. This protects your primary email and ensures your messages actually hit the inbox.",
    },
    {
      title: "Targeted Campaign Launch",
      description: "We launch personalized campaigns across Email and LinkedIn. We use real company data and recent events to make every message feel personal, not automated.",
    },
    {
      title: "Reply Management and Booking",
      description: "We handle all the back-and-forth. When a prospect shows interest, we manage the conversation and book them directly onto your calendar as a qualified meeting.",
    },
    {
      title: "Optimization and Scaling",
      description: "We constantly test different angles and targeting. Once we find what works best, we increase the volume to keep your sales pipeline full.",
    }
  ];

  const timeline = [
    {
      time: "Week 1–2",
      title: "Onboarding & Infrastructure",
      items: ["ICP Deep Dive", "Domain Setup & Warmup", "Data Sourcing", "Initial Copywriting"]
    },
    {
      time: "Week 3–4",
      title: "Launch & Testing",
      items: ["Campaign Activation", "A/B Testing Angles", "Initial Reply Handling", "Deliverability Monitoring"]
    },
    {
      time: "Month 2–3",
      title: "Optimization & Predictability",
      items: ["Winning Angles Identified", "Volume Scaling", "Consistent Meeting Flow", "Objection Handling Refinement"]
    },
    {
      time: "Month 3+",
      title: "Scale & Expansion",
      items: ["New Market Testing", "Multi-Channel Expansion", "Predictable Revenue Engine", "Quarterly Strategy Reviews"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6"
          >
            How The Engine Works
          </h1>
          <p 
            className="text-xl text-zinc-600 leading-relaxed"
          >
            A look under the hood of our predictable outbound system.
          </p>
        </section>

        <section className="py-24 px-6 bg-white border-y border-zinc-200/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-semibold text-zinc-900 mb-12">The 5-Step System</h2>
                <div className="space-y-12">
                  {steps.map((step, index) => (
                    <div key={index} className="relative pl-8 border-l border-zinc-200">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-mono">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-900 mb-3">{step.title}</h3>
                      <p className="text-zinc-600 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-12 h-fit sticky top-32">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-8">Implementation Timeline</h2>
                <div className="space-y-8">
                  {timeline.map((phase, index) => (
                    <div key={index}>
                      <div className="text-sm font-mono font-semibold text-zinc-500 mb-2">{phase.time}</div>
                      <h3 className="text-lg font-semibold text-zinc-900 mb-4">{phase.title}</h3>
                      <ul className="space-y-3">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-zinc-600">
                            <Check className="w-5 h-5 text-zinc-400 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
