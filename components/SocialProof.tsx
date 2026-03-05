'use client';

import { motion } from 'motion/react';
import { Monitor, Target, Code, Zap, Users } from 'lucide-react';

export function SocialProof() {
  const items = [
    { name: "Web Design Agencies", icon: <Monitor className="w-5 h-5" /> },
    { name: "Marketing Agencies", icon: <Target className="w-5 h-5" /> },
    { name: "Development Agencies", icon: <Code className="w-5 h-5" /> },
    { name: "Automation Agencies", icon: <Zap className="w-5 h-5" /> },
    { name: "Consulting Agencies", icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <section className="py-12 border-b border-zinc-200/50 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-zinc-500 mb-12 uppercase tracking-widest px-4">
          Helping B2B Agencies Build Predictable Pipeline
        </p>
        
        <div className="relative flex overflow-hidden">
          <motion.div 
            className="flex items-center gap-12 md:gap-24 whitespace-nowrap opacity-60 grayscale py-2"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* Render items twice for seamless loop */}
            {[...items, ...items].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-base md:text-xl font-bold font-sans tracking-tighter text-zinc-400"
              >
                <span className="shrink-0">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </motion.div>
          
          {/* Gradient masks for smooth fade in/out */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-zinc-50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-zinc-50 to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
