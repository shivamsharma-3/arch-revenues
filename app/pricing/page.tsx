"use client";
import { motion } from "motion/react";

import { Pricing } from "@/components/Pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex-grow pt-32">
        <section className="py-12 md:py-20 px-6 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-6">
            Pricing
          </h1>
          <p className="text-lg text-zinc-600">
            One simple, transparent price.
          </p>
        </section>
        <Pricing />
      </motion.main>
    </div>
  );
}
