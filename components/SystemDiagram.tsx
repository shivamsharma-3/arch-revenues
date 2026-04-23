'use client';

import { ArrowRight, Database, Target, Calendar, BarChart3, TrendingUp } from 'lucide-react';

export function SystemDiagram() {
  const steps = [
    { title: "AI Lead Enrichment", desc: "We find your ideal clients and verify their data with 99% accuracy.", icon: <Database className="w-5 h-5" /> },
    { title: "AI Personalization", desc: "Hyper-personalized outreach that sounds like it was written by you.", icon: <Target className="w-5 h-5" />, highlight: true },
    { title: "Human Oversight", desc: "Our team handles the replies and qualifies every single lead.", icon: <Calendar className="w-5 h-5" /> },
    { title: "Qualified Meetings", desc: "You wake up to a calendar full of high-intent sales calls.", icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-zinc-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 max-w-3xl mx-auto">
            How You Go From Feast-or-Famine to Predictable Pipeline
          </h2>
          <p className="text-zinc-400 text-lg">
            The 4-step system that books qualified meetings while you sleep.
          </p>
        </div>

        <div className="w-full overflow-x-auto pb-6 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-row items-center justify-start lg:justify-center gap-2 min-w-max">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-row items-center gap-2">
                <div
                  className={`w-[180px] h-[180px] md:w-[220px] md:h-[220px] p-4 md:p-6 rounded-2xl border text-center flex flex-col items-center justify-center shrink-0 ${
                    step.highlight 
                      ? 'bg-white text-zinc-900 border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-300'
                  } relative z-10`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0 ${
                    step.highlight ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {step.icon}
                  </div>
                  <h3 className={`text-base font-bold mb-2 ${step.highlight ? 'text-zinc-900' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-snug ${step.highlight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {step.desc}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex items-center justify-center px-2 shrink-0">
                    <ArrowRight className="w-5 h-5 text-zinc-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-zinc-500 lg:hidden">
          <span className="text-[10px] uppercase tracking-widest font-mono">Swipe to explore</span>
          <ArrowRight className="w-3 h-3 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
