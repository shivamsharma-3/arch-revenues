'use client';

import { motion } from 'motion/react';

export function WhyItWorks() {
  const argumentsList = [
    {
      title: "Systems, Not Side Tasks",
      description: "Most agencies treat cold email as an afterthought. They send a few emails when things get slow. We treat it as infrastructure. Deliverability, list quality, and sequencing are managed daily."
    },
    {
      title: "Extreme Focus",
      description: "Generalist lead gen agencies fail because they don't understand your specific service. We only work with web design agencies. We know your buyers, your margins, and your value proposition."
    },
    {
      title: "End-to-End Operation",
      description: "Buying a tool like Apollo doesn't give you a system; it gives you another job. We don't just give you the software—we write the copy, pull the lists, handle the replies, and book the meetings."
    }
  ];

  return (
    <section className="py-24 px-6 bg-zinc-900 text-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-2xl">
            Why Most Outbound Fails<br />
            <span className="text-zinc-400">(And Why This Doesn&apos;t)</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {argumentsList.map((arg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98], delay: index * 0.1 }}
              className="border-t border-zinc-800 pt-8"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {arg.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {arg.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
