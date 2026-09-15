-- ARCH SDR Agent — database schema
-- Run against a Postgres instance (Supabase free tier is fine).

CREATE TABLE clients (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    value_prop      TEXT NOT NULL,
    voice_description TEXT,
    offer           TEXT,
    icp_description TEXT,
    signature       TEXT,
    sender_domains  TEXT[] NOT NULL DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE prospects (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id       UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    url             TEXT NOT NULL,
    email           TEXT,
    email_verified_status TEXT,          -- verified | risky | invalid | null
    research_data   JSONB,
    state           TEXT NOT NULL DEFAULT 'new',
    -- new -> researched -> written -> approved -> sent -> replied -> booked
    --                                                  \-> escalated
    icp_fit_score   INTEGER,
    suppressed      BOOLEAN NOT NULL DEFAULT false,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_prospects_client_state ON prospects(client_id, state);

CREATE TABLE emails (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prospect_id     UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
    sequence_step   TEXT NOT NULL,        -- email_1 | linkedin_note | followup_day3 | followup_day7 | followup_day14
    content         TEXT NOT NULL,
    subject         TEXT,
    from_domain     TEXT,
    status          TEXT NOT NULL DEFAULT 'draft',  -- draft | approved | sent | bounced | failed
    got_positive_reply BOOLEAN NOT NULL DEFAULT false,
    sent_at         TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_emails_prospect ON emails(prospect_id);
CREATE INDEX idx_emails_status ON emails(status);

CREATE TABLE replies (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prospect_id         UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
    content             TEXT NOT NULL,
    category            TEXT NOT NULL,
    confidence          INTEGER,
    drafted_response    TEXT,
    escalation_reason   TEXT,
    needs_human         BOOLEAN NOT NULL DEFAULT false,
    human_response_sent BOOLEAN NOT NULL DEFAULT false,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_replies_needs_human ON replies(needs_human) WHERE needs_human = true;

CREATE TABLE meetings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prospect_id     UUID NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
    calendly_event_id TEXT,
    scheduled_at    TIMESTAMPTZ,
    pre_meeting_brief TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE reports (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id       UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    week_ending     DATE NOT NULL,
    metrics         JSONB NOT NULL,
    report_text     TEXT NOT NULL,
    sent_to_client  BOOLEAN NOT NULL DEFAULT false,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_name      TEXT NOT NULL,       -- researcher | writer | classifier | reporter
    prospect_id     UUID REFERENCES prospects(id) ON DELETE SET NULL,
    model_used      TEXT,
    input_summary   TEXT,
    output_summary  TEXT,
    token_count     INTEGER,
    cost_usd        NUMERIC(10, 6),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_prospect ON audit_log(prospect_id);

CREATE TABLE suppression_list (
    email           TEXT PRIMARY KEY,
    reason          TEXT NOT NULL,       -- unsubscribe | bounced | manual
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
