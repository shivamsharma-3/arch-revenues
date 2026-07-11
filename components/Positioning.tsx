"use client";

import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

export function Positioning() {
  const steps = [
    {
      title: "Meet the Founder",
      description: "Founder of ARCH Revenues. Builds scalable outbound systems for B2B SaaS companies in the $20K-$100K MRR range."
    },
    {
      title: "Performance Pilot",
      description: "Setup fee covers infrastructure. You pay the retainer only when we book qualified meetings."
    },
    {
      title: "Our Commitment",
      description: "Not just leads — a repeatable outbound system you can rely on."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-32 px-6 bg-zinc-50 border-b border-zinc-200/50">
      <div className="max-w-[88rem] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl w-full"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-zinc-200 text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
              About ARCH Revenues
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
              Built by a <span className="text-zinc-400 italic font-serif">Founder</span> for <span className="text-zinc-400 italic font-serif">Founders.</span>
            </h2>
            <p className="text-xl text-zinc-600 leading-relaxed">
              We act as a specialized extension of your team, taking the heavy lifting out of finding new clients.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-1">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-zinc-200 p-6 relative overflow-hidden first:rounded-t-3xl md:first:rounded-tr-none md:first:rounded-l-3xl last:rounded-b-3xl md:last:rounded-bl-none md:last:rounded-r-3xl"
            >
              <div className="relative z-10">
                <div className="text-4xl font-mono font-bold text-zinc-100 mb-6 tracking-tighter">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
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
