'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const phrases = [
  "Revenue by Design",
  "Acquisition, Systematized"
];

export function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase(prev => (prev + 1) % phrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="pt-36 pb-24 px-6 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] items-center gap-6">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-zinc-200/50 text-zinc-600 text-xs font-mono font-medium tracking-wide uppercase mb-6 border border-zinc-300/50">
              Revenue Infrastructure for Web Design Agencies
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-zinc-900 leading-[1.1] mb-8"
          >
            Stop relying on referrals.<br />
            Build revenue infrastructure.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-zinc-600 leading-relaxed max-w-2xl mb-10"
          >
            We build and operate outbound acquisition systems exclusively for web design agencies. 
            Get consistent, qualified sales calls without learning cold email or hiring a full-time SDR.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link 
              href="/audit" 
              className="group flex items-center gap-2 bg-zinc-900 text-white px-6 py-3.5 rounded-md font-medium hover:bg-zinc-800 transition-all"
            >
              Get Your Free System Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#system" 
              className="text-zinc-600 font-medium px-6 py-3.5 hover:text-zinc-900 transition-colors"
            >
              See how the system works
            </Link>
          </motion.div>
        </div>

        <div className="hidden md:flex items-start justify-center -mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative flex items-center justify-center w-[500px] h-[500px]"
          >
            {/* Layer 1 — Deep ambient glow */}
            <motion.div
              className="absolute w-80 h-80 rounded-full bg-zinc-200"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ filter: "blur(40px)", willChange: "transform, opacity" }}
            />

            {/* Layer 2 — Expanding Ripple Rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-72 h-72 rounded-full border border-zinc-300"
                animate={{ 
                  scale: [1, 2.5], 
                  opacity: [0.6, 0] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  delay: i * 2, 
                  ease: "easeOut" 
                }}
                style={{ willChange: "transform, opacity" }}
              />
            ))}

            {/* Center — Main logo, increased size and floating */}
            <motion.svg
              viewBox="0 0 100 100"
              fill="currentColor"
              className="relative z-10 w-72 h-72 text-zinc-900"
              animate={{ y: [-12, 12, -12] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            >
              <path d="M50 2 L56 12 L50 22 L44 12 Z" />
              <path d="M43 28 L12 95 L38 95 L48 55 Z" />
              <path d="M57 28 L88 95 L62 95 L52 55 Z" />
              <path d="M49 28 L51 28 L51 65 L49 65 Z" />
              <path d="M50 75 L56 85 L50 95 L44 85 Z" />
            </motion.svg>

            {/* Status indicator below logo */}
            <motion.div
              className="absolute bottom-4 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900" />
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="font-mono text-xs text-zinc-500 uppercase tracking-widest"
                >
                  {phrases[currentPhrase]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
