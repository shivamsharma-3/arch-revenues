'use client';

import { ArrowRight, Database, Target, Calendar, BarChart3, TrendingUp } from 'lucide-react';

export function SystemDiagram() {
  const steps = [
    { title: "Prospect Data", desc: "Targeted lead lists", icon: <Database className="w-5 h-5" /> },
    { title: "Cold Email & LinkedIn", desc: "Multi-channel outreach", icon: <Target className="w-5 h-5" />, highlight: true },
    { title: "Booked Sales Calls", desc: "Hand-off to your team", icon: <Calendar className="w-5 h-5" /> },
    { title: "Qualified Opportunities", desc: "High-intent conversations", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "New Clients", desc: "Predictable revenue", icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            How the Outbound System Works
          </h2>
          <p className="text-zinc-400 text-lg">
            A predictable system for outbound acquisition.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2">
              <div
                className={`w-[160px] h-[160px] md:w-[180px] md:h-[180px] p-4 md:p-6 rounded-2xl border text-center flex flex-col items-center justify-center shrink-0 ${
                  step.highlight 
                    ? 'bg-white text-zinc-900 border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-300'
                } relative z-10`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0 ${
                  step.highlight ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {step.icon}
                </div>
                <h3 className={`text-sm font-bold mb-1 ${step.highlight ? 'text-zinc-900' : 'text-white'}`}>
                  {step.title}
                </h3>
                <p className={`text-[11px] leading-tight ${step.highlight ? 'text-zinc-600' : 'text-zinc-500'}`}>
                  {step.desc}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="flex items-center justify-center py-2 lg:py-0 lg:px-2">
                  <ArrowRight className="hidden lg:block w-5 h-5 text-zinc-700" />
                  <div className="lg:hidden w-px h-8 bg-zinc-800" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
