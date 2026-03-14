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
      q: "What exactly does ARCH Revenues do?",
      a: "We build and manage outbound sales systems for B2B agencies. We design targeted outreach campaigns that consistently book qualified sales meetings with your ideal clients.",
    },
    {
      q: "How long before we see results?",
      a: "Month 1 is dedicated to building the infrastructure and launching. While you may see initial calls late in Month 1, the system is designed to reach full performance (8-15 calls/month) by Months 2 and 3.",
    },
    {
      q: "What happens in Month 1?",
      a: "We refine your target audience, develop your messaging, build lead lists, set up sending domains, and begin the warming process. By the end of the month, campaigns are live.",
    },
    {
      q: "Do you guarantee meetings?",
      a: "Yes. We guarantee 10 qualified meetings in your first 60 days, or you don't pay. We focus on qualified calls rather than just filling your calendar with anyone. Our Founding Client Program is designed to completely remove the risk for you.",
    },
    {
      q: "We've tried cold email before — why would this be different?",
      a: "Cold email fails when one piece of the process breaks—like poor deliverability, bad lists, or generic copy. We build and operate the entire chain as a cohesive system.",
    },
    {
      q: "We mainly get referrals. Do we actually need this?",
      a: "Referrals are excellent, but they are unpredictable. Outbound provides a baseline of predictable pipeline so you aren't entirely dependent on your network.",
    },
    {
      q: "Who handles the replies — you or us?",
      a: "We handle all initial replies and follow-ups. We only hand the prospect over to you when they are qualified and ready to book a call.",
    },
    {
      q: "Do we sign a long-term contract?",
      a: "No. We start with the Founding Client Program. After that, it's a month-to-month engagement. We keep you by delivering results, not through long-term contracts.",
    },
    {
      q: 'What does a "qualified call" mean to you?',
      a: "A decision-maker at a company that fits your ideal client profile, who understands what you do, and has agreed to a meeting to discuss working together.",
    },
    {
      q: "How does the Founding Client Program work?",
      a: "We are currently accepting 7 founding clients who get the entire system built and managed for free. In exchange, we ask for honest feedback and a case study. Once targets are met, we transition to a simple monthly retainer. Spots are limited — book a strategy call to apply.",
    },
    {
      q: "What do we need to provide on our end?",
      a: "We need 30 minutes of your time for an initial strategy workshop, and you need to show up to the sales calls we book. We handle the rest.",
    },
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
