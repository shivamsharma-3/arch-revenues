"use client";

import React, { useState } from 'react';
import {
  Sliders,
  Cpu,
  Shield,
  Target,
  Mail,
  Save,
  Check,
  Zap,
  Lock,
  Globe
} from 'lucide-react';

export function SettingsView() {
  const [provider, setProvider] = useState<'groq' | 'anthropic' | 'gemini'>('groq');
  const [maxEmailsPerDay, setMaxEmailsPerDay] = useState(50);
  const [researcherModel, setResearcherModel] = useState('openai/gpt-oss-20b');
  const [writerModel, setWriterModel] = useState('openai/gpt-oss-120b');
  const [targetRevenue, setTargetRevenue] = useState('$500K - $5M ARR');
  const [defaultOffer, setDefaultOffer] = useState('Free 30-min outbound growth strategy call');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white">Agent Settings & Safety Guardrails</h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Configure model routing, daily sending limits, ICP scoring rules, and outbound client briefs.
        </p>
      </div>

      {/* Model Provider */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Cpu className="h-4 w-4 text-emerald-400" />
          Inference Engine & Model Routing
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => setProvider('groq')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              provider === 'groq'
                ? 'border-emerald-500/50 bg-emerald-500/10 shadow-md shadow-emerald-500/5'
                : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                Groq LPU™
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              Sub-second inference via openai/gpt-oss-20b and 120b. Zero cost for developer testing.
            </p>
          </div>

          <div
            onClick={() => setProvider('anthropic')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              provider === 'anthropic'
                ? 'border-purple-500/50 bg-purple-500/10'
                : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-white">Anthropic Claude</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                PROD
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              Claude 3.5 Sonnet & Haiku. Production-grade agency outreach with nuance.
            </p>
          </div>

          <div
            onClick={() => setProvider('gemini')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              provider === 'gemini'
                ? 'border-blue-500/50 bg-blue-500/10'
                : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-white">Google Gemini</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                HYBRID
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              Gemini 2.5 Flash. Ultra-fast scraping extraction and lead qualification.
            </p>
          </div>
        </div>

        {provider === 'groq' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-800/80">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Researcher Model</label>
              <select
                value={researcherModel}
                onChange={(e) => setResearcherModel(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="openai/gpt-oss-20b">openai/gpt-oss-20b (Recommended - 600 tok/s)</option>
                <option value="qwen/qwen3.8-27b">qwen/qwen3.8-27b</option>
                <option value="openai/gpt-oss-120b">openai/gpt-oss-120b</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Writer Model</label>
              <select
                value={writerModel}
                onChange={(e) => setWriterModel(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="openai/gpt-oss-120b">openai/gpt-oss-120b (Recommended - High Nuance)</option>
                <option value="openai/gpt-oss-20b">openai/gpt-oss-20b</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Sending Safety Limits */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-400" />
          Domain Protection & Sending Throttles
        </h3>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-zinc-300 mb-2">
              <span>Max Emails Per Sending Domain Per Day</span>
              <span className="font-mono text-emerald-400 font-bold">{maxEmailsPerDay} / day</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={maxEmailsPerDay}
              onChange={(e) => setMaxEmailsPerDay(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Safety rule: Sending more than 50 emails/day per inbox increases spam risk. We recommend 35-50 during active warm-up.
            </p>
          </div>
        </div>
      </div>

      {/* ICP Configuration */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Target className="h-4 w-4 text-cyan-400" />
          ICP & Value Proposition
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Target Revenue Profile</label>
            <input
              type="text"
              value={targetRevenue}
              onChange={(e) => setTargetRevenue(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Default Call-To-Action Offer</label>
            <input
              type="text"
              value={defaultOffer}
              onChange={(e) => setDefaultOffer(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {saved && (
          <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <Check className="h-4 w-4" />
            Settings updated successfully
          </span>
        )}

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2.5 text-xs font-bold text-black hover:from-emerald-400 hover:to-teal-400 transition-all shadow-md shadow-emerald-500/20"
        >
          <Save className="h-3.5 w-3.5" />
          Save Preferences
        </button>
      </div>
    </div>
  );
}
