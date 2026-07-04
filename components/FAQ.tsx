import Link from 'next/link';

export function FAQ() {
  const faqs = [
    {
      q: "How many meetings will you book per month?",
      a: "8-12 qualified demos for SaaS founders in our ICP. We commit to this in writing. If we book fewer than 8 in any month, you don't pay for that month."
    },
    {
      q: "How fast will I see results?",
      a: "First meetings typically land in week 3 of the engagement. Weeks 1-2 are infrastructure setup (domains, SPF/DKIM/DMARC, warmup, sequence build). We do not promise results faster than this — anyone who does is lying."
    },
    {
      q: "Do I need to provide the contact list?",
      a: "No. We use Apollo to build the list based on your ICP. You approve the list before the sequence goes live — we will not email anyone you do not approve."
    },
    {
      q: "What happens if a prospect replies negatively?",
      a: "We handle all replies — positive, negative, and unsubscribe requests — within 4 business hours. You see every reply in real-time in a shared inbox. You can step in at any time."
    },
    {
      q: "Can I cancel?",
      a: "Yes. Cancel anytime after the first 30 days. No annual contract. The 30-day minimum covers infrastructure setup costs, which are real (domains, warmup tool, Apollo seats)."
    },
    {
      q: "Why are you only $1,000/mo when Belkins charges $3,000?",
      a: "Because we have fewer case studies than Belkins. The $1,000 rate is the founding client rate — 3 spots only. It increases to $1,750/mo for client #4. You're getting the same work at a discount in exchange for being a public case study."
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-24 px-6 bg-[#F8F0EB] border-b border-zinc-200/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[32px] md:text-[48px] font-bold text-[#1A2330] tracking-tight mb-12 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-zinc-200 rounded-xl p-8">
              <h3 className="text-[20px] font-bold text-[#1A2330] mb-4">
                {faq.q}
              </h3>
              <p className="text-[16px] text-[#506070] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/strategy-call"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4875A] text-white px-8 py-4 rounded-xl text-[18px] font-bold hover:bg-[#c2794e] transition-all shadow-lg hover:shadow-[#D4875A]/20"
          >
            Book a 20-min fit call →
          </Link>
          <Link
            href="/icp-worksheet"
            className="text-[#1A2330] text-[16px] underline hover:text-[#D4875A] transition-colors"
          >
            Download the ICP worksheet
          </Link>
        </div>
      </div>
    </section>
  );
}
