"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

type CategoryType = "all" | "tools" | "playbooks";

interface ResourceItem {
  id: string;
  category: CategoryType;
  tag: string;
  title: string;
  description: string;
  readTime: string;
  status: string;
  href: string;
}

const resources: ResourceItem[] = [
  {
    id: "email-generator",
    category: "tools",
    tag: "Free AI Tool",
    title: "Cold Email Generator for Agencies",
    description:
      "AI-driven cold email writer that generates personalized outbound hooks and offer angles directly from your prospect's website.",
    readTime: "Instant AI Tool",
    status: "Launch Tool",
    href: "/tools/email-generator",
  },
  {
    id: "icp-worksheet",
    category: "tools",
    tag: "Diagnostic & Playbook",
    title: "Agency ICP Teardown & Playbook",
    description:
      "A 3-minute diagnostic for a custom 5-minute Loom video review from Shivam, plus our complete 4-page agency targeting playbook with real examples.",
    readTime: "3 min check",
    status: "Get Teardown",
    href: "/icp-worksheet",
  },
  {
    id: "tech-infrastructure",
    category: "playbooks",
    tag: "Technical Setup",
    title: "Technical Email Infrastructure Blueprint",
    description:
      "Why 90% of agency cold email lands in spam and how to set up secondary lookalike domains, Google Workspace inboxes, and inbox warmup for 95%+ deliverability.",
    readTime: "10 min read",
    status: "Read Blueprint",
    href: "/resources/technical-email-infrastructure",
  },
  {
    id: "sequence-architecture",
    category: "playbooks",
    tag: "Sequence Playbook",
    title: "5-Touch Dynamic Outbound Sequence",
    description:
      "A response-adaptive 14-day sequence (Email + LinkedIn) with exact humanized copy templates, condition branches, and objection triage.",
    readTime: "8 min read",
    status: "Explore Playbook",
    href: "/resources/5-touch-sequence",
  },
];

export function ResourcesClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");

  const filteredResources = resources.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 pt-24 pb-16 md:pt-36 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-mono font-bold tracking-wider uppercase mb-6 border border-zinc-200">
                Outbound Engine Resources
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-4">
                Resources for Agency Founders
              </h1>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Step-by-step guides, technical blueprints, and free tools to help founder-led agencies build predictable outbound engines.
              </p>
            </motion.div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all border ${
                activeCategory === "all"
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
              }`}
            >
              All Resources
            </button>
            <button
              onClick={() => setActiveCategory("tools")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all border ${
                activeCategory === "tools"
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
              }`}
            >
              Free Tools
            </button>
            <button
              onClick={() => setActiveCategory("playbooks")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all border ${
                activeCategory === "playbooks"
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
              }`}
            >
              Playbooks & Blueprints
            </button>
          </div>

          {/* Resources Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
              {filteredResources.map((guide) => (
                <Link
                  key={guide.id}
                  href={guide.href}
                  className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:border-zinc-400 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider block mb-3">
                      {guide.tag}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900 mb-3 leading-snug group-hover:text-teal-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                      {guide.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-medium text-zinc-500">
                    <span>{guide.readTime}</span>
                    <span className="text-zinc-900 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      {guide.status} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <div className="text-center bg-zinc-50 border border-zinc-200 rounded-3xl p-10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">
              Want us to build and run this system for you?
            </h3>
            <p className="text-zinc-600 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Skip the technical learning curve. We handle domain setup, list building, copy creation, reply handling, and guaranteed booked demos.
            </p>
            <Link
              href="/strategy-call"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:from-teal-400 hover:to-teal-500 transition-all shadow-md"
            >
              Book a 30-min strategy call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
