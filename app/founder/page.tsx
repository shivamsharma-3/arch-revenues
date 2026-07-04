"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FounderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow pt-20 pb-12 md:pt-32 md:pb-24">
        <section className="px-6 max-w-3xl mx-auto">
          <h1 className="text-[32px] md:text-[48px] font-bold text-[#1A2330] tracking-tight mb-12 text-center">
            Founder
          </h1>
          
          <div className="bg-[#F8F0EB] rounded-2xl p-8 md:p-12 text-[#1A2330] text-[18px] leading-relaxed mb-12 space-y-6">
            <p>
              I&apos;m Shivam Sharma. I've spent 10+ years running B2B outbound — cold email, LinkedIn, and the unglamorous infrastructure underneath (SPF, DKIM, DMARC, inbox rotation, the works).
            </p>
            <p>
              I started ARCH Revenues because I watched too many SaaS founders try cold email themselves, fail, and conclude that cold email doesn't work. It does work. They were just missing the infrastructure layer that no Apollo tutorial talks about.
            </p>
            <p>
              I work from Hyderabad, India. My clients are in the US, UK, and Australia. The geography is not a handicap — it is the reason I can charge $1,000/mo for a service that US-based agencies charge $3,500/mo to deliver, and still book calls with the same caliber of SaaS founder.
            </p>
            <p>
              If you're a SaaS founder between $20K and $200K MRR and you're tired of relying on referrals, book a fit call. If I can&apos;t help, I'll tell you in the first 10 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/strategy-call"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4875A] text-white px-8 py-4 rounded-xl text-[18px] font-bold hover:bg-[#c2794e] transition-all shadow-lg hover:shadow-[#D4875A]/20"
            >
              Book a 20-min fit call →
            </Link>
            <a
              href="https://www.linkedin.com/in/shivam-sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A2330] text-[16px] underline hover:text-[#D4875A] transition-colors"
            >
              View my LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
