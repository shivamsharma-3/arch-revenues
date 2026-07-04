'use client';

export function SocialProof() {
  const items = [
    { value: "10+ yrs", label: "B2B outbound experience (founder)" },
    { value: "50K+", label: "Cold emails sent (lifetime)" },
    { value: "Apollo + Brevo + Make", label: "Verified tech stack (not homegrown)" },
    { value: "Mon-Fri", label: "Live reporting — you see every reply" },
  ];

  return (
    <section className="bg-[#F8F0EB] py-12">
      <div className="max-w-[88rem] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-zinc-200/50">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center lg:px-6"
            >
              <div className="text-[32px] font-bold text-[#1A2330] leading-tight mb-2">
                {item.value}
              </div>
              <div className="text-[14px] text-[#506070] font-medium leading-snug max-w-[200px]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
