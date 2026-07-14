"use client";

import { motion } from "motion/react";

export function Comparison() {
  return (
    <section className="py-16 md:py-24 px-6 bg-zinc-50 border-y border-zinc-200/50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-8">
          The Alternative
        </h2>
        <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
          If you have $100K to spend on a full-time SDR plus 6 months to train them, do that. If you don't, that's where I come in.
        </p>
      </div>
    </section>
  );
}
