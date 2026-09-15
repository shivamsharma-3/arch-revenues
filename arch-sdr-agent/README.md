# ARCH SDR Agent

A 4-agent outbound sales system (Researcher, Writer, Reply Classifier,
Reporter) built on the Claude API, following the blueprint for ARCH
Revenues. This is real, runnable code — not pseudocode.

## What's actually been tested vs. what needs your keys

| Piece | Status |
|---|---|
| Researcher + Writer pipeline | **Tested with mocked Claude responses** (`tests/test_pipeline_offline.py`) — proves the scraping, JSON parsing, and prompt wiring all work. Needs your `ANTHROPIC_API_KEY` for a real run. |
| Classifier escalation guardrail | **Tested** — objection/ambiguous replies are forced to escalate in code, even if the model forgets. |
| Fail-closed scraping | **Tested** — a dead URL returns a clearly marked failure, never fake data. |
| FastAPI app + all routes | **Tested** — boots cleanly, all 10 routes register correctly. |
| Database models | **Tested** — the full 8-table schema compiles and all foreign keys resolve (against Postgres; SQLite can't run it since it uses native `ARRAY`/`JSONB` types). |
| Actual sending (Brevo), IMAP polling, Calendly webhook, email verification | **Not live-tested** — these need real accounts/credentials which weren't available here. The code is complete and follows each provider's real API, but you should test each with your own sandbox/test credentials before pointing it at real prospects. |

## Fastest path to seeing it work: the CLI demo

```bash
git clone <this repo>
cd arch-sdr-agent
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

export ANTHROPIC_API_KEY=sk-ant-your-real-key

python demo_cli.py https://some-real-prospect-site.com "We build AI SDR agents for agencies"
```

This scrapes the real site, runs the real Researcher agent, then the
real Writer agent, and prints the full 5-piece outreach sequence. No
database, no email account, no other service needed — this is the
`/agent-demo` flow from the blueprint, runnable from your terminal in
under 2 minutes.

## Running the offline test suite (no API key needed)

```bash
python tests/test_pipeline_offline.py
```

Mocks the Claude API and HTTP calls so you can verify the logic is
sound on any machine, even without credentials.

## Running the full API locally

```bash
cp .env.example .env
# fill in ANTHROPIC_API_KEY at minimum; add DATABASE_URL to use the
# prospect/approval routes; add BREVO/IMAP/BOUNCER/CALENDLY to use
# the full send-and-monitor loop.

uvicorn api.main:app --reload
# visit http://localhost:8000/docs for interactive API docs
```

To exercise the DB-backed routes you need a Postgres instance —
Supabase's free tier works. Run `deploy/schema.sql` against it, then
set `DATABASE_URL` in `.env`.

## Running the background worker (sending, reply polling, reports)

```bash
python -m agent.orchestrator.run_scheduler
```

This is a separate long-running process from the API — deploy it as
a second Railway service (see `deploy/railway.toml`) pointed at the
same repo with the start command:

```
python -m agent.orchestrator.run_scheduler
```

## Project layout

```
arch-sdr-agent/
├── agent/
│   ├── agents/          # The 4 Claude-powered agents
│   │   ├── researcher.py
│   │   ├── writer.py
│   │   ├── classifier.py
│   │   └── reporter.py
│   ├── tools/           # Everything that talks to an external service
│   │   ├── llm.py            # shared Claude JSON-call wrapper + retry
│   │   ├── scraper.py        # website scraping
│   │   ├── email_verifier.py # Bouncer API
│   │   ├── sender.py         # Brevo SMTP + hard send guardrails
│   │   └── inbox_reader.py   # IMAP polling
│   ├── prompts/          # The actual system prompt text files
│   ├── db/
│   │   ├── models.py     # SQLAlchemy models
│   │   └── session.py    # DB session factory
│   ├── orchestrator/
│   │   ├── state_machine.py  # prospect lifecycle transitions
│   │   ├── scheduler.py      # cron jobs: send, poll replies, weekly report
│   │   └── run_scheduler.py  # worker process entrypoint
│   └── config.py         # all env vars, in one place
├── api/
│   ├── main.py
│   └── routes/
│       ├── demo.py       # public no-DB demo endpoint
│       ├── prospects.py  # CRUD + approval gate
│       ├── replies.py    # escalation inbox
│       └── webhooks.py   # Calendly + Brevo
├── deploy/
│   ├── schema.sql        # Postgres schema
│   └── railway.toml
├── tests/
│   └── test_pipeline_offline.py
├── demo_cli.py           # <- start here
├── requirements.txt
└── .env.example
```

## The safety rules that are enforced in code, not just prompts

These matter more than the prompts — a prompt can drift, code
guardrails can't (unless someone deletes them):

1. **`agent/tools/sender.py`** — will not send to an unverified email,
   will not exceed the per-domain daily cap, will not send to a
   suppressed address. Raises `SendBlocked` rather than silently
   skipping, so failures are visible in logs.
2. **`agent/agents/classifier.py`** — `objection_pricing`,
   `objection_scope`, and `ambiguous` categories are forced to
   `needs_human=True` with `drafted_response=None` in code, even if
   the model's own JSON output forgot to null the response.
3. **`agent/agents/researcher.py`** — if scraping fails, returns a
   research object clearly marked `research_failed` with a `0`
   ICP score, rather than letting the Writer agent generate an email
   from empty/fabricated data.
4. **`agent/orchestrator/scheduler.py`** — sends only fire Tue-Thu
   inside two explicit time windows; this is checked before any send
   attempt, not left to cron timing alone.
5. **`agent/orchestrator/state_machine.py`** — the `written -> approved`
   transition only happens via `advance_approve()`, which is only
   ever called from a human clicking Approve in the API — there's no
   code path that skips this for a new client's first batch.

## What's next (not yet built)

- Metric aggregation queries for the weekly report (currently a
  placeholder dict in `scheduler.py::weekly_report_job` — needs real
  `COUNT`/`AVG` queries over `emails`/`replies`/`meetings`).
- Pre-meeting brief generation on Calendly webhook (hook is in
  `webhooks.py::calendly_webhook`, just needs a call back into
  `ResearcherAgent`'s stored `research_data`).
- Timezone-aware sending (right now the send window is your server's
  local time, not each prospect's local time as in the original
  blueprint — worth adding once you have real prospect timezone data).
- Admin/client dashboard UI (the Next.js side from Part 4 of the
  original blueprint — this repo is the backend it would call).
