"""
View replies that need human attention (escalations), and approve
the agent's drafted responses for the ones that don't.
"""
import uuid

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from agent.db.models import Reply
from agent.db.session import get_session

router = APIRouter()


@router.get("/escalated")
def list_escalated():
    with get_session() as db:
        rows = db.query(Reply).filter(Reply.needs_human == True, Reply.human_response_sent == False).all()  # noqa: E712
        return [
            {
                "id": str(r.id),
                "prospect_id": str(r.prospect_id),
                "category": r.category,
                "content": r.content,
                "escalation_reason": r.escalation_reason,
            }
            for r in rows
        ]


class SendDraftedResponseRequest(BaseModel):
    edited_response: str | None = None  # human can edit before sending


@router.post("/{reply_id}/send-drafted")
def send_drafted_response(reply_id: str, req: SendDraftedResponseRequest):
    """Human clicks 'approve' on an agent-drafted response (positive_meeting
    / positive_more_info / neutral_not_now categories). Actual send wiring
    to BrevoSender is intentionally left as a one-line call here — plug in
    once you decide whether replies go via SMTP reply-to or a separate
    thread API."""
    with get_session() as db:
        reply = db.get(Reply, uuid.UUID(reply_id))
        if not reply:
            raise HTTPException(status_code=404, detail="Reply not found")
        final_text = req.edited_response or reply.drafted_response
        if not final_text:
            raise HTTPException(status_code=400, detail="No drafted response to send")
        # TODO: call BrevoSender / SMTP reply here with final_text
        reply.human_response_sent = True
        db.add(reply)
        return {"id": str(reply.id), "sent": True}
