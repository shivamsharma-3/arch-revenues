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
                Hi, I&apos;m Shivam Sharma, founder of ARCH Revenues. I&apos;m a B.Tech graduate in AI & Data Science based in Hyderabad, India.
              </p>
              
              <p>
                I started ARCH Revenues because I saw a recurring problem: great B2B agencies have delivery dialed in, but lack a predictable way to get their offer in front of the right people. Referrals are great, but they aren&apos;t a system you can scale.
              </p>
              
              <p>
                Most agencies try manual LinkedIn outreach (which is too slow) or hire expensive SDRs for &quot;spray and pray&quot; emails (which burns your market). Neither is sustainable.
              </p>

              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-12 my-16">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-6">A Founder-to-Founder Approach</h2>
                <p className="text-xl text-zinc-800 font-medium italic">
                  &quot;Outbound isn&apos;t just a numbers game. It&apos;s about relevance and timing.&quot;
                </p>
                <div className="mt-8 space-y-4 text-zinc-600">
                  <p>
                    We don&apos;t believe in sending 10,000 generic emails. We believe in reaching the right 500 people with a message that actually speaks to their specific pain points.
                  </p>
                  <p>
                    As an early-stage service, I am personally involved in building and managing the systems for our Founding Clients. We are building this in public, with transparency and a genuine commitment to your results.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-semibold text-zinc-900 mb-6">The Long-Term Vision</h2>
              <p>
                My mission is simple: help B2B agencies build predictable outbound systems. I want to remove the anxiety of an empty calendar so you can focus on what you do best—getting results for your clients.
              </p>
              
              <p>
                ARCH Revenues isn&apos;t just a lead-gen agency. We are building the infrastructure for the next generation of founder-led growth. 
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
