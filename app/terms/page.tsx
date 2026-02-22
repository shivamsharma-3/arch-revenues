'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function TermsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen flex flex-col bg-zinc-50"
    >
      <Header variant="solid" />
      
      {/* Hero Section */}
      <section className="bg-zinc-900 pt-40 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-zinc-400">Last updated January 2025</p>
        </div>
      </section>

      <main className="flex-1 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="space-y-6">
            {/* Section 01 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                01
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Agreement to Terms</h2>
              <p className="text-zinc-600 leading-relaxed">
                By accessing this website or submitting any form, you agree to be bound by these Terms of Service. If you are acting on behalf of a company, you confirm you have authority to bind that entity.
              </p>
            </div>

            {/* Section 02 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                02
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Services</h2>
              <p className="text-zinc-600 leading-relaxed">
                ARCH Revenues builds and operates outbound acquisition systems for B2B service businesses. Services include ICP definition, lead list construction, cold email copywriting and sequencing, infrastructure setup, reply handling, meeting booking, and performance reporting. Specific scope is defined in each engagement agreement.
              </p>
            </div>

            {/* Section 03 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                03
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Payment Terms</h2>
              <p className="text-zinc-600 leading-relaxed">
                Engagements operate on a monthly retainer basis. Fees are due at the start of each billing period. Retainer fees are non-refundable once the billing period has commenced and work has begun. Late payment may result in a pause of services until the outstanding balance is resolved.
              </p>
            </div>

            {/* Section 04 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                04
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Cancellation & Termination</h2>
              <p className="text-zinc-600 leading-relaxed">
                Either party may terminate the engagement with written notice as specified in the service agreement. Upon termination, ARCH Revenues will cease all outreach activity. All work completed up to the termination date is billable. All lead lists, messaging assets, and campaign materials developed during the engagement are transferred to the client upon final payment.
              </p>
            </div>

            {/* Section 05 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                05
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Client Responsibilities</h2>
              <p className="text-zinc-600 leading-relaxed">
                Clients agree to: provide accurate information about their business and services, be available for onboarding and review sessions, respond to forwarded leads in a timely manner, and notify ARCH Revenues of any material changes to their offer or target market that may affect campaigns.
              </p>
            </div>

            {/* Section 06 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                06
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">No Guarantee of Results</h2>
              <p className="text-zinc-600 leading-relaxed">
                ARCH Revenues guarantees structured, professional execution of the agreed outbound system. We do not guarantee specific numbers of meetings, leads, closed deals, or revenue outcomes. Results depend on factors including market conditions, offer quality, and the client&apos;s ability to close sales conversations.
              </p>
            </div>

            {/* Section 07 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                07
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Intellectual Property</h2>
              <p className="text-zinc-600 leading-relaxed">
                Upon full payment, clients own all deliverables produced specifically for their engagement including lead lists, email sequences, and messaging frameworks. ARCH Revenues retains ownership of all underlying methodologies, templates, and systems used to deliver services.
              </p>
            </div>

            {/* Section 08 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                08
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Limitation of Liability</h2>
              <p className="text-zinc-600 leading-relaxed">
                To the maximum extent permitted by law, ARCH Revenues total liability shall not exceed the total fees paid by the client in the three months immediately preceding the claim.
              </p>
            </div>

            {/* Section 09 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                09
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Governing Law</h2>
              <p className="text-zinc-600 leading-relaxed">
                These terms are governed by applicable law in the jurisdiction where services are delivered. Disputes will first be subject to good-faith negotiation before any formal proceedings.
              </p>
            </div>

            {/* Section 10 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                10
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Contact</h2>
              <p className="text-zinc-600 leading-relaxed">
                For any questions regarding these terms:<br />
                <a href="mailto:hello@archrevenues.com" className="text-zinc-900 underline hover:text-zinc-600 transition-colors">legal@archrevenues.com</a><br />
                ARCH Revenues
              </p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
