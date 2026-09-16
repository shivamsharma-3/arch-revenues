"use client";

import React, { useState } from 'react';
import {
  Inbox,
  AlertTriangle,
  CheckCircle2,
  Send,
  User,
  Sparkles,
  ShieldAlert,
  Edit3,
  Check,
  Building2,
  ChevronRight
} from 'lucide-react';
import { IncomingReply } from './types';

interface ReplyTriageViewProps {
  replies: IncomingReply[];
  onUpdateReplyStatus?: (id: string, newStatus: IncomingReply['status'], finalDraft?: string) => void;
}

export function ReplyTriageView({ replies, onUpdateReplyStatus }: ReplyTriageViewProps) {
  const [selectedReply, setSelectedReply] = useState<IncomingReply>(replies[0] || null);
  const [editingDraft, setEditingDraft] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  React.useEffect(() => {
    if (selectedReply) {
      setEditingDraft(selectedReply.classification.drafted_response || '');
      setIsEditing(false);
      setSentSuccess(false);
    }
  }, [selectedReply]);

  const getCategoryBadge = (category: IncomingReply['classification']['category']) => {
    switch (category) {
      case 'interested':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">Interested</span>;
      case 'objection_pricing':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">Pricing Inquiry</span>;
      case 'objection_competitor':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">Alternative / Competitor</span>;
      case 'out_of_office':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">Out of Office</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">{category}</span>;
    }
  };

  const handleApproveSend = () => {
    if (!selectedReply) return;
    if (onUpdateReplyStatus) {
      onUpdateReplyStatus(selectedReply.id, 'approved', editingDraft);
    }
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-teal-700 mb-1">
            <ShieldAlert className="h-3.5 w-3.5 text-teal-600" />
            Classifier Agent & Human-in-the-Loop Safety Gate
          </span>
          <h2 className="text-2xl font-bold text-zinc-900">AI Reply Triage</h2>
          <p className="text-xs text-zinc-500 max-w-2xl">
            Incoming prospect emails are automatically classified by intent. High-stakes inquiries (pricing, alternative solutions) trigger a human safety gate with drafted replies ready for 1-click review.
          </p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl px-4 py-2 text-right shadow-sm">
          <div className="text-xs font-bold text-zinc-900">4 Active Replies</div>
          <div className="text-[11px] text-amber-700 font-medium">2 Require Founder Approval</div>
        </div>
      </div>

      {/* Main Inbox Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm">
        {/* Left: Message List (5 cols) */}
        <div className="lg:col-span-5 border-r border-zinc-100 pr-0 lg:pr-6 space-y-2">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 px-2 py-1">
            Incoming Thread Inbox
          </div>

          <div className="space-y-2.5">
            {replies.map((reply) => {
              const isSelected = selectedReply?.id === reply.id;
              return (
                <div
                  key={reply.id}
                  onClick={() => setSelectedReply(reply)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-50 shadow-sm'
                      : 'border-zinc-200/80 bg-white hover:border-zinc-300 hover:bg-zinc-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="font-bold text-xs text-zinc-900 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-zinc-500" />
                      {reply.prospect_name}
                      <span className="text-[11px] text-zinc-500 font-normal">({reply.company_name})</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">{reply.received_at}</span>
                  </div>

                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    "{reply.reply_text}"
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    {getCategoryBadge(reply.classification.category)}

                    {reply.classification.needs_human ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <AlertTriangle className="h-3 w-3 text-amber-600" />
                        Needs Review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        <CheckCircle2 className="h-3 w-3 text-teal-600" />
                        Auto-Approved
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Review & Draft Editor (7 cols) */}
        <div className="lg:col-span-7 pl-0 lg:pl-2 space-y-5 flex flex-col justify-between">
          {selectedReply ? (
            <div className="space-y-5">
              {/* Top Details */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                    {selectedReply.prospect_name}
                    <span className="text-xs font-normal text-zinc-500">from {selectedReply.company_name}</span>
                  </h3>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    Received {selectedReply.received_at} • Intent Confidence: <span className="text-teal-700 font-mono font-bold">{selectedReply.classification.confidence}%</span>
                  </div>
                </div>

                {getCategoryBadge(selectedReply.classification.category)}
              </div>

              {/* Prospect Message */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-400">
                  Prospect's Exact Response
                </div>
                <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50 text-xs text-zinc-800 leading-relaxed font-sans">
                  "{selectedReply.reply_text}"
                </div>
              </div>

              {/* Safety Gate Warning */}
              {selectedReply.classification.needs_human && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-amber-900 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Human-in-the-Loop Triggered</div>
                    <div className="text-[11px] text-amber-800/90 mt-0.5 leading-relaxed">
                      {selectedReply.classification.escalation_reason || 'Outbound policy requires manual founder review for pricing discussions.'}
                    </div>
                  </div>
                </div>
              )}

              {/* AI Drafted Reply */}
              {selectedReply.classification.drafted_response ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-teal-800 flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-teal-600" />
                      AI Synthesized Response
                    </div>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-xs font-bold text-zinc-600 hover:text-zinc-900 flex items-center gap-1"
                    >
                      <Edit3 className="h-3 w-3" />
                      {isEditing ? 'Save Changes' : 'Edit Copy'}
                    </button>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={editingDraft}
                      onChange={(e) => setEditingDraft(e.target.value)}
                      rows={5}
                      className="w-full rounded-2xl border border-zinc-300 bg-white p-4 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none leading-relaxed font-sans"
                    />
                  ) : (
                    <div className="p-4 rounded-2xl border border-teal-200 bg-teal-50/50 text-xs text-teal-950 leading-relaxed font-sans">
                      {editingDraft}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50 text-xs text-zinc-500 italic">
                  Sequence paused automatically for out-of-office response.
                </div>
              )}

              {/* Action Bar */}
              {selectedReply.classification.drafted_response && (
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div className="text-xs text-zinc-500">
                    {sentSuccess ? (
                      <span className="text-teal-700 flex items-center gap-1 font-bold">
                        <Check className="h-3.5 w-3.5 text-teal-600" />
                        Reply approved and queued to Brevo SMTP!
                      </span>
                    ) : (
                      <span>Approved drafts route to Brevo / Gmail inbox</span>
                    )}
                  </div>

                  <button
                    onClick={handleApproveSend}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2.5 text-xs font-bold shadow-md shadow-teal-500/20 transition-all"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Approve & Dispatch
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-zinc-400 text-xs">
              Select an email thread from the left to view AI classification and draft responses.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
