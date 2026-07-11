"use client";
import { motion } from "motion/react";

export function SocialProof() {
  const items = [
    { value: "200", label: "Account ICP list per client" },
    { value: "Apollo + Brevo + Make", label: "Verified tech stack (not homegrown)" },
    { value: "5/mo minimum", label: "Or you don't pay that month" },
    { value: "Weekly", label: "Monday report — every reply, every metric" },
  ];

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="bg-zinc-50 py-12">
      <div className="max-w-[88rem] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-zinc-200/50">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center lg:px-6"
            >
              <div className="text-3xl font-semibold text-zinc-900 leading-tight mb-2">
                {item.value}
              </div>
              <div className="text-sm text-zinc-600 font-medium leading-snug max-w-[200px]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
