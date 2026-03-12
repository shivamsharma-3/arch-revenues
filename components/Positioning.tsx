'use client';

import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

export function Positioning() {
  const steps = [
    {
      title: "Positioning Optimization",
      description: "We analyze your best case studies and engineer angles that resonate with decision-makers."
    },
    {
      title: "Targeting & Infrastructure",
      description: "We set up sending domains, warm up inboxes, and scrape hyper-targeted lead lists using intent data."
    },
    {
      title: "Multi-Channel Deployment",
      description: "We launch campaigns across Email and LinkedIn, handle replies, and book meetings. You just take the calls."
    }
  ];

  return (
    <section id="system" className="py-32 px-6 bg-zinc-50 border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-end justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-zinc-200 text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
              The Methodology
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
              The ARCH Revenue Engine™
            </h2>
            <p className="text-xl text-zinc-600 leading-relaxed">
              A structured, predictable system designed to turn cold prospects into qualified pipeline.
            </p>
          </motion.div>
          <div className="hidden lg:block w-px h-32 bg-zinc-200 shrink-0" />
          <div className="lg:max-w-xs w-full">
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">
              We operate as a specialized extension of your revenue team, removing the friction from outbound acquisition.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-1">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-zinc-200 p-8 relative overflow-hidden first:rounded-t-3xl md:first:rounded-tr-none md:first:rounded-l-3xl last:rounded-b-3xl md:last:rounded-bl-none md:last:rounded-r-3xl"
            >
              <div className="relative z-10">
                <div className="text-4xl font-mono font-bold text-zinc-100 mb-6">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed text-xs">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
