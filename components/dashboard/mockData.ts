import { ProspectItem, IncomingReply } from './types';

export const INITIAL_PROSPECTS: ProspectItem[] = [
  {
    id: 'p-1',
    company_name: 'Linear',
    domain: 'linear.app',
    industry: 'Developer Tools / B2B SaaS',
    decision_maker: {
      name: 'Karri Saarinen',
      title: 'Co-Founder & CEO',
      linkedin: 'https://linkedin.com/in/karrisaarinen'
    },
    icp_score: 94,
    icp_reason: 'High-growth founder-led B2B software team with high ACV and active outbound expansion.',
    status: 'in_sequence',
    last_activity: 'Follow-up (Day 3) sent 2h ago',
    research: {
      company_name: 'Linear',
      decision_maker: {
        name: 'Karri Saarinen',
        title: 'Co-Founder & CEO',
        linkedin: 'https://linkedin.com/in/karrisaarinen'
      },
      company_size: '51-100',
      services: ['Issue Tracking', 'Product Roadmaps', 'Insights & Git Sync', 'Customer Requests'],
      recent_news: ['Launched Linear Asks and new customer portal', 'Expanded team to 70 engineers'],
      tech_stack: ['Next.js', 'GraphQL', 'TailwindCSS', 'PostgreSQL', 'TypeScript'],
      personalization_hooks: [
        { type: 'launch', detail: 'Recently debuted Linear Asks customer intake tool' },
        { type: 'hire', detail: 'Hiring enterprise solutions leads for high-velocity outbound' }
      ],
      icp_fit_score: 94,
      icp_fit_reason: 'Perfect fit: product-led engine looking to scale consultative outbound to mid-market.',
      source_url: 'https://linear.app'
    },
    sequence: {
      email_1: "Karri – saw Linear Asks launch last month. As your team scales from pure PLG into mid-market deals, most devtools founders find manual SDR outbound bottlenecks the pipeline. We built autonomous AI SDRs that research engineering leaders and book qualified demos without adding SDR headcount. Worth a 2-min chat?",
      linkedin_note: "Karri – congrats on the Linear Asks release, huge step forward for customer feedback loops. Would love to stay connected.",
      followup_day3: "Karri – quick bump on this. Teams scaling from PLG to mid-market see a 30% pipeline acceleration in 3 weeks with our AI agents. Open to seeing a 60-second Loom?",
      followup_day7: "Different angle: most technical founders hate scripted SDR spam. Our agent reads company git/changelogs so every note sounds like a peer-to-peer recommendation.",
      followup_day14: "Last note from me – if scaling sales pipeline isn't a top priority this quarter, completely understand. Will keep cheering on Linear's releases."
    }
  },
  {
    id: 'p-2',
    company_name: 'Ramp',
    domain: 'ramp.com',
    industry: 'Fintech / Spend Management',
    decision_maker: {
      name: 'Eric Glyman',
      title: 'CEO & Co-Founder',
      linkedin: 'https://linkedin.com/in/ericglyman'
    },
    icp_score: 88,
    icp_reason: 'Rapidly scaling finance automation platform expanding sales headcount and regional outreach.',
    status: 'meeting_booked',
    last_activity: 'Demo call scheduled via Calendly',
    research: {
      company_name: 'Ramp',
      decision_maker: {
        name: 'Eric Glyman',
        title: 'CEO & Co-Founder',
        linkedin: 'https://linkedin.com/in/ericglyman'
      },
      company_size: '500-1000',
      services: ['Corporate Cards', 'Expense Management', 'Procurement', 'Vendor Management'],
      recent_news: ['Reached $300M ARR milestone', 'Launched AI-powered receipt reconciliation'],
      tech_stack: ['React', 'Python', 'AWS', 'PostgreSQL', 'Segment'],
      personalization_hooks: [
        { type: 'launch', detail: 'New autonomous AP processing workflows released' },
        { type: 'funding', detail: 'Raised $150M at $7.65B valuation' }
      ],
      icp_fit_score: 88,
      icp_fit_reason: 'Strong fit for high-velocity enterprise pipeline generation.',
      source_url: 'https://ramp.com'
    },
    sequence: {
      email_1: "Eric – caught Ramp's AP automation release. Scaling outbound to multi-entity finance heads usually requires a massive SDR bench. We deploy AI SDR agents that pinpoint finance exec pain points and book qualified calls on autopilot. Worth a quick reply?",
      linkedin_note: "Eric – congrats on the continuous AP automation momentum. Fascinated by how fast Ramp ships.",
      followup_day3: "Circling back Eric – we help high-growth fintech teams cut customer acquisition cost by 40% using autonomous prospecting. Open to a 15-min look?",
      followup_day7: "Quick stat: outbound conversion rates double when finance leaders get specific vendor-overlap insights in email 1. That's exactly how our SDR models research.",
      followup_day14: "Final note – I'll assume your SDR org is already fully dialed in for the quarter. Best of luck with the continued ARR expansion."
    }
  },
  {
    id: 'p-3',
    company_name: 'Acme Growth Labs',
    domain: 'acmegrowth.co',
    industry: 'Performance Marketing Agency',
    decision_maker: {
      name: 'David Vance',
      title: 'Managing Director',
      linkedin: null
    },
    icp_score: 96,
    icp_reason: 'Founder-led digital agency, 15 staff, doing ~$2.4M ARR looking for qualified B2B client pipeline.',
    status: 'replied',
    last_activity: 'Replied asking for pricing details',
    research: {
      company_name: 'Acme Growth Labs',
      decision_maker: {
        name: 'David Vance',
        title: 'Managing Director',
        linkedin: null
      },
      company_size: '11-50',
      services: ['Paid Search', 'Meta Advertising', 'Creative Strategy', 'HubSpot Audits'],
      recent_news: ['Announced new DTC beauty practice', 'Opened Austin satellite office'],
      tech_stack: ['WordPress', 'Google Analytics 4', 'TripleWhale', 'Klaviyo'],
      personalization_hooks: [
        { type: 'launch', detail: 'Opened Austin studio and hired 4 media buyers' },
        { type: 'hire', detail: 'Seeking senior account director for B2B brand accounts' }
      ],
      icp_fit_score: 96,
      icp_fit_reason: 'Bulls-eye target: boutique agency founder who needs predictable outbound pipeline without hiring full-time SDRs.',
      source_url: 'https://acmegrowth.co'
    },
    sequence: {
      email_1: "David – saw Acme just opened the Austin studio and expanded the media buying crew. Most agency owners find client acquisition is the real bottleneck once delivery capacity ramps up. We build AI SDR systems that book 12-20 qualified B2B agency client meetings a month on autopilot. Free for a 15-min walkthrough this week?",
      linkedin_note: "David – congrats on the Austin expansion. Love the growth trajectory of Acme.",
      followup_day3: "David – quick note in case this was buried under client fires. Happy to share how an agency of 18 added $45K MRR via AI outbound last month.",
      followup_day7: "Different angle: unlike lead generation spam, our agent actually audits the prospect's ad library before writing email 1. Would you test a 2-week pilot?",
      followup_day14: "Last note David – know you're busy running client campaigns. If outbound isn't top of mind right now, I'll check in next quarter."
    }
  },
  {
    id: 'p-4',
    company_name: 'HubSpot',
    domain: 'hubspot.com',
    industry: 'Enterprise CRM / Martech',
    decision_maker: {
      name: 'Yamini Rangan',
      title: 'Chief Executive Officer',
      linkedin: 'https://linkedin.com/in/yaminirangan'
    },
    icp_score: 35,
    icp_reason: 'Massive public enterprise software vendor, not a founder-led agency with $500K-$5M revenue.',
    status: 'researched',
    last_activity: 'Flagged as low ICP match',
    research: {
      company_name: 'HubSpot',
      decision_maker: {
        name: 'Yamini Rangan',
        title: 'Chief Executive Officer',
        linkedin: 'https://linkedin.com/in/yaminirangan'
      },
      company_size: '5000+',
      services: ['Marketing Hub', 'Sales Hub', 'Service Hub', 'Smart CRM', 'Agent Hub'],
      recent_news: ['Introduced Breeze AI and autonomous marketing agents'],
      tech_stack: ['React', 'Java', 'Python', 'AWS', 'Kubernetes'],
      personalization_hooks: [
        { type: 'launch', detail: 'Launched Breeze Intelligence and autonomous Sales Hub copilot' }
      ],
      icp_fit_score: 35,
      icp_fit_reason: 'HubSpot is an enterprise CRM platform rather than an agency client, so outbound priority is low.',
      source_url: 'https://hubspot.com'
    },
    sequence: {
      email_1: "Yamini – noticed the recent Breeze AI additions to Sales Hub. Even with top-tier CRM tools, outbound pipeline consistency remains high on CRO agendas. We configure specialized AI prospecting models that plug into CRM stacks to accelerate outbound velocity. Open to reviewing the benchmarks?",
      linkedin_note: "Yamini – inspiring leadership seeing HubSpot champion customer-first AI across the hubs.",
      followup_day3: "Yamini – brief follow up. Would love to share how specialized SDR agents complement existing enterprise sales cadences.",
      followup_day7: "Sharing a 2-page brief on how enterprise revenue teams are augmenting SDR capacity with autonomous agents. Shall I send it over?",
      followup_day14: "Final check-in – no worries if priorities lie elsewhere this quarter."
    }
  }
];

export const INITIAL_REPLIES: IncomingReply[] = [
  {
    id: 'r-1',
    prospect_name: 'David Vance',
    company_name: 'Acme Growth Labs',
    received_at: '14 minutes ago',
    reply_text: 'Thanks for reaching out Shivam. We are actually exploring outbound right now since our referral channel slowed down. What does the pricing structure look like for your AI SDR, and how fast can it be live?',
    classification: {
      category: 'objection_pricing',
      confidence: 93,
      needs_human: true,
      escalation_reason: 'Prospect asked for exact pricing and timeline. Pricing discussions require human confirmation.',
      drafted_response: 'Hey David, glad the timing aligns. For agencies at your stage, we typically do a 30-day performance pilot at $1,500/mo (covering the dedicated sending infrastructure, AI models, and warm-up) plus a performance incentive per qualified meeting booked. We can have your custom agents deployed and warming in 48 hours. Let me know if Thursday 2pm CT works for a quick 20-min strategy call: https://calendly.com/arch-revenues/strategy-call'
    },
    status: 'pending_review'
  },
  {
    id: 'r-2',
    prospect_name: 'Sarah Chen',
    company_name: 'Vortex Digital',
    received_at: '1 hour ago',
    reply_text: 'Hey Shivam! Yes, we desperately need more outbound calls. Can you send over a Calendly link so we can chat tomorrow afternoon?',
    classification: {
      category: 'interested',
      confidence: 98,
      needs_human: false,
      escalation_reason: null,
      drafted_response: 'Awesome to hear Sarah! Here is my direct scheduling link: https://calendly.com/arch-revenues/strategy-call — pick any 20-minute slot that fits best. Looking forward to reviewing your target accounts!'
    },
    status: 'approved'
  },
  {
    id: 'r-3',
    prospect_name: 'Marcus Brody',
    company_name: 'Brody & Co Architects',
    received_at: '3 hours ago',
    reply_text: 'I am currently out of office on site visits until Monday, September 22nd. For urgent project inquiries, contact support@brodyarch.com.',
    classification: {
      category: 'out_of_office',
      confidence: 99,
      needs_human: false,
      escalation_reason: null,
      drafted_response: null
    },
    status: 'replied'
  },
  {
    id: 'r-4',
    prospect_name: 'Elena Rostova',
    company_name: 'Apex Media',
    received_at: 'Yesterday',
    reply_text: 'We currently use an overseas SDR agency that does manual outreach on Upwork. How is an AI SDR better than a human cold caller?',
    classification: {
      category: 'objection_competitor',
      confidence: 89,
      needs_human: true,
      escalation_reason: 'Competitor/alternative objection requires custom positioning on quality vs cheap labor.',
      drafted_response: 'Hi Elena, great question. The main difference is hyper-contextual research and consistency. Overseas SDRs usually send 500 template blasts per day with high bounce rates that burn your domain. Our AI SDR crawls each prospect\'s website, reads their recent press and case studies, and drafts a 60-word email that reads like you spent 20 minutes researching them. Plus, it never gets sick or quits. Happy to show you 3 live examples if you have 10 minutes.'
    },
    status: 'pending_review'
  }
];
