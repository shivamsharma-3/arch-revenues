"use client";

import { Check } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    { title: "Strategy & ICP", description: "Identify ideal customers and buying triggers." },
    { title: "AI Lead Enrichment", description: "Deep data scraping to build highly targeted, verified lead lists." },
    { title: "AI-Drafted Personalization", description: "Generate hyper-personalized first lines at scale for Email & LinkedIn." },
    { title: "Human Closer Oversight", description: "Our team handles responses, overcomes objections, and books qualified meetings." },
    { title: "Scale", description: "Optimize angles and scale volume." }
  ];

  const timeline = [
    { time: "Week 1–2", title: "Setup", items: ["ICP Deep Dive", "AI Enrichment Setup"] },
    { time: "Week 3–4", title: "Launch", items: ["AI Personalization", "Campaign Activation"] },
    { time: "Month 2+", title: "Scale", items: ["Volume Scaling", "Predictable Flow"] }
  ];

  const tools = [
    { name: "Apollo", use: "Finding verified B2B contact data" },
    { name: "Brevo", use: "High-volume email sending & delivery" },
    { name: "Make", use: "Automating workflows & CRM syncing" },
    { name: "LinkedIn", use: "Targeted social selling & prospect research" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6">
            How The Engine Works
          </h1>
          <p className="text-xl text-zinc-600">
            A look under the hood of our AI-driven outbound system.
          </p>
        </section>

        <section className="py-24 px-6 bg-white border-y border-zinc-200/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-16">
              <div>
                <h2 className="text-3xl font-semibold text-zinc-900 mb-10">The 4-Step System</h2>
                <div className="space-y-8">
                  {[
                    { title: "Strategy & ICP", description: "Identify ideal customers and buying triggers." },
                    { title: "AI Lead Enrichment", description: "Deep data scraping to build highly targeted, verified lead lists." },
                    { title: "AI-Drafted Personalization", description: "Generate hyper-personalized first lines at scale for Email & LinkedIn." },
                    { title: "Human Closer Oversight", description: "Our team handles responses, overcomes objections, and books qualified meetings." }
                  ].map((step, index) => (
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
                  <h2 className="text-2xl font-semibold text-zinc-900 mb-6">The AI + Human Hybrid</h2>
                  <p className="text-zinc-600 mb-8 leading-relaxed">
                    We don&apos;t just set up a tool and leave it. Our system combines the scale of AI with the nuance of human oversight. 
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-bold text-zinc-900">AI Component</h4>
                      <ul className="space-y-2 text-sm text-zinc-500 list-disc pl-4">
                        <li>Deep data scraping & enrichment</li>
                        <li>Hyper-personalized first lines</li>
                        <li>Automated follow-up sequences</li>
                        <li>Infrastructure & deliverability monitoring</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-zinc-900">Human Component</h4>
                      <ul className="space-y-2 text-sm text-zinc-500 list-disc pl-4">
                        <li>Strategic ICP & offer refinement</li>
                        <li>Manual response handling & objection management</li>
                        <li>Campaign optimization & A/B testing</li>
                        <li>Direct calendar booking & coordination</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-12 border-t border-zinc-200">
                  <h2 className="text-2xl font-semibold text-zinc-900 mb-6">The Modern Outbound Stack</h2>
                  <p className="text-zinc-600 mb-8">We use the best tools available to ensure your messages land in the primary inbox and actually get read.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tools.map((tool, index) => (
                      <div key={index} className="bg-zinc-50 border border-zinc-200 p-5 rounded-xl hover:border-zinc-300 transition-colors">
                        <h4 className="font-semibold text-zinc-900 text-sm mb-2">{tool.name}</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">{tool.use}</p>
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
