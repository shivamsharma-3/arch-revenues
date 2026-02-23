'use client';

import { motion } from 'motion/react';

export function AuditProcess() {
  const steps = [
    {
      title: "Review",
      description: "We analyze your current acquisition channels, offer structure, and positioning to identify exactly where pipeline is breaking down."
    },
    {
      title: "Strategy Call",
      description: "We walk through your pipeline gaps and growth constraints live — specific to your agency, not a generic presentation."
    },
    {
      title: "Revenue Roadmap",
      description: "You receive a clear outbound infrastructure plan tailored to your agency's ICP, messaging, and market."
    },
    {
      title: "Decision",
      description: "If there's a strong fit, we implement the system. If not, you leave with a clear picture of what your acquisition architecture needs."
    }
  ];

  return (
    <section id="audit-process" className="py-24 px-6 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="mb-20 text-center"
        >
          <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4 block">
            The Process
          </span>
          <h2 className="text-zinc-900 text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            What Happens After You Apply
          </h2>
          <p className="text-zinc-600">
            Four steps. No ambiguity. No pressure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-12 md:gap-8 relative mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98], delay: index * 0.1 }}
              className="relative group"
            >
              {/* Step Number Background */}
              <div className="absolute -top-12 -left-4 font-mono text-zinc-100 text-8xl select-none pointer-events-none z-0">
                0{index + 1}
              </div>
              
              <div className="relative z-10 pt-4">
                <h3 className="font-semibold text-zinc-900 text-lg mb-4">
                  Step {index + 1} — {step.title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Divider for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-px h-12 bg-zinc-200 -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center zinc-500 font-mono text-sm border border-zinc-200 rounded-full inline-block px-6 py-3"
          >
            This is not a sales call. It is a structured revenue system evaluation.
          </motion.div>
        </div>
      </div>
    </section>
  );
}
