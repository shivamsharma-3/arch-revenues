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
      q: "Why work with a solo operator instead of an agency?",
      a: "When you hire an agency, your campaign is built by a senior salesperson and executed by a junior account manager you've never met. With me, the person who scoped your ICP, wrote your sequences, and set up your infrastructure is also the person monitoring replies and routing demos to your calendar. There are no handoffs. I take on a small number of clients at a time specifically so I can give each one the attention an agency reserves for its largest accounts. The geographic cost difference is real — I charge $1,499/mo for work US agencies bill at $3,500–$5,000/mo — but the reason to choose ARCH isn't the price. It's that you're working directly with the operator, not a team structure built around billing hours.",
    },
    {
      q: "What exactly happens if I get fewer than 5 demos — walk me through the refund.",
      a: "If I book fewer than 5 qualified demos in a calendar month, email me at shivam@archrevenues.com by the 5th of the following month. I'll confirm receipt within 24 hours and issue the retainer refund within 7 business days — no questions, no negotiation, no \"let me look into it.\" The setup fee ($499) is not refunded because it covers hard costs I've already paid: domains, Google Workspace seats, Apollo data credits, 14-day warmup. A \"qualified demo\" means a prospect matching the ICP we defined together at kickoff, who showed up to the scheduled call. No-shows don't count. The ICP definition happens before any work starts, so there's no ambiguity later about what qualifies.",
    },
    {
      q: "How is this different from a cold email template I could run myself?",
      a: "The template is the easy part. The part that kills DIY cold email is infrastructure: SPF, DKIM, and DMARC records configured correctly across multiple domains, 14-day inbox warmup before the first send, domain rotation so no single domain takes the full sending volume, and reply handling that keeps positive conversations from going cold. Most founders who've tried cold email themselves sent from their primary domain, hit spam within 3-4 weeks, and burned the domain in the process. What I deliver is a system — 3 warmed sending domains, a verified 200-account prospect list built from your ICP, 7-touch sequences with LinkedIn steps, 90-150 emails/day sent at human cadence, and reply management within 4 business hours. The template is maybe 10% of the equation.",
    },
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
