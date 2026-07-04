import { FAQ } from "@/components/FAQ";

export default function FAQPage() {
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

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main className="flex-grow pt-20 pb-12 md:pt-32 md:pb-24">
        <FAQ />
      </main>
    </div>
  );
}
