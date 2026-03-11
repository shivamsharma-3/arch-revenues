"use client";

import { Check } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    { title: "Strategy & ICP", description: "Identify ideal customers and buying triggers." },
    { title: "Infrastructure", description: "Build outbound system with warmed-up domains." },
    { title: "Campaign Launch", description: "Personalized outreach via Email & LinkedIn." },
    { title: "Reply Management", description: "Handle responses and book qualified meetings." },
    { title: "Scale", description: "Optimize angles and scale volume." }
  ];

  const timeline = [
    { time: "Week 1–2", title: "Setup", items: ["ICP Deep Dive", "Domain Warmup"] },
    { time: "Week 3–4", title: "Launch", items: ["Campaign Activation", "A/B Testing"] },
    { time: "Month 2+", title: "Scale", items: ["Volume Scaling", "Predictable Flow"] }
  ];

  const tools = [
    { name: "Apollo & Crunchbase", use: "Data & Intent" },
    { name: "Smartlead / Instantly", use: "Email Sending" },
    { name: "Clay", use: "Enrichment" },
    { name: "LinkedIn Sales Nav", use: "Social Selling" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6">
            How The Engine Works
          </h1>
          <p className="text-xl text-zinc-600">
            A look under the hood of our predictable outbound system.
          </p>
        </section>

        <section className="py-24 px-6 bg-white border-y border-zinc-200/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-16">
              <div>
                <h2 className="text-3xl font-semibold text-zinc-900 mb-10">The 5-Step System</h2>
                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <div key={index} className="relative pl-8 border-l border-zinc-200">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-mono">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-zinc-600">{step.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-16 pt-12 border-t border-zinc-200">
                  <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Tools & Infrastructure</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {tools.map((tool, index) => (
                      <div key={index} className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl">
                        <h4 className="font-semibold text-zinc-900 text-sm mb-1">{tool.name}</h4>
                        <p className="text-xs text-zinc-500">{tool.use}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 h-fit sticky top-32">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-8">Timeline</h2>
                <div className="space-y-8">
                  {timeline.map((phase, index) => (
                    <div key={index}>
                      <div className="text-xs font-mono font-semibold text-zinc-500 mb-1">{phase.time}</div>
                      <h3 className="text-base font-semibold text-zinc-900 mb-3">{phase.title}</h3>
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                            <Check className="w-4 h-4 text-zinc-400 shrink-0" />
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
      </main>
    </div>
  );
}
