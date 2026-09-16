"""
Proves the Researcher -> Writer -> Classifier -> Reporter pipeline
actually works end to end WITHOUT hitting the real network or a real
Anthropic key. It mocks:
  - requests.get (scraper) to return canned HTML
  - anthropic.Anthropic().messages.create to return canned JSON that
    matches exactly what the real model is instructed to produce

This is what to run in any environment (like this sandbox) where you
can't reach the live APIs, to check the code paths, JSON parsing,
guardrails, and error handling are all correct. Once you have a real
ANTHROPIC_API_KEY, demo_cli.py is the live version of the same flow.
"""
import json
import os
import sys
import types
from unittest.mock import MagicMock, patch

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ["ANTHROPIC_API_KEY"] = "sk-ant-fake-for-tests"
os.environ["GROQ_API_KEY"] = ""

FAKE_HTML = """
<html><head><title>Acme Roofing Co</title></head>
<body>
<h1>Acme Roofing Co</h1>
<p>We've been installing roofs in Austin, TX since 2010.</p>
<p>Acme just raised a $2M expansion round in August 2026 and is
hiring 5 new crew leads.</p>
<p>Contact: Jane Diaz, Owner - jane@acmeroofing.com</p>
</body></html>
"""

FAKE_RESEARCH_JSON = {
    "company_name": "Acme Roofing Co",
    "decision_maker": {"name": "Jane Diaz", "title": "Owner", "linkedin": None},
    "company_size": "11-50",
    "services": ["Roofing installation", "Roof repair"],
    "recent_news": ["Raised a $2M expansion round in August 2026"],
    "tech_stack": [],
    "personalization_hooks": [
        {"type": "funding", "detail": "Raised a $2M expansion round in August 2026"},
        {"type": "hire", "detail": "Hiring 5 new crew leads"},
    ],
    "icp_fit_score": 82,
    "icp_fit_reason": "Founder-led home services business in expansion mode.",
}

FAKE_WRITER_JSON = {
    "email_1": "Jane - saw Acme just closed a $2M round and is staffing up crew leads fast. Most roofers scale outbound leads slower than crew hiring, which stalls the new revenue. Worth a quick reply if that's biting right now?",
    "linkedin_note": "Hi Jane - congrats on the raise, impressive timing on the crew leads hiring too.",
    "followup_day3": "Jane - following up in case this got buried. Happy to send a 2-min example if useful.",
    "followup_day7": "Different angle: most of our roofing clients see lead-flow bottlenecks right after a hiring push, not before. Sound familiar?",
    "followup_day14": "Last note from me - if outbound isn't a priority right now, no worries, I'll check back next quarter.",
}

FAKE_CLASSIFIER_JSON = {
    "category": "objection_pricing",
    "confidence": 91,
    "drafted_response": "Sure, happy to walk through pricing on a quick call.",
    "escalation_reason": None,
}


def _fake_anthropic_text_block(text: str):
    block = types.SimpleNamespace()
    block.type = "text"
    block.text = text
    return block


def _make_fake_response(payload: dict) -> MagicMock:
    resp = MagicMock()
    resp.content = [_fake_anthropic_text_block(json.dumps(payload))]
    return resp


def test_researcher_writer_pipeline():
    with patch("agent.tools.scraper.requests.get") as mock_get, \
         patch("agent.tools.llm.anthropic.Anthropic") as mock_anthropic_cls:

        # --- mock the scrape ---
        mock_resp = MagicMock()
        mock_resp.text = FAKE_HTML
        mock_resp.raise_for_status = MagicMock()
        mock_get.return_value = mock_resp

        # --- mock the Claude client ---
        mock_client = MagicMock()
        mock_anthropic_cls.return_value = mock_client
        # First call (researcher) returns research JSON, second call
        # (writer) returns writer JSON.
        mock_client.messages.create.side_effect = [
            _make_fake_response(FAKE_RESEARCH_JSON),
            _make_fake_response(FAKE_WRITER_JSON),
        ]

        from agent.agents.researcher import ResearcherAgent
        from agent.agents.writer import WriterAgent

        researcher = ResearcherAgent()
        research = researcher.research("https://acmeroofing.com", icp_description="Home services, founder-led")

        assert research["company_name"] == "Acme Roofing Co"
        assert research["icp_fit_score"] == 82
        assert research["source_url"] == "https://acmeroofing.com"
        print("Researcher OK:", json.dumps(research, indent=2))

        writer = WriterAgent()
        client_brief = {
            "value_prop": "AI SDR agents for agencies",
            "voice_description": "Confident, concise",
            "offer": "Free strategy call",
            "icp_description": "Home services, founder-led",
            "signature": "Shivam",
        }
        sequence = writer.write_sequence(research, client_brief)

        for key in ["email_1", "linkedin_note", "followup_day3", "followup_day7", "followup_day14"]:
            assert key in sequence and sequence[key]
        print("\nWriter OK:", json.dumps(sequence, indent=2))


def test_classifier_escalation_guardrail():
    """Even if the model forgets to null the drafted_response for an
    objection category, the code-level guardrail must force it to
    escalate with no auto-reply."""
    with patch("agent.tools.llm.anthropic.Anthropic") as mock_anthropic_cls:
        mock_client = MagicMock()
        mock_anthropic_cls.return_value = mock_client
        mock_client.messages.create.return_value = _make_fake_response(FAKE_CLASSIFIER_JSON)

        from agent.agents.classifier import ClassifierAgent

        classifier = ClassifierAgent()
        result = classifier.classify("What does this cost?", {"company_name": "Acme Roofing Co"})

        assert result["category"] == "objection_pricing"
        assert result["needs_human"] is True
        assert result["drafted_response"] is None, "Guardrail failed: objection categories must never auto-send"
        print("\nClassifier guardrail OK:", json.dumps(result, indent=2))


def test_scraper_failure_fails_closed():
    """If the site can't be scraped, research() must return a clearly
    marked failure, never fabricated data, and the Writer must never
    be called on it."""
    with patch("agent.tools.scraper.requests.get") as mock_get, \
         patch("agent.tools.llm.anthropic.Anthropic") as mock_anthropic_cls:
        import requests
        mock_get.side_effect = requests.exceptions.ConnectionError("DNS failure")
        mock_anthropic_cls.return_value = MagicMock()

        from agent.agents.researcher import ResearcherAgent

        researcher = ResearcherAgent()
        research = researcher.research("https://doesnotexist.invalid")

        assert research["icp_fit_score"] == 0
        assert research["icp_fit_reason"].startswith("research_failed")
        assert research["company_name"] is None
        print("\nFail-closed OK:", json.dumps(research, indent=2))


if __name__ == "__main__":
    test_researcher_writer_pipeline()
    test_classifier_escalation_guardrail()
    test_scraper_failure_fails_closed()
    print("\nAll offline pipeline tests passed.")
