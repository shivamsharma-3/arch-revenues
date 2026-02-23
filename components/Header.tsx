'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Header({ variant = 'default' }: { variant?: 'default' | 'solid' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (variant === 'solid') return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  useEffect(() => {
    const sections = ['hero', 'results', 'system', 'process', 'pricing', 'commitment', 'faq'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '/');
    setActiveSection('hero');
  };

  const isSolid = variant === 'solid';
  const headerBgClass = isSolid 
    ? 'bg-white text-zinc-900 border-b border-zinc-100' 
    : isScrolled 
      ? 'bg-zinc-900/95 backdrop-blur-md border border-zinc-800 shadow-2xl shadow-black/20 text-white' 
      : 'bg-transparent text-zinc-900';

  const logoFilter = isSolid 
    ? "brightness(1)" 
    : isScrolled 
      ? "brightness(10)" 
      : "brightness(1)";

  const revenuesColorClass = isSolid 
    ? "text-zinc-400" 
    : isScrolled 
      ? "text-zinc-400" 
      : "text-zinc-500";

  const navTextColorClass = isSolid 
    ? 'text-zinc-600' 
    : isScrolled 
      ? 'text-zinc-300' 
      : 'text-zinc-600';

  const navHoverColorClass = isSolid 
    ? 'hover:text-zinc-900' 
    : isScrolled 
      ? 'hover:text-white' 
      : 'hover:text-zinc-900';

  const buttonClass = isSolid 
    ? 'bg-zinc-900 text-white hover:bg-zinc-800 hover:scale-105'
    : isScrolled 
      ? 'bg-white text-zinc-900 hover:bg-zinc-200 hover:scale-105' 
      : 'bg-zinc-900 text-white hover:bg-zinc-800 hover:scale-105';

  const menuIconColorClass = isSolid 
    ? 'text-zinc-900' 
    : isScrolled 
      ? 'text-white' 
      : 'text-zinc-900';

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled && !isSolid ? 'py-4' : 'py-6'
      }`}
    >
      <div className={`max-w-6xl mx-auto px-6 h-16 flex items-center justify-between rounded-full transition-all duration-700 ease-in-out ${headerBgClass}`}>
        <Link 
          href="/" 
          onClick={scrollToTop}
          className="flex items-center gap-2.5 group"
        >
          <svg
            viewBox="0 0 100 100"
            fill="currentColor"
            className="w-7 h-7 text-zinc-900 group-hover:scale-110 transition-transform duration-300"
            style={{ filter: logoFilter }}
          >
            <path d="M50 2 L56 12 L50 22 L44 12 Z" />
            <path d="M43 28 L12 95 L38 95 L48 55 Z" />
            <path d="M57 28 L88 95 L62 95 L52 55 Z" />
            <path d="M49 28 L51 28 L51 65 L49 65 Z" />
            <path d="M50 75 L56 85 L50 95 L44 85 Z" />
          </svg>
          <span className="font-mono font-bold tracking-tighter text-xl">
            ARCH
            <span className={`transition-colors duration-300 ${revenuesColorClass}`}>
              Revenues
            </span>
          </span>
        </Link>
        
        <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${navTextColorClass}`}>
          <Link 
            href="#results" 
            className={`transition-all duration-300 ${activeSection === 'results' ? (isScrolled ? 'text-white scale-105' : 'text-zinc-900 scale-105') : navHoverColorClass}`}
          >
            Results
          </Link>
          <Link 
            href="#system" 
            className={`transition-all duration-300 ${activeSection === 'system' ? (isScrolled ? 'text-white scale-105' : 'text-zinc-900 scale-105') : navHoverColorClass}`}
          >
            The System
          </Link>
          <Link 
            href="#process" 
            className={`transition-all duration-300 ${activeSection === 'process' ? (isScrolled ? 'text-white scale-105' : 'text-zinc-900 scale-105') : navHoverColorClass}`}
          >
            Process
          </Link>
          <Link 
            href="#pricing" 
            className={`transition-all duration-300 ${activeSection === 'pricing' ? (isScrolled ? 'text-white scale-105' : 'text-zinc-900 scale-105') : navHoverColorClass}`}
          >
            Pricing
          </Link>
          <Link 
            href="#commitment" 
            className={`transition-all duration-300 ${activeSection === 'commitment' ? (isScrolled ? 'text-white scale-105' : 'text-zinc-900 scale-105') : navHoverColorClass}`}
          >
            Commitment
          </Link>
          <Link 
            href="#faq" 
            className={`transition-all duration-300 ${activeSection === 'faq' ? (isScrolled ? 'text-white scale-105' : 'text-zinc-900 scale-105') : navHoverColorClass}`}
          >
            FAQ
          </Link>
        </nav>

        <Link 
          href="/audit" 
          className={`hidden md:inline-flex text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 ${buttonClass}`}
        >
          Get Your Free System Audit
        </Link>

        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className={`w-6 h-6 ${menuIconColorClass}`} />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-zinc-900 flex flex-col px-6 py-8"
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
              <Link href="#results" onClick={() => setIsMobileMenuOpen(false)}>Results</Link>
              <Link href="#system" onClick={() => setIsMobileMenuOpen(false)}>The System</Link>
              <Link href="#process" onClick={() => setIsMobileMenuOpen(false)}>Process</Link>
              <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
              <Link href="#commitment" onClick={() => setIsMobileMenuOpen(false)}>Commitment</Link>
              <Link href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
            </nav>

            <Link 
              href="/audit" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-white text-zinc-900 text-center py-4 rounded-xl font-semibold text-lg"
            >
              Get Your Free System Audit
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
