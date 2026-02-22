'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function PrivacyPage() {
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
            Privacy Policy
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
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Overview</h2>
              <p className="text-zinc-600 leading-relaxed">
                ARCH Revenues collects and processes personal information solely to deliver the free system audit and associated services. We do not sell, trade, or share your data with third parties for commercial purposes.
              </p>
            </div>

            {/* Section 02 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                02
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Information We Collect</h2>
              <p className="text-zinc-600 leading-relaxed">
                When you submit our audit intake form, we collect: your name, email address, phone number, company name and website, approximate monthly revenue, team size, average project value, current lead sources, and your pipeline challenges and goals. We also collect standard technical data when you visit our website, including IP address, browser type, and pages visited.
              </p>
            </div>

            {/* Section 03 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                03
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">How We Use Your Information</h2>
              <p className="text-zinc-600 leading-relaxed">
                We use your information to: prepare and deliver your tailored system audit, contact you to discuss audit findings and our services, fulfill our contractual obligations if you become a client, and improve our website and services. We do not use your information for advertising or share it with marketing platforms.
              </p>
            </div>

            {/* Section 04 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                04
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Data Retention</h2>
              <p className="text-zinc-600 leading-relaxed">
                If you submit an audit form but do not become a client, your data is retained for 12 months from our last communication, then permanently deleted. If you become a client, your data is retained for the duration of the engagement and a reasonable period thereafter for legal and accounting purposes.
              </p>
            </div>

            {/* Section 05 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                05
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Your Rights</h2>
              <p className="text-zinc-600 leading-relaxed">
                Depending on your location, you have the right to access, correct, export, or request deletion of your personal data at any time. You may also withdraw consent or object to processing. To exercise any right, email us at <a href="mailto:hello@archrevenues.com" className="text-zinc-900 underline hover:text-zinc-600 transition-colors">hello@archrevenues.com</a>. We respond within 30 days.
              </p>
            </div>

            {/* Section 06 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                06
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Data Security</h2>
              <p className="text-zinc-600 leading-relaxed">
                We use reasonable technical and organizational measures to protect your information. No method of internet transmission is 100% secure. We will notify you of any breach that affects your data.
              </p>
            </div>

            {/* Section 07 */}
            <div className="bg-white border border-zinc-100 rounded-2xl p-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono text-sm mb-4">
                07
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">Contact</h2>
              <p className="text-zinc-600 leading-relaxed">
                For any privacy-related questions:<br />
                <a href="mailto:hello@archrevenues.com" className="text-zinc-900 underline hover:text-zinc-600 transition-colors">privacy@archrevenues.com</a><br />
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
