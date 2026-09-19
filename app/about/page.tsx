"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Server, MailWarning, Globe, User, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <motion.main 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="flex-grow pt-28 pb-16 md:pt-36 md:pb-32"
      >
        <div className="max-w-6xl mx-auto px-6 mb-16 md:mb-24 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-mono font-bold uppercase tracking-widest mb-6 border border-zinc-200">
            About The Founder
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight mb-6">
            The story behind <br className="hidden md:block" />
            <span className="text-zinc-400 italic font-serif">ARCH Revenues</span>
          </h1>
        </div>
        
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 max-w-5xl mx-auto px-6 items-start">
          {/* Left Column: Founder Profile Card */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 flex flex-col items-center text-center md:sticky md:top-24">
             <div className="w-24 h-24 bg-teal-500/10 border border-teal-500/20 text-teal-600 rounded-full mb-6 flex items-center justify-center font-bold text-2xl shadow-inner">
               SS
             </div>
             <h2 className="text-xl font-bold text-zinc-900 mb-1">Shivam Sharma</h2>
             <p className="text-teal-600 font-mono text-xs mb-4 uppercase tracking-widest font-semibold">Founder & Outbound Systems Architect</p>
             <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
               Specialized in B2B outbound infrastructure, multi-channel email/LinkedIn sequence engineering, and guaranteed demo acquisition pipelines.
             </p>
             <div className="w-full space-y-2 mb-6 text-xs text-left bg-white p-4 rounded-xl border border-zinc-200">
               <div className="flex justify-between text-zinc-600">
                 <span>Primary ICP:</span>
                 <strong className="text-zinc-900">Founder-Led Agencies</strong>
               </div>
               <div className="flex justify-between text-zinc-600">
                 <span>Markets Served:</span>
                 <strong className="text-zinc-900">US, UK, AU, CA</strong>
               </div>
               <div className="flex justify-between text-zinc-600">
                 <span>Deliverability Floor:</span>
                 <strong className="text-teal-600">95% (Live Cohort Metrics)</strong>
               </div>
             </div>
             <a 
               href="https://www.linkedin.com/in/shivam-sharma1203/" 
               target="_blank"
               rel="noopener noreferrer"
               className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] text-white py-3 rounded-xl font-semibold hover:bg-[#004182] transition-colors shadow-sm text-sm"
             >
               Connect on LinkedIn
             </a>
          </div>

          {/* Right Column: The Story */}
          <div className="space-y-8 md:space-y-12">
             <section className="bg-white border border-zinc-100 shadow-sm p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-200 transition-colors">
                <div className="flex items-center gap-4 mb-5">
                   <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
                     <Server size={24} />
                   </div>
                   <h3 className="text-2xl font-semibold text-zinc-900">Enterprise Infrastructure First</h3>
                </div>
                <p className="text-lg text-zinc-600 leading-relaxed">
                   After 6 months of building and testing outbound sequences on my own network, ARCH Revenues is the system I now run for paying clients. My core focus is building the technical foundation that separates high-converting outbound from spam: dedicated lookalike domains, Google Workspace inboxes, multi-layer DNS records (SPF, DKIM, DMARC), and 14-day inbox warmup protocols to guarantee maximum primary inbox placement.
                </p>
             </section>
             
             <section className="bg-white border border-zinc-100 shadow-sm p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-200 transition-colors">
                <div className="flex items-center gap-4 mb-5">
                   <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                     <MailWarning size={24} />
                   </div>
                   <h3 className="text-2xl font-semibold text-zinc-900">Solving the SDR Failure Rate</h3>
                </div>
                <p className="text-lg text-zinc-600 leading-relaxed">
                   I founded ARCH Revenues after analyzing why internal SDR hires and generic outbound agencies consistently fail: they send unverified mass templates without domain isolation. Our done-for-you framework combines hyper-personalized research hooks with 5-touch dynamic sequences designed specifically for founder-to-founder acquisition.
                </p>
             </section>

             <section className="bg-white border border-zinc-100 shadow-sm p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-200 transition-colors">
                <div className="flex items-center gap-4 mb-5">
                   <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                     <Globe size={24} />
                   </div>
                   <h3 className="text-2xl font-semibold text-zinc-900">Operational Efficiency Advantage</h3>
                </div>
                <p className="text-lg text-zinc-600 leading-relaxed">
                   Based in India with clients across the US, UK, Australia, and Canada, our lean operating model allows us to deliver enterprise-grade outbound infrastructure at <span className="font-semibold text-zinc-900">$1,499/mo</span>—a fraction of the <span className="line-through text-zinc-400">$4,000+</span> retainer charged by US-based boutique agencies, while maintaining strict performance guarantees.
                </p>
             </section>
             
             <section className="bg-white border border-zinc-100 shadow-sm p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-200 transition-colors">
                <div className="flex items-center gap-4 mb-5">
                   <div className="p-3 bg-zinc-900 text-white rounded-xl">
                     <ArrowRight size={24} />
                   </div>
                   <h3 className="text-2xl font-semibold text-zinc-900">Direct Founder Commitment</h3>
                </div>
                <p className="text-lg text-zinc-600 leading-relaxed">
                   ARCH Revenues is intentionally built as a high-touch system with a tight client cap. You do not get passed off to junior account managers. I build your ICP lists, review your email sequences, monitor daily domain health, and manage positive reply qualification personally.
                </p>
             </section>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-zinc-100 text-center max-w-2xl mx-auto px-6">
          <p className="text-xl text-zinc-900 font-medium mb-10 leading-relaxed">
             If you run a marketing or dev agency and you&apos;re tired of relying on referrals, book a strategy call. <span className="text-zinc-500">If I can&apos;t help, I&apos;ll tell you in the first 10 minutes.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/strategy-call"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-teal-400 hover:to-teal-500 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
            >
              Book a 30-min strategy call <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-700 border border-zinc-200 bg-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-zinc-50 hover:border-zinc-300 transition-all"
            >
              See the Performance Pilot <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
