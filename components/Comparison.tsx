"use client";

import { motion } from "motion/react";

export function Comparison() {
  return (
    <section className="py-16 md:py-24 px-6 bg-zinc-50 border-y border-zinc-200/50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-8">
          The Alternative
        </h2>
        <p className="text-lg md:text-xl text-zinc-600 leading-relaxed space-y-4 text-left sm:text-center">
          <span className="block mb-4">
            If you have $100K to spend on a full-time SDR, plus the 6 months it takes to train them, you should absolutely do that. Having an in-house team is great when you have the capital and the time.
          </span>
          <span className="block">
            But if you don't have that kind of runway, and you need qualified meetings on your calendar next month, that's where I come in. I build the infrastructure, write the sequences, and manage the inbox. You just show up to the meetings.
          </span>
        </p>
      </div>
    </section>
  );
}
