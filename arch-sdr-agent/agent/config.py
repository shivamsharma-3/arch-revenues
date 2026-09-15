"""
Central configuration. Loads everything from environment variables
(see .env.example). Nothing is hardcoded so this is safe to commit.
"""
import os
from dataclasses import dataclass

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    # python-dotenv is optional; if it's not installed we just rely on
    # real environment variables being set (e.g. by Railway/Docker).
    pass


@dataclass
class Settings:
    anthropic_api_key: str = os.getenv("ANTHROPIC_API_KEY", "")

    database_url: str = os.getenv("DATABASE_URL", "")

    brevo_api_key: str = os.getenv("BREVO_API_KEY", "")
    brevo_smtp_host: str = os.getenv("BREVO_SMTP_HOST", "smtp-relay.brevo.com")
    brevo_smtp_port: int = int(os.getenv("BREVO_SMTP_PORT", "587"))
    brevo_smtp_user: str = os.getenv("BREVO_SMTP_USER", "")
    brevo_smtp_pass: str = os.getenv("BREVO_SMTP_PASS", "")

    imap_host: str = os.getenv("IMAP_HOST", "")
    imap_user: str = os.getenv("IMAP_USER", "")
    imap_pass: str = os.getenv("IMAP_PASS", "")

    bouncer_api_key: str = os.getenv("BOUNCER_API_KEY", "")
    calendly_api_key: str = os.getenv("CALENDLY_API_KEY", "")
    calendly_scheduling_link: str = os.getenv("CALENDLY_SCHEDULING_LINK", "")

    # Model choices — cheap model for high-volume structured tasks,
    # stronger model for the writing that actually needs quality.
    model_cheap: str = os.getenv("MODEL_CHEAP", "claude-haiku-4-5")
    model_writer: str = os.getenv("MODEL_WRITER", "claude-sonnet-4-5")

    max_emails_per_domain_per_day: int = int(os.getenv("MAX_EMAILS_PER_DOMAIN_PER_DAY", "50"))

    def require(self, *names: str) -> None:
        """Raise a clear error if required settings are missing, instead of
        failing deep inside an HTTP call with a cryptic error."""
        missing = [n for n in names if not getattr(self, n)]
        if missing:
            raise RuntimeError(
                f"Missing required settings: {', '.join(missing)}. "
                f"Set them in your .env file (see .env.example)."
            )


settings = Settings()
