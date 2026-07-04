'use client';

import Link from 'next/link';

export function HowItWorks() {
  const steps = [
    { 
      number: "1",
      title: "We map your ICP", 
      desc: "We build a 200-account list of SaaS companies matching your ICP — with named decision-makers verified on LinkedIn.", 
      timing: "Week 1"
    },
    { 
      number: "2",
      title: "We build the infrastructure", 
      desc: "3 sending domains, SPF/DKIM/DMARC configured, Brevo + Apollo wired up, inbox warmup started.", 
      timing: "Week 1"
    },
    { 
      number: "3",
      title: "We launch the sequence", 
      desc: "7-touch email + LinkedIn sequence goes live. 30-50 emails/day per domain. Every reply logged.", 
      timing: "Week 2"
    },
    { 
      number: "4",
      title: "We book and report", 
      desc: "Replies converted to meetings on your calendar. Weekly report every Monday — opens, replies, meetings booked.", 
      timing: "Week 3+"
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-white overflow-hidden border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-[#1A2330] tracking-tight mb-4">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-zinc-50 border border-zinc-200 rounded-xl p-8 flex flex-col h-full">
              <div className="text-[48px] font-bold text-[#D4875A] leading-none mb-6">
                {step.number}
              </div>
              <h3 className="text-[20px] font-bold text-[#1A2330] mb-4">
                {step.title}
              </h3>
              <p className="text-[#506070] font-normal leading-relaxed mb-8 flex-grow">
                {step.desc}
              </p>
              <div className="text-[14px] text-zinc-500 italic">
                {step.timing}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/strategy-call"
            className="inline-flex w-full sm:w-auto items-center justify-center bg-[#D4875A] text-white px-8 py-4 rounded-xl text-[18px] font-bold hover:bg-[#c2794e] transition-all shadow-lg hover:shadow-[#D4875A]/20"
          >
            Book a 20-min fit call →
          </Link>
        </div>
      </div>
    </section>
  );
}
