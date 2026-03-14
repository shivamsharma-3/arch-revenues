"use client";

export default function FounderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <main className="flex-grow pt-32">
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-6"
          >
            The Founder
          </h1>
          <p 
            className="text-xl text-zinc-600 leading-relaxed"
          >
            Why I started ARCH Revenues.
          </p>
        </section>

        <section className="py-24 px-6 bg-white border-y border-zinc-200/50">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12 text-lg text-zinc-600 leading-relaxed">
              <p className="text-2xl font-medium text-zinc-900 leading-snug">
                Hi, I&apos;m Shivam, founder of ARCH Revenues. I started this because great B2B agencies struggle with one thing: unpredictable pipeline.
              </p>
              
              <p>
                You have delivery dialed in, but don&apos;t know where the next deal is coming from. Referrals are great, but they dry up. 
              </p>
              
              <p>
                Founders usually try two things: manual LinkedIn outreach (too slow) or hiring an expensive SDR for &quot;spray and pray&quot; emails (burns your market). Neither works.
              </p>

              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-12 my-16">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Building Something Real</h2>
                <p className="text-xl text-zinc-800 font-medium italic">
                  &quot;Outbound isn&apos;t a numbers game. It&apos;s about relevance.&quot;
                </p>
                <div className="mt-8 space-y-4 text-zinc-600">
                  <p>
                    You don&apos;t need to email 10,000 people a month. You need to reach the right 500 people with a message that speaks to their problems.
                  </p>
                  <p>
                    ARCH Revenues is a founder-led service. We don&apos;t have a massive corporate team. We have a genuine commitment to building outbound systems that work.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-semibold text-zinc-900 mb-6">The Mission</h2>
              <p>
                My mission is simple: help B2B agencies build predictable outbound systems. I want to remove the anxiety of an empty calendar so you can focus on getting results for your clients.
              </p>
              
              <p>
                I&apos;m personally building and managing campaigns for our Founding Clients. If you want a transparent, no-fluff approach to getting more meetings, let&apos;s talk.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
