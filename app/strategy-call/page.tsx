"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

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

export default function StrategyCallPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Will this be a sales pitch?",
      a: "No. 30 minutes, no slides, no pressure. If we're not a fit, I'll tell you in the first 10 minutes and point you to a better option."
    },
    {
      q: "What do I need to bring?",
      a: "Nothing. If you have your ICP or current outbound metrics, great — but I'll ask the questions."
    },
    {
      q: "What if I'm not ready to start this month?",
      a: "Still book the call. We'll map out what 'ready' looks like for your business and you can start whenever you want."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex-grow pt-24">
        <section className="py-12 px-6 max-w-4xl mx-auto text-center">
          <h1 
            className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-4"
          >
            Book Your Strategy Call
          </h1>
          <p 
            className="text-lg text-zinc-600 leading-relaxed"
          >
            Stop hoping for referrals. Start engineering predictable revenue.
          </p>
        </section>

        <section className="py-12 px-6 bg-white border-y border-zinc-200/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-start">
              
              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 md:p-8 md:sticky md:top-24">
                <h2 className="text-xl font-semibold text-zinc-900 mb-6">What Happens Next</h2>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-200 text-zinc-900 text-xs font-bold shrink-0 mt-0.5">1</div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 mb-1">Audit Your Current Motion</h3>
                      <p className="text-xs text-zinc-600">We&apos;ll review your current lead sources, offer positioning, and sales process.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-200 text-zinc-900 text-xs font-bold shrink-0 mt-0.5">2</div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 mb-1">Map The Addressable Market</h3>
                      <p className="text-xs text-zinc-600">We&apos;ll identify exactly who you should be targeting and the intent signals we can use.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-200 text-zinc-900 text-xs font-bold shrink-0 mt-0.5">3</div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 mb-1">Determine Fit</h3>
                      <p className="text-xs text-zinc-600">If we can help you scale, we&apos;ll outline what the Performance Pilot looks like.</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-zinc-200">
                  <h3 className="text-base font-semibold text-zinc-900 mb-4">What to Expect on the Call</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-zinc-600">
                      <div className="w-1 h-1 rounded-full bg-zinc-400" />
                      <span className="text-xs">30-minute strategic conversation</span>
                    </li>
                    <li className="flex items-center gap-2 text-zinc-600">
                      <div className="w-1 h-1 rounded-full bg-zinc-400" />
                      <span className="text-xs">No sales pressure</span>
                    </li>
                    <li className="flex items-start gap-2 text-zinc-600">
                      <div className="w-1 h-1 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                      <span className="text-xs">Specific outbound opportunities for your ICP — channels, sequence structure, and expected meeting volume</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-3xl p-6 md:p-10 shadow-sm flex flex-col items-center text-center">
                <h2 className="text-xl font-semibold text-zinc-900 mb-3">Schedule Your 30-Minute Strategy Call</h2>
                <p className="text-sm text-zinc-600 mb-6">Click below to pick a time on Calendly.</p>
                
                <a 
                  href="https://calendly.com/archrevenues/book-your-strategy-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-sm inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] mb-3 text-sm"
                >
                  Book a 30-min strategy call →
                </a>
                <p className="text-[10px] text-zinc-400">30-minute call • No obligation</p>

                <div className="mt-10 pt-6 border-t border-zinc-100 w-full">
                  <h3 className="text-base font-semibold text-zinc-900 mb-2">Not ready for a call yet?</h3>
                  <p className="text-xs text-zinc-600 mb-4">
                    Get the ICP Teardown Worksheet and a 5-min Loom review from Shivam within 48 hours.
                  </p>
                  <Link 
                    href="/audit" 
                    className="inline-flex items-center justify-center px-5 py-2 rounded-lg font-medium bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors text-xs"
                  >
                    Fill out the ICP worksheet →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-zinc-50 border-t border-zinc-200/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-8 text-center">Frequently Asked Questions</h2>
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
          </div>
        </section>
      </motion.main>
    </div>
  );
}
