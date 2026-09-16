export interface DecisionMaker {
  name: string | null;
  title: string | null;
  linkedin: string | null;
}

export interface PersonalizationHook {
  type: string;
  detail: string;
}

export interface ProspectResearch {
  company_name: string;
  decision_maker: DecisionMaker;
  company_size: string | null;
  services: string[];
  recent_news: string[];
  tech_stack: string[];
  personalization_hooks: PersonalizationHook[];
  icp_fit_score: number;
  icp_fit_reason: string;
  source_url: string;
}

export interface OutreachSequence {
  email_1: string;
  linkedin_note: string;
  followup_day3: string;
  followup_day7: string;
  followup_day14: string;
}

export interface ProspectItem {
  id: string;
  company_name: string;
  domain: string;
  industry: string;
  decision_maker: DecisionMaker;
  icp_score: number;
  icp_reason: string;
  status: 'researched' | 'sequence_ready' | 'approved' | 'in_sequence' | 'replied' | 'meeting_booked';
  last_activity: string;
  research: ProspectResearch;
  sequence: OutreachSequence;
}

export interface IncomingReply {
  id: string;
  prospect_name: string;
  company_name: string;
  received_at: string;
  reply_text: string;
  classification: {
    category: 'interested' | 'objection_pricing' | 'objection_timing' | 'objection_competitor' | 'out_of_office' | 'not_interested';
    confidence: number;
    needs_human: boolean;
    escalation_reason?: string | null;
    drafted_response?: string | null;
  };
  status: 'pending_review' | 'approved' | 'replied';
}
