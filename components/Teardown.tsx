"use client";

import { motion } from "motion/react";
import { XCircle, CheckCircle2 } from "lucide-react";

export function Teardown() {
  return (
    <section className="py-16 md:py-24 px-6 bg-white border-b border-zinc-200/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-4">
            Why your current outbound is being ignored
          </h2>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            If you're blasting generic features to scraped lists, you're burning your domain reputation. We rewrite the rules.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Generic Agency Email */}
          <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 sm:p-8 relative">
            <div className="absolute top-0 right-0 p-4">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            <div className="inline-block bg-red-100 text-red-800 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
              The "SDR" Approach
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-sm border border-red-100 mb-6 font-sans text-sm text-zinc-800 space-y-4">
              <p>Hi {'{first_name}'},</p>
              <p>We are a leading AI software company. We help businesses streamline operations and save costs with our revolutionary new platform.</p>
              <p>Our customers see a 300% increase in efficiency. We have features like custom reporting, real-time analytics, and API access.</p>
              <p>Would you have 15 minutes next week for a quick demo?</p>
              <p>Best,<br/>Generic Sales Rep</p>
            </div>

            <ul className="space-y-3 text-sm text-red-800/80 font-medium">
              <li className="flex gap-2"><span className="text-red-500">×</span> Screams "automated mass email" instantly</li>
              <li className="flex gap-2"><span className="text-red-500">×</span> Talks entirely about themselves, not the prospect</li>
              <li className="flex gap-2"><span className="text-red-500">×</span> Asks for a huge commitment (15 mins) with zero earned trust</li>
            </ul>
          </div>

          {/* ARCH Revenues Email */}
          <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-6 sm:p-8 relative">
            <div className="absolute top-0 right-0 p-4">
              <CheckCircle2 className="w-8 h-8 text-teal-500" />
            </div>
            <div className="inline-block bg-teal-100 text-teal-800 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
              The ARCH Framework
            </div>
            
            <div className="bg-teal-900 rounded-xl p-8 shadow-sm border border-teal-800 mb-6 flex flex-col items-center justify-center text-center space-y-5">
              <p className="text-teal-50 font-medium text-lg leading-relaxed">
                We don't use static templates. We write hyper-personalized emails based on deep research of every single prospect.
              </p>
              <a 
                href="/tools/email-generator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal-400 text-teal-950 font-semibold hover:bg-teal-300 transition-colors"
              >
                See what we'd write for you
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>

            <ul className="space-y-3 text-sm text-teal-800/80 font-medium">
              <li className="flex gap-2"><span className="text-teal-600">✓</span> We analyze their website to find actual buying signals</li>
              <li className="flex gap-2"><span className="text-teal-600">✓</span> We call out the exact pain point for their specific stage</li>
              <li className="flex gap-2"><span className="text-teal-600">✓</span> We craft a hard risk-reversal offer with a low-friction CTA</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
