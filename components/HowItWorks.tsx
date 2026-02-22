'use client';

import { motion } from 'motion/react';

export function HowItWorks() {
  const phases = [
    {
      title: "Phase 1: Build & Launch",
      timeline: "Month 1",
      description: "We define your exact ideal client profile and develop targeted messaging. We construct your lead lists, set up the technical infrastructure (domains, inboxes, warming), and launch your first campaigns. You don't touch the tools."
    },
    {
      title: "Phase 2: Operate & Optimize",
      timeline: "Month 2-3",
      description: "We run the outreach sequences, manage all replies, and handle the follow-ups. When a prospect is qualified and interested, we book the meeting directly onto your calendar."
    },
    {
      title: "Phase 3: Scale & Predict",
      timeline: "Ongoing",
      description: "We track performance, iterate on messaging based on reply data, and scale the volume. You get a predictable pipeline of 8-15 qualified sales calls per month, every month."
    }
  ];

  return (
    <section id="process" className="py-24 px-6 bg-zinc-50 border-y border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
            The Installation Process
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98], delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-widest mb-4">
                {phase.timeline}
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-4">
                {phase.title}
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                {phase.description}
              </p>
              {index < phases.length - 1 && (
                <div className="hidden md:block absolute top-6 right-0 w-8 border-t border-zinc-300 translate-x-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
