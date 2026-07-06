"use client";
import { motion } from "motion/react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ICPThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex-grow pt-20 pb-12 md:pt-32 md:pb-24">
        <section className="px-6 max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-6">
            You&apos;re all set!
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed mb-8">
            Click the button below to download your ICP Teardown Worksheet. 
          </p>
          
          <a
            href="/ICP-Teardown-Worksheet.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-zinc-900 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-zinc-800 transition-colors mb-16"
          >
            Download PDF
          </a>

          <div className="bg-zinc-50 p-8 md:p-12 rounded-2xl border border-zinc-200">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              Want us to review your ICP teardown?
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed mb-8">
              Book a 20-min fit call — we&apos;ll go through it together.
            </p>
            <Link
              href="/strategy-call"
              className="group inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-zinc-900/20"
            >
              Book a 20-min fit call →
            </Link>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
