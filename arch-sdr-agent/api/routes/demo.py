"""
Public demo endpoint — this is what your Next.js /agent-demo page
calls. No database involved on purpose: it's meant to be a
stand-alone, zero-setup-cost proof of the agent for prospects/site
visitors to try.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from agent.agents.researcher import ResearcherAgent
from agent.agents.writer import WriterAgent
from agent.tools.llm import LLMError
from agent.tools.scraper import ScrapeError

router = APIRouter()


class DemoRequest(BaseModel):
    prospect_url: str
    value_prop: str


@router.post("/generate")
async def generate_demo(req: DemoRequest):
    researcher = ResearcherAgent()
    research = researcher.research(req.prospect_url)

    if research.get("icp_fit_reason", "").startswith("research_failed"):
        raise HTTPException(status_code=422, detail=research["icp_fit_reason"])

    writer = WriterAgent()
    fake_client_brief = {
        "value_prop": req.value_prop,
        "voice_description": "Confident, concise, founder-to-founder",
        "offer": "Free 30-min strategy call",
        "icp_description": "Founder-led agencies, $500K-$5M revenue",
        "signature": "Shivam\nARCH Revenues",
    }

    try:
        sequence = writer.write_sequence(research, fake_client_brief)
    except (LLMError, ValueError) as e:
        raise HTTPException(status_code=502, detail=f"Writer agent failed: {e}")

    return {
        "research": research,
        "email_1": sequence["email_1"],
        "linkedin_note": sequence["linkedin_note"],
        "followups": [
            sequence["followup_day3"],
            sequence["followup_day7"],
            sequence["followup_day14"],
        ],
    }
