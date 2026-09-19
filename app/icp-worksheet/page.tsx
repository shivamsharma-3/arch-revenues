"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Sparkles, ShieldCheck } from "lucide-react";

export default function ICPWorksheetPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [agencyService, setAgencyService] = useState("");
  const [targetClients, setTargetClients] = useState("");
  const [pipelineProblem, setPipelineProblem] = useState("Referrals are unpredictable, feast or famine");
  const [customProblem, setCustomProblem] = useState("");
  const [retainerValue, setRetainerValue] = useState("$2K–$5K");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !agencyService || !targetClients) return;

    setIsSubmitting(true);
    const finalProblem = pipelineProblem === "Other" ? `Other: ${customProblem}` : pipelineProblem;

    try {
      await fetch("/api/icp-worksheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          companyName,
          website,
          agencyService,
          targetClients,
          pipelineProblem: finalProblem,
          retainerValue,
        }),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <main className="flex-1 pt-24 pb-16 md:pt-36 md:pb-28 px-6">
        <div className="max-w-3xl mx-auto">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                  <FileText className="w-3.5 h-3.5 text-teal-600" />
                  Quick ICP Check · 3 Min
                </span>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-4">
                  Quick ICP Check
                </h1>
                <p className="text-xl text-zinc-600 font-medium mb-6">
                  3 minutes. 6 questions. Zero fluff.
                </p>
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-left text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto space-y-3">
                  <p className="font-semibold text-zinc-900">
                    Tell me a bit about your agency. Within 48 hours, I&apos;ll send you:
                  </p>
                  <ul className="space-y-2 pl-4 list-disc marker:text-teal-600">
                    <li><strong className="text-zinc-900">The full 45-minute ICP Teardown Worksheet</strong> (the deep version)</li>
                    <li><strong className="text-zinc-900">A 5-minute Loom</strong> reviewing your answers specifically</li>
                  </ul>
                  <p className="text-xs text-zinc-500 pt-2 border-t border-zinc-200/80">
                    No sales pitch in the Loom. If your answers tell me you&apos;re not a fit for outbound, I&apos;ll say so and point you somewhere better.
                  </p>
                </div>
              </div>

              {/* Form Container */}
              <div className="bg-white border border-zinc-200/90 rounded-3xl p-8 md:p-10 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Section 0: Contact info */}
                  <div>
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                      Contact Info
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                          Your Name <span className="text-teal-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                          Work Email <span className="text-teal-600">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@agencyhq.com"
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                          Company Name <span className="text-zinc-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Acme Growth Agency"
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                          Website URL <span className="text-zinc-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="url"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://acmeagency.com"
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 1: About your agency */}
                  <div>
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                      About Your Agency
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                          What does your agency do? <span className="text-teal-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={agencyService}
                          onChange={(e) => setAgencyService(e.target.value)}
                          placeholder='e.g. "Webflow development & CRO for B2B SaaS"'
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                          Who do you want MORE of as clients? <span className="text-teal-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={targetClients}
                          onChange={(e) => setTargetClients(e.target.value)}
                          placeholder="Describe them (e.g. Series-A SaaS founders in US/EU doing $1M+ ARR)"
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Where you're stuck */}
                  <div>
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                      Where You&apos;re Stuck
                    </h3>
                    <label className="block text-xs font-semibold text-zinc-900 mb-3">
                      What&apos;s your biggest pipeline problem right now? <span className="text-teal-600">*</span>
                    </label>
                    <div className="space-y-2.5">
                      {[
                        "Referrals are unpredictable, feast or famine",
                        "Tried cold email before, didn't work",
                        "No time to prospect while delivering",
                        "Don't really know who to target",
                        "Other",
                      ].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                            pipelineProblem === option
                              ? "border-zinc-900 bg-zinc-50 font-semibold"
                              : "border-zinc-200 hover:border-zinc-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="pipelineProblem"
                            value={option}
                            checked={pipelineProblem === option}
                            onChange={() => setPipelineProblem(option)}
                            className="accent-zinc-900"
                          />
                          <span>{option}</span>
                        </label>
                      ))}

                      {pipelineProblem === "Other" && (
                        <input
                          type="text"
                          required
                          value={customProblem}
                          onChange={(e) => setCustomProblem(e.target.value)}
                          placeholder="Specify your pipeline challenge..."
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 mt-2 transition-all"
                        />
                      )}
                    </div>
                  </div>

                  {/* Section 3: One optional number */}
                  <div>
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                      Project / Retainer Value
                    </h3>
                    <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                      Average project/retainer value <span className="text-zinc-400 font-normal">(Optional)</span>
                    </label>
                    <select
                      value={retainerValue}
                      onChange={(e) => setRetainerValue(e.target.value)}
                      className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white transition-all"
                    >
                      <option value="Under $2K">Under $2K</option>
                      <option value="$2K–$5K">$2K–$5K</option>
                      <option value="$5K–$10K">$5K–$10K</option>
                      <option value="$10K–$25K">$10K–$25K</option>
                      <option value="$25K+">$25K+</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-base py-4 rounded-xl hover:from-teal-400 hover:to-teal-500 transition-all shadow-lg hover:shadow-teal-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Get the full ICP worksheet + 5-min Loom <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-center text-xs text-zinc-500 pt-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>
                      Your information is secure. Submitting sends your answers directly to shivam@archrevenues.com.
                    </span>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="inline-flex p-4 rounded-full bg-teal-50 text-teal-600 mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                Got it. Check your inbox in 48 hours.
              </h1>
              <p className="text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed mb-8">
                I&apos;ll review your answers personally and send over your 5-minute Loom teardown along with the full 45-minute worksheet.
              </p>

              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 max-w-xl mx-auto text-left space-y-4 mb-10">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider font-mono">
                  While you wait, you can:
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/ICP-Teardown-Worksheet.pdf"
                    target="_blank"
                    className="flex items-center justify-between p-3.5 bg-white border border-zinc-200 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-all group"
                  >
                    <span className="text-sm font-semibold">Download 1-Page PDF Worksheet instantly</span>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link
                    href="/tools/email-generator"
                    className="flex items-center justify-between p-3.5 bg-white border border-zinc-200 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-all group"
                  >
                    <span className="text-sm font-semibold">Try the AI Cold Email Generator</span>
                    <Sparkles className="w-4 h-4 text-teal-500" />
                  </Link>
                  <Link
                    href="/resources/5-touch-sequence"
                    className="flex items-center justify-between p-3.5 bg-white border border-zinc-200 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-all group"
                  >
                    <span className="text-sm font-semibold">Read our 5-Touch Dynamic Sequence Architecture</span>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

              <div className="text-xs text-zinc-500">
                Talk soon,<br />
                <strong className="text-zinc-900 text-sm">Shivam Sharma</strong><br />
                Founder, ARCH Revenues
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
