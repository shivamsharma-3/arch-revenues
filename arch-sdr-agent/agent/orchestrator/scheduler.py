"""
Cron-driven scheduler. Runs three jobs:
  - daily_send_job: sends approved drafts, Tue-Thu, respecting the
    per-domain daily cap (enforced again here AND in BrevoSender —
    belt and suspenders, since this is the rule most likely to cause
    real damage if it silently breaks).
  - reply_poll_job: polls inboxes every 30 min for new replies.
  - weekly_report_job: generates + stores the Sunday night report.
"""
import logging
from datetime import datetime, time

from apscheduler.schedulers.background import BackgroundScheduler

from agent.agents.reporter import ReporterAgent
from agent.config import settings
from agent.db.models import Client, Email, Prospect, Report, SuppressionEntry
from agent.db.session import get_session
from agent.orchestrator.state_machine import handle_reply
from agent.tools.inbox_reader import fetch_unseen
from agent.tools.sender import BrevoSender, EmailToSend, SendBlocked

logger = logging.getLogger("orchestrator.scheduler")

SEND_WINDOWS = [(time(9, 0), time(11, 0)), (time(13, 0), time(16, 0))]
SEND_DAYS = {1, 2, 3}  # Mon=0 ... Tue=1, Wed=2, Thu=3


def _within_send_window(now: datetime) -> bool:
    if now.weekday() not in SEND_DAYS:
        return False
    current = now.time()
    return any(start <= current <= end for start, end in SEND_WINDOWS)


def daily_send_job():
    now = datetime.now()
    if not _within_send_window(now):
        return

    with get_session() as db:
        suppressed = {row.email for row in db.query(SuppressionEntry).all()}
        sender = BrevoSender(suppression_list=suppressed)

        approved_emails = (
            db.query(Email)
            .filter(Email.status == "approved")
            .limit(200)  # batch size safety valve
            .all()
        )

        sent_count_by_domain: dict[str, int] = {}

        for email_row in approved_emails:
            prospect: Prospect = email_row.prospect
            client: Client = prospect.client

            if not client.sender_domains:
                logger.warning("Client %s has no sender_domains configured", client.id)
                continue

            # Simple round-robin: pick the domain with the fewest sends
            # so far this run.
            domain = min(client.sender_domains, key=lambda d: sent_count_by_domain.get(d, 0))
            if sent_count_by_domain.get(domain, 0) >= settings.max_emails_per_domain_per_day:
                continue

            from_email = f"outreach@{domain}"
            to_send = EmailToSend(
                to_email=prospect.email,
                from_email=from_email,
                from_name=client.name,
                subject=f"Quick one for {prospect.research_data.get('company_name', '')}"
                        if prospect.research_data else "Quick question",
                body_text=email_row.content,
                unsubscribe_url=f"https://archrevenues.com/unsubscribe?email={prospect.email}",
            )

            try:
                sender.send(to_send)
                email_row.status = "sent"
                email_row.sent_at = datetime.utcnow()
                email_row.from_domain = domain
                prospect.state = "sent"
                sent_count_by_domain[domain] = sent_count_by_domain.get(domain, 0) + 1
                db.add(email_row)
                db.add(prospect)
            except SendBlocked as e:
                logger.warning("Send blocked for prospect %s: %s", prospect.id, e)
                email_row.status = "failed"
                db.add(email_row)


def reply_poll_job():
    with get_session() as db:
        clients = db.query(Client).all()
        for client in clients:
            for domain in client.sender_domains:
                settings.require("imap_host")
                try:
                    messages = fetch_unseen(settings.imap_host, f"outreach@{domain}", settings.imap_pass)
                except Exception as e:
                    logger.error("IMAP poll failed for %s: %s", domain, e)
                    continue

                for msg in messages:
                    from_email = msg["from"].split("<")[-1].rstrip(">").strip().lower()
                    prospect = (
                        db.query(Prospect)
                        .filter(Prospect.client_id == client.id, Prospect.email == from_email)
                        .first()
                    )
                    if not prospect:
                        continue
                    handle_reply(db, prospect, msg["text"])


def weekly_report_job():
    with get_session() as db:
        reporter = ReporterAgent()
        clients = db.query(Client).all()
        for client in clients:
            # NOTE: metric aggregation left as a placeholder — wire this
            # to real COUNT/AVG queries over emails/replies/meetings for
            # this client in the last 7 days.
            metrics = {"client": client.name, "note": "wire real aggregation queries here"}
            report_text = reporter.write_report(metrics)
            db.add(Report(
                client_id=client.id,
                week_ending=datetime.utcnow(),
                metrics=metrics,
                report_text=report_text,
            ))


def start_scheduler() -> BackgroundScheduler:
    scheduler = BackgroundScheduler()
    scheduler.add_job(daily_send_job, "cron", day_of_week="tue,wed,thu", hour="9-16", minute="*/15")
    scheduler.add_job(reply_poll_job, "interval", minutes=30)
    scheduler.add_job(weekly_report_job, "cron", day_of_week="sun", hour=23)
    scheduler.start()
    return scheduler
