"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Users,
  Inbox,
  BarChart3,
  Lock,
  Terminal,
  ShieldCheck,
  Globe
} from 'lucide-react';

import { AuthGate } from '@/components/dashboard/AuthGate';
import { AgentStudio } from '@/components/dashboard/AgentStudio';
import { ProspectsView } from '@/components/dashboard/ProspectsView';
import { ReplyTriageView } from '@/components/dashboard/ReplyTriageView';
import { AnalyticsView } from '@/components/dashboard/AnalyticsView';
import { ApiAccessView } from '@/components/dashboard/ApiAccessView';
import { INITIAL_PROSPECTS, INITIAL_REPLIES } from '@/components/dashboard/mockData';
import { ProspectItem, IncomingReply } from '@/components/dashboard/types';

export default function AgentPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'studio' | 'prospects' | 'triage' | 'analytics' | 'api'>('studio');
  const [prospects, setProspects] = useState<ProspectItem[]>(INITIAL_PROSPECTS);
  const [replies, setReplies] = useState<IncomingReply[]>(INITIAL_REPLIES);

  // Check auth state from localStorage or query params
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const queryPass = params.get('passkey') || params.get('key');
    if (queryPass && queryPass.trim() === 'arch2026') {
      localStorage.setItem('arch_founder_auth', 'true');
      localStorage.setItem('arch_founder_passcode', queryPass.trim());
      setIsAuthenticated(true);
      return;
    }

    const isAuth = localStorage.getItem('arch_founder_auth') === 'true';
    setIsAuthenticated(isAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('arch_founder_auth');
    localStorage.removeItem('arch_founder_passcode');
    setIsAuthenticated(false);
  };

  const handleAddProspect = (newProspect: ProspectItem) => {
    setProspects((prev) => [newProspect, ...prev]);
  };

  const handleUpdateProspectStatus = (id: string, newStatus: ProspectItem['status']) => {
    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const handleUpdateReplyStatus = (id: string, newStatus: IncomingReply['status'], finalDraft?: string) => {
    setReplies((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              classification: {
                ...r.classification,
                drafted_response: finalDraft !== undefined ? finalDraft : r.classification.drafted_response,
                needs_human: false,
              },
            }
          : r
      )
    );
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-32 pb-24">
        <div className="h-6 w-6 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const navTabs = [
    {
      id: 'studio',
      label: 'Live Prospector',
      icon: Sparkles,
      badge: 'Live',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      id: 'prospects',
      label: 'Prospect Pipeline',
      icon: Users,
      badge: prospects.length.toString(),
      badgeColor: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    },
    {
      id: 'triage',
      label: 'Reply Triage',
      icon: Inbox,
      badge: '2 review',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'api',
      label: 'API & LLM Access',
      icon: Terminal,
      badge: 'v2.0',
      badgeColor: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFC] pt-28 pb-20 px-4 sm:px-6 md:px-8 font-sans text-zinc-900">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-200">
          <div>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
              ARCH SDR Agent
            </h1>
            <p className="mt-1 text-base text-zinc-600 max-w-2xl leading-relaxed">
              Autonomous prospecting, signal intelligence, and 5-step cold outreach synthesis for founder-led agencies.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 px-4 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 shadow-xs transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
              <span>Lock Console</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-white p-1.5 rounded-2xl border border-zinc-200/90 shadow-xs">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full border ${isActive ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : tab.badgeColor}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Container */}
        <div>
          {activeTab === 'studio' && (
            <AgentStudio onAddProspect={handleAddProspect} />
          )}

          {activeTab === 'prospects' && (
            <ProspectsView
              prospects={prospects}
              onUpdateStatus={handleUpdateProspectStatus}
            />
          )}

          {activeTab === 'triage' && (
            <ReplyTriageView
              replies={replies}
              onUpdateReplyStatus={handleUpdateReplyStatus}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView />
          )}

          {activeTab === 'api' && (
            <ApiAccessView />
          )}
        </div>
      </div>
    </div>
  );
}
