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
      q: "How many demos will you book?",
      a: "5-12 qualified demos per month. If I book fewer than 5 in any month, that month's retainer is refunded.",
    },
    {
      q: "How fast until I see results?",
      a: "Setup takes 14-21 days (warmup + ICP build). First meetings land in week 3-4. Anyone promising faster is lying.",
    },
    {
      q: "What does it cost?",
      a: "$499 setup (one-time) + $1,499/mo retainer. Founding rate for first 3 clients — moves to $4,000/mo after.",
    },
    {
      q: "Can I cancel?",
      a: "Yes, anytime after month 1. (Month 1 begins after the 14-21 day setup period). No annual contract.",
    },
    {
      q: "Why $1,499/mo when US agencies charge $3,500+?",
      a: "Fewer case studies. The founding rate is the trade-off for being featured as a public case study.",
    },
    {
      q: "Do I provide the contact list?",
      a: "No. I build a 200-account list from your ICP using Apollo. You approve it before any email goes out.",
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
        <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-4 text-center">
          Questions founders ask before signing
        </h2>
        <p className="text-center text-zinc-500 mb-12">The ones that actually matter. Answered plainly.</p>
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
