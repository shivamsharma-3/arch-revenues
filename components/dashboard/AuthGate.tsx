"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight, ShieldCheck, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react';

interface AuthGateProps {
  onAuthenticated: () => void;
}

export function AuthGate({ onAuthenticated }: AuthGateProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Automatic query parameter authentication for AI tools / browser subagents
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const queryPass = params.get('passkey') || params.get('key');
    if (queryPass) {
      verifyAndLogin(queryPass.trim());
    }
  }, []);

  const verifyAndLogin = async (candidatePasscode: string) => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/sdr/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: candidatePasscode }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('arch_founder_auth', 'true');
        localStorage.setItem('arch_founder_passcode', candidatePasscode);
        onAuthenticated();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    await verifyAndLogin(passcode.trim());
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] flex flex-col items-center justify-center p-6 text-zinc-900 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Card Container */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl shadow-zinc-200/50 p-8 sm:p-10 space-y-6">
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="h-14 w-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-md">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-8 h-8">
                <path d="M50 2 L56 12 L50 22 L44 12 Z" />
                <path d="M43 28 L12 95 L38 95 L48 55 Z" />
                <path d="M57 28 L88 95 L62 95 L52 55 Z" />
                <path d="M49 28 L51 28 L51 65 L49 65 Z" />
                <path d="M50 75 L56 85 L50 95 L44 85 Z" />
              </svg>
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-teal-50 text-teal-700 text-[11px] font-mono font-bold uppercase tracking-wider border border-teal-200/60 mb-2">
                <ShieldCheck className="h-3 w-3 text-teal-600" />
                Private Founder Console
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                ARCH <span className="text-zinc-500 font-normal">Revenues</span>
              </h1>
              <p className="text-xs text-zinc-500 mt-1">
                Autonomous SDR Agent & Outbound Pipeline
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Founder Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Enter passcode to unlock..."
                  autoFocus
                  className={`w-full rounded-xl border pl-4 pr-11 py-3 text-sm transition-all outline-none font-mono ${
                    error
                      ? 'border-rose-500 bg-rose-50/40 text-rose-900 focus:ring-1 focus:ring-rose-500'
                      : 'border-zinc-300 bg-zinc-50/50 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-600 mt-2 flex items-center gap-1.5 font-medium"
                >
                  <AlertCircle className="h-3.5 w-3.5" />
                  Incorrect passcode. Access is restricted to founder.
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !passcode.trim()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-4 rounded-xl text-sm font-bold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Unlock Workspace</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-4 border-t border-zinc-100 text-center">
            <p className="text-[11px] text-zinc-400">
              Secured with Groq LPU™ model token protection.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
