"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ICPThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow pt-20 pb-12 md:pt-32 md:pb-24">
        <section className="px-6 max-w-2xl mx-auto text-center">
          <h1 className="text-[32px] md:text-[48px] font-bold text-[#1A2330] tracking-tight mb-6">
            You&apos;re all set!
          </h1>
          <p className="text-[18px] text-[#506070] leading-relaxed mb-8">
            Click the button below to download your ICP Teardown Worksheet. 
          </p>
          
          <a
            href="/ICP-Teardown-Worksheet.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1A2330] text-white font-bold text-[18px] px-8 py-4 rounded-xl hover:bg-zinc-800 transition-colors mb-16"
          >
            Download PDF
          </a>

          <div className="bg-[#F8F0EB] p-8 md:p-12 rounded-2xl border border-zinc-200">
            <h2 className="text-[24px] font-bold text-[#1A2330] mb-4">
              Want us to review your ICP teardown?
            </h2>
            <p className="text-[16px] text-[#506070] leading-relaxed mb-8">
              Book a 20-min fit call — we'll go through it together.
            </p>
            <Link
              href="/strategy-call"
              className="group inline-flex items-center justify-center gap-2 bg-[#D4875A] text-white px-8 py-4 rounded-xl text-[18px] font-bold hover:bg-[#c2794e] transition-all shadow-lg hover:shadow-[#D4875A]/20"
            >
              Book a 20-min fit call →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
