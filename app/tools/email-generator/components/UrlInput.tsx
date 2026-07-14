import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const MAX_FREE = 5;

interface UrlInputProps {
  onSubmit: (url: string) => void;
  usageCount: number;
  error: string | null;
  hasEmail: boolean; // true once the user has unlocked and email is captured
}

export function UrlInput({ onSubmit, usageCount, error, hasEmail }: UrlInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    onSubmit(cleanUrl);
  };

  const remaining = MAX_FREE - usageCount;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Usage counter — only shown after first use */}
      {usageCount > 0 && (
        <div className="flex items-center justify-between text-sm text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3">
          <span>Free emails used</span>
          <span className="font-semibold text-zinc-800">{usageCount} / {MAX_FREE}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Prospect's Website URL</label>
        <div className="relative">
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://acme-corp.com"
            className="w-full pl-4 pr-12 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!url}
        className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
      >
        {usageCount === 0 ? 'Generate Cold Email' : `Generate Email (${remaining} left)`}
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
}
