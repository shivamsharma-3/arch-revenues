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
  const [userEmail, setUserEmail] = useState<string | null>(null); // persisted after first unlock
  
  const [status, setStatus] = useState<'idle' | 'crawling' | 'preview' | 'full' | 'sent-to-inbox' | 'limit-reached'>('idle');
  const [generatedEmail, setGeneratedEmail] = useState<any>(null);
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initFp = async () => {
      const fp = await fpPromise.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
      
      const storedEmail = localStorage.getItem('arch_lead_email');
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
      
      try {
        const res = await fetch('/api/rate-limit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fingerprint: result.visitorId })
        });
        if (res.ok) {
          const data = await res.json();
          setUsageCount(data.count);
          if (data.count >= 5) {
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
      // For 3rd+ emails, pass the stored email so server sends to inbox instead of showing on site
      const emailToSend = usageCount >= 2 ? userEmail : (email || null);

      const res = await fetch('/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, fingerprint, email: emailToSend })
      });

      if (!res.ok) {
        if (res.status === 429) {
          setStatus('limit-reached');
          return;
        }
        
        let errorMsg = 'Failed to generate email';
        try {
          const errData = await res.json();
          if (errData.error) errorMsg = errData.error;
        } catch(e) {}
        
        throw new Error(errorMsg);
      }

      const data = await res.json();
      setGeneratedEmail(data.email);
      setUsageCount(data.usageCount);

      if (data.sentToInbox) {
        // 3rd+ email: sent directly to inbox, don't show on site
        setStatus('sent-to-inbox');
      } else if (data.usageCount === 1 || userEmail) {
        // 1st email (free) or email already captured: show on site
        setStatus('full');
      } else {
        // 2nd email: show gate to capture email
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
        body: JSON.stringify({ email, url: targetUrl, generatedEmail })
      });
      if (res.ok) {
        setUserEmail(email); // persist so future generations skip the gate
        localStorage.setItem('arch_lead_email', email);
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
          <p className="text-lg text-zinc-600 mb-6">
            I crawl your prospect's website, find their specific pain points, and write a personalized outbound email.
          </p>
          
          <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-5 text-sm text-amber-900/90 leading-relaxed max-w-2xl mx-auto text-center">
            <strong className="font-semibold text-amber-950 block mb-1">AI Baseline Disclaimer</strong>
            The emails generated here are AI baselines, not final sends. In my actual campaigns, I personally verify, fact-check, and hyper-personalize every single email before it goes out to ensure maximum deliverability and protect your domain reputation.
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-6 md:p-10"
        >
          {status === 'sent-to-inbox' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-3">Check your inbox</h2>
              <p className="text-zinc-500 mb-2">We sent the personalized email for</p>
              <p className="text-zinc-800 font-medium mb-2">{targetUrl}</p>
              <p className="text-zinc-500 mb-8">to <span className="font-medium text-zinc-800">{userEmail}</span></p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {usageCount < 5 && (
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 border border-zinc-200 px-5 py-2.5 rounded-lg hover:bg-zinc-50 transition-colors"
                  >
                    Generate another ({5 - usageCount} left)
                  </button>
                )}
                <a
                  href="/strategy-call"
                  className="bg-zinc-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Book strategy call
                </a>
              </div>
            </div>
          )}

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
            <UrlInput 
              onSubmit={(url) => handleGenerate(url, userEmail || undefined)} 
              usageCount={usageCount} 
              error={error}
              hasEmail={!!userEmail}
            />
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
                if (usageCount >= 5) setStatus('limit-reached');
                else setStatus('idle');
              }} 
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
