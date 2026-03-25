"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="font-mono font-bold tracking-tighter text-lg text-white">
            ARCH<span className="text-zinc-500">Revenues</span>
          </div>
          <div className="w-px h-4 bg-zinc-800 hidden md:block"></div>
          <a
            href="https://www.linkedin.com/company/arch-revenue"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        
        <div className="text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} ARCH Revenues. <br />
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            Hyderabad, India • shivam@archrevenues.com
          </span>
        </div>

        <div className="flex items-center justify-center md:justify-end gap-6 text-sm text-zinc-500">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>

      </div>
    </footer>
  );
}
