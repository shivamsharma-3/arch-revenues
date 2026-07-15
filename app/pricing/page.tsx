import { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | ARCH Revenues",
  description: "$499 setup + $1,499/mo. 5-12 qualified demos/mo guaranteed — or that month's retainer is refunded. 1-month commit. Founding rate for first 3 clients.",
};

export default function PricingPage() {
  const timeline = [
    { days: "Day 1-2", task: "Domain + DNS + inboxes" },
    { days: "Day 1-14", task: "Inbox warmup (parallel)" },
    { days: "Day 3-7", task: "ICP build — 200 accounts" },
    { days: "Day 8-10", task: "Sequence writing + your approval" },
    { days: "Day 14-21", task: "First emails go out" },
  ];

  const includes = [
    "200-account prospect list, built from your ICP, verified",
    "3 warmed sending domains + full infra setup",
    "7-touch email + LinkedIn sequence, personalized per prospect",
    "90-150 emails/day across 3 domains",
    "Reply handling within 4 business hours (positive, negative, unsubscribe)",
    "Qualified demos routed to your Calendly with pre-meeting brief",
    "Monday report — opens, replies, meetings, domain health",
    "Monthly 30-min strategy call",
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      {/* Hero Section */}
      <section className="text-center px-6 py-12 md:py-20">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6">
          Pricing
        </h1>
        <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
          Outbound that books demos. Not promises.
        </p>
      </section>

      {/* Pricing Card */}
      <section className="px-6 mb-24">
        <div className="max-w-4xl mx-auto bg-zinc-50 border-2 border-zinc-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-zinc-900/5">
          <div className="text-center mb-10 border-b border-zinc-200 pb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 mb-4">
              $499 setup &middot; $1,499/mo &middot; 1-month commit
            </h2>
            <p className="text-zinc-600">
              Founding rate locked for first 3 clients — moves to $4,000/mo for client #4.
            </p>
          </div>
          
          <div className="space-y-8 mb-10 text-zinc-700 leading-relaxed">
            <div>
              <strong className="text-zinc-900">Setup covers:</strong> 3 sending domains, Google Workspace inboxes, SPF/DKIM/DMARC, Apollo data, ICP build, sequence writing, 14-day inbox warmup. One-time. Takes 14-21 days.
            </div>
            <div>
              <strong className="text-zinc-900">Monthly retainer covers:</strong> ongoing sending (90-150 emails/day across 3 domains), LinkedIn touches, reply handling within 4 business hours, Monday weekly report, monthly strategy call.
            </div>
            <div className="bg-white border border-zinc-200 p-5 rounded-xl text-zinc-900">
              <strong>The guarantee:</strong> If I book fewer than 5 qualified demos in any month, that month's retainer is refunded. No argument, no fine print.
            </div>
            <div>
              Most clients see 5-7 demos in month 1, 7-12 by month 2.
            </div>
          </div>
          
          <div className="text-center">
            <Link
              href="/strategy-call"
              className="inline-block bg-zinc-900 text-white px-8 py-5 rounded-xl text-lg font-semibold hover:bg-zinc-800 transition-all shadow-lg w-full sm:w-auto"
            >
              Book a strategy call
            </Link>
          </div>
        </div>
      </section>

      {/* Setup Timeline */}
      <section className="px-6 mb-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-zinc-900 mb-8 text-center">
            What happens in the first 21 days
          </h2>
          <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden mb-6">
            <div className="divide-y divide-zinc-100">
              {timeline.map((item, i) => (
                <div key={i} className="flex p-5 hover:bg-zinc-50 transition-colors">
                  <div className="w-32 shrink-0 font-mono text-zinc-500 font-medium">
                    {item.days}
                  </div>
                  <div className="text-zinc-900 font-medium">
                    {item.task}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-zinc-500 text-sm font-medium">
            Month 1 retainer starts when sending begins — not when you sign.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="px-6 mb-24 bg-zinc-50 py-20 border-y border-zinc-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-zinc-900 mb-10 text-center">
            What's included
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {includes.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <Check className="w-6 h-6 text-zinc-900 shrink-0" />
                <span className="text-zinc-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="px-6 mb-24">
        <div className="max-w-3xl mx-auto bg-zinc-900 text-white rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            The guarantee
          </h2>
          <p className="text-xl text-zinc-300 font-medium mb-8">
            If I book fewer than 5 qualified demos in any month, that month's retainer is refunded in full.
          </p>
          <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50 text-left text-zinc-400 leading-relaxed text-sm">
            A "qualified demo" = a prospect matching the ICP we agreed on at kickoff, who shows up to a scheduled call. No-shows don't count. ICP matches are defined together before any work starts — no ambiguity later.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-zinc-900 mb-8">
            Ready to build your outbound pipeline?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/strategy-call"
              className="bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-zinc-800 transition-all shadow-md"
            >
              Book a strategy call
            </Link>
            <Link
              href="/audit"
              className="bg-white text-zinc-900 border border-zinc-200 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-zinc-50 transition-all shadow-sm"
            >
              Fill out the ICP worksheet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
