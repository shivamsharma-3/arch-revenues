"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Static option lists                                                */
/* ------------------------------------------------------------------ */

const TRIGGER_OPTIONS = [
  "Just raised a round",
  "New CEO / Head of Marketing hired",
  "Launched a new product line",
  "Rebrand in progress",
  "Site conversion rate dropped",
  "Page-1 ranking lost",
  "Competitor just relaunched site",
  "Hired a CMO (first ever)",
  "Series A/B in 90 days",
  "Acquired another company",
  "Public launch upcoming",
  "Other",
];

const DISQUALIFIER_OPTIONS = [
  "Under 10 employees (no budget)",
  "No product-market fit yet",
  "In-house design team of 3+",
  "Already working with another agency",
  "Lifecycle < 6 months (likely to churn)",
  "Revenue < $200K ARR (cannot pay $1K/mo)",
  "Non-English speaking market only",
  "Founder is the only decision-maker AND traveling",
  "Pre-revenue (still raising seed)",
  "Sub-industry we cannot serve well",
];

const ONE_PAGER_ROWS = [
  {
    title: "THE ONE-LINER",
    prompt: '"We help [firmographic] who [trigger event] do [the work] so they can [outcome]."',
    name: "onePager_oneliner",
  },
  {
    title: "THE TARGET ACCOUNT",
    prompt: "Industry, size, stage, geography",
    name: "onePager_target",
  },
  {
    title: "THE BUYER",
    prompt: "Title, seniority, what they care about",
    name: "onePager_buyer",
  },
  {
    title: "THE TRIGGER",
    prompt: 'What event means "open the inbox now"',
    name: "onePager_trigger",
  },
  {
    title: "THE PAIN",
    prompt: "The single most acute pain you solve",
    name: "onePager_pain",
  },
  {
    title: "THE DISQUALIFIER",
    prompt: "One line — if true, walk away",
    name: "onePager_disq",
  },
];

const HOW_TO_STEPS = [
  "Fill it in honestly — vague answers produce vague outbound. If you can't be specific, say so and come back later.",
  "Don't optimize for completeness; optimize for specificity. One sharp pain beats three fuzzy ones.",
  "If you can't answer a section, that's the section to revisit before you send a single cold email.",
  "Submit when done — you'll get a 5-minute Loom review back from Shivam within 48 hours, no strings attached.",
];

/* ------------------------------------------------------------------ */
/*  Shared class strings                                               */
/* ------------------------------------------------------------------ */

const INPUT_CLS =
  "w-full bg-zinc-50 border border-zinc-200 rounded-md px-4 py-2.5 text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all";
const TEXTAREA_CLS = INPUT_CLS + " resize-none";
const LABEL_CLS = "block text-sm font-medium text-zinc-700 mb-2";
const HINT_CLS = "text-xs text-zinc-400 mt-1.5";

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function AuditPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [selectedDisqualifiers, setSelectedDisqualifiers] = useState<string[]>(
    []
  );

  /* ---------- helpers ---------- */

  const toggleTrigger = (label: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(label)
        ? prev.filter((t) => t !== label)
        : [...prev, label]
    );
  };

  const toggleDisqualifier = (label: string) => {
    setSelectedDisqualifiers((prev) =>
      prev.includes(label)
        ? prev.filter((d) => d !== label)
        : [...prev, label]
    );
  };

  /* ---------- submit ---------- */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const payload: Record<string, string> = {};

      formData.forEach((value, key) => {
        payload[key] = value.toString();
      });

      // Comma-joined checkbox selections
      payload.triggers = selectedTriggers.join(", ");
      payload.disqualifiers = selectedDisqualifiers.join(", ");

      // Only include triggerOther when "Other" was checked
      if (!selectedTriggers.includes("Other")) {
        delete payload.triggerOther;
      }

      payload.submittedAt = new Date().toISOString();
      payload.source = "icp-teardown-worksheet";

      const res = await fetch("/api/icp-worksheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = `Submission failed (${res.status}).`;
        try {
          const j = await res.json();
          if (j?.error) msg = j.error;
        } catch {
          /* ignore */
        }
        throw new Error(
          `${msg} Please try again or email shivam@archrevenues.com directly.`
        );
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email shivam@archrevenues.com."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- success screen ---------- */

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-50 py-12 px-6 flex items-center justify-center">
        <div className="max-w-2xl mx-auto w-full bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm text-center">
          {/* checkmark */}
          <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7 text-white"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-3">
            Your ICP worksheet is on its way to us.
          </h1>

          <p className="text-zinc-600 leading-relaxed mb-8">
            We&apos;ve received your ICP Teardown Worksheet. Within 48 hours
            you&apos;ll get a 5-minute Loom back from Shivam with feedback on
            your one-liner, triggers, and disqualifiers — no strings attached.
          </p>

          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 text-left text-sm text-zinc-600 leading-relaxed mb-8">
            <strong className="text-zinc-900">Want to skip the queue?</strong>{" "}
            Book a 20-minute strategy call and we&apos;ll walk through your worksheet
            together — live. Founding client rate ($1,500/mo) is open for the
            next 3 companies.
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/strategy-call"
              className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-md font-medium hover:bg-zinc-800 transition-all"
            >
              Book a 20-min strategy call →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-zinc-300 text-zinc-700 px-6 py-3 rounded-md font-medium hover:bg-zinc-50 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- form ---------- */

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Home
        </Link>

        {/* hero */}
        <div className="mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-zinc-200/50 text-zinc-600 text-xs font-mono font-medium tracking-wide uppercase border border-zinc-300/50">
            45-minute working session
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-4 mt-4">
            The ICP Teardown Worksheet
          </h1>
          <p className="text-lg text-zinc-600 mb-2">
            Who is your SaaS actually built to serve? Compress your ideal
            client profile into a single page you can hand to anyone on your
            team — and to us, when you&apos;re ready to outsource the top of
            your pipeline.
          </p>
          <p className="text-sm text-zinc-500 mb-12">
            Takes ~45 minutes. Submit and get a 5-min Loom review back within 48
            hours.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800 font-medium text-center shadow-sm">
          Fields marked * are required. Everything else is optional — fill in what you know, skip what you don&apos;t.
        </div>

        {/* form card */}
        <form
          onSubmit={handleSubmit}
          className="space-y-12 bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm"
        >
          {/* ====================================================== */}
          {/* SECTION 0 — Your details                               */}
          {/* ====================================================== */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">
              0. Your details
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              So we know who to send the Loom review back to.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={LABEL_CLS}>Your Name *</label>
                <input
                  required
                  type="text"
                  name="yourName"
                  className={INPUT_CLS}
                />
              </div>
              <div>
                <label className={LABEL_CLS}>Contact Email *</label>
                <input
                  required
                  type="email"
                  name="email"
                  className={INPUT_CLS}
                />
              </div>
              <div>
                <label className={LABEL_CLS}>Company Name *</label>
                <input
                  required
                  type="text"
                  name="agencyName"
                  className={INPUT_CLS}
                />
              </div>
              <div>
                <label className={LABEL_CLS}>Website</label>
                <input
                  type="text"
                  name="website"
                  placeholder="archrevenues.com"
                  className={INPUT_CLS}
                />
              </div>
            </div>
          </section>

          {/* ====================================================== */}
          {/* SECTION 1 — Firmographics                              */}
          {/* ====================================================== */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">
              1. Firmographics
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              Start with the company — not the person. Pick a tight box; you can widen later.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Industry — full width */}
              <div className="md:col-span-2">
                <label className={LABEL_CLS}>Industry vertical *</label>
                <input
                  required
                  type="text"
                  name="industry"
                  placeholder='e.g. B2B SaaS — HR / payroll'
                  className={INPUT_CLS}
                />
                <p className={HINT_CLS}>
                  Be specific: &quot;B2B SaaS — HR / payroll&quot; beats
                  &quot;SaaS&quot;
                </p>
              </div>

              {/* Company size */}
              <div>
                <label className={LABEL_CLS}>
                  Company size (employees)
                </label>
                <input
                  type="text"
                  name="size"
                  placeholder="e.g. 11–50"
                  className={INPUT_CLS}
                />
              </div>

              {/* Revenue stage */}
              <div>
                <label className={LABEL_CLS}>Revenue stage</label>
                <input
                  type="text"
                  name="revenue"
                  placeholder="e.g. $500K–$5M ARR"
                  className={INPUT_CLS}
                />
              </div>

              {/* Funding stage */}
              <div>
                <label className={LABEL_CLS}>Funding stage</label>
                <input
                  type="text"
                  name="funding"
                  placeholder="Bootstrapped / Seed / Series A / Series B+"
                  className={INPUT_CLS}
                />
              </div>

              {/* Geography — full width */}
              <div className="md:col-span-2">
                <label className={LABEL_CLS}>Geography</label>
                <input
                  type="text"
                  name="geo"
                  placeholder="NA only / EU only / English-speaking / global"
                  className={INPUT_CLS}
                />
              </div>

              {/* Buyer's title — full width */}
              <div className="md:col-span-2">
                <label className={LABEL_CLS}>
                  Buyer&apos;s title (who signs the cheque) *
                </label>
                <input
                  required
                  type="text"
                  name="buyer"
                  placeholder="CEO / Founder / Head of Growth / CMO"
                  className={INPUT_CLS}
                />
              </div>
            </div>
          </section>

          {/* ====================================================== */}
          {/* SECTION 2 — Pain & Trigger Events                      */}
          {/* ====================================================== */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">
              2. Pain &amp; Trigger Events
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              Pain tells you why they&apos;ll buy. Triggers tell you when. You need both.
            </p>

            {/* Top 3 pains */}
            <div className="space-y-4 mb-8">
              <label className="block text-sm font-medium text-zinc-700">
                Top 3 pains your ICP feels right now (rank them). Pain #1 is required *
              </label>
              <textarea
                required
                rows={2}
                name="pain1"
                placeholder="Pain #1 *"
                className={TEXTAREA_CLS}
              />
              <textarea
                rows={2}
                name="pain2"
                placeholder="Pain #2"
                className={TEXTAREA_CLS}
              />
              <textarea
                rows={2}
                name="pain3"
                placeholder="Pain #3"
                className={TEXTAREA_CLS}
              />
            </div>

            {/* Trigger events */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Trigger events that mean &quot;open the inbox now&quot; — check
                all that apply
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {TRIGGER_OPTIONS.map((label) => {
                  const checked = selectedTriggers.includes(label);
                  return (
                    <label
                      key={label}
                      className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors ${
                        checked
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "border-zinc-200 hover:bg-zinc-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleTrigger(label)}
                        className={`w-4 h-4 rounded focus:ring-zinc-900 ${
                          checked
                            ? "accent-white"
                            : "text-zinc-900 border-zinc-300"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          checked ? "text-white" : "text-zinc-700"
                        }`}
                      >
                        {label}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Conditional "Other" input */}
              {selectedTriggers.includes("Other") && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="triggerOther"
                    placeholder="Describe the other trigger"
                    className={INPUT_CLS}
                  />
                </div>
              )}
            </div>

            {/* Where spotted first */}
            <div>
              <label className={LABEL_CLS}>
                Where do you spot these triggers first?
              </label>
              <textarea
                rows={3}
                name="triggerSources"
                className={TEXTAREA_CLS}
              />
              <p className={HINT_CLS}>
                LinkedIn Sales Nav, Crunchbase, RSS, press releases, a specific
                Slack community, your own network?
              </p>
            </div>
          </section>

          {/* ====================================================== */}
          {/* SECTION 3 — Behavioral Signals                         */}
          {/* ====================================================== */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">
              3. Behavioral Signals
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              Where they hang out, what they read. If you can&apos;t name their favorite podcast, you don&apos;t know your ICP.
            </p>

            <div className="space-y-6">
              {/* Podcasts */}
              <div>
                <label className={LABEL_CLS}>
                  Top 3 podcasts your ICP actually listens to
                </label>
                <input
                  type="text"
                  name="podcasts"
                  placeholder="e.g. Lenny's Podcast, The SaaS Podcast, Founder's Journal"
                  className={INPUT_CLS}
                />
              </div>

              {/* Newsletters */}
              <div>
                <label className={LABEL_CLS}>
                  Top 3 newsletters in their inbox
                </label>
                <input
                  type="text"
                  name="newsletters"
                  placeholder="e.g. Growth Unhinged, Stacked Marketer, Refactoring"
                  className={INPUT_CLS}
                />
                <p className={HINT_CLS}>
                  Be honest — which ones get opened?
                </p>
              </div>

              {/* Slack / Discord */}
              <div>
                <label className={LABEL_CLS}>
                  Slack / Discord communities they are in
                </label>
                <input
                  type="text"
                  name="slack"
                  placeholder="e.g. Mind the Product, Superpath, Design Leadership"
                  className={INPUT_CLS}
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className={LABEL_CLS}>
                  LinkedIn voices they engage with
                </label>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="e.g. Wes Bush, Elena Verna, Hila Qu"
                  className={INPUT_CLS}
                />
                <p className={HINT_CLS}>Likes, comments, shares</p>
              </div>

              {/* Events */}
              <div>
                <label className={LABEL_CLS}>
                  Conferences / events they attend
                </label>
                <input
                  type="text"
                  name="events"
                  placeholder="e.g. SaaStr Annual, BOSS, Config"
                  className={INPUT_CLS}
                />
                <p className={HINT_CLS}>Last 12 months</p>
              </div>
            </div>
          </section>

          {/* ====================================================== */}
          {/* SECTION 4 — Disqualifiers                              */}
          {/* ====================================================== */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">
              4. Disqualifiers
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              Every disqualifier is a meeting you don&apos;t have to take. Write them down. Enforce them.
            </p>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Hard disqualifiers — if any of these are true, walk away
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {DISQUALIFIER_OPTIONS.map((label) => {
                  const checked = selectedDisqualifiers.includes(label);
                  return (
                    <label
                      key={label}
                      className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors ${
                        checked
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "border-zinc-200 hover:bg-zinc-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDisqualifier(label)}
                        className={`w-4 h-4 rounded focus:ring-zinc-900 ${
                          checked
                            ? "accent-white"
                            : "text-zinc-900 border-zinc-300"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          checked ? "text-white" : "text-zinc-700"
                        }`}
                      >
                        {label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ====================================================== */}
          {/* SECTION 5 — Top 5 dream accounts                       */}
          {/* ====================================================== */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">
              5. Top 5 dream accounts
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              Name five real companies that match this ICP right now. If you can&apos;t, your ICP is too abstract.
            </p>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="flex items-center gap-3">
                  <span className="text-sm font-mono text-zinc-400 w-6">
                    {n}.
                  </span>
                  <input
                    required={n === 1}
                    type="text"
                    name={`account${n}`}
                    placeholder={n === 1 ? "Company name (and why they fit) *" : "Company name (and why they fit)"}
                    className="flex-1 bg-zinc-50 border border-zinc-200 rounded-md px-4 py-2.5 text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ====================================================== */}
          {/* CLOSING — What happens next                            */}
          {/* ====================================================== */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">
              What happens next
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              Three paths. Pick one after you submit.
            </p>

            <div className="space-y-4">
              {/* Path 1 */}
              <div className="bg-zinc-50 border-l-2 border-zinc-900 rounded-r-md p-5">
                <p className="font-semibold text-zinc-900 text-sm mb-1">
                  Path 1 — Run it yourself.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  You now have a one-page ICP. Hand it to your SDR, point them
                  at LinkedIn Sales Navigator, and start a 30-day outbound
                  sprint. Expect 20–40 hours of weekly effort to book 4–8 demos.
                  Right path if you have a junior SDR on payroll and 4–6 weeks
                  of runway.
                </p>
              </div>

              {/* Path 2 */}
              <div className="bg-zinc-50 border-l-2 border-zinc-900 rounded-r-md p-5">
                <p className="font-semibold text-zinc-900 text-sm mb-1">
                  Path 2 — Hand the profile to ARCH Revenues.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Send us the completed one-pager (just hit submit below). We
                  turn it into a 200-account prospect list, write the sequence,
                  run outbound on your behalf, and book 5–12 qualified demos per
                  month into your calendar. You only pay if demos show up.
                  Founding Client rate is $1,500/mo for the first 3 companies —
                  after that it moves to $4,000/mo.
                </p>
              </div>

              {/* Path 3 */}
              <div className="bg-zinc-50 border-l-2 border-zinc-900 rounded-r-md p-5">
                <p className="font-semibold text-zinc-900 text-sm mb-1">
                  Path 3 — Park it.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Not ready to do either? Save this worksheet. Revisit it in 90
                  days. The ICP almost always looks different once you&apos;ve
                  run a few campaigns and learned what actually closes. No
                  penalty for waiting — the Founding Client rate will still be
                  on the table when you come back.
                </p>
              </div>
            </div>

            <blockquote className="mt-8 pl-4 border-l-2 border-zinc-300 italic text-zinc-600 text-base leading-relaxed">
              The SaaS company that wins their category is not the one with the
              best software. It is the one with the tightest ICP and the most
              disciplined outbound.
            </blockquote>
          </section>

          {/* ====================================================== */}
          {/* SUBMIT AREA                                            */}
          {/* ====================================================== */}
          <section>
            {/* error box */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 leading-relaxed">
                {error}
              </div>
            )}

            {/* submit note */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 text-sm text-zinc-500 leading-relaxed text-center mb-6">
              Submitting this form emails your worksheet to
              shivam@archrevenues.com. You&apos;ll get a 5-minute Loom back
              within 48 hours — no strings attached.
            </div>

            {/* submit button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-4 rounded-md font-medium hover:bg-zinc-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg"
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending worksheet…
                </>
              ) : (
                <>Submit worksheet →</>
              )}
            </button>

            <p className="text-center text-xs text-zinc-400 mt-3">
              Your information is secure and will never be shared.
            </p>
          </section>
        </form>
      </div>
    </div>
  );
}
