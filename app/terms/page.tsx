"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
              Terms of Service
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
                Agreement to Terms
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                By accessing this website, submitting any form, or engaging our services, you agree to be bound by these Terms of Service. If you are acting on behalf of a company, you confirm you have the legal authority to bind that entity to these terms.
              </p>
            </div>

            {/* Section 02 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 02
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Services & Scope
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                ARCH Revenues builds and operates specialized outbound acquisition systems for B2B agencies. Our services include ICP definition, lead list construction, AI-driven personalization, infrastructure setup, and response management. The specific scope of work is outlined in your individual engagement agreement or program onboarding materials.
              </p>
            </div>

            {/* Section 03 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 03
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Performance & Founding Client Program
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm mb-4">
                For participants in our Founding Client Program, we deliver the full AI + human outbound system at no upfront cost in exchange for active feedback and permission to use results as case studies.
              </p>
              <p className="text-zinc-600 leading-relaxed text-sm mb-4">
                For paid engagements, we commit to building and running a system designed to generate 10-20 qualified meetings per month on average. We stand behind the system we build. While final results depend on your offer quality and specific market conditions, we guarantee professional execution and ongoing optimization of your campaigns.
              </p>
              <p className="text-zinc-600 leading-relaxed text-sm">
                If the system does not perform as expected, we will work closely with you to adjust strategy or pause billing until the issues are resolved, providing full month-to-month flexibility.
              </p>
            </div>

            {/* Section 04 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 04
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Payment & Retainer Model
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                Paid engagements operate on a predictable monthly retainer basis. Fees are due at the start of each billing period. We do not charge setup fees or take revenue shares. Retainer fees are non-refundable once the billing period has commenced and system operations have begun.
              </p>
            </div>

            {/* Section 05 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 05
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Cancellation & Flexibility
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                Our model is built on month-to-month flexibility. Either party may terminate the engagement with written notice prior to the start of the next billing cycle. Upon termination, ARCH Revenues will cease all outreach activity. All messaging assets and lead lists developed during the engagement are transferred to the client upon final payment.
              </p>
            </div>

            {/* Section 06 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 06
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Intellectual Property
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                Upon full payment, clients own all deliverables produced specifically for their engagement, including lead lists and custom email sequences. ARCH Revenues retains ownership of its underlying proprietary methodologies, AI frameworks, and internal systems used to deliver the services.
              </p>
            </div>

            {/* Section 07 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 07
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Limitation of Liability
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                To the maximum extent permitted by law, ARCH Revenues&apos; total liability shall not exceed the total fees paid by the client in the three months immediately preceding the claim.
              </p>
            </div>

            {/* Section 08 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 08
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Contact Information
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                For any questions regarding these terms:
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
