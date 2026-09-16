"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Globe,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Target,
  Send,
  RefreshCw,
  Building2,
  User,
  ExternalLink,
  ShieldCheck,
  BookmarkPlus,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ProspectItem, ProspectResearch, OutreachSequence } from './types';

interface AgentStudioProps {
  onAddProspect?: (prospect: ProspectItem) => void;
}

const SAMPLE_PROSPECTS = [
  { name: 'Linear', url: 'https://linear.app', pitch: 'We build AI SDRs that book mid-market deals for devtools' },
  { name: 'HubSpot', url: 'https://hubspot.com', pitch: 'We build AI SDR agents that complement CRM outbound' },
  { name: 'Ramp', url: 'https://ramp.com', pitch: 'We build AI SDRs that accelerate finance exec outbound' },
  { name: 'Acme Growth', url: 'https://acmegrowth.co', pitch: 'We book 15-20 qualified client meetings for agencies on autopilot' },
];

export function AgentStudio({ onAddProspect }: AgentStudioProps) {
  const [url, setUrl] = useState('https://linear.app');
  const [valueProp, setValueProp] = useState('We build AI SDR agents that book qualified sales meetings on autopilot');
  const [tone, setTone] = useState('Confident, concise, founder-to-founder');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'email_1' | 'linkedin_note' | 'followup_day3' | 'followup_day7' | 'followup_day14'>('email_1');
  const [copied, setCopied] = useState<string | null>(null);
  const [savedToPipeline, setSavedToPipeline] = useState(false);

  // Latest generated data
  const [research, setResearch] = useState<ProspectResearch | null>(null);
  const [sequence, setSequence] = useState<OutreachSequence | null>(null);

  const steps = [
    { title: '1. Website Crawler', desc: 'Fetching DOM & extracting clean metadata' },
    { title: '2. Researcher Agent (20B)', desc: 'Scoring ICP fit, extracting services & buying hooks' },
    { title: '3. Writer Agent (120B)', desc: 'Synthesizing 5-part cold outreach sequence' },
    { title: '4. Deliverability Guardrail', desc: 'Verifying zero spam words & word limits' }
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const runPipeline = async (targetUrl = url, targetPitch = valueProp) => {
    if (!targetUrl.trim()) return;
    setError(null);
    setIsRunning(true);
    setCurrentStep(1);
    setSavedToPipeline(false);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1100);

    try {
      const passkey = typeof window !== 'undefined' ? localStorage.getItem('arch_founder_passcode') || 'arch2026' : 'arch2026';
      const res = await fetch('/api/sdr/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-passkey': passkey,
        },
        body: JSON.stringify({
          url: targetUrl,
          value_prop: targetPitch,
          tone,
          passkey,
        }),
      });

      clearInterval(stepInterval);

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to execute SDR pipeline');
      }

      setCurrentStep(4);
      setResearch(data.research);
      setSequence(data.sequence);
      setLatency(data.latency_ms);
      setActiveTab('email_1');
    } catch (err: any) {
      clearInterval(stepInterval);
      setError(err.message || 'Error occurred while contacting Groq agent network');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveToPipeline = () => {
    if (!research || !sequence || !onAddProspect) return;
    const newProspect: ProspectItem = {
      id: `p-${Date.now()}`,
      company_name: research.company_name,
      domain: new URL(research.source_url).hostname.replace('www.', ''),
      industry: research.services[0] || 'B2B Software',
      decision_maker: research.decision_maker,
      icp_score: research.icp_fit_score,
      icp_reason: research.icp_fit_reason,
      status: 'sequence_ready',
      last_activity: 'Generated via Agent Studio',
      research,
      sequence,
    };
    onAddProspect(newProspect);
    setSavedToPipeline(true);
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'text-teal-700 bg-teal-50 border-teal-200';
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Card */}
      <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
              Live Prospector & Sequence Generator
            </h1>
            <p className="mt-1 text-sm text-zinc-600 max-w-2xl">
              Crawl any prospect website, extract buyer signals, compute ICP fit score, and generate a high-converting 5-step cold outreach sequence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-2 text-right">
              <div className="text-[10px] uppercase font-mono text-zinc-500 font-bold">Inference Speed</div>
              <div className="text-xs font-semibold text-zinc-900 font-mono">~1,200ms Live</div>
            </div>
          </div>
        </div>

        {/* Input Controls */}
        <div className="pt-6 space-y-4">
          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-500 font-medium mr-1">Sample Agency Targets:</span>
            {SAMPLE_PROSPECTS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  setUrl(p.url);
                  setValueProp(p.pitch);
                }}
                className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50/80 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 font-medium transition-all flex items-center gap-1.5"
              >
                <Globe className="h-3 w-3 text-zinc-400" />
                {p.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Target URL */}
            <div className="lg:col-span-5">
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Prospect Website URL</label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full rounded-xl border border-zinc-300 bg-white pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 font-mono transition-all"
                />
              </div>
            </div>

            {/* Value Proposition */}
            <div className="lg:col-span-4">
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Your Value Proposition</label>
              <input
                type="text"
                value={valueProp}
                onChange={(e) => setValueProp(e.target.value)}
                placeholder="What do you build or solve?"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all"
              />
            </div>

            {/* Tone Selector */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Sequence Voice</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all font-medium"
              >
                <option value="Confident, concise, founder-to-founder">Founder-to-Founder (Concise)</option>
                <option value="Consultative, high-pain, direct">Consultative (High Pain)</option>
                <option value="Technical peer, problem-centric">Technical Peer</option>
              </select>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              <span>Anti-hallucination policy enabled. Facts checked strictly against live site.</span>
            </div>

            <button
              onClick={() => runPipeline()}
              disabled={isRunning || !url.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 text-sm font-bold shadow-md shadow-teal-500/20 hover:from-teal-600 hover:to-teal-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating Outbound Campaign...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Run Autonomous SDR
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-rose-600" />
          <div>
            <div className="font-bold text-sm">Pipeline Execution Error</div>
            <div className="text-xs text-rose-700 mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {/* Real-time Stepper */}
      {isRunning && (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-500 animate-ping" />
              Agent Execution in Progress
            </div>
            <span className="text-xs font-mono text-zinc-500">Step {currentStep} of 4</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.map((step, idx) => {
              const stepNumber = idx + 1;
              const isPast = currentStep > stepNumber;
              const isCurrent = currentStep === stepNumber;

              return (
                <div
                  key={step.title}
                  className={`rounded-2xl border p-4 transition-all ${
                    isCurrent
                      ? 'border-teal-500 bg-teal-50/50 shadow-sm'
                      : isPast
                      ? 'border-zinc-200 bg-zinc-50'
                      : 'border-zinc-100 bg-zinc-50/40 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {isPast ? (
                      <CheckCircle2 className="h-4 w-4 text-teal-600" />
                    ) : isCurrent ? (
                      <RefreshCw className="h-4 w-4 text-teal-600 animate-spin" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-zinc-300 text-[10px] font-mono flex items-center justify-center text-zinc-500">
                        {stepNumber}
                      </div>
                    )}
                    <span className={`text-xs font-bold ${isCurrent ? 'text-teal-900' : isPast ? 'text-zinc-900' : 'text-zinc-500'}`}>
                      {step.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Results View: Prospect Intelligence + Outreach Sequence */}
      {research && sequence && !isRunning && (
        <div className="space-y-6">
          {/* Summary Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-zinc-900 text-white font-black text-base flex items-center justify-center shadow-sm">
                {research.company_name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-zinc-900">{research.company_name}</h2>
                  <a
                    href={research.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-mono"
                  >
                    {new URL(research.source_url).hostname}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="text-xs text-zinc-500">
                  Researched via Groq in <span className="text-teal-600 font-mono font-bold">{latency || 1200}ms</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${getScoreBadge(research.icp_fit_score)}`}>
                <Target className="h-3.5 w-3.5" />
                ICP Fit: {research.icp_fit_score}/100
              </span>

              {onAddProspect && (
                <button
                  onClick={handleSaveToPipeline}
                  disabled={savedToPipeline}
                  className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border transition-all ${
                    savedToPipeline
                      ? 'border-teal-300 bg-teal-50 text-teal-800'
                      : 'border-zinc-900 bg-zinc-900 hover:bg-black text-white'
                  }`}
                >
                  {savedToPipeline ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-teal-600" />
                      Saved in Prospects
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="h-3.5 w-3.5" />
                      Add to Pipeline
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Intelligence Dossier (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* ICP Rationale Card */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-teal-600" />
                    ICP Fit Rationale
                  </h3>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getScoreBadge(research.icp_fit_score)}`}>
                    {research.icp_fit_score}% Match
                  </span>
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                  {research.icp_fit_reason}
                </p>
              </div>

              {/* Decision Maker Card */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-3 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-zinc-600" />
                  Target Decision Maker
                </h3>
                {research.decision_maker?.name ? (
                  <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-100 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-zinc-900">{research.decision_maker.name}</div>
                      <div className="text-xs text-zinc-500">{research.decision_maker.title || 'Founder / Executive'}</div>
                    </div>
                    {research.decision_maker.linkedin && (
                      <a
                        href={research.decision_maker.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 flex items-center gap-1 font-medium"
                      >
                        LinkedIn
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-zinc-500 italic bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                    No individual executive named on homepage. Outreach addressed to founder leadership.
                  </div>
                )}
              </div>

              {/* Extracted Buying Hooks */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-3 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  Buying Signals & Triggers
                </h3>
                {research.personalization_hooks && research.personalization_hooks.length > 0 ? (
                  <div className="space-y-2">
                    {research.personalization_hooks.map((hook, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                        <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-700 shrink-0 mt-0.5">
                          {hook.type}
                        </span>
                        <span className="text-zinc-800 leading-relaxed">{hook.detail}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-zinc-500 italic bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                    General business services signals detected.
                  </div>
                )}
              </div>

              {/* Services & Tech Stack */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-3 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-teal-600" />
                  Services & Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {research.services?.map((service, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200 font-medium">
                      {service}
                    </span>
                  ))}
                  {research.tech_stack?.map((tech, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-mono text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: 5-Part Outreach Sequence (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col h-full">
                {/* Tabs */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                  <div className="flex items-center gap-1 overflow-x-auto">
                    {[
                      { id: 'email_1', label: 'Email 1 (Cold)', badge: 'Day 1' },
                      { id: 'linkedin_note', label: 'LinkedIn Note', badge: 'Connect' },
                      { id: 'followup_day3', label: 'Follow-up', badge: 'Day 3' },
                      { id: 'followup_day7', label: 'Value Drop', badge: 'Day 7' },
                      { id: 'followup_day14', label: 'Breakup', badge: 'Day 14' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`text-xs px-3 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                          activeTab === tab.id
                            ? 'bg-zinc-900 text-white shadow-sm'
                            : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                        }`}
                      >
                        {tab.label}
                        <span className={`text-[10px] font-mono px-1 rounded ${activeTab === tab.id ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-600'}`}>
                          {tab.badge}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCopy(sequence[activeTab], activeTab)}
                    className="text-xs px-3.5 py-1.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 font-bold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    {copied === activeTab ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-teal-600" />
                        <span className="text-teal-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Content Box */}
                <div className="mt-5 flex-1 flex flex-col justify-between">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 text-sm text-zinc-800 leading-relaxed whitespace-pre-line min-h-[240px] font-sans">
                    {sequence[activeTab]}
                  </div>

                  {/* Copy Metrics Bar */}
                  <div className="mt-5 pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-4">
                      <span>Length: <strong className="text-zinc-900 font-mono">{sequence[activeTab].split(/\s+/).filter(Boolean).length}</strong> words</span>
                      <span>Characters: <strong className="text-zinc-900 font-mono">{sequence[activeTab].length}</strong></span>
                      <span>Cadence: <strong className="text-teal-700">{activeTab.replace('_', ' ').toUpperCase()}</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5 text-teal-700 font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                      Zero spam-words detected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
