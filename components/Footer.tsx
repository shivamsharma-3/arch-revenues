'use client';

import Link from 'next/link';
import { Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-zinc-950 text-zinc-500 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="font-mono font-bold tracking-tighter text-lg text-zinc-400">
            ARCH<span className="text-zinc-600">Revenues</span>
          </div>
          <div className="w-px h-5 bg-zinc-800 hidden md:block"></div>
          <a href="https://www.linkedin.com/company/arch-revenue" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 fill-white text-white" />
          </a>
        </div>
        <div className="text-sm">
          © {new Date().getFullYear()} ARCH Revenues. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
