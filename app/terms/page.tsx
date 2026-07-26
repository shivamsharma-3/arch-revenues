import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service for ARCH Revenues. Review our outbound acquisition service terms, Performance Pilot guarantee, pricing model, and client rights.",
  alternates: {
    canonical: "https://www.archrevenues.com/terms",
  },
};

export default function TermsPage() {
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
              Terms of Service
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
                Agreement to Terms
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                By accessing archrevenues.com, submitting forms, booking strategy calls, using our free tools, or engaging our outbound acquisition services, you enter into a binding agreement governed by these Terms of Service. If you represent a company or business entity, you warrant that you possess full legal authority to bind your organization to these terms.
              </p>
            </div>

            {/* Section 02 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 02
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Services & Scope
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                ARCH Revenues builds, launches, and operates specialized outbound acquisition systems tailored for founder-led marketing and development agencies. Service deliverables include Ideal Customer Profile (ICP) definition, validated B2B lead list building, multi-channel (cold email + LinkedIn) copy creation, sending infrastructure setup across dedicated domains, response management, and weekly performance reporting.
              </p>
            </div>

            {/* Section 03 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 03
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Performance Pilot & Guarantees
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm mb-4">
                <strong className="text-zinc-800">Founding Client Rate:</strong> Qualified participants accepted into our Performance Pilot secure a founding rate of $1,499/month, locked for 90 days (limited to 3 client spots). Standard retainer pricing increases to $4,000/month thereafter.
              </p>
              <p className="text-zinc-600 leading-relaxed text-sm mb-4">
                <strong className="text-zinc-800">Performance Benchmark:</strong> Our systems target 5 to 12 qualified demos booked per month. We stand fully behind our systems—if minimum performance benchmarks are not met in accordance with your engagement terms, you do not pay retainer fees for non-performing periods.
              </p>
              <p className="text-zinc-600 leading-relaxed text-sm">
                <strong className="text-zinc-800">Case Study Agreement:</strong> Clients participating in the Founding Client Rate agree to be featured as a public case study once their system reaches the benchmark of 5 booked meetings.
              </p>
            </div>

            {/* Section 04 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 04
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Payment & Retainer Terms
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm mb-3">
                Services operate on a monthly retainer model billed at the start of each billing period. Setup fees and domain infrastructure setup are included as specified in your agreement. Payments are processed securely online.
              </p>
              <p className="text-zinc-600 leading-relaxed text-sm bg-zinc-50 border border-zinc-200 p-4 rounded-xl">
                <strong className="text-zinc-900">Performance Pilot Guarantee Exception:</strong> For Performance Pilot clients, if fewer than 5 qualified demos are booked in any calendar month, that month&apos;s retainer fee is refunded in full in accordance with our Performance Pilot Guarantee terms.
              </p>
            </div>

            {/* Section 05 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 05
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Cancel-Anytime Flexibility
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                We believe in earning your partnership every month. After the initial 30 days, engagements continue on a flexible month-to-month basis with no long-term annual contracts. Either party may cancel the engagement with written notice prior to the next monthly billing date. Upon cancellation, ARCH Revenues ceases outreach operations and transfers accrued lead lists and sequence assets to the client.
              </p>
            </div>

            {/* Section 06 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 06
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Acceptable Use of Web Tools
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                Our website provides free interactive tools, including an AI Cold Email Generator and ICP Audit Worksheet. Users agree to utilize these tools solely for lawful business communication. You may not use generated content for unlawful spam, phishing, deceptive practices, or violations of CAN-SPAM, GDPR, or applicable regional communication laws.
              </p>
            </div>

            {/* Section 07 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 07
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Intellectual Property
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                Upon payment in full, clients own all custom campaign copy, lead databases, and sequence materials created specifically for their campaigns. ARCH Revenues retains complete ownership of its underlying software frameworks, internal workflows, AI automation prompts, and proprietary operating methodologies.
              </p>
            </div>

            {/* Section 08 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 08
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Limitation of Liability
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                To the maximum extent permitted under applicable law, ARCH Revenues&apos; total cumulative liability for any claim arising under these terms shall not exceed the aggregate fees paid by the client in the three (3) months preceding the incident. ARCH Revenues shall not be liable for indirect, incidental, or consequential damages.
              </p>
            </div>

            {/* Section 09 */}
            <div>
              <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">
                Section 09
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">
                Contact Information
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                If you have questions regarding these Terms of Service or wish to issue a notice:
                <br />
                <a
                  href="mailto:shivam@archrevenues.com"
                  className="text-zinc-900 font-medium underline hover:text-zinc-600 transition-colors"
                >
                  shivam@archrevenues.com
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
