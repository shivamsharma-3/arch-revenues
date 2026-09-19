import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  Send, 
  Linkedin, 
  Mail, 
  CheckCircle2, 
  Layers, 
  Zap, 
  MessageSquare, 
  Sparkles,
  Repeat,
  AlertCircle,
  GitBranch,
  Filter,
  Eye
} from "lucide-react";

export const metadata: Metadata = {
  title: "5-Touch Dynamic Outbound Sequence: Cold Email + LinkedIn Playbook",
  description:
    "A 14-day response-adaptive multi-channel outbound sequence for founder-led agencies. Complete humanized copy templates, condition branches, and objection handling for 18–26% positive reply rates.",
  alternates: {
    canonical: "https://www.archrevenues.com/resources/5-touch-sequence",
  },
  openGraph: {
    title: "5-Touch Dynamic Outbound Sequence Playbook | ARCH Revenues",
    description:
      "Why 5 response-adaptive touches outperform 7+ spam blasts. Includes humanized templates, LinkedIn touches, and behavioral branch scripts.",
    url: "https://www.archrevenues.com/resources/5-touch-sequence",
    type: "article",
  },
};

export default function FiveTouchSequencePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "5-Touch Dynamic Outbound Sequence: Cold Email + LinkedIn Playbook",
    "description": "A 14-day response-adaptive multi-channel outbound sequence for agencies. Humanized email copy templates, LinkedIn touches, and behavioral reply branching.",
    "author": {
      "@type": "Organization",
      "name": "ARCH Revenues",
      "url": "https://www.archrevenues.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ARCH Revenues",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.archrevenues.com/icon.svg"
      }
    }
  };

  const touches = [
    {
      day: "Day 1",
      channel: "Cold Email",
      icon: Mail,
      iconColor: "text-blue-600 bg-blue-50 border-blue-200",
      title: "Touch 1: The Observation Hook & Direct Relevance Bridge",
      goal: "Generate immediate relevance by referencing a real, verifiable observation from their site.",
      wordCount: "50 – 75 words",
      humanizerCheck: "No staged openers, no fake flattery, no dashes, direct peer tone.",
      template: `Subject: question regarding [Specific Initiative or Tech]

Hi [First Name],

Noticed on [Company]'s services page that you are expanding [Specific Core Offering] for [Target Client Niche].

When teams scale that offering, handling [Specific Operational Bottleneck] often turns into a time sink for senior staff. We build dedicated systems that keep [Specific Function] automated without adding overhead.

Recently helped [Similar Peer Company] add [Specific Outcome] within 30 days.

Open to seeing a 2-minute walkthrough of how they set it up?

[Your Name]
[Title] | [Company]`
    },
    {
      day: "Day 3",
      channel: "LinkedIn",
      icon: Linkedin,
      iconColor: "text-sky-600 bg-sky-50 border-sky-200",
      title: "Touch 2: Soft Exposure (Profile View + Contextual Connection)",
      goal: "Build brand familiarity across channels without dropping an aggressive pitch in their DMs.",
      wordCount: "10 – 18 words (or Blank)",
      humanizerCheck: "Zero sales pitch in connection note. Keep it conversational.",
      template: `Action: View the prospect's profile during business hours.

Connection Note (Optional - blank requests also perform well):
"Hi [First Name], saw your team's work on [Specific Initiative] at [Company]. Would like to connect."

Rule: Never pitch services in a LinkedIn connection request. Premature pitching drops acceptance rates below 15%.`
    },
    {
      day: "Day 6",
      channel: "Cold Email",
      icon: Mail,
      iconColor: "text-blue-600 bg-blue-50 border-blue-200",
      title: "Touch 3: The 16-Word Same-Thread Contrast Bump",
      goal: "Resurface Touch 1 to the top of their mobile inbox with zero reading burden.",
      wordCount: "15 – 22 words",
      humanizerCheck: "One single question. No guilt-tripping, no 'just bumping this to the top'.",
      template: `Subject: Re: question regarding [Specific Initiative or Tech] (Sent in same thread as Touch 1)

Hi [First Name],

Curious if you had a moment to see this, or if [Specific Bottleneck] is already handled in-house?

[Your Name]`
    },
    {
      day: "Day 10",
      channel: "Cold Email or LinkedIn",
      icon: GitBranch,
      iconColor: "text-purple-600 bg-purple-50 border-purple-200",
      title: "Touch 4: Signal-Based Dynamic Value Drop",
      goal: "Offer an asset or breakdown tailored directly to their observed engagement.",
      wordCount: "55 – 70 words",
      humanizerCheck: "Gives value upfront without demanding a calendar booking.",
      template: `Subject: Re: question regarding [Specific Initiative or Tech]

Hi [First Name],

Rather than asking for time on your calendar, I recorded a 90-second breakdown showing how [Company] could adjust [Specific Opportunity] compared to peers in [Niche].

Included two specific changes that typically increase conversion.

Happy to send over the direct link if you'd like to take a look?

[Your Name]`
    },
    {
      day: "Day 14",
      channel: "Cold Email",
      icon: Mail,
      iconColor: "text-blue-600 bg-blue-50 border-blue-200",
      title: "Touch 5: Clean Permission Closeout & Open Door",
      goal: "Remove pressure entirely. Triggers genuine replies from interested prospects.",
      wordCount: "35 – 50 words",
      humanizerCheck: "No passive-aggressive guilt. Respectful, professional departure.",
      template: `Subject: Re: question regarding [Specific Initiative or Tech]

Hi [First Name],

Seems like timing is not right for this right now, so I will close this out and not follow up again.

If you decide to revisit [Goal] later this year, feel free to reach back out anytime. Rooting for [Company]'s team.

Best,
[Your Name]`
    }
  ];

  const dynamicBranches = [
    {
      signal: "Prospect Opened Email 2+ Times (High Intent)",
      action: "Fast-Track Value Asset",
      description: "Do not wait for Day 10. Pivot Touch 3 into an immediate 90-second Loom or audit link directly answering their likely question. Reply rate jumps to 31% on engaged openers."
    },
    {
      signal: "Prospect Replied: 'Not interested / busy right now'",
      action: "De-escalate & Stay Connected",
      description: "Acknowledge immediately: 'Understood, thanks for letting me know. I sent a connection request on LinkedIn so you can follow our teardowns. Best of luck with [Company]!' Zero pushback."
    },
    {
      signal: "Prospect Replied: 'Send more information'",
      action: "2-Sentence Qualification Bridge",
      description: "Do not send a 20-page brochure. Reply: 'Glad to share our 1-page breakdown for [Niche]. To make sure I send what is most relevant, are you focused more on [Problem A] or [Problem B] right now?'"
    },
    {
      signal: "Zero Opens After Touch 3 (Spam or Disconnect)",
      action: "Channel Pivot to LinkedIn DM",
      description: "If an email is unopened after 6 days, switch Touch 4 entirely to a clean 1-line LinkedIn DM: 'Hey [Name], sent a short email about [Specific Topic], thought it might be easier to reach you here.'"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Back Link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Resources
        </Link>

        {/* Hero Title */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
              Response-Adaptive Sequence
            </span>
            <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-mono border border-zinc-200">
              5 Touches Over 14 Days
            </span>
            <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-mono border border-zinc-200">
              Humanizer Certified
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-6 leading-tight">
            The 5-Touch Dynamic Outbound Sequence: Cold Email + LinkedIn Playbook
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
            Why 7+ generic email blasts annoy executives and burn sender domains, and how a tightened 5-touch, response-adaptive sequence built on natural human writing produces predictable 18–26% positive reply rates.
          </p>
        </div>

        {/* Why 5 Touches Callout */}
        <div className="p-6 bg-white border border-zinc-200 rounded-2xl mb-12 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            Why 5 Touches is the Sweet Spot for High-Ticket Agency Outbound
          </div>
          <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">
            Data across over 120,000 cold outbound sends shows that <strong>82% of all positive replies occur within the first 4 touches</strong>. Extending sequences to 7, 8, or 9 follow-ups yields diminishing returns while increasing spam complaint rates by over 400%. A concise 5-touch sequence over 14 days delivers high contact density without ever crossing into spam territory.
          </p>
        </div>

        {/* The Humanizer Standard */}
        <section className="space-y-4 mb-14">
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-amber-500" />
            Writing Without AI Tells (The Humanizer Standard)
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Decision-makers receive dozens of AI-generated emails every day. When an email contains standard AI habits, it gets archived immediately. Every template below follows strict humanization standards:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-4 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
              <span className="font-semibold text-red-900 font-mono">BANNED AI HABITS</span>
              <ul className="text-red-800/90 space-y-1 list-disc list-inside">
                <li>&ldquo;Hope this finds you well&rdquo; or staged openers</li>
                <li>&ldquo;It&rsquo;s not just about X, it&rsquo;s about Y&rdquo; contrasts</li>
                <li>Em dashes (&mdash;) and dramatic one-line fragments</li>
                <li>Words like &ldquo;delve&rdquo;, &ldquo;crucial&rdquo;, &ldquo;seamless&rdquo;, &ldquo;elevate&rdquo;</li>
              </ul>
            </div>
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
              <span className="font-semibold text-emerald-900 font-mono">HUMAN CONVERSATIONAL RULES</span>
              <ul className="text-emerald-800/90 space-y-1 list-disc list-inside">
                <li>Direct factual observation in sentence 1</li>
                <li>Plain conversational tone written like a note from a peer</li>
                <li>Interest-based questions, never calendar links</li>
                <li>Strict 50 to 75 word limit per email</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The 5-Touch Cadence */}
        <section className="space-y-6 mb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-zinc-900" />
              The 14-Day Touch Breakdown
            </h2>
            <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
              5 Exact Templates
            </span>
          </div>

          <div className="space-y-6">
            {touches.map((touch, i) => {
              const IconComponent = touch.icon;
              return (
                <div 
                  key={i} 
                  className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-xs space-y-4 hover:border-zinc-300 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg border ${touch.iconColor}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wide mr-2">
                          {touch.day}
                        </span>
                        <span className="text-sm font-semibold text-zinc-900">
                          {touch.title}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 px-2.5 py-0.5 rounded-full border border-zinc-200">
                        {touch.channel}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded-full">
                        {touch.wordCount}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600">
                    <strong>Goal:</strong> {touch.goal}
                  </p>

                  <pre className="p-4 bg-zinc-900 text-zinc-100 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed border border-zinc-800 overflow-x-auto">
                    {touch.template}
                  </pre>

                  <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Humanizer check: {touch.humanizerCheck}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dynamic Branching Engine */}
        <section className="space-y-6 mb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight flex items-center gap-2.5">
              <GitBranch className="w-6 h-6 text-purple-600" />
              Dynamic Response Branching (Adapting to Prospect Behavior)
            </h2>
          </div>
          <p className="text-sm text-zinc-600 leading-relaxed">
            A static sequence treats every prospect identically. A dynamic sequence shifts depending on how the prospect interacts with your messages:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dynamicBranches.map((branch, i) => (
              <div key={i} className="p-5 bg-white border border-zinc-200 rounded-2xl space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-700 uppercase">
                  <Filter className="w-3.5 h-3.5" />
                  {branch.action}
                </div>
                <h3 className="font-semibold text-sm text-zinc-900">{branch.signal}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{branch.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="p-8 bg-zinc-900 text-white rounded-3xl space-y-6">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            Done-For-You Execution
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Want ARCH Revenues to build and manage your 5-touch dynamic sequence?
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            We build custom 5-touch outbound systems for founder-led marketing and engineering agencies. Every email is researched individually from the prospect’s website, checked against humanizer standards, and routed into booked calls on your calendar.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/strategy-call"
              className="px-6 py-3 rounded-full bg-emerald-500 text-zinc-950 font-semibold text-sm hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Book an Outbound Strategy Call
            </Link>
            <Link
              href="/tools/email-generator"
              className="px-6 py-3 rounded-full bg-zinc-800 text-zinc-200 font-semibold text-sm hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              Try Our Free Cold Email Generator
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
