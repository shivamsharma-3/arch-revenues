import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Privacy Policy for ARCH Revenues. Learn how we collect, process, and protect your personal data, business details, and AI tool inputs.",
  alternates: {
    canonical: "https://www.archrevenues.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 pt-20 pb-12 md:pt-32 md:pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-zinc-600 transition-colors mb-12 uppercase tracking-widest"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Home
          </Link>

          <header className="mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
              Last updated July 2026
            </p>
          </header>

          <div className="space-y-12">
            {/* Section 01 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 01
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Overview & Commitment
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                ARCH Revenues (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), founded and operated by Shivam Sharma, is committed to protecting the privacy and security of your personal and business information. This Privacy Policy outlines how we collect, use, process, and safeguard data across our website, outbound acquisition services, interactive audits, strategy booking channels, and AI-powered tools (such as our Cold Email Generator and 5-Account Sample Pipeline). We process data solely to deliver our services and optimize acquisition systems. We never sell, rent, or trade your data to third parties.
              </p>
            </div>

            {/* Section 02 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 02
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Information We Collect
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm mb-4">
                We collect information directly from you when you visit our website, complete intake or audit forms, request strategy calls, or utilize our interactive tools:
              </p>
              <ul className="list-disc list-inside text-zinc-600 leading-relaxed text-sm space-y-2 pl-2">
                <li>
                  <strong className="text-zinc-800">Contact & Profile Data:</strong> Full name, professional email address, company name, website URL, and LinkedIn profile links.
                </li>
                <li>
                  <strong className="text-zinc-800">Business & Campaign Context:</strong> Target audience definitions (ICP), service offerings, pricing structures, monthly revenue benchmarks, and current lead generation bottlenecks.
                </li>
                <li>
                  <strong className="text-zinc-800">Tool & Chat Inputs:</strong> Prompts, website links, or text snippets submitted to our AI Cold Email Generator, 5-Account Sample Pipeline, or website assistant.
                </li>
                <li>
                  <strong className="text-zinc-800">Technical & Usage Analytics:</strong> IP address, device specifications, browser type, referral sources, and page interaction metrics to maintain security and optimize user experience.
                </li>
              </ul>
            </div>

            {/* Section 03 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 03
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                How We Use Your Data
              </h2>
              <ul className="list-disc list-inside text-zinc-600 leading-relaxed text-sm space-y-2 pl-2">
                <li>Designing, deploying, and optimizing tailored cold outbound acquisition campaigns.</li>
                <li>Generating custom diagnostic deliverables (such as your 5 verified target accounts and pattern-interrupt cold email copy).</li>
                <li>Scheduling, confirming, and conducting strategic pipeline consultations via video conference.</li>
                <li>Sending operational updates, weekly performance metrics, and service notices.</li>
                <li>Protecting against malicious activity, unauthorized access, and automated abuse.</li>
              </ul>
            </div>

            {/* Section 04 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 04
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Third-Party Processors
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm mb-4">
                We partner only with security-compliant infrastructure and software providers to deliver our services. Data is shared strictly to perform essential operations:
              </p>
              <ul className="list-disc list-inside text-zinc-600 leading-relaxed text-sm space-y-2 pl-2">
                <li>
                  <strong className="text-zinc-800">Hosting & Edge Compute:</strong> Vercel Inc. (cloud infrastructure, edge caching, and serverless compute).
                </li>
                <li>
                  <strong className="text-zinc-800">Database & State:</strong> Upstash Inc. (serverless Redis/KV for session state and rate limiting).
                </li>
                <li>
                  <strong className="text-zinc-800">Calendar Scheduling:</strong> Calendly LLC (consultation scheduling and timezone coordination).
                </li>
                <li>
                  <strong className="text-zinc-800">Email Delivery:</strong> Resend Inc. / Google Workspace (transactional notifications and report delivery).
                </li>
                <li>
                  <strong className="text-zinc-800">AI & LLM Services:</strong> Anthropic PBC / Google Vertex AI (API-level LLM execution; inputs are not used to train foundational models).
                </li>
              </ul>
            </div>

            {/* Section 05 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 05
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Data Security & Retention
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                We implement industry-standard encryption in transit (HTTPS / TLS 1.3) and at rest across all datastores. Access to production data is restricted to authorized team members through multi-factor authentication. We retain prospective client data only as long as necessary to fulfill diagnostic evaluations, manage active agreements, or satisfy regulatory compliance requirements.
              </p>
            </div>

            {/* Section 06 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 06
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Cookies & Local Tracking
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                We utilize lightweight session cookies and localStorage items solely for authentication integrity, CSRF mitigation, and functional site operation (such as retaining audit inputs across page transitions). We do not deploy invasive third-party ad tracking pixels or cross-site behavioral cookies.
              </p>
            </div>

            {/* Section 07 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 07
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Your Data Rights
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                Depending on your location, you hold rights to access, inspect, rectify, export, or request the permanent deletion of your personal information stored with us. You may also opt out of promotional email communications at any time by clicking the unsubscribe link or contacting us directly at{" "}
                <a
                  href="mailto:hello@archrevenues.com"
                  className="text-zinc-900 font-medium underline hover:text-zinc-600 transition-colors"
                >
                  hello@archrevenues.com
                </a>
                .
              </p>
            </div>

            {/* Section 08 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 08
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Contact Information
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                For any privacy inquiries, data requests, or compliance questions:
                <br />
                <a
                  href="mailto:hello@archrevenues.com"
                  className="text-zinc-900 font-medium underline hover:text-zinc-600 transition-colors"
                >
                  hello@archrevenues.com
                </a>
                <br />
                ARCH Revenues • Shivam Sharma
                <br />
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
