"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function FaqItem({ faq, isOpen, onClick }: { faq: { q: string; a: string }, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg md:text-xl font-medium text-zinc-900 pr-4 group-hover:text-zinc-600 transition-colors">
          {faq.q}
        </h3>
        <div className="shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-900">
          <ChevronDown
            className={`w-6 h-6 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-zinc-900" : ""
            }`}
          />
        </div>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pt-2">
            <p className="text-base text-zinc-600 leading-relaxed">
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is the setup fee refundable?",
      a: "No. It covers hard infrastructure costs — domains, Google Workspace seats, Apollo data credits, warmup — that I pay for in week 1 regardless of outcome.",
    },
    {
      q: "How does the refund work?",
      a: "If I book fewer than 5 qualified demos in any month, email me by the 5th of the following month. Retainer refunded within 7 business days. Setup fee is not refunded.",
    },
    {
      q: "Why 1-month commit instead of 3?",
      a: "Outbound compounds — month 1 is setup + first touches, month 2 is momentum, month 3 is pipeline. I'd rather you stay 3+ months because you're seeing results, not because you're locked in. Cancel anytime after month 1.",
    },
    {
      q: "What happens after month 1?",
      a: "Same rate ($1,499/mo), same guarantee. Founding rate locked for first 3 clients — moves to $4,000/mo for client #4.",
    },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-24 px-6 bg-white border-b border-zinc-200/50"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="mb-12">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/audit"
            className="text-zinc-900 text-lg underline hover:text-zinc-600 transition-colors"
          >
            Fill out the ICP worksheet →
          </Link>
        </div>
      </div>
    </section>
  );
}
