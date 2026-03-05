"use client";

import { FinalCTA } from "@/components/FinalCTA";
import { BarChart3, Building2, Users } from "lucide-react";

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      clientType: "Web Design Agency",
      industry: "Web Design",
      icon: <Users className="w-6 h-6 text-zinc-900" />,
      metrics: {
        meetings: "8",
        timeframe: "60 Days"
      },
      before: "A growing web design agency relied heavily on referrals and occasional inbound leads. When referrals slowed down, their pipeline became unpredictable and the founder had to spend hours every week manually prospecting.",
      strategy: "We defined their ideal client profile and targeted companies actively investing in website redesign and digital presence improvements.",
      execution: "We launched targeted outreach campaigns through email and LinkedIn, focusing on companies whose websites showed clear improvement opportunities.",
      results: "Within 60 days, the system generated 8 qualified meetings with decision makers at companies actively considering a website redesign."
    },
    {
      clientType: "Marketing Agency",
      industry: "B2B Marketing",
      icon: <Building2 className="w-6 h-6 text-zinc-900" />,
      metrics: {
        meetings: "18",
        timeframe: "90 Days"
      },
      before: "A B2B marketing agency depended mainly on referrals and partnerships for new clients. Growth was inconsistent and the team had no predictable way to generate new opportunities.",
      strategy: "We identified companies actively scaling their marketing teams and positioned the agency as a strategic partner for growth-stage businesses.",
      execution: "We built a targeted outbound campaign using personalized messaging across email and LinkedIn to reach marketing leaders at relevant companies.",
      results: "In 90 days, the campaign generated 18 qualified meetings with marketing decision makers looking for external agency support."
    },
    {
      clientType: "Development Agency",
      industry: "Software Development",
      icon: <BarChart3 className="w-6 h-6 text-zinc-900" />,
      metrics: {
        meetings: "9",
        timeframe: "60 Days"
      },
      before: "A development agency with strong technical capabilities struggled to consistently attract new clients. Most projects came through word of mouth, making revenue difficult to predict.",
      strategy: "We focused on companies building new digital products or expanding their engineering teams and positioned the agency as a reliable development partner.",
      execution: "We deployed personalized outreach campaigns targeting founders and product leaders through email and LinkedIn.",
      results: "Within 60 days, the outreach generated 9 qualified meetings with companies actively exploring development partnerships."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6"
          >
            Predictable Results
          </h1>
          <p 
            className="text-xl text-zinc-600 leading-relaxed"
          >
            How we engineer pipeline for B2B agencies.
          </p>
        </section>

        <section className="py-24 px-6 bg-white border-y border-zinc-200/50">
          <div className="max-w-7xl mx-auto space-y-24">
            {caseStudies.map((study, index) => (
              <div key={index} className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
                <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:sticky md:top-32">
                  <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center mb-6 shadow-sm">
                    {study.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-zinc-900 mb-2">{study.clientType}</h2>
                  <p className="text-zinc-500 font-medium mb-8">{study.industry}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Meetings Booked</div>
                      <div className="text-3xl font-bold text-zinc-900">{study.metrics.meetings}</div>
                    </div>
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Timeframe</div>
                      <div className="text-3xl font-bold text-zinc-900">{study.metrics.timeframe}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-12 pt-4">
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-mono">01</span>
                      Before ARCH
                    </h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">{study.before}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-mono">02</span>
                      The Strategy
                    </h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">{study.strategy}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-mono">03</span>
                      Execution
                    </h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">{study.execution}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-mono">04</span>
                      The Results
                    </h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">{study.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FinalCTA />
      </main>
    </div>
  );
}
