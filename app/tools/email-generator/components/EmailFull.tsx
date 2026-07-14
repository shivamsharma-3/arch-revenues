import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function EmailFull({ emailData, usageCount, targetUrl, onReset }: { emailData: any, usageCount: number, targetUrl: string, onReset: () => void }) {
  const [copied, setCopied] = useState(false);
  
  const body = emailData?.body || '';
  const subject = emailData?.subject || '';
  
  const fullText = `Subject: ${subject}\n\n${body}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Your Draft</h3>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      
      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 md:p-8 font-serif text-lg leading-relaxed text-zinc-800 whitespace-pre-wrap mb-6">
        <div className="mb-6 pb-4 border-b border-zinc-200 font-sans text-sm text-zinc-500">
          <strong>Subject:</strong> {subject}
        </div>
        {body}
      </div>

      <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-5 mb-8 flex gap-4 text-sm text-amber-900 leading-relaxed">
        <div className="shrink-0 mt-0.5">
          <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <strong className="font-semibold text-amber-950 block mb-1">This is an AI-generated baseline, not a final send.</strong>
          In our actual campaigns, we never rely on raw AI output. A human outbound expert physically reviews, fact-checks, and hyper-personalizes every single email before it goes out. This guarantees maximum deliverability, protects your domain reputation, and ensures perfect relevance.
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-100">
        <p className="text-sm text-zinc-500">
          {usageCount < 5
            ? `${5 - usageCount} free email${5 - usageCount === 1 ? '' : 's'} remaining`
            : "You've used all 5 free emails"}
        </p>
        <div className="flex gap-4">
          {usageCount < 5 && (
            <button
              onClick={onReset}
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-900"
            >
              Generate another
            </button>
          )}
          <Link
            href="/strategy-call"
            className="bg-zinc-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Book strategy call
          </Link>
        </div>
      </div>
    </div>
  );
}
