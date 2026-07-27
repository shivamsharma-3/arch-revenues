"use client";
import { motion } from "motion/react";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ICPWorksheetPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && email) {
      setIsSubmitting(true);
      try {
        await fetch('/api/icp-worksheet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, email }),
        });
        router.push("/icp-worksheet/thank-you");
      } catch (error) {
        console.error("Error submitting form", error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex-grow pt-20 pb-12 md:pt-32 md:pb-24">
        <section className="px-6 max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-6">
            The 1-page worksheet agency founders use to define their ICP — before they spend $1 on outbound.
          </h1>
          <p className="text-lg text-zinc-700 leading-relaxed mb-12">
            8 questions. 15 minutes. The exact worksheet we use with every ARCH Revenues client to decide who to target, who to ignore, and what triggers a meeting request.
          </p>

          <div className="bg-white p-8 md:p-12 rounded-2xl border-2 border-zinc-900 max-w-xl w-full mx-auto shadow-lg text-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-zinc-900 font-bold mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-zinc-900 font-bold mb-2">Work Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  placeholder="jane@agencyhq.com"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-zinc-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-zinc-800 transition-colors shadow-lg hover:shadow-zinc-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Download the 5-Min Worksheet"}
              </button>
            </form>
            <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-col gap-2 text-center">
              <a
                href="/ICP-Teardown-Worksheet.pdf"
                download="ICP-Teardown-Worksheet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-600 hover:text-zinc-900 font-semibold underline transition-colors"
              >
                Or download 1-Page PDF directly without waiting →
              </a>
              <a
                href="/audit"
                className="text-xs text-teal-600 hover:text-teal-800 font-semibold underline transition-colors"
              >
                Prefer an interactive online teardown? Launch our 45-Minute ICP Deep Dive →
              </a>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
