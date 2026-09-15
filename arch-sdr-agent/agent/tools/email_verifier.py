"""
Email verification wrapper (Bouncer.com API). This is Iron Rule #1
from the blueprint: nothing gets sent to an email that hasn't been
verified. verify_email() is the single gate every send path must
call before Sender.send().
"""
import requests

from agent.config import settings

BOUNCER_URL = "https://api.usebouncer.com/v1.1/email/verify"

VALID_STATUSES = {"deliverable"}
RISKY_STATUSES = {"risky", "unknown"}
INVALID_STATUSES = {"undeliverable"}


class VerificationResult:
    def __init__(self, email: str, status: str, raw: dict):
        self.email = email
        self.status = status  # "verified" | "risky" | "invalid"
        self.raw = raw

    @property
    def is_sendable(self) -> bool:
        return self.status == "verified"


def verify_email(email: str) -> VerificationResult:
    settings.require("bouncer_api_key")
    resp = requests.get(
        BOUNCER_URL,
        params={"email": email},
        headers={"x-api-key": settings.bouncer_api_key},
        timeout=15,
    )
    resp.raise_for_status()
    data = resp.json()
    bouncer_status = data.get("status", "unknown")

    if bouncer_status in VALID_STATUSES:
        status = "verified"
    elif bouncer_status in INVALID_STATUSES:
        status = "invalid"
    else:
        status = "risky"

    return VerificationResult(email=email, status=status, raw=data)
