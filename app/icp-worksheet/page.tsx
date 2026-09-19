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
                  Agency ICP Teardown
                </span>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-4">
                  The Agency ICP Teardown
                </h1>
                <p className="text-xl text-zinc-600 font-medium mb-8 max-w-xl mx-auto">
                  Is your targeting tight enough to book qualified demos through cold outbound?
                </p>

                {/* Path Selector / Instant PDF option */}
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left mb-4">
                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        <span>Option 1 · Self-Serve</span>
                      </div>
                      <h3 className="font-semibold text-zinc-900 text-sm mb-1">
                        Download Internal Playbook
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                        Get our complete 4-page framework with an annotated agency example, 8-point matrix, and disqualifier checklist.
                      </p>
                    </div>
                    <a
                      href="/ICP-Teardown-Worksheet.pdf"
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-xs font-bold text-zinc-900 hover:border-zinc-900 hover:bg-zinc-100 transition-all group"
                    >
                      <span>Download 4-Page PDF</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  </div>

                  <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-700 mb-2">
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                        <span>Option 2 · Expert Review</span>
                      </div>
                      <h3 className="font-semibold text-zinc-900 text-sm mb-1">
                        Get Shivam&apos;s 5-Min Loom Teardown
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                        Answer 6 quick questions below. I&apos;ll record a candid 5-minute video analyzing your positioning within 48h.
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-teal-700 flex items-center gap-1.5">
                      <span>Fill 3-Min Form Below</span> ↓
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 mt-3">
                  No sales pitch in the Loom. If your agency isn&apos;t a fit for outbound, I&apos;ll tell you straight up.
                </p>
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
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-base py-4 rounded-xl hover:from-teal-400 hover:to-teal-500 transition-all shadow-lg hover:shadow-teal-500/20 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Get My 5-Minute Video Teardown <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-center text-xs text-zinc-500 pt-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>
                      Your answers are sent directly to shivam@archrevenues.com for personal review.
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
                Diagnostic Received!
              </h1>
              <p className="text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed mb-4">
                Shivam is personally reviewing your answers. Look for your 5-minute video teardown in your inbox within 48 hours.
              </p>

              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-left text-sm text-zinc-600 leading-relaxed max-w-xl mx-auto mb-8 space-y-2">
                <p className="font-semibold text-zinc-900">What Shivam will break down in your video:</p>
                <ul className="space-y-1.5 pl-4 list-disc marker:text-teal-600 text-xs text-zinc-600">
                  <li><strong>Niche sharpness:</strong> Is your vertical narrow enough to convert cold prospects?</li>
                  <li><strong>Trigger events:</strong> What real-time buying signals you should track to open inboxes.</li>
                  <li><strong>Offer angle &amp; unit economics:</strong> The exact hook and risk reversal to lead with.</li>
                </ul>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 max-w-xl mx-auto text-left space-y-4 mb-10">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider font-mono">
                  While you wait, explore:
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/ICP-Teardown-Worksheet.pdf"
                    target="_blank"
                    className="flex items-center justify-between p-3.5 bg-white border border-zinc-200 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-all group"
                  >
                    <div>
                      <span className="text-sm font-semibold block text-zinc-900 group-hover:text-teal-600">Download 4-Page ICP Playbook (PDF)</span>
                      <span className="text-xs text-zinc-500">Reference our internal framework &amp; annotated agency examples</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                  <Link
                    href="/tools/email-generator"
                    className="flex items-center justify-between p-3.5 bg-white border border-zinc-200 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-all group"
                  >
                    <div>
                      <span className="text-sm font-semibold block text-zinc-900 group-hover:text-teal-600">Try the AI Cold Email Generator</span>
                      <span className="text-xs text-zinc-500">Generate personalized cold emails for your target accounts</span>
                    </div>
                    <Sparkles className="w-4 h-4 text-teal-500 shrink-0" />
                  </Link>
                  <Link
                    href="/resources/5-touch-sequence"
                    className="flex items-center justify-between p-3.5 bg-white border border-zinc-200 rounded-xl hover:border-teal-500 hover:text-teal-600 transition-all group"
                  >
                    <div>
                      <span className="text-sm font-semibold block text-zinc-900 group-hover:text-teal-600">5-Touch Dynamic Sequence Architecture</span>
                      <span className="text-xs text-zinc-500">The multi-touch outbound playbook we deploy for clients</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all shrink-0" />
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
