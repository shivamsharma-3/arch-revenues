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
      a: "8-12 qualified demos for SaaS founders in our ICP. We commit to this in writing. If we book fewer than 8 in any month, you don't pay for that month.",
    },
    {
      q: "How fast will I see results?",
      a: "First meetings typically land in week 3 of the engagement. Weeks 1-2 are infrastructure setup (domains, SPF/DKIM/DMARC, warmup, sequence build). We do not promise results faster than this — anyone who does is lying.",
    },
    {
      q: "Do I need to provide the contact list?",
      a: "No. We use Apollo to build the list based on your ICP. You approve the list before the sequence goes live — we will not email anyone you do not approve.",
    },
    {
      q: "What happens if a prospect replies negatively?",
      a: "We handle all replies — positive, negative, and unsubscribe requests — within 4 business hours. You see every reply in real-time in a shared inbox. You can step in at any time.",
    },
    {
      q: "Can I cancel?",
      a: "Yes. Cancel anytime after the first 30 days. No annual contract. The 30-day minimum covers infrastructure setup costs, which are real (domains, warmup tool, Apollo seats).",
    },
    {
      q: "Why are you $1,000/mo when most US agencies charge $3,500+?",
      a: "Because we have fewer case studies than established US agencies. The $1,000 rate is the founding client rate — 3 spots only. It increases to $1,750/mo for client #4. You're getting the same work at a discount in exchange for being a public case study.",
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
            href="/strategy-call"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-zinc-900/20"
          >
            Book a 20-min strategy call →
          </Link>
          <Link
            href="/audit"
            className="text-zinc-900 text-base underline hover:text-zinc-600 transition-colors"
          >
            Fill out the ICP worksheet →
          </Link>
        </div>
      </div>
    </section>
  );
}
