import { Check, Copy } from 'lucide-react';
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

  if (usageCount > 1) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Email Sent!</h2>
        <p className="text-zinc-600 mb-8 max-w-md mx-auto">
          We've successfully generated the personalized cold email for {targetUrl} and sent it to your inbox.
        </p>
        <button
          onClick={onReset}
          className="text-zinc-900 font-semibold underline hover:text-zinc-600"
        >
          Generate another
        </button>
      </div>
    );
  }

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
      
      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 md:p-8 font-serif text-lg leading-relaxed text-zinc-800 whitespace-pre-wrap mb-8">
        <div className="mb-6 pb-4 border-b border-zinc-200 font-sans text-sm text-zinc-500">
          <strong>Subject:</strong> {subject}
        </div>
        {body}
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-100">
        <p className="text-sm text-zinc-500">
          Want to see this work for 5+ prospects at once?
        </p>
        <div className="flex gap-4">
          <button
            onClick={onReset}
            className="text-sm font-semibold text-zinc-600 hover:text-zinc-900"
          >
            Generate another
          </button>
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
