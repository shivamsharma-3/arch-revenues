"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-zinc-900 transition-colors mb-12 uppercase tracking-widest"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Home
          </Link>

          <header className="mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Last updated January 2026</p>
          </header>

          <div className="space-y-12">
            {/* Section 01 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 01
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Overview
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                ARCH Revenues collects and processes personal information solely
                to deliver the free system audit and associated services. We do
                not sell, trade, or share your data with third parties for
                commercial purposes.
              </p>
            </div>

            {/* Section 02 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 02
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Information We Collect
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                When you submit our audit intake form, we collect: your name,
                email address, phone number, company name and website,
                approximate monthly revenue, team size, average project value,
                current lead sources, and your pipeline challenges and goals. We
                also collect standard technical data when you visit our website,
                including IP address, browser type, and pages visited.
              </p>
            </div>

            {/* Section 03 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 03
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                We use your information to: prepare and deliver your tailored
                system audit, contact you to discuss audit findings and our
                services, fulfill our contractual obligations if you become a
                client, and improve our website and services. We do not use your
                information for advertising or share it with marketing
                platforms.
              </p>
            </div>

            {/* Section 04 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 04
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Data Retention
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                If you submit an audit form but do not become a client, your
                data is retained for 12 months from our last communication, then
                permanently deleted. If you become a client, your data is
                retained for the duration of the engagement and a reasonable
                period thereafter for legal and accounting purposes.
              </p>
            </div>

            {/* Section 05 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 05
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Your Rights
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                Depending on your location, you have the right to access,
                correct, export, or request deletion of your personal data at
                any time. You may also withdraw consent or object to processing.
                To exercise any right, email us at{" "}
                <a
                  href="mailto:hello@archrevenues.com"
                  className="text-zinc-900 underline hover:text-zinc-600 transition-colors"
                >
                  hello@archrevenues.com
                </a>
                . We respond within 30 days.
              </p>
            </div>

            {/* Section 06 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 06
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Data Security
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                We use reasonable technical and organizational measures to
                protect your information. No method of internet transmission is
                100% secure. We will notify you of any breach that affects your
                data.
              </p>
            </div>

            {/* Section 07 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 07
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Contact
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                For any privacy-related questions:
                <br />
                <a
                  href="mailto:hello@archrevenues.com"
                  className="text-zinc-900 underline hover:text-zinc-600 transition-colors"
                >
                  privacy@archrevenues.com
                </a>
                <br />
                ARCH Revenues
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
