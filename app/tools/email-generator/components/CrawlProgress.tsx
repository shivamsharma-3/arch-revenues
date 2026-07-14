import { Loader2 } from 'lucide-react';

export function CrawlProgress({ url }: { url: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-8" />
      <h3 className="text-xl font-semibold text-zinc-900 mb-3">
        Crawling {url.replace(/^https?:\/\//, '')}...
      </h3>
      <p className="text-zinc-600 max-w-sm mx-auto leading-relaxed">
        We are reading their site to extract core pain points and draft your personalized email. This takes about 45-90 seconds.
      </p>
    </div>
  );
}
