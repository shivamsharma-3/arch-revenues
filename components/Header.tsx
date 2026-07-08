"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBgClass = isScrolled
    ? "bg-white/90 backdrop-blur-xl border border-black shadow-lg text-zinc-900"
    : "bg-white/50 backdrop-blur-md border border-black shadow-md text-zinc-900";

  const navTextColorClass = "text-zinc-500";
  const navHoverColorClass = "hover:text-zinc-600";
  const activeNavColorClass = "text-zinc-900 font-semibold";
  const buttonClass =
    "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm active:scale-95";

  const navLinks = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Performance Pilot", href: "/performance-pilot" },
    { name: "Pricing", href: "/#pricing" },
    { name: "ICP Worksheet", href: "/audit" },
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

        <nav
          className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 text-sm font-medium ${navTextColorClass}`}
        >
          {navLinks.map((link) => {
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
        </nav>

        <div className="flex items-center gap-4 z-10">
          <Link
            href="/strategy-call"
            className="hidden lg:flex items-center justify-center bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-all shadow-sm"
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-zinc-950 flex flex-col px-6 py-8"
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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/strategy-call"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 flex items-center justify-center bg-white text-zinc-900 px-8 py-4 rounded-xl text-xl font-bold hover:bg-zinc-100 transition-colors w-full max-w-xs"
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
