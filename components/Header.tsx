"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  FileSpreadsheet,
  Target,
  BookOpen,
  ArrowRight,
  Zap,
} from "lucide-react";
import { usePathname } from "next/navigation";

const toolResources = [
  {
    name: "Free Cold Email Generator",
    href: "/tools/email-generator",
    description: "AI writes personalized outbound email copy instantly",
    badge: "AI Tool",
    icon: Sparkles,
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    iconBg: "bg-teal-500/10 text-teal-600 group-hover:bg-teal-500 group-hover:text-white",
  },
  {
    name: "5-Min ICP Lead Magnet",
    href: "/icp-worksheet",
    description: "1-page worksheet to map target ICP in 5 minutes",
    badge: "Worksheet",
    icon: FileSpreadsheet,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white",
  },
  {
    name: "45-Min ICP Deep Dive",
    href: "/audit",
    description: "Interactive teardown tool for triggers & disqualifiers",
    badge: "Teardown",
    icon: Target,
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    iconBg: "bg-purple-500/10 text-purple-600 group-hover:bg-purple-500 group-hover:text-white",
  },
];

const guideResources = [
  {
    name: "Outbound Resources & Playbooks",
    href: "/resources",
    description: "Technical email blueprints, guides & sequence architectures",
    badge: "All Guides",
    icon: BookOpen,
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-500/10 text-blue-600 group-hover:bg-blue-500 group-hover:text-white",
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const headerBgClass = isScrolled
    ? "bg-white/90 backdrop-blur-xl border border-black shadow-lg text-zinc-900"
    : "bg-white/50 backdrop-blur-md border border-black shadow-md text-zinc-900";

  const navTextColorClass = "text-zinc-500";
  const navHoverColorClass = "hover:text-zinc-900";
  const activeNavColorClass = "text-zinc-900 font-semibold";

  const topNavLinks = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
    >
      <div
        className={`relative max-w-6xl mx-auto px-6 h-14 flex items-center justify-between rounded-full transition-all duration-300 ${headerBgClass}`}
      >
        <Link href="/" className="flex items-center gap-2 z-10">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-6 h-6">
            <path d="M50 2 L56 12 L50 22 L44 12 Z" />
            <path d="M43 28 L12 95 L38 95 L48 55 Z" />
            <path d="M57 28 L88 95 L62 95 L52 55 Z" />
            <path d="M49 28 L51 28 L51 65 L49 65 Z" />
            <path d="M50 75 L56 85 L50 95 L44 85 Z" />
          </svg>
          <span className="font-mono font-bold tracking-tighter text-lg">
            ARCH<span className="text-zinc-400">Revenues</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 text-sm font-medium ${navTextColorClass}`}
        >
          {topNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 whitespace-nowrap ${isActive ? activeNavColorClass : navHoverColorClass}`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Resources Dropdown */}
          <div
            ref={resourcesRef}
            className="relative"
            onMouseEnter={() => setIsResourcesOpen(true)}
            onMouseLeave={() => setIsResourcesOpen(false)}
          >
            <button
              onClick={() => setIsResourcesOpen((v) => !v)}
              className={`flex items-center gap-1.5 py-1 transition-colors duration-200 whitespace-nowrap ${isResourcesOpen || pathname?.startsWith("/resources") || pathname?.startsWith("/tools") || pathname === "/icp-worksheet" || pathname === "/audit" ? activeNavColorClass : navHoverColorClass} focus:outline-none`}
              aria-haspopup="true"
              aria-expanded={isResourcesOpen}
            >
              Resources
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isResourcesOpen ? "rotate-180 text-teal-600" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isResourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[440px] bg-white border border-zinc-200/90 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5"
                >
                  <div className="p-3 bg-gradient-to-b from-zinc-50/80 to-white border-b border-zinc-100">
                    <div className="flex items-center justify-between px-2 py-1 mb-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-teal-500" /> Free Interactive Tools
                      </span>
                    </div>

                    <div className="space-y-1">
                      {toolResources.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-100/80 transition-all group"
                            onClick={() => setIsResourcesOpen(false)}
                          >
                            <div className={`p-2 rounded-lg transition-colors shrink-0 ${item.iconBg}`}>
                              <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold text-zinc-900 group-hover:text-teal-600 transition-colors truncate">
                                  {item.name}
                                </span>
                                <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                                  {item.badge}
                                </span>
                              </div>
                              <span className="text-[11px] text-zinc-500 block leading-tight mt-0.5 line-clamp-1">
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3 bg-white">
                    <div className="px-2 py-1 mb-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                        Guides & Blueprints
                      </span>
                    </div>

                    <div className="space-y-1">
                      {guideResources.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-100/80 transition-all group"
                            onClick={() => setIsResourcesOpen(false)}
                          >
                            <div className={`p-2 rounded-lg transition-colors shrink-0 ${item.iconBg}`}>
                              <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold text-zinc-900 group-hover:text-teal-600 transition-colors truncate">
                                  {item.name}
                                </span>
                                <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                                  {item.badge}
                                </span>
                              </div>
                              <span className="text-[11px] text-zinc-500 block leading-tight mt-0.5 line-clamp-1">
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-zinc-100 px-4 py-2.5 bg-zinc-50/70 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-medium text-[11px]">No signup or credit card required</span>
                    <Link
                      href="/resources"
                      onClick={() => setIsResourcesOpen(false)}
                      className="text-teal-600 hover:text-teal-700 font-semibold text-[11px] inline-flex items-center gap-1 transition-colors"
                    >
                      Browse all <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-4 z-10">
          <Link
            href="/strategy-call"
            className="hidden lg:flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:from-teal-400 hover:to-teal-500 transition-all shadow-sm hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
          >
            Book a strategy call
          </Link>
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-zinc-950 flex flex-col px-6 py-8 overflow-y-auto"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-6 text-xl font-medium text-white mb-auto w-full max-w-sm mx-auto">
              {topNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2 border-b border-zinc-900 text-zinc-200 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Resources accordion */}
              <div className="w-full">
                <button
                  className="w-full flex items-center justify-center gap-2 text-white py-2 border-b border-zinc-900 font-semibold"
                  onClick={() => setIsMobileResourcesOpen((v) => !v)}
                >
                  Resources
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 text-teal-400 ${isMobileResourcesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isMobileResourcesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-3 flex flex-col gap-2 bg-zinc-900/60 rounded-2xl p-3 border border-zinc-800"
                    >
                      {[...toolResources, ...guideResources].map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-800 transition-colors text-left group"
                          >
                            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-zinc-950 transition-colors shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">
                                  {item.name}
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-teal-400 border border-zinc-700 shrink-0">
                                  {item.badge}
                                </span>
                              </div>
                              <span className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/strategy-call"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-6 flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3.5 rounded-xl text-lg font-bold hover:from-teal-400 hover:to-teal-500 transition-all w-full shadow-lg shadow-teal-500/20"
              >
                Book a strategy call
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

