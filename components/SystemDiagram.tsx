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
    <section className="py-24 px-6 bg-zinc-900 text-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
            The ARCH Revenue Engine
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A technical, data-driven approach to outbound acquisition.
          </p>
        </motion.div>

        <div className="relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-full max-w-md p-6 rounded-2xl border ${
                  step.highlight 
                    ? 'bg-white text-zinc-900 border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                    : 'bg-zinc-800/50 border-zinc-700 text-zinc-300'
                } flex items-center gap-6 relative z-10`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  step.highlight ? 'bg-zinc-900 text-white' : 'bg-zinc-700 text-zinc-300'
                }`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className={`font-semibold ${step.highlight ? 'text-zinc-900' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm opacity-70">{step.description}</p>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="flex flex-col items-center py-2"
                >
                  <div className="w-px h-full bg-gradient-to-b from-zinc-700 to-zinc-500" />
                  <ArrowDown className="w-4 h-4 text-zinc-500 -mt-1" />
                </motion.div>
              )}
            </div>
          ))}

          {/* Background Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-zinc-800/20 rounded-full blur-3xl -z-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
