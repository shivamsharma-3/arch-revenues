'use client';

import { motion } from 'motion/react';
import { ArrowDown, Database, Target, Calendar, BarChart3, TrendingUp } from 'lucide-react';

export function SystemDiagram() {
  const steps = [
    {
      title: "Traffic Sources",
      description: "LinkedIn, Apollo, Crunchbase, Intent Data",
      icon: <Database className="w-6 h-6" />,
    },
    {
      title: "ARCH Revenue Engine",
      description: "Infrastructure, Copywriting, Multi-channel Sequences",
      icon: <Target className="w-6 h-6" />,
      highlight: true,
    },
    {
      title: "Qualified Meetings",
      description: "Hand-off of interested prospects to your team",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: "Sales Pipeline",
      description: "High-intent conversations with decision makers",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Revenue Growth",
      description: "Predictable, scalable acquisition system",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-white/40 text-[10px] font-mono font-bold uppercase tracking-widest mb-6 border border-white/5">
            The Architecture
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 leading-[1.1]">
            The Technical <span className="text-zinc-500">Pipeline Flow</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A high-precision, data-driven approach to outbound acquisition.
          </p>
        </div>

        <div className="relative space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-full max-w-xl p-5 rounded-[1.5rem] border ${
                  step.highlight 
                    ? 'bg-white text-zinc-900 border-white shadow-[0_0_40px_rgba(255,255,255,0.05)]' 
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-300'
                } flex items-center gap-4 relative z-10`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  step.highlight ? 'bg-zinc-900 text-white' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {step.icon}
                </div>
                <div>
                  <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                    Step 0{index + 1}
                  </div>
                  <h3 className={`text-base font-bold ${step.highlight ? 'text-zinc-900' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-[11px] leading-relaxed mt-0.5 ${step.highlight ? 'text-zinc-600' : 'text-zinc-500'}`}>
                    {step.description}
                  </p>
                </div>
                {step.highlight && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-zinc-900 text-[7px] font-mono font-bold text-white uppercase tracking-widest">
                      <div className="w-1 h-1 rounded-full bg-emerald-400" />
                      Active
                    </div>
                  </div>
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className="flex flex-col items-center py-2 h-10"
                >
                  <div className="w-px h-full bg-gradient-to-b from-zinc-800 to-zinc-950" />
                  <ArrowDown className="w-4 h-4 text-zinc-800 -mt-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
