"""
Prospect management: add prospects, view drafts, approve/reject the
first-batch human gate (Iron Rule #6 from the blueprint).
"""
import uuid

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from agent.db.models import Client, Prospect
from agent.db.session import get_session
from agent.orchestrator.state_machine import advance_approve, advance_research, advance_write

router = APIRouter()


class CreateProspectRequest(BaseModel):
    client_id: str
    url: str
    email: str | None = None


class ApprovalRequest(BaseModel):
    approved: bool
    feedback: str | None = None


@router.post("")
def create_prospect(req: CreateProspectRequest):
    with get_session() as db:
        client = db.get(Client, uuid.UUID(req.client_id))
        if not client:
            raise HTTPException(status_code=404, detail="Client not found")
        prospect = Prospect(client_id=client.id, url=req.url, email=req.email, state="new")
        db.add(prospect)
        db.flush()
        return {"id": str(prospect.id), "state": prospect.state}


@router.post("/{prospect_id}/research")
def run_research(prospect_id: str):
    with get_session() as db:
        prospect = db.get(Prospect, uuid.UUID(prospect_id))
        if not prospect:
            raise HTTPException(status_code=404, detail="Prospect not found")
        advance_research(db, prospect)
        return {"id": str(prospect.id), "state": prospect.state, "icp_fit_score": prospect.icp_fit_score}


@router.post("/{prospect_id}/write")
def run_write(prospect_id: str):
    with get_session() as db:
        prospect = db.get(Prospect, uuid.UUID(prospect_id))
        if not prospect:
            raise HTTPException(status_code=404, detail="Prospect not found")
        advance_write(db, prospect)
        return {"id": str(prospect.id), "state": prospect.state}


@router.get("/{prospect_id}/drafts")
def get_drafts(prospect_id: str):
    with get_session() as db:
        prospect = db.get(Prospect, uuid.UUID(prospect_id))
        if not prospect:
            raise HTTPException(status_code=404, detail="Prospect not found")
        return {
            "id": str(prospect.id),
            "state": prospect.state,
            "drafts": [
                {"step": e.sequence_step, "content": e.content, "status": e.status}
                for e in prospect.emails
            ],
        }


@router.post("/{prospect_id}/approve")
def approve_prospect(prospect_id: str, req: ApprovalRequest):
    with get_session() as db:
        prospect = db.get(Prospect, uuid.UUID(prospect_id))
        if not prospect:
            raise HTTPException(status_code=404, detail="Prospect not found")
        advance_approve(db, prospect, approved=req.approved, feedback=req.feedback)
        return {"id": str(prospect.id), "state": prospect.state}
