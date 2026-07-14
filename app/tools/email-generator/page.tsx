"use client";

import { useState, useEffect } from "react";
import fpPromise from "@fingerprintjs/fingerprintjs";
import { UrlInput } from "./components/UrlInput";
import { CrawlProgress } from "./components/CrawlProgress";
import { EmailPreview } from "./components/EmailPreview";
import { EmailFull } from "./components/EmailFull";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EmailGeneratorPage() {
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [usageCount, setUsageCount] = useState<number>(0);
  
  const [status, setStatus] = useState<'idle' | 'crawling' | 'preview' | 'full' | 'limit-reached'>('idle');
  const [generatedEmail, setGeneratedEmail] = useState<any>(null);
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initFp = async () => {
      const fp = await fpPromise.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
      
      try {
        const res = await fetch('/api/rate-limit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fingerprint: result.visitorId })
        });
        if (res.ok) {
          const data = await res.json();
          setUsageCount(data.count);
          if (data.count >= 2) {
            setStatus('limit-reached');
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    initFp();
  }, []);

  const handleGenerate = async (url: string, email?: string) => {
    if (!fingerprint) return;
    setTargetUrl(url);
    setStatus('crawling');
    setError(null);

    try {
      const res = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, fingerprint, email })
      });

      if (!res.ok) {
        if (res.status === 429) {
          setStatus('limit-reached');
          return;
        }
        throw new Error('Failed to generate email');
      }

      const data = await res.json();
      setGeneratedEmail(data.email);
      setUsageCount(data.usageCount);
      
      if (email) {
         setStatus('full'); 
      } else {
         setStatus('preview');
      }

    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setStatus('idle');
    }
  };

  const handleUnlock = async (email: string) => {
    try {
      const res = await fetch('/api/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, url: targetUrl })
      });
      if (res.ok) {
        setStatus('full');
      } else {
        throw new Error("Failed to capture lead");
      }
    } catch (e) {
      console.error(e);
      // Do NOT unlock on failure. The gate must hold: no lead captured = no email revealed.
      // Surface the error so the user can retry.
      setError("Something went wrong. Please try again or refresh the page.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-zinc-900 tracking-tight mb-4">
            AI Cold Email Generator
          </h1>
          <p className="text-lg text-zinc-600">
            We crawl your prospect's website, find their specific pain points, and write a personalized outbound email.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-6 md:p-10"
        >
          {status === 'limit-reached' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">You've reached your free limit</h2>
              <p className="text-zinc-600 mb-8">
                Want to see this work for 5+ prospects at once? Let's talk about building this into a scalable outbound engine for your SaaS.
              </p>
              <Link
                href="/strategy-call"
                className="inline-flex items-center justify-center bg-zinc-900 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-zinc-800 transition-all shadow-lg"
              >
                Book a strategy call
              </Link>
            </div>
          )}

          {status === 'idle' && (
            <UrlInput onSubmit={handleGenerate} usageCount={usageCount} error={error} />
          )}

          {status === 'crawling' && (
            <CrawlProgress url={targetUrl} />
          )}

          {status === 'preview' && (
            <EmailPreview 
              emailData={generatedEmail} 
              onUnlock={handleUnlock}
              captureError={error}
              onClearError={() => setError(null)}
            />
          )}

          {status === 'full' && (
            <EmailFull 
              emailData={generatedEmail} 
              usageCount={usageCount}
              targetUrl={targetUrl}
              onReset={() => {
                if (usageCount >= 2) setStatus('limit-reached');
                else setStatus('idle');
              }} 
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
