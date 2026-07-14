import { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

export function UrlInput({ onSubmit, usageCount, error }: { onSubmit: (url: string, email?: string) => void, usageCount: number, error: string | null }) {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    
    if (usageCount === 1 && !email) {
      return; 
    }
    
    onSubmit(cleanUrl, usageCount === 1 ? email : undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
          {error}
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

      {usageCount === 1 && (
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Where should we send the email?</label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
               <Mail className="h-5 w-5 text-zinc-400" />
             </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>
          <p className="text-xs text-zinc-500 mt-2">Since this is your second request, we'll email the result directly to your inbox.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!url}
        className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
      >
        {usageCount === 0 ? "Generate Cold Email" : "Generate & Send to Inbox"} 
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
}
