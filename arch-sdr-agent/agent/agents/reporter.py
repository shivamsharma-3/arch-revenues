"""
Agent 4: Reporter.
Turns aggregated weekly metrics into a plain-English client report.
This agent returns plain text, not JSON, so it doesn't use
ClaudeJSONAgent — it's simple enough to call the client directly.
"""
import json

import anthropic

from agent.config import settings
from agent.tools.llm import load_prompt


class ReporterAgent:
    def __init__(self):
        settings.require("anthropic_api_key")
        self.client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
        self.system_prompt = load_prompt("reporter_system.txt")
        self.model = settings.model_cheap

    def write_report(self, metrics: dict) -> str:
        response = self.client.messages.create(
            model=self.model,
            max_tokens=800,
            system=self.system_prompt,
            messages=[{"role": "user", "content": json.dumps(metrics, indent=2)}],
        )
        return "".join(
            block.text for block in response.content if getattr(block, "type", None) == "text"
        ).strip()


if __name__ == "__main__":
    sample_metrics = {
        "week_ending": "2026-09-14",
        "sent_this_week": 210,
        "sent_last_week": 195,
        "open_rate_this_week": 0.41,
        "open_rate_last_week": 0.53,
        "reply_rate_this_week": 0.06,
        "meetings_booked_this_week": 3,
        "domain_health": {
            "arch-mail.com": {"open_rate": 0.29},
            "try-arch.com": {"open_rate": 0.55},
            "get-arch.com": {"open_rate": 0.52},
        },
    }
    agent = ReporterAgent()
    print(agent.write_report(sample_metrics))
