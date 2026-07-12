"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, DollarSign, Target } from "lucide-react";

export function Calculator() {
  const [acv, setAcv] = useState<number>(10000);
  const [closeRate, setCloseRate] = useState<number>(20);
  const [demos, setDemos] = useState<number>(8);

  const retainer = 1500;
  const newDealsPerMonth = demos * (closeRate / 100);
  const newRevenuePerMonth = newDealsPerMonth * acv;
  const roi = ((newRevenuePerMonth - retainer) / retainer) * 100;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="py-16 md:py-24 px-6 bg-zinc-950 text-white border-y border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            The ROI of 5+ Qualified Demos
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Dial in your metrics below to see exactly what a predictable outbound pipeline does for your MRR/ARR.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Sliders */}
          <div className="space-y-10 bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-zinc-800">
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-medium text-zinc-300">Average Deal Size (LTV or ACV)</label>
                <span className="text-teal-400 font-mono font-semibold">{formatCurrency(acv)}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={acv}
                onChange={(e) => setAcv(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
                <span>$1k</span>
                <span>$50k</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="font-medium text-zinc-300">Your Demo Close Rate</label>
                <span className="text-teal-400 font-mono font-semibold">{closeRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
                <span>5%</span>
                <span>50%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="font-medium text-zinc-300">Demos We Book For You</label>
                <span className="text-teal-400 font-mono font-semibold">{demos} / mo</span>
              </div>
              <input
                type="range"
                min="5"
                max="15"
                step="1"
                value={demos}
                onChange={(e) => setDemos(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
                <span>5 (Our Guarantee)</span>
                <span>15 (Aggressive)</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 mb-4 text-zinc-400">
                <Target className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-medium">New Deals Won</h3>
              </div>
              <div className="text-4xl font-semibold text-white mb-1">
                {newDealsPerMonth.toFixed(1)} <span className="text-lg text-zinc-500 font-normal">/ mo</span>
              </div>
              <p className="text-xs text-zinc-500 mt-4">Based on your {closeRate}% close rate</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 mb-4 text-zinc-400">
                <DollarSign className="w-5 h-5 text-teal-400" />
                <h3 className="text-sm font-medium">New Revenue Added</h3>
              </div>
              <div className="text-4xl font-semibold text-white mb-1">
                {formatCurrency(newRevenuePerMonth)} <span className="text-lg text-zinc-500 font-normal">/ mo</span>
              </div>
              <p className="text-xs text-zinc-500 mt-4">Top-line growth per month</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:col-span-2 relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 text-zinc-400">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-medium">Estimated Monthly ROI</h3>
                  </div>
                  <div className="text-5xl font-semibold text-white">
                    {roi.toFixed(0)}%
                  </div>
                </div>
                <div className="text-left sm:text-right text-sm text-zinc-400 max-w-[200px]">
                  Return on the $1,500/mo founding retainer investment.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
