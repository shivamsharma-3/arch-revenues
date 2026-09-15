"""
Email sender wrapping Brevo SMTP. Enforces the send-time Iron Rules
from the blueprint in code, not just in the scheduler's intentions:

  1. Never send to an unverified email.
  2. Never exceed the per-domain daily cap.
  3. Never send to a suppressed (unsubscribed) address.

The scheduler is still responsible for time-of-day/day-of-week
windowing (Part 8, rule 3) — that's a scheduling concern, not a
per-send concern, so it lives in orchestrator/scheduler.py.
"""
import smtplib
from dataclasses import dataclass
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from agent.config import settings
from agent.tools.email_verifier import verify_email


class SendBlocked(RuntimeError):
    """Raised when a send is blocked by a guardrail. Callers should
    catch this and log it, not treat it as a transient failure."""


@dataclass
class EmailToSend:
    to_email: str
    from_email: str
    from_name: str
    subject: str
    body_text: str
    unsubscribe_url: str


class BrevoSender:
    def __init__(self, suppression_list: set[str] | None = None):
        settings.require("brevo_smtp_user", "brevo_smtp_pass")
        self.suppression_list = suppression_list or set()
        self._sent_today_by_domain: dict[str, int] = {}

    def _domain_of(self, email: str) -> str:
        return email.split("@")[-1].lower()

    def _check_guardrails(self, email: EmailToSend, skip_verification: bool = False) -> None:
        if email.to_email.lower() in self.suppression_list:
            raise SendBlocked(f"{email.to_email} is on the suppression list")

        sender_domain = self._domain_of(email.from_email)
        sent_today = self._sent_today_by_domain.get(sender_domain, 0)
        if sent_today >= settings.max_emails_per_domain_per_day:
            raise SendBlocked(
                f"Daily cap of {settings.max_emails_per_domain_per_day} reached for {sender_domain}"
            )

        if not skip_verification:
            result = verify_email(email.to_email)
            if not result.is_sendable:
                raise SendBlocked(f"{email.to_email} failed verification: status={result.status}")

    def send(self, email: EmailToSend, skip_verification: bool = False) -> None:
        """Send one email. Raises SendBlocked if any guardrail fails —
        callers should catch and log, never bypass this."""
        self._check_guardrails(email, skip_verification=skip_verification)

        msg = MIMEMultipart()
        msg["From"] = f"{email.from_name} <{email.from_email}>"
        msg["To"] = email.to_email
        msg["Subject"] = email.subject
        body = f"{email.body_text}\n\n---\nUnsubscribe: {email.unsubscribe_url}"
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(settings.brevo_smtp_host, settings.brevo_smtp_port) as server:
            server.starttls()
            server.login(settings.brevo_smtp_user, settings.brevo_smtp_pass)
            server.sendmail(email.from_email, [email.to_email], msg.as_string())

        sender_domain = self._domain_of(email.from_email)
        self._sent_today_by_domain[sender_domain] = self._sent_today_by_domain.get(sender_domain, 0) + 1
