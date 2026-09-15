"""
Inbound webhooks. Calendly confirms meetings; Brevo can push bounce/
complaint events which should feed the suppression list.
"""
import hashlib
import hmac

from fastapi import APIRouter, Header, HTTPException, Request

from agent.config import settings
from agent.db.models import Meeting, Prospect, SuppressionEntry
from agent.db.session import get_session

router = APIRouter()


def _verify_calendly_signature(payload: bytes, signature: str | None) -> bool:
    if not settings.calendly_api_key or not signature:
        return False
    expected = hmac.new(settings.calendly_api_key.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)


@router.post("/calendly")
async def calendly_webhook(request: Request, calendly_webhook_signature: str = Header(default=None)):
    payload = await request.body()
    if not _verify_calendly_signature(payload, calendly_webhook_signature):
        raise HTTPException(status_code=401, detail="Invalid signature")

    body = await request.json()
    if body.get("event") != "invitee.created":
        return {"ignored": True}

    invitee_email = body["payload"]["email"]

    with get_session() as db:
        prospect = db.query(Prospect).filter(Prospect.email == invitee_email).first()
        if not prospect:
            return {"matched": False}

        db.add(Meeting(
            prospect_id=prospect.id,
            calendly_event_id=body["payload"].get("event"),
            scheduled_at=body["payload"].get("event_start_time"),
            pre_meeting_brief=None,  # generate via ResearcherAgent output already on prospect.research_data
        ))
        prospect.state = "booked"
        db.add(prospect)

    return {"matched": True}


@router.post("/brevo")
async def brevo_webhook(request: Request):
    body = await request.json()
    event = body.get("event")
    email = body.get("email")

    if event in {"hardBounce", "spam", "unsubscribe"} and email:
        with get_session() as db:
            db.merge(SuppressionEntry(email=email, reason=event))

    return {"received": True}
