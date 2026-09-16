"use client";

import React, { useState } from 'react';
import {
  Search,
  ExternalLink,
  Target,
  User,
  Sparkles,
  ChevronRight,
  X,
  Copy,
  Check,
  CheckCircle2,
  Mail,
  Send,
  Building2,
  BookmarkPlus
} from 'lucide-react';
import { ProspectItem } from './types';

interface ProspectsViewProps {
  prospects: ProspectItem[];
  onUpdateStatus?: (id: string, newStatus: ProspectItem['status']) => void;
}

export function ProspectsView({ prospects, onUpdateStatus }: ProspectsViewProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedProspect, setSelectedProspect] = useState<ProspectItem | null>(null);
  const [activeSequenceTab, setActiveSequenceTab] = useState<'email_1' | 'linkedin_note' | 'followup_day3' | 'followup_day7' | 'followup_day14'>('email_1');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredProspects = prospects.filter((p) => {
    const matchesSearch =
      p.company_name.toLowerCase().includes(search.toLowerCase()) ||
      p.domain.toLowerCase().includes(search.toLowerCase()) ||
      (p.decision_maker.name && p.decision_maker.name.toLowerCase().includes(search.toLowerCase())) ||
      p.industry.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'all') return true;
    if (filterStatus === 'high_icp') return p.icp_score >= 80;
    return p.status === filterStatus;
  });

  const getStatusBadge = (status: ProspectItem['status']) => {
    switch (status) {
      case 'meeting_booked':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200"><CheckCircle2 className="h-3 w-3 text-teal-600" /> Meeting Booked</span>;
      case 'replied':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200"><Mail className="h-3 w-3 text-blue-600" /> Replied</span>;
      case 'in_sequence':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200"><Send className="h-3 w-3 text-purple-600" /> In Sequence</span>;
      case 'approved':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200"><Check className="h-3 w-3 text-emerald-600" /> Approved</span>;
      case 'sequence_ready':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200"><Sparkles className="h-3 w-3 text-amber-600" /> Sequence Ready</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">Researched</span>;
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'text-teal-800 bg-teal-50 border-teal-200';
    if (score >= 60) return 'text-amber-800 bg-amber-50 border-amber-200';
    return 'text-rose-800 bg-rose-50 border-rose-200';
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Prospect Intelligence Pipeline</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            {prospects.length} total prospect companies enriched with buyer triggers and tailored sequences.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, founder..."
              className="rounded-xl border border-zinc-300 bg-white pl-9 pr-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none transition-all w-56 sm:w-64"
            />
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-zinc-200 text-xs shadow-sm">
            {[
              { id: 'all', label: 'All' },
              { id: 'high_icp', label: '80+ ICP' },
              { id: 'in_sequence', label: 'In Sequence' },
              { id: 'meeting_booked', label: 'Booked' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterStatus === f.id
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50 uppercase text-[11px] tracking-wider text-zinc-500 font-mono font-bold">
              <tr>
                <th className="px-6 py-4">Company & Domain</th>
                <th className="px-6 py-4">Decision Maker</th>
                <th className="px-6 py-4">ICP Match</th>
                <th className="px-6 py-4">Key Trigger</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredProspects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelectedProspect(p)}
                  className="hover:bg-zinc-50/80 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        {p.company_name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-zinc-900 group-hover:text-teal-600 transition-colors flex items-center gap-1.5">
                          {p.company_name}
                        </div>
                        <span className="text-[11px] text-zinc-500 font-mono">{p.domain}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {p.decision_maker?.name ? (
                      <div>
                        <div className="font-bold text-zinc-800">{p.decision_maker.name}</div>
                        <div className="text-[11px] text-zinc-500">{p.decision_maker.title || 'Founder'}</div>
                      </div>
                    ) : (
                      <span className="text-zinc-400 italic">Founder Team</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold ${getScoreBadge(p.icp_score)}`}>
                      {p.icp_score}%
                    </span>
                  </td>

                  <td className="px-6 py-4 max-w-xs">
                    <div className="truncate text-zinc-700 font-medium">
                      {p.research.personalization_hooks?.[0]?.detail || p.icp_reason}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(p.status)}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1 text-zinc-500 group-hover:text-zinc-900 font-bold">
                      <span>Review</span>
                      <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProspects.length === 0 && (
            <div className="text-center py-16 text-zinc-400 text-xs">
              No matching prospects found. Analyze a target URL in the Live Prospector to populate your pipeline.
            </div>
          )}
        </div>
      </div>

      {/* Slide-over Detail Drawer */}
      {selectedProspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm p-2 sm:p-4">
          <div className="h-full w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-900 text-white font-black text-lg flex items-center justify-center shadow-md">
                    {selectedProspect.company_name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-zinc-900">{selectedProspect.company_name}</h3>
                      {getStatusBadge(selectedProspect.status)}
                    </div>
                    <a
                      href={selectedProspect.research.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-mono"
                    >
                      {selectedProspect.domain}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProspect(null)}
                  className="rounded-xl p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status & ICP Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500 font-medium">ICP Match:</span>
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold border ${getScoreBadge(selectedProspect.icp_score)}`}>
                    {selectedProspect.icp_score}/100
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500 font-medium">Pipeline Stage:</span>
                  <select
                    value={selectedProspect.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as ProspectItem['status'];
                      setSelectedProspect({ ...selectedProspect, status: newStatus });
                      if (onUpdateStatus) onUpdateStatus(selectedProspect.id, newStatus);
                    }}
                    className="text-xs rounded-xl border border-zinc-300 bg-white text-zinc-900 font-bold px-3 py-1.5 focus:outline-none"
                  >
                    <option value="researched">Researched</option>
                    <option value="sequence_ready">Sequence Ready</option>
                    <option value="approved">Approved</option>
                    <option value="in_sequence">In Sequence</option>
                    <option value="replied">Replied</option>
                    <option value="meeting_booked">Meeting Booked</option>
                  </select>
                </div>
              </div>

              {/* Strategic Intelligence */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-teal-600" />
                  Strategic Fit Analysis
                </h4>
                <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200/70 text-xs text-zinc-800 leading-relaxed">
                  {selectedProspect.icp_reason}
                </div>

                <div className="space-y-1.5">
                  {selectedProspect.research.personalization_hooks?.map((hook, i) => (
                    <div key={i} className="flex items-start gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-200/60 text-xs">
                      <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-700 shrink-0">
                        {hook.type}
                      </span>
                      <span className="text-zinc-800 font-medium">{hook.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5-Step Outreach Sequence Tabs */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-teal-600" />
                    5-Touch Outreach Sequence
                  </h4>

                  <button
                    onClick={() => handleCopy(selectedProspect.sequence[activeSequenceTab], activeSequenceTab)}
                    className="text-xs px-3 py-1 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-bold flex items-center gap-1.5"
                  >
                    {copiedKey === activeSequenceTab ? (
                      <>
                        <Check className="h-3 w-3 text-teal-600" />
                        <span className="text-teal-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 text-zinc-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Tab buttons */}
                <div className="flex items-center gap-1 overflow-x-auto bg-zinc-100 p-1 rounded-2xl border border-zinc-200">
                  {[
                    { id: 'email_1', label: 'Email 1' },
                    { id: 'linkedin_note', label: 'LinkedIn' },
                    { id: 'followup_day3', label: 'Day 3' },
                    { id: 'followup_day7', label: 'Day 7' },
                    { id: 'followup_day14', label: 'Day 14' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSequenceTab(tab.id as any)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                        activeSequenceTab === tab.id
                          ? 'bg-white text-zinc-900 shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Copy box */}
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-xs text-zinc-800 whitespace-pre-line leading-relaxed min-h-[160px] font-sans">
                  {selectedProspect.sequence[activeSequenceTab]}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedProspect(null)}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-900 px-4 py-2"
              >
                Close Dossier
              </button>

              <button
                onClick={() => {
                  const newStatus = 'approved';
                  setSelectedProspect({ ...selectedProspect, status: newStatus });
                  if (onUpdateStatus) onUpdateStatus(selectedProspect.id, newStatus);
                }}
                className="text-xs font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5"
              >
                <Check className="h-3.5 w-3.5" />
                Approve for Outbound Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
