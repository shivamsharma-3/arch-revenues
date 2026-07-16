"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, DollarSign, Target } from "lucide-react";

export function Calculator() {
  const [acv, setAcv] = useState<number>(5000);
  const [closeRate, setCloseRate] = useState<number>(10);
  const [demos, setDemos] = useState<number>(5);

  const retainer = 1499;
  const newDealsPerMonth = demos * (closeRate / 100);
  const newRevenuePerMonth = newDealsPerMonth * acv;
  const roi = newRevenuePerMonth / retainer;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  return (
    <section className="py-14 px-6 bg-zinc-950 text-white border-y border-zinc-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono font-bold uppercase tracking-widest mb-4 border border-purple-500/20">
              ROI Calculator
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              The Math of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">5+ Qualified Demos</span>
            </h2>
            <p className="text-zinc-400 text-base max-w-xl mx-auto leading-relaxed">
              Dial in your numbers. See the return.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-6 items-stretch"
        >
          {/* Sliders */}
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-b from-purple-500/30 to-zinc-800 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
            <div className="relative h-full space-y-7 bg-zinc-900/90 p-6 rounded-2xl border border-zinc-800 backdrop-blur-xl">
              {[
                {
                  label: "Average Project/Retainer Value",
                  value: formatCurrency(acv),
                  min: 1000, max: 50000, step: 1000,
                  state: acv, setter: setAcv,
                  range: ["$1k", "$50k"],
                },
                {
                  label: "Demo Close Rate",
                  value: `${closeRate}%`,
                  min: 5, max: 50, step: 1,
                  state: closeRate, setter: setCloseRate,
                  range: ["5%", "50%"],
                },
                {
                  label: "Demos I Book For You",
                  value: `${demos} / mo`,
                  min: 5, max: 15, step: 1,
                  state: demos, setter: setDemos,
                  range: ["5 (guarantee)", "15"],
                },
              ].map(({ label, value, min, max, step, state, setter, range }) => (
                <div key={label}>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-zinc-300">{label}</label>
                    <span className="text-purple-400 font-mono font-semibold text-sm">{value}</span>
                  </div>
                  <input
                    type="range"
                    min={min} max={max} step={step} value={state}
                    onChange={(e) => setter(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-zinc-600 mt-1.5 font-mono">
                    <span>{range[0]}</span><span>{range[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 mb-4 text-zinc-400">
                <div className="p-1.5 bg-blue-500/10 rounded-lg">
                  <Target className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-sm font-medium">New Deals / mo</h3>
              </div>
              <div className="text-4xl font-semibold text-white mb-1 tracking-tight">
                {newDealsPerMonth.toFixed(1)}
              </div>
              <p className="text-xs text-zinc-500">at {closeRate}% close rate</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 mb-4 text-zinc-400">
                <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-medium">New Revenue / mo</h3>
              </div>
              <div className="text-3xl font-semibold text-white mb-1 tracking-tight">
                {formatCurrency(newRevenuePerMonth)}
              </div>
              <p className="text-xs text-zinc-500">top-line growth</p>
            </div>

            <div className="relative group sm:col-span-2">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-500/50 to-purple-500/50 rounded-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-[2px]" />
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-zinc-400">
                    <div className="p-1.5 bg-purple-500/10 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    </div>
                    <h3 className="text-sm font-medium">Return on Retainer</h3>
                  </div>
                  <div className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400 tracking-tight">
                    {roi.toFixed(1)}x
                  </div>
                </div>
                <div className="text-sm text-zinc-400 sm:text-right max-w-[200px] leading-relaxed">
                  New revenue for every <strong className="text-white">$1</strong> of your <strong className="text-white">$1,499/mo</strong> retainer.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
