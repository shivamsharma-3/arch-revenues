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
            
            <div className="bg-white rounded-xl p-5 shadow-sm border border-teal-100 mb-6 font-sans text-sm text-zinc-800 space-y-4">
              <p>{'{first_name}'} — saw your recent post about hitting $50K MRR, congrats.</p>
              <p>Most SaaS founders at this stage struggle to keep the pipeline full once they step away from founder-led sales.</p>
              <p>We built a system that books 5-12 qualified demos a month on autopilot. If we don't hit 5, you don't pay for the month.</p>
              <p>Worth a quick chat to see the math?</p>
              <p>Shivam</p>
            </div>

            <ul className="space-y-3 text-sm text-teal-800/80 font-medium">
              <li className="flex gap-2"><span className="text-teal-600">✓</span> Highly personalized intro based on specific triggers</li>
              <li className="flex gap-2"><span className="text-teal-600">✓</span> Calls out the exact pain point for their specific stage</li>
              <li className="flex gap-2"><span className="text-teal-600">✓</span> Hard risk-reversal offer + soft, low-friction call to action</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
