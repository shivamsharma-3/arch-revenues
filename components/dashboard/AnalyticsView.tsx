"use client";

import React from 'react';
import {
  Mail,
  CheckCircle,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Campaign Analytics</h2>
          <p className="text-xs text-zinc-500">
            Real-time outbound performance, inbox health, and meeting conversion rates.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-xs text-zinc-700 shadow-sm font-medium">
          <Calendar className="h-3.5 w-3.5 text-zinc-400" />
          <span>Last 30 Days (Active Sprint)</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase font-mono">
            <span>Total Sent</span>
            <Mail className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="text-3xl font-black text-zinc-900 font-mono">1,280</div>
          <div className="text-xs text-teal-700 font-bold flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+14.2% vs previous sprint</span>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase font-mono">
            <span>Verified Open Rate</span>
            <CheckCircle className="h-4 w-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-zinc-900 font-mono">48.2%</div>
          <div className="text-xs text-zinc-500">
            Industry Benchmark: <strong className="text-zinc-700 font-mono font-bold">21.0%</strong>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase font-mono">
            <span>Reply Rate</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-teal-700 font-mono">8.6%</div>
          <div className="text-xs text-teal-700 font-bold flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>4.7x industry avg (1.8%)</span>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase font-mono">
            <span>Strategy Calls Booked</span>
            <Calendar className="h-4 w-4 text-zinc-900" />
          </div>
          <div className="text-3xl font-black text-zinc-900 font-mono">24</div>
          <div className="text-xs text-zinc-500">
            Pipeline Value: <strong className="text-zinc-900 font-mono font-bold">$184,000</strong>
          </div>
        </div>
      </div>

      {/* Funnel & Domain Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Funnel */}
        <div className="lg:col-span-7 rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-900">Sprint Funnel Conversion</h3>
            <span className="text-xs text-zinc-500 font-mono">Sprint Week 3</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-zinc-600">Prospects Scraped & Enriched</span>
                <span className="font-mono text-zinc-900 font-bold">320 / 320 (100%)</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-800 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-zinc-600">Passed ICP 80+ Match</span>
                <span className="font-mono text-teal-700 font-bold">248 (77.5%)</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: '77.5%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-zinc-600">Email 1 Sent & Delivered</span>
                <span className="font-mono text-zinc-900 font-bold">210 (84.6%)</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-700 rounded-full" style={{ width: '65.6%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-zinc-600">Positive Replies Generated</span>
                <span className="font-mono text-teal-700 font-bold">18 replies</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-zinc-600">Qualified Meetings Scheduled</span>
                <span className="font-mono text-amber-600 font-bold">7 booked calls</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Domain Health */}
        <div className="lg:col-span-5 rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-teal-600" />
            Inbox Deliverability & Warmup
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs">
              <span className="text-zinc-700 font-mono">mail.archrevenues.com</span>
              <span className="text-teal-700 font-bold flex items-center gap-1">
                <Check className="h-3 w-3" /> 99.8% Health
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs">
              <span className="text-zinc-700 font-mono">outreach.archrevenues.io</span>
              <span className="text-teal-700 font-bold flex items-center gap-1">
                <Check className="h-3 w-3" /> 100% Health
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs">
              <span className="text-zinc-700 font-mono">growth.archrevenues.co</span>
              <span className="text-teal-700 font-bold flex items-center gap-1">
                <Check className="h-3 w-3" /> 99.2% Health
              </span>
            </div>
          </div>

          <p className="pt-2 text-xs text-zinc-500 leading-relaxed">
            All outbound domains are strictly throttled to under 50 emails/day per inbox with automatic SPF, DKIM, and DMARC verification.
          </p>
        </div>
      </div>

      {/* AI Executive Briefing */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">AI Executive Briefing</h3>
              <span className="text-xs text-zinc-500">Synthesized automatically by the Reporter Agent</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
            Sprint Week Ending: Sep 14, 2026
          </span>
        </div>

        <div className="text-xs text-zinc-700 leading-relaxed space-y-3 font-sans">
          <p>
            <strong>Executive Summary:</strong> Outbound campaigns delivered strong conversion this week. 210 tailored sequences reached founder-led agency targets, generating 18 replies and 7 booked 30-minute strategy calls.
          </p>
          <p>
            <strong>Top Signal Angle:</strong> Referencing specific hiring spikes (e.g. creative leads or media buyers) resulted in a 14.2% reply rate, outperforming generic value propositions by 2.4x.
          </p>
          <p>
            <strong>Safety Gate Performance:</strong> 3 pricing inquiries were routed to the Human-in-the-Loop review console. All three drafts were approved by the founder within 15 minutes, preserving high-touch agency trust.
          </p>
        </div>
      </div>
    </div>
  );
}
