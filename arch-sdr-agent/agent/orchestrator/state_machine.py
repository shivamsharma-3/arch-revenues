"""
Prospect lifecycle state machine. This is the orchestrator described
in Part 3 of the blueprint — deliberately a plain state machine, not
a graph framework, because the flow is linear with two branch points
(ICP reject, escalation).

    new -> researched -> written -> approved -> sent -> replied -> booked
                                                            \\-> escalated

Each `advance_*` function does ONE state transition and is safe to
call repeatedly (idempotent) — re-running a step on an already-advanced
prospect is a no-op, which matters because this runs on a schedule and
crashes/restarts should never double-process a prospect.
"""
import logging

from agent.agents.classifier import ClassifierAgent
from agent.agents.researcher import ResearcherAgent
from agent.agents.writer import WriterAgent
from agent.db.models import Email, Prospect, Reply

logger = logging.getLogger("orchestrator.state_machine")

MIN_ICP_FIT_SCORE = 70


def advance_research(db, prospect: Prospect) -> None:
    if prospect.state != "new":
        return
    researcher = ResearcherAgent()
    research = researcher.research(prospect.url, icp_description=prospect.client.icp_description)
    prospect.research_data = research
    prospect.icp_fit_score = research.get("icp_fit_score", 0)

    if prospect.icp_fit_score < MIN_ICP_FIT_SCORE:
        prospect.state = "rejected"
        logger.info("Prospect %s rejected: icp_fit_score=%s", prospect.id, prospect.icp_fit_score)
    else:
        prospect.state = "researched"
    db.add(prospect)


def advance_write(db, prospect: Prospect) -> None:
    if prospect.state != "researched":
        return
    writer = WriterAgent()
    past_winners = [
        e.content for e in prospect.client.prospects
        # simplistic: real version would query Email.got_positive_reply == True
        # across the client's prospects and limit(3); left explicit here so
        # it's obvious where to plug in the real query.
    ][:0]
    sequence = writer.write_sequence(prospect.research_data, prospect.client.to_brief(), past_winners)

    for step, content in sequence.items():
        db.add(Email(prospect_id=prospect.id, sequence_step=step, content=content, status="draft"))

    prospect.state = "written"
    db.add(prospect)


def advance_approve(db, prospect: Prospect, approved: bool, feedback: str | None = None) -> None:
    """Human approval gate — called from the API when a human clicks
    Approve/Reject in the dashboard, not run automatically."""
    if prospect.state != "written":
        return
    if approved:
        for e in prospect.emails:
            if e.status == "draft":
                e.status = "approved"
        prospect.state = "approved"
    else:
        # Reject -> back to researched so the writer can be re-run.
        # `feedback` should be logged/stored wherever the writer prompt
        # sources revision notes from — left as a hook for that wiring.
        for e in prospect.emails:
            db.delete(e)
        prospect.state = "researched"
        logger.info("Prospect %s rejected by human. Feedback: %s", prospect.id, feedback)
    db.add(prospect)


def handle_reply(db, prospect: Prospect, reply_text: str) -> Reply:
    """Called by the reply monitor when a new inbound message matches
    a known prospect. Runs the Classifier and stores the result."""
    classifier = ClassifierAgent()
    result = classifier.classify(reply_text, {
        "company_name": prospect.research_data.get("company_name") if prospect.research_data else None,
        "state": prospect.state,
    })

    reply = Reply(
        prospect_id=prospect.id,
        content=reply_text,
        category=result["category"],
        confidence=result.get("confidence"),
        drafted_response=result.get("drafted_response"),
        escalation_reason=result.get("escalation_reason"),
        needs_human=result.get("needs_human", True),
    )
    db.add(reply)

    if result["category"] == "unsubscribe":
        prospect.suppressed = True
    elif reply.needs_human:
        prospect.state = "escalated"
    else:
        prospect.state = "replied"
    db.add(prospect)

    return reply
