"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, DollarSign, Target } from "lucide-react";

export function Calculator() {
  const [acv, setAcv] = useState<number>(8000);
  const [closeRate, setCloseRate] = useState<number>(15);
  const [demos, setDemos] = useState<number>(6);

  const retainer = 1499;
  const newDealsPerMonth = demos * (closeRate / 100);
  const newRevenuePerMonth = newDealsPerMonth * acv;
  const netMonthlyProfit = newRevenuePerMonth - retainer;
  const roi = newRevenuePerMonth > 0 ? newRevenuePerMonth / retainer : 0;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  return (
    <section className="py-20 px-6 bg-zinc-950 text-white border-y border-zinc-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono font-bold uppercase tracking-widest mb-4 border border-purple-500/20">
              ROI Calculator
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              The Math of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">5+ Qualified Leads</span>
            </h2>
            <p className="text-zinc-400 text-base max-w-xl mx-auto leading-relaxed">
              Dial in your agency numbers. See your monthly net profit.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid lg:grid-cols-12 gap-8 items-center"
        >
          {/* Sliders (5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-zinc-900/50 p-6 sm:p-8 rounded-2xl border border-zinc-800/80 backdrop-blur-xl">
            {/* Slider 1: ACV */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-sm font-medium text-zinc-300">Average Client / Retainer Value</label>
                <span className="text-emerald-400 font-mono font-bold text-base">{formatCurrency(acv)}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={50000}
                step={1000}
                value={acv}
                onChange={(e) => setAcv(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1 font-mono">
                <span>$2,000</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* Slider 2: Close Rate */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-sm font-medium text-zinc-300">Demo Close Rate</label>
                <span className="text-purple-400 font-mono font-bold text-base">{closeRate}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1 font-mono">
                <span>5%</span>
                <span>40%</span>
              </div>
            </div>

            {/* Slider 3: Leads */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-sm font-medium text-zinc-300">Leads I Book For You</label>
                <span className="text-pink-400 font-mono font-bold text-base">{demos} / mo</span>
              </div>
              <input
                type="range"
                min={5}
                max={12}
                step={1}
                value={demos}
                onChange={(e) => setDemos(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1 font-mono">
                <span>5 (Guaranteed Min)</span>
                <span>12 / mo</span>
              </div>
            </div>
          </div>

          {/* Output Cards (7 cols) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {/* Card 1: New Projects */}
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3 text-zinc-400">
                <div className="p-1.5 bg-blue-500/10 rounded-lg">
                  <Target className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-sm font-medium">New Projects / mo</h3>
              </div>
              <div className="text-4xl font-semibold text-white mb-1 tracking-tight">
                {newDealsPerMonth.toFixed(1)}
              </div>
              <p className="text-xs text-zinc-500">
                Closed from {demos} qualified founder calls
              </p>
            </div>

            {/* Card 2: Net Profit / mo */}
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3 text-zinc-400">
                <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-medium">Net Profit / mo</h3>
              </div>
              <div className="text-4xl font-semibold text-emerald-400 mb-1 tracking-tight">
                {netMonthlyProfit >= 0 ? `+${formatCurrency(netMonthlyProfit)}` : formatCurrency(netMonthlyProfit)}
              </div>
              <p className="text-xs text-zinc-500">
                In your pocket after paying our $1,499 retainer
              </p>
            </div>

            {/* Card 3: Return on Retainer */}
            <div className="relative group sm:col-span-2">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-500/40 to-purple-500/40 rounded-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 blur-[2px]" />
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                <div className="text-sm text-zinc-400 sm:text-right max-w-[220px] leading-relaxed">
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
