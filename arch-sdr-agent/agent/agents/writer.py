"""
Agent 2: Writer.
Takes research data + a client brief and generates the 5-piece
outreach sequence (cold email, LinkedIn note, 3 follow-ups).
"""
import json

from agent.config import settings
from agent.tools.llm import ClaudeJSONAgent

REQUIRED_KEYS = ["email_1", "linkedin_note", "followup_day3", "followup_day7", "followup_day14"]


class WriterAgent(ClaudeJSONAgent):
    def __init__(self):
        super().__init__(
            system_prompt_file="writer_system.txt",
            model=settings.model_writer,
            max_tokens=1500,
        )

    def write_sequence(self, research: dict, client_brief: dict, past_winners: list[str] | None = None) -> dict:
        user_content = f"""<prospect_research>
{json.dumps(research, indent=2)}
</prospect_research>

<client_brief>
{json.dumps(client_brief, indent=2)}
</client_brief>

<past_winning_emails>
{json.dumps(past_winners or [], indent=2)}
</past_winning_emails>

Write the 5-piece sequence. Return JSON only."""

        result = self.run(user_content)
        missing = [k for k in REQUIRED_KEYS if k not in result]
        if missing:
            raise ValueError(f"Writer output missing keys: {missing}. Got: {result}")
        return result


if __name__ == "__main__":
    from agent.agents.researcher import ResearcherAgent
    import sys

    url = sys.argv[1] if len(sys.argv) > 1 else "https://example.com"
    value_prop = sys.argv[2] if len(sys.argv) > 2 else "We build AI SDR agents for agencies"

    researcher = ResearcherAgent()
    research = researcher.research(url)

    writer = WriterAgent()
    fake_client_brief = {
        "value_prop": value_prop,
        "voice_description": "Confident, concise, founder-to-founder",
        "offer": "Free 30-min strategy call",
        "icp_description": "Founder-led agencies, $500K-$5M revenue",
        "signature": "Shivam\nARCH Revenues",
    }
    sequence = writer.write_sequence(research, fake_client_brief)
    print(json.dumps({"research": research, "sequence": sequence}, indent=2))
