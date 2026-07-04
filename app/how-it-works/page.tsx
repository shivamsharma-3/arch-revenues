"use client";

import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    { 
      number: "1",
      title: "We map your ICP", 
      desc: "We build a 200-account list of SaaS companies matching your ICP — with named decision-makers verified on LinkedIn. We don't use generic lists or scraped databases that are years out of date. Instead, we manually verify each account fits your exact revenue range and headcount requirements, and we find the specific founder or sales leader who is doing the outreach themselves.", 
      timing: "Week 1"
    },
    { 
      number: "2",
      title: "We build the infrastructure", 
      desc: "3 sending domains, SPF/DKIM/DMARC configured, Brevo + Apollo wired up, inbox warmup started. We handle the entire technical setup so your main domain is never put at risk. We purchase lookalike domains, configure all necessary DNS records for deliverability, set up the Google Workspaces, and connect the sending infrastructure. Then we begin a rigorous warmup process to ensure high inbox placement.", 
      timing: "Week 1"
    },
    { 
      number: "3",
      title: "We launch the sequence", 
      desc: "7-touch email + LinkedIn sequence goes live. 30-50 emails/day per domain. Every reply logged. We write the copy based on your specific value proposition, focusing on the pain points of your SaaS buyers. The sequence uses a multi-channel approach to stay top-of-mind without being annoying. We monitor deliverability daily and adjust sending volumes to maintain perfect domain health.", 
      timing: "Week 2"
    },
    { 
      number: "4",
      title: "We book and report", 
      desc: "Replies converted to meetings on your calendar. Weekly report every Monday — opens, replies, meetings booked. When prospects reply, we handle the inbox management. We qualify the lead, handle common objections, and route them directly to your calendar. You receive a transparent, no-fluff report every Monday showing exactly what happened the previous week.", 
      timing: "Week 3+"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-20 pb-12 md:pt-32 md:pb-24 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-[32px] md:text-[48px] font-bold text-[#1A2330] tracking-tight mb-16 text-center">
          How It Works
        </h1>
        
        <div className="space-y-12 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-white border border-zinc-200 rounded-xl p-8 md:p-12">
              <div className="text-[64px] font-bold text-[#D4875A] leading-none mb-6">
                {step.number}
              </div>
              <h2 className="text-[24px] font-bold text-[#1A2330] mb-4">
                {step.title}
              </h2>
              <p className="text-[18px] text-[#506070] font-normal leading-relaxed mb-6">
                {step.desc}
              </p>
              <div className="text-[14px] text-zinc-500 italic">
                {step.timing}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/strategy-call"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#D4875A] text-white px-8 py-4 rounded-xl text-[18px] font-bold hover:bg-[#c2794e] transition-all shadow-lg hover:shadow-[#D4875A]/20"
          >
            Book a 20-min fit call →
          </Link>
          <Link
            href="/icp-worksheet"
            className="text-[#1A2330] text-[16px] underline hover:text-[#D4875A] transition-colors"
          >
            Download the ICP worksheet
          </Link>
        </div>
      </main>
    </div>
  );
}
