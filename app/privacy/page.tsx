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
            <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Last updated March 2026</p>
          </header>

          <div className="space-y-12">
            {/* Section 01 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 01
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Overview & Commitment
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                ARCH Revenues is committed to protecting the privacy and security of your personal and business information. This policy describes how we collect, use, and safeguard the data you provide to us. We process information solely to deliver our outbound acquisition services and associated audits. We do not sell, trade, or share your data with third parties for their own commercial purposes.
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
                When you interact with our website or submit an intake form, we collect: your full name, professional email address, company name, website URL, and business-related data such as approximate revenue, team size, and current lead generation challenges. We also collect standard technical data including IP addresses and browser information to ensure the security and performance of our platform.
              </p>
            </div>

            {/* Section 03 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 03
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                AI Tools & Data Processing
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                As part of our specialized outbound systems, we utilize advanced AI tools for lead enrichment and message personalization. We only process lead data strictly for the purpose of executing your specific campaign. This data is never sold, shared with other clients, or used to train public AI models. All AI-driven processing is conducted within secure, private environments to maintain the highest standards of confidentiality.
              </p>
            </div>

            {/* Section 04 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 04
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                We use your information to: prepare and deliver tailored system audits, contact you regarding our services, fulfill our contractual obligations, and optimize our outreach strategies. We maintain a strict policy against using your information for third-party advertising or sharing it with external marketing platforms.
              </p>
            </div>

            {/* Section 05 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 05
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Data Retention & Deletion
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                For prospective clients who do not engage our services, we retain data for 12 months from the last point of contact before permanent deletion. For active clients, data is retained for the duration of the engagement and for a reasonable period thereafter to comply with legal, accounting, and reporting obligations.
              </p>
            </div>

            {/* Section 06 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 06
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Your Privacy Rights
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                You have the right to access, correct, or request the deletion of your personal data at any time. You may also object to the processing of your data or request a portable copy of your information. To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:legal@archrevenues.com"
                  className="text-zinc-900 underline hover:text-zinc-600 transition-colors"
                >
                  legal@archrevenues.com
                </a>
                .
              </p>
            </div>

            {/* Section 07 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 07
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Contact Information
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                For any privacy-related inquiries or to report a concern:
                <br />
                <a
                  href="mailto:legal@archrevenues.com"
                  className="text-zinc-900 underline hover:text-zinc-600 transition-colors"
                >
                  legal@archrevenues.com
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
