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
             <div className="w-24 h-24 bg-zinc-200 rounded-full mb-6 flex items-center justify-center text-zinc-400 shadow-inner">
               <User size={40} />
             </div>
             <h2 className="text-xl font-bold text-zinc-900 mb-1">Shivam Sharma</h2>
             <p className="text-zinc-500 font-mono text-xs mb-6 uppercase tracking-widest">Founder</p>
             <p className="text-sm text-zinc-600 mb-8 leading-relaxed">
               Based in Hyderabad, India. Building scalable outbound systems for B2B SaaS companies.
             </p>
             <a 
               href="https://www.linkedin.com/in/shivam-sharma1203/" 
               target="_blank"
               rel="noopener noreferrer"
               className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] text-white py-3 rounded-xl font-semibold hover:bg-[#004182] transition-colors shadow-sm"
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
                   <h3 className="text-2xl font-semibold text-zinc-900">The Unseen Infrastructure</h3>
                </div>
                <p className="text-lg text-zinc-600 leading-relaxed">
                   My background is in building the unglamorous infrastructure that makes cold email work: SPF, DKIM, DMARC, inbox warmup, and domain rotation. It's the technical foundation most agencies skip, which is exactly why their campaigns fail.
                </p>
             </section>
             
             <section className="bg-white border border-zinc-100 shadow-sm p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-200 transition-colors">
                <div className="flex items-center gap-4 mb-5">
                   <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                     <MailWarning size={24} />
                   </div>
                   <h3 className="text-2xl font-semibold text-zinc-900">Why Outbound Fails for Founders</h3>
                </div>
                <p className="text-lg text-zinc-600 leading-relaxed">
                   I started ARCH Revenues because I watched too many SaaS founders try cold email themselves, fail, and conclude that cold email doesn&apos;t work. It does work. They were just missing the infrastructure layer.
                </p>
             </section>

             <section className="bg-white border border-zinc-100 shadow-sm p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-200 transition-colors">
                <div className="flex items-center gap-4 mb-5">
                   <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                     <Globe size={24} />
                   </div>
                   <h3 className="text-2xl font-semibold text-zinc-900">The Geographic Advantage</h3>
                </div>
                <p className="text-lg text-zinc-600 leading-relaxed">
                   My clients are in the US, UK, and Australia. The geography is not a handicap. It is the reason I can charge <span className="font-semibold text-zinc-900">$1,499/mo</span> for a service that US-based agencies charge <span className="line-through text-zinc-400">$3,500/mo</span> to deliver, and still book calls with the same caliber of SaaS founder.
                </p>
             </section>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-zinc-100 text-center max-w-2xl mx-auto px-6">
          <p className="text-xl text-zinc-900 font-medium mb-10 leading-relaxed">
             If you&apos;re a SaaS founder between $20K and $100K MRR and you&apos;re tired of relying on referrals, book a strategy call. <span className="text-zinc-500">If I can&apos;t help, I&apos;ll tell you in the first 10 minutes.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/strategy-call"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-teal-400 hover:to-teal-500 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
            >
              Book a 20-min strategy call <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
