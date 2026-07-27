"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Server,
  Target,
  Mail,
  Sparkles,
  FileSpreadsheet,
  Zap,
  CheckCircle2,
  Search,
} from "lucide-react";

type CategoryType = "all" | "tools" | "guides" | "infrastructure";

interface ResourceItem {
  id: string;
  categoryType: CategoryType;
  categoryLabel: string;
  title: string;
  description: string;
  readTime: string;
  badge: string;
  href: string;
  status: string;
  icon: any;
  featured?: boolean;
  highlights?: string[];
}

const resourcesList: ResourceItem[] = [
  {
    id: "email-generator",
    categoryType: "tools",
    categoryLabel: "AI & Interactive Tools",
    title: "Free AI Cold Email Generator for Agencies",
    description:
      "Generate hyper-personalized cold outreach emails instantly based on prospect website content, trigger events, and offer angles.",
    readTime: "Instant AI Tool",
    badge: "Interactive Tool",
    href: "/tools/email-generator",
    status: "Launch Tool →",
    icon: Sparkles,
    featured: true,
    highlights: ["No account required", "Prospect site analyzer", "Pattern-interrupt copy"],
  },
  {
    id: "icp-worksheet",
    categoryType: "tools",
    categoryLabel: "ICP & Lead Magnets",
    title: "The 5-Minute ICP Mapping Worksheet",
    description:
      "A streamlined 1-page worksheet to nail your target ideal customer profile, key buyer titles, trigger events, and disqualification rules.",
    readTime: "5 min exercise",
    badge: "Lead Magnet",
    href: "/icp-worksheet",
    status: "Download Worksheet →",
    icon: FileSpreadsheet,
    featured: true,
    highlights: ["1-page PDF format", "Disqualification criteria", "Niche specificity score"],
  },
  {
    id: "icp-audit",
    categoryType: "tools",
    categoryLabel: "Strategy & Teardowns",
    title: "45-Minute ICP Deep Dive & Teardown",
    description:
      "Interactive teardown framework designed for agency founders to systematically uncover hidden buying signals and high-converting offer angles.",
    readTime: "Interactive Tool",
    badge: "Audit Tool",
    href: "/audit",
    status: "Start Teardown →",
    icon: Target,
    highlights: ["Trigger identification", "Pain point scoring", "Offer alignment"],
  },
  {
    id: "tech-infrastructure",
    categoryType: "infrastructure",
    categoryLabel: "Infrastructure & Deliverability",
    title: "Technical Email Infrastructure Blueprint (SPF, DKIM, DMARC, Warmup)",
    description:
      "Why 90% of agency cold emails land in spam and how to set up secondary lookalike domains, Google Workspace inboxes, and gradual inbox warmup for 95%+ deliverability.",
    readTime: "8 min read",
    badge: "Technical Blueprint",
    href: "/how-it-works",
    status: "Read Blueprint →",
    icon: Server,
    highlights: ["DNS Configuration", "Domain warmup protocols", "Secondary domain setup"],
  },
  {
    id: "sequence-architecture",
    categoryType: "guides",
    categoryLabel: "Sequence Engineering",
    title: "The 7-Touch Cold Email + LinkedIn Sequence Architecture",
    description:
      "A complete breakdown of pattern-interrupt openers, value-add follow-ups, case study proof touches, and LinkedIn voice notes engineered for 15–25% positive reply rates.",
    readTime: "10 min read",
    badge: "Copywriting Guide",
    href: "/tools/email-generator",
    status: "Explore Architecture →",
    icon: Mail,
    highlights: ["Multi-channel timing", "Value-add follow-ups", "LinkedIn touchpoints"],
  },
];

export function ResourcesClient() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resourcesList.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.categoryType === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: { id: CategoryType; label: string }[] = [
    { id: "all", label: "All Resources" },
    { id: "tools", label: "Interactive AI Tools" },
    { id: "guides", label: "Playbooks & Guides" },
    { id: "infrastructure", label: "Technical Infrastructure" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <main className="flex-1 pt-24 pb-20 md:pt-36 md:pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-mono font-bold uppercase tracking-widest mb-6">
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                Outbound Engine Knowledge Base
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-6 leading-tight">
                Agency Outbound <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500">Playbooks & Tools</span>
              </h1>
              <p className="text-base md:text-lg text-zinc-600 leading-relaxed">
                Battle-tested frameworks, interactive AI tools, and technical blueprints to help founder-led agencies build predictable, high-converting outbound pipelines.
              </p>
            </motion.div>
          </div>

          {/* Quick Value Metrics Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-teal-50 text-teal-600 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900">100% Free Tools</h4>
                <p className="text-xs text-zinc-500">No credit card or sign-up required</p>
              </div>
            </div>
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900">Tested Frameworks</h4>
                <p className="text-xs text-zinc-500">Engineered for 15-25% reply benchmarks</p>
              </div>
            </div>
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900">Technical Blueprints</h4>
                <p className="text-xs text-zinc-500">SPF/DKIM/DMARC deliverability setups</p>
              </div>
            </div>
          </div>

          {/* Featured Highlight Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative bg-zinc-950 text-white rounded-3xl p-8 md:p-12 mb-14 shadow-2xl overflow-hidden border border-zinc-800"
          >
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono font-bold uppercase tracking-widest mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Free Tool
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">
                  Free AI Cold Email Generator & ICP Worksheet
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Instantly craft hyper-personalized cold email hooks or download our 8-question ICP worksheet to lock in high-converting outreach angles before spending on ads or lists.
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-zinc-300 mb-8">
                  <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Instant AI Output
                  </span>
                  <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> 1-Page Worksheet
                  </span>
                  <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Zero Sign-up
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/tools/email-generator"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 text-zinc-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all hover:brightness-110 shadow-lg shadow-teal-500/20"
                  >
                    Try AI Email Generator <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/icp-worksheet"
                    className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold px-6 py-3.5 rounded-xl text-sm border border-zinc-800 transition-all"
                  >
                    Get ICP Worksheet
                  </Link>
                </div>
              </div>

              <div className="md:col-span-5 hidden md:block">
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-inner space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-zinc-800">
                    <span>STATUS: READY</span>
                    <span className="text-teal-400 font-bold">100% FREE</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 bg-zinc-800 rounded-full w-3/4 animate-pulse" />
                    <div className="h-2.5 bg-zinc-800 rounded-full w-full" />
                    <div className="h-2.5 bg-zinc-800/60 rounded-full w-5/6" />
                  </div>
                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Live AI Model Active</span>
                    <span className="text-xs font-mono text-teal-400 font-semibold">Gemini 3.6 Flash</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filter & Search Control Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-zinc-900 text-white shadow-sm"
                      : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-full pl-10 pr-4 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>
          </div>

          {/* Resource Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
              {filteredResources.map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <div
                    key={resource.id}
                    className="bg-white border border-zinc-200/90 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="p-3 bg-zinc-100 text-zinc-900 rounded-2xl group-hover:bg-teal-500 group-hover:text-white transition-colors">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                          {resource.badge}
                        </span>
                      </div>

                      <p className="text-[11px] font-mono font-bold text-teal-600 uppercase tracking-wider mb-2">
                        {resource.categoryLabel}
                      </p>
                      <h3 className="text-lg font-bold text-zinc-900 mb-3 leading-snug group-hover:text-teal-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed mb-6">
                        {resource.description}
                      </p>

                      {resource.highlights && (
                        <div className="space-y-1.5 mb-6 pt-4 border-t border-zinc-100">
                          {resource.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-500">
                              <CheckCircle2 className="w-3 h-3 text-teal-500 shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono text-zinc-400">{resource.readTime}</span>
                      <Link
                        href={resource.href}
                        className="font-bold text-zinc-900 group-hover:text-teal-600 transition-colors inline-flex items-center gap-1"
                      >
                        {resource.status}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Consultation CTA */}
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 text-white border border-zinc-800 rounded-3xl p-10 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest block mb-3">
                Done-For-You Acquisition Engine
              </span>
              <h3 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
                Want us to build and manage this system for your agency?
              </h3>
              <p className="text-zinc-400 mb-8 max-w-xl mx-auto text-xs md:text-sm leading-relaxed">
                Skip the technical setup and iteration process. We handle lookalike domains, inbox warmup, verified list curation, custom copywriting, and qualification calls.
              </p>
              <Link
                href="/strategy-call"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 text-zinc-950 font-bold px-8 py-4 rounded-xl text-sm transition-all hover:brightness-110 shadow-lg shadow-teal-500/25"
              >
                Book a 30-min Strategy Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
