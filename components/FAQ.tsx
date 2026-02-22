'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How long before we see results?",
      a: "Month 1 is for building the infrastructure and launching. You may see initial calls late in Month 1, but the system is designed to hit full stride (8-15 calls/month) by Month 2 and 3."
    },
    {
      q: "What happens in Month 1?",
      a: "We run an ICP refinement workshop, develop your messaging, build lead lists, set up domains and inboxes, and begin the warming process. By the end of the month, campaigns are live."
    },
    {
      q: "Do you guarantee meetings?",
      a: "No. We guarantee the execution of a proven system. We don't offer extreme guarantees because we focus on qualified calls, not just any pulse with a calendar. Our 30-day pilot is our risk reversal."
    },
    {
      q: "We've tried cold email before — why would this be different?",
      a: "Cold email fails when one piece of the chain breaks—poor deliverability, bad lists, generic copy, or missed follow-ups. We build and operate the entire chain as a cohesive system, not a fragmented side project."
    },
    {
      q: "We mainly get referrals. Do we actually need this?",
      a: "Referrals are excellent, but they are unpredictable. Outbound isn't meant to replace referrals; it's meant to provide a baseline of predictable pipeline so you aren't at the mercy of your network."
    },
    {
      q: "Who handles the replies — you or us?",
      a: "We handle all initial replies and follow-ups. We only hand the prospect over to you when they are qualified and ready to book a call."
    },
    {
      q: "Do we sign a long-term contract?",
      a: "No. We start with a 30-day pilot. After that, it's a month-to-month engagement. We keep you by delivering results, not through legal lock-in."
    },
    {
      q: "What does a \"qualified call\" mean to you?",
      a: "A decision-maker at a company that fits your exact ICP, who understands what you do, and has agreed to a meeting to discuss a potential engagement."
    },
    {
      q: "How much does it cost?",
      a: "Engagements typically start between $400 and $750 per month, depending on the required volume. There are no setup fees."
    },
    {
      q: "What do we need to provide on our end?",
      a: "We need 60 minutes of your time for the initial ICP workshop, and you need to show up to the sales calls we book. We handle the rest."
    }
  ];

  return (
    <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
          Clear Answers to Reasonable Doubts
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
    </section>
  );
}

function FAQItem({ faq, index, isOpen, onToggle }: { faq: { q: string, a: string }, index: number, isOpen: boolean, onToggle: () => void }) {
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
          className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
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
            <p className="p-6 pt-0 text-zinc-600 leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
