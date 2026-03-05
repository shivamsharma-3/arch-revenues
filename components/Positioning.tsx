'use client';

import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

export function Positioning() {
  const steps = [
    {
      title: "Positioning Optimization",
      description: "We don't blast generic messages. We analyze your best case studies, identify your most profitable market segments, and engineer angles that resonate with decision-makers."
    },
    {
      title: "Targeting & Data Infrastructure",
      description: "We build a pristine technical foundation. We set up sending domains, warm up inboxes, and scrape hyper-targeted lead lists using intent data and custom signals—ensuring your emails land in the primary inbox."
    },
    {
      title: "Multi-Channel Outbound Deployment",
      description: "We launch structured, multi-channel campaigns across Email and LinkedIn. We handle the copywriting, sequence building, reply management, and objection handling. You just take the calls."
    }
  ];

  return (
    <section id="system" className="py-16 px-6 bg-white border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 max-w-2xl mb-4">
            The ARCH Revenue Engine™
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl">
            This is not random lead generation. This is a structured, predictable system designed to turn cold prospects into qualified pipeline.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl"
            >
              <div className="text-4xl font-bold text-zinc-200 mb-6">0{index + 1}</div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-4">{step.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
