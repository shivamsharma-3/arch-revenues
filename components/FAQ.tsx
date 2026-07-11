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
      q: "How many meetings will you book per month?",
      a: "5-12 qualified demos. If we book fewer than 5 in any month, you don't pay for that month.",
    },
    {
      q: "How fast will I see results?",
      a: "First meetings land in week 3. Weeks 1-2 are infrastructure setup. Anyone promising faster is lying.",
    },
    {
      q: "Do I need to provide the contact list?",
      a: "No. We build the list from your ICP using Apollo. You approve it before any email goes out.",
    },
    {
      q: "What happens if a prospect replies negatively?",
      a: "We handle all replies — positive, negative, unsubscribe — within 4 business hours. You see everything in a shared inbox.",
    },
    {
      q: "Can I cancel?",
      a: "Yes, anytime after the first 30 days. No annual contract. The 30-day minimum covers real infrastructure setup costs.",
    },
    {
      q: "Why are you $1,500/mo when most US agencies charge $3,500+?",
      a: "Fewer case studies than established agencies. The $1,500 founding rate is the trade-off for being a public case study. Moves to $4,000/mo for client #4.",
    },
    {
      q: "Do you work with funded SaaS?",
      a: "We work with any B2B SaaS company in the $20K-$100K MRR range, whether bootstrapped or funded. If you've grown past $100K MRR, you likely need an in-house SDR team rather than an external partner.",
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
