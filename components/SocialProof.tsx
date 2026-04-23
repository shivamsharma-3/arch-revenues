'use client';

import { motion } from 'motion/react';
import { Monitor, Target, Code, Zap, Users } from 'lucide-react';

export function SocialProof() {
  const items = [
    { name: "UI/UX Design", icon: <Monitor className="w-5 h-5" /> },
    { name: "Webflow & Framer", icon: <Target className="w-5 h-5" /> },
    { name: "E-Commerce", icon: <Code className="w-5 h-5" /> },
    { name: "SEO & Branding", icon: <Zap className="w-5 h-5" /> },
    { name: "SaaS Design", icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <section className="py-16 border-b border-zinc-200/50 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="shrink-0 z-20">
            <p className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-[0.2em]">
              Specialized For
            </p>
          </div>
          
          <div className="relative w-full md:w-auto flex-grow overflow-hidden">
            <motion.div 
              className="flex items-center gap-16 md:gap-32 whitespace-nowrap opacity-40 grayscale py-2 w-max"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 40,
              }}
            >
              {[...items, ...items, ...items, ...items].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-lg font-bold font-sans tracking-tight text-zinc-900"
                >
                  <span className="shrink-0 text-zinc-400">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
