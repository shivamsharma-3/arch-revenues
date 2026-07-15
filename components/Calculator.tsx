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

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="py-24 px-6 bg-zinc-950 text-white border-y border-zinc-900 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono font-bold uppercase tracking-widest mb-6 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              ROI Calculator
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              The Math of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">5+ Qualified Demos</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Dial in your metrics below to see exactly what a predictable outbound pipeline does for your ARR. No fluff, just the math.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-8 items-stretch"
        >
          {/* Sliders Container */}
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-b from-purple-500/30 to-zinc-800 rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
            <div className="relative h-full space-y-10 bg-zinc-900/90 p-8 md:p-10 rounded-3xl border border-zinc-800 backdrop-blur-xl">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-medium text-zinc-300">Average Deal Size (LTV or ACV)</label>
                  <span className="text-purple-400 font-mono font-semibold text-lg">{formatCurrency(acv)}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={acv}
                  onChange={(e) => setAcv(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
                  <span>$1k</span>
                  <span>$50k</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-medium text-zinc-300">Your Demo Close Rate</label>
                  <span className="text-purple-400 font-mono font-semibold text-lg">{closeRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-medium text-zinc-300">Demos I Book For You</label>
                  <span className="text-purple-400 font-mono font-semibold text-lg">{demos} / mo</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="1"
                  value={demos}
                  onChange={(e) => setDemos(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
                  <span>5 (My Guarantee)</span>
                  <span>15 (Aggressive)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden group hover:border-zinc-700 transition-colors shadow-lg">
              <div className="flex items-center gap-3 mb-6 text-zinc-400">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-medium">New Deals Won</h3>
              </div>
              <div className="text-5xl font-semibold text-white mb-2 tracking-tight">
                {newDealsPerMonth.toFixed(1)}
              </div>
              <p className="text-sm text-zinc-500">Based on your {closeRate}% close rate</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden group hover:border-zinc-700 transition-colors shadow-lg">
              <div className="flex items-center gap-3 mb-6 text-zinc-400">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-medium">New Revenue Added</h3>
              </div>
              <div className="text-4xl lg:text-5xl font-semibold text-white mb-2 tracking-tight">
                {formatCurrency(newRevenuePerMonth)}
              </div>
              <p className="text-sm text-zinc-500">Top-line growth per month</p>
            </div>

            <div className="relative group sm:col-span-2">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-500/50 to-purple-500/50 rounded-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-[2px]" />
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-xl">
                <div>
                  <div className="flex items-center gap-3 mb-4 text-zinc-400">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="font-medium">Return on Retainer</h3>
                  </div>
                  <div className="text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400 tracking-tight">
                    {roi.toFixed(1)}x
                  </div>
                </div>
                <div className="text-left sm:text-right text-zinc-400 max-w-[220px] leading-relaxed">
                  New revenue generated for every <strong className="text-white">$1</strong> of your <strong className="text-white">$1,499/mo</strong> retainer.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
