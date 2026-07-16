"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const resources = [
  {
    name: "Free Cold Email Generator",
    href: "/tools/email-generator",
    description: "AI-writes a personalised outbound email from your prospect's site",
  },
  {
    name: "ICP Worksheet",
    href: "/audit",
    description: "Define your ideal customer profile before you start sending",
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
  const navHoverColorClass = "hover:text-zinc-600";
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
              className={`flex items-center gap-1 py-1 transition-colors duration-200 whitespace-nowrap ${navHoverColorClass} focus:outline-none`}
              aria-haspopup="true"
              aria-expanded={isResourcesOpen}
            >
              Resources
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isResourcesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isResourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="px-2 py-2">
                    {resources.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-zinc-50 transition-colors group"
                        onClick={() => setIsResourcesOpen(false)}
                      >
                        <span className="text-sm font-semibold text-zinc-900 group-hover:text-teal-600 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-xs text-zinc-500 leading-relaxed">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-zinc-100 px-4 py-3 bg-zinc-50/50">
                    <p className="text-xs text-zinc-400 font-medium">Free — no signup required</p>
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
            <div className="flex justify-end mb-12">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8 text-2xl font-medium text-white mb-auto">
              {topNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Resources accordion */}
              <div className="w-full max-w-xs">
                <button
                  className="w-full flex items-center justify-center gap-2 text-white"
                  onClick={() => setIsMobileResourcesOpen((v) => !v)}
                >
                  Resources
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${isMobileResourcesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isMobileResourcesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-4 flex flex-col gap-3"
                    >
                      {resources.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-lg text-zinc-400 hover:text-white transition-colors text-center"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/strategy-call"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:from-teal-400 hover:to-teal-500 transition-all w-full max-w-xs"
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
