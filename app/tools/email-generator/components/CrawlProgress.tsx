"use client";

import { useEffect, useState } from "react";

interface StepInfo {
  min: number;
  max: number;
  label: string;
}

const STEPS: StepInfo[] = [
  { min: 0, max: 20, label: "Connecting to domain & discovering pages..." },
  { min: 21, max: 48, label: "Crawling services, tech stack & case studies..." },
  { min: 49, max: 72, label: "Extracting core pain points & buyer triggers..." },
  { min: 73, max: 88, label: "Composing signal-based observation hook..." },
  { min: 89, max: 99, label: "Applying humanizer filters & finalizing copy..." },
];

export function CrawlProgress({ url }: { url: string }) {
  const [progress, setProgress] = useState(6);
  const cleanDomain = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  useEffect(() => {
    // Realistic multi-stage timing:
    // Crawl & LLM generation takes approximately 30-55 seconds.
    // Progress starts quickly and eases as it nears 99%.
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000; // seconds

      setProgress((prev) => {
        if (prev >= 99) return 99;

        // Curve that approaches 98% smoothly over ~45 seconds
        let target = 0;
        if (elapsed < 6) {
          target = 6 + (elapsed / 6) * 22; // 6% -> 28% in first 6s
        } else if (elapsed < 18) {
          target = 28 + ((elapsed - 6) / 12) * 26; // 28% -> 54% in next 12s
        } else if (elapsed < 32) {
          target = 54 + ((elapsed - 18) / 14) * 24; // 54% -> 78% in next 14s
        } else if (elapsed < 45) {
          target = 78 + ((elapsed - 32) / 13) * 15; // 78% -> 93% in next 13s
        } else {
          // Asymptotically creep up to 98-99%
          const extra = Math.min(5, (elapsed - 45) * 0.2);
          target = 93 + extra;
        }

        const nextVal = Math.max(prev, Math.min(99, Math.round(target)));
        return nextVal;
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const currentStep =
    STEPS.find((s) => progress >= s.min && progress <= s.max)?.label ||
    "Generating personalized cold email...";

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
      {/* Circular Progress Ring with Percentage */}
      <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          {/* Background Ring */}
          <path
            className="text-zinc-100"
            strokeWidth="3.2"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Progress Ring */}
          <path
            className="text-teal-500 transition-all duration-300 ease-out"
            strokeDasharray={`${progress}, 100`}
            strokeWidth="3.2"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono font-bold text-2xl text-zinc-900 tracking-tight">
            {progress}%
          </span>
        </div>
      </div>

      {/* Main Heading */}
      <h3 className="text-xl font-semibold text-zinc-900 mb-2">
        Crawling {cleanDomain}...
      </h3>

      {/* Live Stage Label */}
      <p className="text-sm font-medium text-teal-600 mb-4 h-5 transition-all">
        {currentStep}
      </p>

      {/* Horizontal Bar */}
      <div className="w-full max-w-xs bg-zinc-100 rounded-full h-2 overflow-hidden mb-4 border border-zinc-200/70">
        <div
          className="h-full bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Supporting context */}
      <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
        Reading their site to extract verified signals and write your 5-part cold email. Usually takes 40–60 seconds.
      </p>
    </div>
  );
}
