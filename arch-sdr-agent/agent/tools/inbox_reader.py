"""
IMAP inbox reader. Polls for unseen messages and hands them to the
Classifier agent. Designed to be called on a timer (see
orchestrator/scheduler.py) rather than run once.
"""
import email
import imaplib
from email.header import decode_header


def _decode(value: str) -> str:
    if not value:
        return ""
    parts = decode_header(value)
    return "".join(
        part.decode(enc or "utf-8") if isinstance(part, bytes) else part
        for part, enc in parts
    )


def _extract_text(msg) -> str:
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain" and not part.get("Content-Disposition"):
                charset = part.get_content_charset() or "utf-8"
                return part.get_payload(decode=True).decode(charset, errors="replace")
        return ""
    charset = msg.get_content_charset() or "utf-8"
    return msg.get_payload(decode=True).decode(charset, errors="replace")


def fetch_unseen(host: str, user: str, password: str) -> list[dict]:
    """Connects, fetches unseen messages, and returns them as plain
    dicts. Does NOT mark them as read via this function's caller
    responsibility — IMAP does that automatically on fetch by default
    in most servers, which is intentional here (avoids reprocessing)."""
    messages = []
    mail = imaplib.IMAP4_SSL(host)
    try:
        mail.login(user, password)
        mail.select("inbox")
        status, data = mail.search(None, "UNSEEN")
        if status != "OK":
            return messages

        for num in data[0].split():
            status, msg_data = mail.fetch(num, "(RFC822)")
            if status != "OK":
                continue
            msg = email.message_from_bytes(msg_data[0][1])
            messages.append({
                "from": _decode(msg.get("From", "")),
                "subject": _decode(msg.get("Subject", "")),
                "date": msg.get("Date", ""),
                "text": _extract_text(msg).strip(),
            })
    finally:
        try:
            mail.logout()
        except Exception:
            pass
    return messages
