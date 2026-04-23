"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the Founding Client Program?",
      a: "We're currently in the early stages of our service. To build strong case studies, we're offering our full system build and management for free to the first 5 agencies who qualify. In return, we just ask for your honest feedback and a video testimonial if you're happy with the results."
    },
    {
      q: "What happens after the first 5 spots are filled?",
      a: "Once we've filled our founding spots, we'll move to a standard monthly retainer model. This will be a flat fee with no long-term contracts and no revenue share."
    },
    {
      q: "Do you offer a guarantee?",
      a: "While we aim to build a system that generates a steady flow of qualified meetings, we don't offer a '10 meetings or you don't pay' guarantee. Every agency and market is different. Our focus is on building a sustainable, high-quality outbound engine for your business."
    },
    {
      q: "How do the AI systems work?",
      a: "We use a combination of advanced AI tools for lead enrichment and personalization, but every campaign is overseen by a human. This ensures that your outreach is both scalable and highly relevant to your prospects."
    },
    {
      q: "What's the catch?",
      a: "No catch. We're a new service and we need to prove our value. The Founding Client Program is our way of building trust and showing what we can do."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section id="faq" className="py-24 px-6 bg-zinc-50 border-b border-zinc-200/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border border-zinc-200 rounded-xl overflow-hidden bg-white"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-semibold text-zinc-900 pr-8">{faq.q}</span>
        <ChevronDown
          className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="p-6 pt-0 text-zinc-600 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
