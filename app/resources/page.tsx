import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Server, Target, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Outbound Growth Resources & Guides | ARCH Revenues",
  description:
    "Actionable guides, frameworks, and tools for founder-led agencies building predictable cold email and LinkedIn acquisition pipelines.",
  alternates: {
    canonical: "https://www.archrevenues.com/resources",
  },
};

const guides = [
  {
    icon: Server,
    category: "Infrastructure & Deliverability",
    title: "The Technical Email Infrastructure Blueprint (SPF, DKIM, DMARC, Warmup)",
    description:
      "Why 90% of agency cold email lands in spam and how to set up secondary lookalike domains, Google Workspace inboxes, and gradual inbox warmup for 95%+ deliverability.",
    readTime: "8 min read",
    tag: "Technical Setup",
    href: "/how-it-works",
    status: "Interactive Blueprint",
  },
  {
    icon: Target,
    category: "ICP & List Building",
    title: "The 8-Question ICP Framework for Founder-Led Agencies",
    description:
      "How to filter out unqualified leads, define trigger events that signal buying intent, and build verified 200-account decision-maker prospect lists.",
    readTime: "6 min read",
    tag: "Strategy",
    href: "/icp-worksheet",
    status: "5-Min Lead Magnet",
  },
  {
    icon: Mail,
    category: "Sequence Engineering",
    title: "The 7-Touch Cold Email + LinkedIn Sequence Architecture",
    description:
      "A complete breakdown of pattern-interrupt openers, value-add follow-ups, case study proof touches, and LinkedIn voice notes engineered to target industry benchmark 15–25% positive reply rates.",
    readTime: "10 min read",
    tag: "Copywriting",
    href: "/tools/email-generator",
    status: "Interactive AI Tool",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 pt-24 pb-16 md:pt-36 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-700 text-xs font-mono font-bold uppercase tracking-widest mb-6 border border-zinc-200">
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              Outbound Playbook & Guides
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-6">
              Resources for Agency Founders
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed">
              Step-by-step guides, technical blueprints, and teardowns to help founder-led marketing and development agencies build predictable outbound acquisition engines.
            </p>
          </div>

          {/* Interactive Tools Strip */}
          <div className="bg-zinc-900 text-white rounded-3xl p-8 md:p-10 mb-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest block mb-2">
                Free Interactive Tools
              </span>
              <h2 className="text-2xl font-semibold mb-2">
                Cold Email Generator & ICP Worksheet
              </h2>
              <p className="text-zinc-400 text-sm max-w-xl">
                Test our AI personalized cold email writer or complete our 8-question ICP worksheet before spending a dollar on outreach.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/tools/email-generator"
                className="bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold px-5 py-3 rounded-xl text-sm transition-all text-center"
              >
                AI Email Generator →
              </Link>
              <Link
                href="/icp-worksheet"
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-5 py-3 rounded-xl text-sm border border-zinc-700 transition-all text-center"
              >
                ICP Worksheet →
              </Link>
            </div>
          </div>

          {/* Featured Guides Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {guides.map((guide, idx) => {
              const IconComponent = guide.icon;
              return (
                <Link
                  key={idx}
                  href={guide.href}
                  className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-zinc-100 text-zinc-900 rounded-2xl group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                        {guide.tag}
                      </span>
                    </div>
                    <p className="text-xs font-mono font-bold text-teal-600 uppercase tracking-widest mb-2">
                      {guide.category}
                    </p>
                    <h3 className="text-xl font-bold text-zinc-900 mb-3 leading-snug group-hover:text-teal-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                      {guide.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-medium text-zinc-500">
                    <span>{guide.readTime}</span>
                    <span className="text-zinc-900 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      {guide.status} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-zinc-50 border border-zinc-200 rounded-3xl p-10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">
              Want us to build and run this system for you?
            </h3>
            <p className="text-zinc-600 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Skip the technical learning curve. We handle domain setup, list building, copy creation, reply handling, and guaranteed booked demos.
            </p>
            <Link
              href="/strategy-call"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:from-teal-400 hover:to-teal-500 transition-all shadow-md"
            >
              Book a 30-min strategy call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
