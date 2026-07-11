"use client";
import { motion } from "motion/react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex-grow pt-20 pb-12 md:pt-32 md:pb-24">
        <section className="px-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-12 text-center">
            About ARCH Revenues
          </h1>
          
          <div className="bg-zinc-50 rounded-2xl p-8 md:p-12 text-zinc-900 text-lg leading-relaxed mb-12 space-y-6">
            <p>
              I&apos;m Shivam Sharma. I run ARCH Revenues from Hyderabad, India. My background is in building the unglamorous infrastructure that makes cold email actually work — SPF, DKIM, DMARC, inbox warmup, domain rotation. The stuff no Apollo tutorial talks about, and the stuff most agencies skip, which is why their outbound fails.
            </p>
            <p>
              I started ARCH Revenues because I watched too many SaaS founders try cold email themselves, fail, and conclude that cold email doesn&apos;t work. It does work. They were just missing the infrastructure layer.
            </p>
            <p>
              My clients are in the US, UK, and Australia. The geography is not a handicap — it is the reason I can charge $1,500/mo for a service that US-based agencies charge $3,500/mo to deliver, and still book calls with the same caliber of SaaS founder.
            </p>
            <p>
              If you&apos;re a SaaS founder between $20K and $200K MRR and you&apos;re tired of relying on referrals, book a strategy call. If I can&apos;t help, I&apos;ll tell you in the first 10 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/strategy-call"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-zinc-900/20"
            >
              Book a 20-min strategy call →
            </Link>
            <a
              href="https://www.linkedin.com/in/shivam-sharma1203/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 text-base underline hover:text-zinc-600 transition-colors"
            >
              View my LinkedIn
            </a>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
