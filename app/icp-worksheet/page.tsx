"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ICPWorksheetPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && email) {
      router.push("/icp-worksheet/thank-you");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow pt-32 pb-24">
        <section className="px-6 max-w-2xl mx-auto text-center">
          <h1 className="text-[32px] md:text-[48px] font-bold text-[#1A2330] tracking-tight mb-6">
            The 1-page worksheet SaaS founders use to define their ICP — before they spend $1 on outbound.
          </h1>
          <p className="text-[18px] text-[#506070] leading-relaxed mb-12">
            8 questions. 15 minutes. The exact worksheet we use with every ARCH Revenues client to decide who to target, who to ignore, and what triggers a meeting request.
          </p>

          <div className="bg-[#F8F0EB] p-8 md:p-12 rounded-2xl border border-zinc-200 text-left shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-[#1A2330] font-bold mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4875A]"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#1A2330] font-bold mb-2">Work Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4875A]"
                  placeholder="jane@saascompany.com"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#D4875A] text-white font-bold text-[18px] py-4 rounded-xl hover:bg-[#c2794e] transition-colors shadow-lg hover:shadow-[#D4875A]/20"
              >
                Download the worksheet
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
