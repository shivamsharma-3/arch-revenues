'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "John Carter",
      title: "Founder, Development Agency",
      quote: "ARCH built the first predictable outbound pipeline we've ever had. Within 60 days we had 20+ qualified meetings.",
    },
    {
      name: "Sarah Jenkins",
      title: "VP of Sales, B2B Marketing Agency",
      quote: "We were relying entirely on referrals. ARCH came in, set up the infrastructure, and now we have a consistent flow of CMOs booking calls.",
    },
    {
      name: "Michael Chen",
      title: "Managing Partner, Consulting Firm",
      quote: "The authority-led strategy they designed completely changed how we prospect. We're now closing $50k+ engagements predictably.",
    }
  ];

  return (
    <section className="py-24 px-6 bg-white border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">
            What Clients Say
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98], delay: index * 0.1 }}
              className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 shadow-sm relative"
            >
              <Quote className="w-10 h-10 text-zinc-200 absolute top-6 right-6" />
              <p className="text-zinc-700 text-lg leading-relaxed mb-8 relative z-10 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-zinc-900">{testimonial.name}</div>
                <div className="text-sm text-zinc-500">{testimonial.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
