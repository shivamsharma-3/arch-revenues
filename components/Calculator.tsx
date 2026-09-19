"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, DollarSign, Target, ShieldCheck } from "lucide-react";

export function Calculator() {
  const [acv, setAcv] = useState<number>(8000);
  const [closeRate, setCloseRate] = useState<number>(15);
  const [demos, setDemos] = useState<number>(6);

  const retainer = 1499;

  // Calculation logic - simple, transparent agency unit economics
  const newDealsPerMonth = demos * (closeRate / 100);
  const grossMonthlyRevenue = newDealsPerMonth * acv;
  const netMonthlyProfit = grossMonthlyRevenue - retainer;
  const annualNetProfit = netMonthlyProfit * 12;
  const roi = grossMonthlyRevenue > 0 ? grossMonthlyRevenue / retainer : 0;

  // Breakeven logic: How many months of ARCH does 1 single closed client cover?
  const monthsCoveredByOneDeal = (acv / retainer).toFixed(1);
  const dealsPerYear = Math.round(newDealsPerMonth * 12);
  const cadenceText =
    newDealsPerMonth >= 1
      ? `~${dealsPerYear} new clients / year`
      : `1 client every ~${(1 / (newDealsPerMonth || 0.01)).toFixed(1)} mos (~${dealsPerYear}/yr)`;

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
              Transparent Agency Economics
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Net Profit</span>
            </h2>
            <p className="text-zinc-400 text-base max-w-xl mx-auto leading-relaxed">
              Dial in your deal size and close rate. See exactly how much cash lands in your pocket after paying our $1,499 retainer.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid lg:grid-cols-12 gap-8 items-start"
        >
          {/* Inputs Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-zinc-900/50 p-6 sm:p-8 rounded-2xl border border-zinc-800/80 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Your Agency Inputs
              </h3>
              <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                Live Estimates
              </span>
            </div>

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
                <label className="text-sm font-medium text-zinc-300">Sales Call Close Rate</label>
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
                <span>5% (conservative)</span>
                <span>40% (high)</span>
              </div>
            </div>

            {/* Slider 3: Leads */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-sm font-medium text-zinc-300">Qualified Leads Booked</label>
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
                <span className="text-purple-400 font-medium">5 (Guaranteed Min)</span>
                <span>12 / mo</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/60 flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>5 qualified calls/month guaranteed or your retainer is refunded.</span>
            </div>
          </div>

          {/* Outputs Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Card 1: Deals */}
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3 text-zinc-400">
                  <div className="p-1.5 bg-blue-500/10 rounded-lg">
                    <Target className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-medium">New Clients / Month</h3>
                </div>
                <div className="text-3xl sm:text-4xl font-semibold text-white mb-1 tracking-tight">
                  {newDealsPerMonth.toFixed(1)} <span className="text-sm font-normal text-zinc-500 font-mono">deals</span>
                </div>
                <p className="text-xs text-zinc-300 font-medium mt-1">
                  {cadenceText}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  Closed from {demos} qualified founder calls
                </p>
              </div>

              {/* Card 2: Net Cash Profit */}
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3 text-zinc-400">
                  <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-medium">Net Monthly Profit</h3>
                </div>
                <div className="text-3xl sm:text-4xl font-semibold text-emerald-400 mb-1 tracking-tight">
                  {netMonthlyProfit >= 0 ? `+${formatCurrency(netMonthlyProfit)}` : formatCurrency(netMonthlyProfit)}
                </div>
                <p className="text-xs text-emerald-400/90 font-medium mt-1">
                  {annualNetProfit >= 0 ? `+${formatCurrency(annualNetProfit)} / year in pocket` : `${formatCurrency(annualNetProfit)} / year`}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  In your pocket after paying $1,499 retainer
                </p>
              </div>
            </div>

            {/* Card 3: Return on Retainer & Breakeven */}
            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 blur-[2px]" />
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="grid sm:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-zinc-400">
                      <div className="p-1.5 bg-purple-500/10 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                      </div>
                      <h3 className="text-sm font-medium">Return on Retainer</h3>
                    </div>
                    <div className="text-4xl sm:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400 tracking-tight">
                      {roi.toFixed(1)}x
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      You get <strong className="text-white">${roi.toFixed(2)}</strong> back for every $1 spent on ARCH.
                    </p>
                  </div>

                  <div className="sm:border-l sm:border-zinc-800 sm:pl-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                      Breakeven Reality
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      1 Client = {monthsCoveredByOneDeal} Months
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Closing just 1 client at {formatCurrency(acv)} completely covers <span className="text-emerald-400 font-semibold">{monthsCoveredByOneDeal} months</span> of ARCH Revenues.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple transparent math summary */}
            <div className="px-4 py-3 bg-zinc-900/40 border border-zinc-800/80 rounded-xl text-xs text-zinc-400 font-mono">
              <span className="text-zinc-500">The math: </span>
              <span className="text-zinc-300">{demos} leads</span> × <span className="text-zinc-300">{closeRate}% close</span> ={" "}
              <span className="text-zinc-200">{newDealsPerMonth.toFixed(1)} deals ({formatCurrency(grossMonthlyRevenue)})</span> −{" "}
              <span className="text-zinc-400">$1,499 fee</span> ={" "}
              <span className={netMonthlyProfit >= 0 ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                {netMonthlyProfit >= 0 ? `+${formatCurrency(netMonthlyProfit)}` : formatCurrency(netMonthlyProfit)}/mo net profit
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
