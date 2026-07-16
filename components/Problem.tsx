"use client";

import { motion } from "motion/react";
import { AlertCircle, TrendingDown, Hourglass, Users } from "lucide-react";

export function Problem() {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-semibold text-zinc-900 tracking-tight mb-4"
          >
            The Problem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto"
          >
            Growing an agency is hard. Feast-or-famine project cycles make it impossible.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-zinc-200 p-8 md:p-10 rounded-3xl shadow-sm"
          >
            <div className="w-12 h-12 bg-red-50 text-red-600 flex items-center justify-center rounded-xl mb-6">
              <TrendingDown size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 mb-4">The Dangerous Cycle</h3>
            <p className="text-zinc-600 leading-relaxed mb-6">
              Most agency founders fall into a trap. You stop prospecting the moment you land a big client. When that project wraps up, you panic because your pipeline has completely dried up.
            </p>
            <div className="flex items-start gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <AlertCircle size={20} className="text-zinc-400 shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-600">
                You might have tried cold email, spent 10 exhausting hours building lists, got a 2% reply rate, and gave up.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border border-zinc-200 p-8 md:p-10 rounded-3xl shadow-sm"
          >
            <div className="w-12 h-12 bg-orange-50 text-orange-600 flex items-center justify-center rounded-xl mb-6">
              <Hourglass size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 mb-4">The Traditional Solutions</h3>
            <p className="text-zinc-600 leading-relaxed mb-6">
              Hiring a full-time SDR costs $100K/year, takes 6 months to train, and carries massive churn risk. On the other hand, relying purely on referrals is completely unpredictable.
            </p>
            <div className="flex items-start gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <Users size={20} className="text-zinc-400 shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-600">
                Word-of-mouth is great, but it leaves you competing with similarly-named firms for the same inbound searches. You need to control your pipeline.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
