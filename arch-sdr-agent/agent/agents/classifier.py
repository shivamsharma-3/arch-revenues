"""
Agent 3: Reply Classifier.
Reads an inbound reply and either drafts a response or flags it for
human escalation. Objection/ambiguous categories ALWAYS escalate —
this is enforced here in code, not just in the prompt, so a prompt
regression can't silently start auto-replying to pricing objections.
"""
import json

from agent.config import settings
from agent.tools.llm import ClaudeJSONAgent

ALWAYS_ESCALATE = {"objection_pricing", "objection_scope", "ambiguous"}
AUTO_SUPPRESS_NO_REPLY = {"unsubscribe", "negative_not_interested"}


class ClassifierAgent(ClaudeJSONAgent):
    def __init__(self):
        super().__init__(
            system_prompt_file="classifier_system.txt",
            model=settings.model_cheap,
            max_tokens=600,
        )

    def classify(self, reply_text: str, prospect_context: dict) -> dict:
        user_content = f"""<reply>
{reply_text}
</reply>

<prospect_context>
{json.dumps(prospect_context, indent=2)}
</prospect_context>"""

        result = self.run(user_content)

        # Hard guardrail: never trust the model's own escalation judgment
        # over the fixed category list. If it forgot to null the response
        # for a category that must escalate, we fix it here.
        category = result.get("category")
        if category in ALWAYS_ESCALATE:
            result["drafted_response"] = None
            result["needs_human"] = True
        elif category in AUTO_SUPPRESS_NO_REPLY:
            result["drafted_response"] = None
            result["needs_human"] = False
        else:
            result["needs_human"] = category not in {
                "positive_meeting", "positive_more_info", "neutral_not_now", "out_of_office"
            }

        return result


if __name__ == "__main__":
    import sys

    reply = sys.argv[1] if len(sys.argv) > 1 else "Thanks, what's your pricing look like?"
    agent = ClassifierAgent()
    print(json.dumps(agent.classify(reply, {"company_name": "Acme Co"}), indent=2))
