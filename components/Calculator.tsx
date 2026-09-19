"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, DollarSign, Target, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Calculator() {
  const [acv, setAcv] = useState<number>(8000);
  const [closeRate, setCloseRate] = useState<number>(15);
  const [demos, setDemos] = useState<number>(6);

  const retainer = 1499;
  const newDealsPerMonth = demos * (closeRate / 100);
  const newRevenuePerMonth = newDealsPerMonth * acv;
  const netMonthlyProfit = newRevenuePerMonth - retainer;
  const annualRevenue = newRevenuePerMonth * 12;
  const annualRetainer = retainer * 12;
  const netAnnualProfit = annualRevenue - annualRetainer;
  const roi = newRevenuePerMonth > 0 ? newRevenuePerMonth / retainer : 0;
  const monthsPaidByOneClient = acv > 0 ? (acv / retainer).toFixed(1) : "0";

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  return (
    <section className="py-16 px-6 bg-zinc-950 text-white border-y border-zinc-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono font-bold uppercase tracking-widest mb-4 border border-purple-500/20">
              Interactive ROI Model
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-purple-400">Net Profit</span> From Outbound
            </h2>
            <p className="text-zinc-400 text-base max-w-xl mx-auto leading-relaxed">
              No vague projections. See the exact cash profit left in your pocket after paying our $1,499/mo retainer.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Sliders (Left: 5 cols) */}
          <div className="lg:col-span-5 relative group flex flex-col justify-between">
            <div className="absolute -inset-[1px] bg-gradient-to-b from-purple-500/30 to-zinc-800 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
            <div className="relative h-full space-y-8 bg-zinc-900/90 p-6 sm:p-7 rounded-2xl border border-zinc-800 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider mb-6 pb-3 border-b border-zinc-800">
                  Step 1: Enter Your Agency Metrics
                </div>

                <div className="space-y-7">
                  {/* Slider 1: ACV */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2.5">
                      <label className="text-sm font-medium text-zinc-200">Average Client / Retainer Value</label>
                      <span className="text-emerald-400 font-mono font-bold text-base">{formatCurrency(acv)}</span>
                    </div>
                    <input
                      type="range"
                      min={2000}
                      max={50000}
                      step={1000}
                      value={acv}
                      onChange={(e) => setAcv(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                    <div className="flex justify-between text-xs text-zinc-500 mt-1.5 font-mono">
                      <span>$2,000</span>
                      <span>$50,000+</span>
                    </div>
                  </div>

                  {/* Slider 2: Close Rate */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2.5">
                      <label className="text-sm font-medium text-zinc-200">Demo-to-Close Conversion Rate</label>
                      <span className="text-purple-400 font-mono font-bold text-base">{closeRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={40}
                      step={1}
                      value={closeRate}
                      onChange={(e) => setCloseRate(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                    />
                    <div className="flex justify-between text-xs text-zinc-500 mt-1.5 font-mono">
                      <span>5% (conservative)</span>
                      <span>40% (high)</span>
                    </div>
                  </div>

                  {/* Slider 3: Demos */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2.5">
                      <label className="text-sm font-medium text-zinc-200">Qualified Demos We Book / mo</label>
                      <span className="text-teal-400 font-mono font-bold text-base">{demos} calls</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={12}
                      step={1}
                      value={demos}
                      onChange={(e) => setDemos(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                    />
                    <div className="flex justify-between text-xs text-zinc-500 mt-1.5 font-mono">
                      <span className="text-teal-400 font-semibold">5 (Refund Guarantee Min)</span>
                      <span>12 / mo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee callout card */}
              <div className="pt-5 border-t border-zinc-800/80 mt-2">
                <div className="flex items-start gap-3 bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-800 text-xs text-zinc-400">
                  <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-200 block mb-0.5">5-Demo Performance Guarantee</span>
                    If fewer than 5 qualified prospects show up in any month, your $1,499 retainer is refunded 100%.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results (Right: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {/* Top Cards: Pipeline & Deal Pace */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2 mb-3 text-zinc-400">
                  <div className="p-1.5 bg-blue-500/10 rounded-lg">
                    <Target className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-xs font-mono uppercase tracking-wider font-semibold">Monthly Deal Velocity</h3>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">
                  {newDealsPerMonth >= 1
                    ? `~${newDealsPerMonth.toFixed(1)} deals / mo`
                    : `1 deal every ${(1 / newDealsPerMonth).toFixed(1)} mos`}
                </div>
                <p className="text-xs text-zinc-400">
                  Just <strong className="text-zinc-200">1 closed client</strong> covers <strong className="text-emerald-400">{monthsPaidByOneClient} months</strong> of ARCH.
                </p>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2 mb-3 text-zinc-400">
                  <div className="p-1.5 bg-teal-500/10 rounded-lg">
                    <DollarSign className="w-4 h-4 text-teal-400" />
                  </div>
                  <h3 className="text-xs font-mono uppercase tracking-wider font-semibold">New Gross Revenue</h3>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">
                  {formatCurrency(newRevenuePerMonth)}
                  <span className="text-xs text-zinc-500 font-normal ml-1">/ mo</span>
                </div>
                <p className="text-xs text-zinc-400">
                  {formatCurrency(annualRevenue)} annualized new billings.
                </p>
              </div>
            </div>

            {/* Main Hero Card: Net Profit in Your Pocket */}
            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/60 via-teal-500/40 to-purple-500/60 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[3px]" />
              <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <TrendingUp className="w-4 h-4" />
                      Net Profit In Your Pocket
                    </div>
                    <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white tracking-tight">
                      {netMonthlyProfit >= 0 ? `+${formatCurrency(netMonthlyProfit)}` : formatCurrency(netMonthlyProfit)}
                      <span className="text-sm font-medium text-zinc-400 ml-1.5">/ month</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      Pure profit after deducting your $1,499/mo ARCH retainer.
                    </p>
                  </div>

                  <div className="text-left sm:text-right bg-zinc-950/80 px-4 py-2.5 rounded-xl border border-zinc-800/80">
                    <span className="text-xs text-zinc-400 block">Annual Net Profit</span>
                    <span className="text-xl font-bold text-emerald-400 font-mono">
                      +{formatCurrency(netAnnualProfit)}
                    </span>
                    <span className="text-[11px] text-zinc-500 block font-mono">({roi.toFixed(1)}x ROI)</span>
                  </div>
                </div>

                {/* Breakdown Strip */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-800 text-center text-xs">
                  <div className="bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/60">
                    <span className="text-zinc-500 block text-[10px] uppercase font-mono">Gross Added</span>
                    <span className="font-semibold text-zinc-200">{formatCurrency(newRevenuePerMonth)}/mo</span>
                  </div>
                  <div className="bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/60">
                    <span className="text-zinc-500 block text-[10px] uppercase font-mono">ARCH Cost</span>
                    <span className="font-semibold text-rose-400">-$1,499/mo</span>
                  </div>
                  <div className="bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                    <span className="text-emerald-400 block text-[10px] uppercase font-mono font-bold">Your Margin</span>
                    <span className="font-bold text-emerald-300 font-mono">
                      {newRevenuePerMonth > 0 ? `${Math.round((netMonthlyProfit / newRevenuePerMonth) * 100)}%` : "0%"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-zinc-400 text-center sm:text-left">
                    Founding rate ($1,499/mo) locked for the first 3 clients only.
                  </span>
                  <Link
                    href="/pricing"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    Lock in Pilot Rate <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

