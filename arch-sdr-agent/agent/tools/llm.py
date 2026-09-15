"""
Thin wrapper around the Anthropic client so every agent parses JSON
responses the same way and retries once on malformed output instead
of crashing the whole pipeline over one bad generation.
"""
import json
import re
from pathlib import Path

import anthropic

from agent.config import settings

PROMPTS_DIR = Path(__file__).resolve().parent.parent / "prompts"


class LLMError(RuntimeError):
    pass


def load_prompt(name: str) -> str:
    path = PROMPTS_DIR / name
    return path.read_text()


def _extract_json(text: str) -> dict:
    """Claude is instructed to return raw JSON, but strip markdown
    fences defensively in case a model wraps it anyway."""
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(json)?", "", text).strip()
        text = re.sub(r"```$", "", text).strip()
    return json.loads(text)


class ClaudeJSONAgent:
    """Base class for agents that send a system prompt + user content
    and expect a single JSON object back."""

    def __init__(self, system_prompt_file: str, model: str, max_tokens: int = 2000):
        settings.require("anthropic_api_key")
        self.client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
        self.system_prompt = load_prompt(system_prompt_file)
        self.model = model
        self.max_tokens = max_tokens

    def run(self, user_content: str, retry_on_bad_json: bool = True) -> dict:
        response = self.client.messages.create(
            model=self.model,
            max_tokens=self.max_tokens,
            system=self.system_prompt,
            messages=[{"role": "user", "content": user_content}],
        )
        raw_text = "".join(
            block.text for block in response.content if getattr(block, "type", None) == "text"
        )
        try:
            return _extract_json(raw_text)
        except (json.JSONDecodeError, ValueError) as e:
            if not retry_on_bad_json:
                raise LLMError(f"Could not parse JSON from model output: {raw_text[:500]}") from e
            # One retry, explicitly telling it to fix the formatting.
            fixed = self.client.messages.create(
                model=self.model,
                max_tokens=self.max_tokens,
                system=self.system_prompt,
                messages=[
                    {"role": "user", "content": user_content},
                    {"role": "assistant", "content": raw_text},
                    {"role": "user", "content": "That was not valid JSON. Return ONLY the JSON object, nothing else."},
                ],
            )
            fixed_text = "".join(
                block.text for block in fixed.content if getattr(block, "type", None) == "text"
            )
            try:
                return _extract_json(fixed_text)
            except (json.JSONDecodeError, ValueError) as e2:
                raise LLMError(f"Could not parse JSON after retry: {fixed_text[:500]}") from e2
