'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Loader2, ChevronDown } from 'lucide-react';

function CustomSelect({ 
  label, 
  name, 
  value, 
  options, 
  onChange, 
  required = false 
}: { 
  label: string; 
  name: string; 
  value: string; 
  options: { label: string; value: string }[]; 
  onChange: (name: string, value: string) => void;
  required?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-zinc-700 mb-2">{label} {required && '*'}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-4 py-2.5 text-zinc-900 flex items-center justify-between hover:bg-zinc-100 transition-colors focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none"
      >
        <span className={value ? 'text-zinc-900' : 'text-zinc-400'}>
          {selectedOption ? selectedOption.label : 'Select...'}
        </span>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="absolute z-50 w-full bg-white border border-zinc-200 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(name, option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    value === option.value 
                      ? 'bg-zinc-900 text-white' 
                      : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AuditPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    agencyName: '',
    yourName: '',
    role: '',
    website: '',
    teamSize: '',
    monthlyRevenue: '',
    dealSize: '',
    monthlyMeetings: '',
    leadSources: [] as string[],
    email: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (source: string) => {
    setFormData(prev => {
      const current = prev.leadSources;
      if (current.includes(source)) {
        return { ...prev, leadSources: current.filter(s => s !== source) };
      } else {
        return { ...prev, leadSources: [...current, source] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Something went wrong submitting your request. Please try again or email us directly at hello@archrevenues.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 text-center shadow-sm"
        >
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-900 mb-4">Application Received.</h1>
          <p className="text-zinc-600 leading-relaxed mb-4">
            We will review your revenue architecture details and deliver your audit within 1 business day to {formData.email}.
          </p>
          <p className="text-zinc-500 text-sm mb-8">
            If your profile is a strong fit, your audit will include an invitation to schedule a strategy call. There is no obligation.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-full bg-zinc-900 text-white px-6 py-3 rounded-md font-medium hover:bg-zinc-800 transition-colors"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-zinc-50 py-12 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <div className="mb-6">
            <span className="inline-block py-1 px-3 rounded-full bg-zinc-200/50 text-zinc-600 text-xs font-mono font-medium tracking-wide uppercase border border-zinc-300/50">
              Selective Intake. Limited Capacity.
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">
            Apply for a Revenue Infrastructure Audit
          </h1>
          <p className="text-lg text-zinc-600 mb-2">
            This assessment evaluates your outbound architecture, pipeline structure, and revenue predictability. We work exclusively with B2B service companies selling high-ticket services.
          </p>
          <p className="text-sm text-zinc-500 mb-12">
            Takes 3 minutes. Audit delivered within 1 business day.
          </p>

          <form onSubmit={handleSubmit} className="space-y-12 bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-sm">
            
            {/* Section 1: Contact Details */}
            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-6 border-b border-zinc-100 pb-4">1. Contact Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Your Name *</label>
                  <input required type="text" name="yourName" value={formData.yourName} onChange={handleInputChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-4 py-2.5 text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Contact Email *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-4 py-2.5 text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all" />
                </div>
                <CustomSelect 
                  label="Role / Title"
                  name="role"
                  value={formData.role}
                  onChange={handleCustomSelectChange}
                  required
                  options={[
                    { label: 'Founder', value: 'Founder' },
                    { label: 'CEO', value: 'CEO' },
                    { label: 'Head of Sales', value: 'Head of Sales' },
                    { label: 'Operations', value: 'Operations' },
                    { label: 'Marketing Lead', value: 'Marketing Lead' },
                    { label: 'Other', value: 'Other' },
                  ]}
                />
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-4 py-2.5 text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all" />
                </div>
              </div>
            </section>

            {/* Section 2: Agency Profile */}
            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-6 border-b border-zinc-100 pb-4">2. Agency Profile</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Agency Name *</label>
                  <input required type="text" name="agencyName" value={formData.agencyName} onChange={handleInputChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-4 py-2.5 text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Website URL</label>
                  <input type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder="https://" className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-4 py-2.5 text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all" />
                </div>
                <CustomSelect 
                  label="Team Size"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleCustomSelectChange}
                  required
                  options={[
                    { label: '1 (Solo)', value: '1 (Solo)' },
                    { label: '2-5', value: '2-5' },
                    { label: '6-15', value: '6-15' },
                    { label: '16-50', value: '16-50' },
                    { label: '51+', value: '51+' },
                  ]}
                />
                <CustomSelect 
                  label="Monthly Revenue"
                  name="monthlyRevenue"
                  value={formData.monthlyRevenue}
                  onChange={handleCustomSelectChange}
                  required
                  options={[
                    { label: 'Under $5k', value: 'Under $5k' },
                    { label: '$5k - $15k', value: '$5k - $15k' },
                    { label: '$15k - $40k', value: '$15k - $40k' },
                    { label: '$40k+', value: '$40k+' },
                  ]}
                />
                <div className="md:col-span-2">
                  <CustomSelect 
                    label="What is your average deal size?"
                    name="dealSize"
                    value={formData.dealSize}
                    onChange={handleCustomSelectChange}
                    required
                    options={[
                      { label: 'Under $1k', value: 'Under $1k' },
                      { label: '$1k–$5k', value: '$1k–$5k' },
                      { label: '$5k–$15k', value: '$5k–$15k' },
                      { label: '$15k+', value: '$15k+' },
                    ]}
                  />
                </div>
                <div className="md:col-span-2">
                  <CustomSelect 
                    label="How many qualified sales meetings do you generate per month on average?"
                    name="monthlyMeetings"
                    value={formData.monthlyMeetings}
                    onChange={handleCustomSelectChange}
                    required
                    options={[
                      { label: "0 — we don't track this", value: "0 — we don't track this" },
                      { label: '1–3 meetings/month', value: '1–3 meetings/month' },
                      { label: '4–6 meetings/month', value: '4–6 meetings/month' },
                      { label: '7–10 meetings/month', value: '7–10 meetings/month' },
                      { label: '10+ meetings/month', value: '10+ meetings/month' },
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Pipeline & Lead Sources */}
            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-6 border-b border-zinc-100 pb-4">3. Pipeline & Lead Sources</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-3">Where do your current leads come from? (Select all that apply) *</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {['Referrals / Word of Mouth', 'Inbound / SEO', 'Paid Ads', 'Cold Email', 'LinkedIn Outreach', 'Partnerships', 'Other'].map(source => (
                      <label key={source} className="flex items-center gap-3 p-3 border border-zinc-200 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={formData.leadSources.includes(source)}
                          onChange={() => handleCheckboxChange(source)}
                          className="w-4 h-4 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-900"
                        />
                        <span className="text-sm text-zinc-700">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-600 font-medium text-center">
                {error}
              </div>
            )}

            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 text-sm text-zinc-500 leading-relaxed text-center">
              This is not a marketing consultation.<br/>
              This is a structured revenue system assessment.<br/>
              <span className="text-zinc-900 font-medium">
                We onboard a limited number of companies per quarter.
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || formData.leadSources.length === 0}
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-4 rounded-md font-medium hover:bg-zinc-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg mt-8"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
            <p className="text-center text-sm text-zinc-500 mt-4">
              Your information is secure and will never be shared.
            </p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
