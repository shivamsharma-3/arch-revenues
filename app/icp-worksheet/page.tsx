"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Target, Users, Mail, Clock } from "lucide-react";

export default function SamplePipelinePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [agencyService, setAgencyService] = useState("");
  const [targetClients, setTargetClients] = useState("");
  const [bestCaseStudy, setBestCaseStudy] = useState("");
  const [pipelineProblem, setPipelineProblem] = useState("Referrals are unpredictable, feast or famine");
  const [customProblem, setCustomProblem] = useState("");
  const [retainerValue, setRetainerValue] = useState("$2K-$5K");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !website || !agencyService || !targetClients || !bestCaseStudy) return;

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
          bestCaseStudy,
          pipelineProblem: finalProblem,
          retainerValue,
        }),
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  Free Proof of Concept · 48-Hour Delivery
                </span>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-4">
                  Get 5 Free Target Accounts &amp; Custom Outbound Pitch
                </h1>
                <p className="text-lg md:text-xl text-zinc-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
                  No generic templates or homework sheets. Tell us what your agency does, and Shivam will hand-pick 5 verified prospect accounts in your niche + craft the exact cold email we&apos;d send them.
                </p>

                {/* 3 Value Pillars */}
                <div className="grid sm:grid-cols-3 gap-3.5 text-left max-w-2xl mx-auto mb-4">
                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
                    <div className="w-7 h-7 rounded-lg bg-teal-100/60 text-teal-700 flex items-center justify-center mb-2.5">
                      <Target className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900 mb-1">5 Verified Accounts</h4>
                    <p className="text-[11px] text-zinc-500 leading-normal">
                      Hand-selected companies matching your sweet spot and deal size.
                    </p>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
                    <div className="w-7 h-7 rounded-lg bg-teal-100/60 text-teal-700 flex items-center justify-center mb-2.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900 mb-1">Decision-Maker Titles</h4>
                    <p className="text-[11px] text-zinc-500 leading-normal">
                      The exact cheque-signers to target (CEO, CMO, or VP Growth).
                    </p>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
                    <div className="w-7 h-7 rounded-lg bg-teal-100/60 text-teal-700 flex items-center justify-center mb-2.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900 mb-1">Tailored Cold Pitch</h4>
                    <p className="text-[11px] text-zinc-500 leading-normal">
                      1 custom pattern-interrupt script using your real client win.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 mt-2">
                  100% free. No pitch call required. Delivered directly to your inbox within 48 hours.
                </p>
              </div>

              {/* Form Container */}
              <div className="bg-white border border-zinc-200/90 rounded-3xl p-8 md:p-10 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Section 0: Contact info */}
                  <div>
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                      1. Contact &amp; Agency Basics
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
                          placeholder="Shivam Sharma"
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
                          placeholder="shivam@agency.com"
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                          Agency / Company Name <span className="text-teal-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Nexus Growth Studio"
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                          Agency Website URL <span className="text-teal-600">*</span>
                        </label>
                        <input
                          type="url"
                          required
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://nexusgrowth.com"
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                        />
                        <p className="text-[10px] text-zinc-400 mt-1">
                          We review your actual website and portfolio to match high-fit prospects.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 1: Positioning & Case Study */}
                  <div>
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                      2. Service &amp; Dream Prospect
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                          What is your agency&apos;s primary service? <span className="text-teal-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={agencyService}
                          onChange={(e) => setAgencyService(e.target.value)}
                          placeholder='e.g. "Webflow development & CRO for B2B SaaS" or "Cold email infrastructure for dev agencies"'
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
                          placeholder="e.g. Series-A/B B2B SaaS founders in US/EU with 20-100 employees"
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                          What is your best client win or case study? <span className="text-teal-600">*</span>
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={bestCaseStudy}
                          onChange={(e) => setBestCaseStudy(e.target.value)}
                          placeholder='e.g. "Redesigned Webflow site for a FinTech that boosted inbound demo conversion by 42% in 60 days"'
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all resize-none"
                        />
                        <p className="text-[10px] text-zinc-400 mt-1">
                          Shivam uses this proof point to draft your custom cold email pitch.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Economics & Pipeline */}
                  <div>
                    <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-100">
                      3. Deal Economics &amp; Pipeline Context
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-1.5">
                          Average project or retainer value <span className="text-zinc-400 font-normal">(Optional)</span>
                        </label>
                        <select
                          value={retainerValue}
                          onChange={(e) => setRetainerValue(e.target.value)}
                          className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white transition-all"
                        >
                          <option value="Under $2K">Under $2K</option>
                          <option value="$2K-$5K">$2K–$5K</option>
                          <option value="$5K-$10K">$5K–$10K</option>
                          <option value="$10K-$25K">$10K–$25K</option>
                          <option value="$25K+">$25K+</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-900 mb-2.5">
                          What&apos;s your biggest pipeline bottleneck right now? <span className="text-teal-600">*</span>
                        </label>
                        <div className="space-y-2">
                          {[
                            "Referrals are unpredictable, feast or famine",
                            "Tried cold email before, didn't work",
                            "No time to prospect while delivering client work",
                            "Don't really know who to target or where to find them",
                            "Other",
                          ].map((option) => (
                            <label
                              key={option}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
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
                              placeholder="Specify your pipeline bottleneck..."
                              className="w-full px-4 py-2.5 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 mt-2 transition-all"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-base py-4 rounded-xl hover:from-teal-400 hover:to-teal-500 transition-all shadow-lg hover:shadow-teal-500/20 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      "Sending Request..."
                    ) : (
                      <>
                        Claim My 5 Free Target Accounts &amp; Custom Pitch <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-center text-xs text-zinc-500 pt-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>
                      100% private. Sent directly to Shivam Sharma for manual research.
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
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-3">
                Request Received!
              </h1>
              <p className="text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed mb-8">
                Thanks, <strong className="text-zinc-900">{name}</strong>. Shivam is personally reviewing your agency and website.
              </p>

              {/* What happens next card */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-left text-sm text-zinc-700 leading-relaxed max-w-xl mx-auto mb-8 space-y-3">
                <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-wider text-teal-700 pb-2 border-b border-zinc-200">
                  <Clock className="w-3.5 h-3.5" />
                  Within 48 Hours in your inbox:
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-600 pl-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>5 Verified Target Accounts:</strong> Hand-picked companies that match your best case study and sweet spot.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Decision-Maker Titles:</strong> Exact titles of the budget holders to contact.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>1 Custom Cold Email Pitch:</strong> Tailored pattern-interrupt script ready to send.</span>
                  </li>
                </ul>
              </div>

              {/* While you wait section */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 max-w-xl mx-auto text-left space-y-4 mb-10 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider font-mono">
                  While you wait:
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/tools/email-generator"
                    className="flex items-center justify-between p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-all group"
                  >
                    <div>
                      <span className="text-sm font-semibold block text-zinc-900 group-hover:text-teal-600">Try the AI Cold Email Generator</span>
                      <span className="text-xs text-zinc-500">Test cold email angles for any target URL right now</span>
                    </div>
                    <Sparkles className="w-4 h-4 text-teal-500 shrink-0" />
                  </Link>

                  <Link
                    href="/resources/5-touch-sequence"
                    className="flex items-center justify-between p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-all group"
                  >
                    <div>
                      <span className="text-sm font-semibold block text-zinc-900 group-hover:text-teal-600">5-Touch Dynamic Sequence Architecture</span>
                      <span className="text-xs text-zinc-500">The outbound playbook we deploy for $10K-$150K/mo agencies</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>

                  <Link
                    href="/strategy-call"
                    className="flex items-center justify-between p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl hover:border-zinc-900 transition-all group"
                  >
                    <div>
                      <span className="text-sm font-semibold block text-zinc-900">Want to skip the queue?</span>
                      <span className="text-xs text-zinc-500">Book a 30-min fit call to discuss your pipeline live</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </div>
              </div>

              <div className="text-xs text-zinc-500">
                Talk soon,<br />
                <strong className="text-zinc-900 text-sm">Shivam Sharma</strong><br />
                Founder, ARCH Revenues · shivam@archrevenues.com
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
