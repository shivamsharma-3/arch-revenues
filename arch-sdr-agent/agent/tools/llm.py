"""
LLM wrapper supporting Anthropic and Groq.
- Set GROQ_API_KEY to use Groq (llama models) — good for testing.
- Set ANTHROPIC_API_KEY to use Claude — production.
Groq takes priority if both are set, so you can test for free
and switch to Anthropic by removing GROQ_API_KEY.
"""
import json
import re
from pathlib import Path

try:
    import anthropic
except ImportError:
    anthropic = None

from agent.config import settings

PROMPTS_DIR = Path(__file__).resolve().parent.parent / "prompts"

# Groq model equivalents for each Claude model
GROQ_MODEL_MAP = {
    "claude-haiku-4-5": "openai/gpt-oss-20b",
    "claude-sonnet-4-5": "openai/gpt-oss-120b",
    "claude-sonnet-5": "openai/gpt-oss-120b",
    "claude-opus-5": "openai/gpt-oss-120b",
}


class LLMError(RuntimeError):
    pass


def load_prompt(name: str) -> str:
    path = PROMPTS_DIR / name
    return path.read_text()


def _extract_json(text: str) -> dict:
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(json)?", "", text).strip()
        text = re.sub(r"```$", "", text).strip()
    return json.loads(text)


def _use_groq() -> bool:
    return bool(settings.groq_api_key)


def _call_groq(system_prompt: str, user_content: str, model: str, max_tokens: int) -> str:
    from groq import Groq
    groq_model = settings.groq_model or GROQ_MODEL_MAP.get(model, "openai/gpt-oss-120b")
    client = Groq(api_key=settings.groq_api_key)
    response = client.chat.completions.create(
        model=groq_model,
        max_tokens=max_tokens,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content},
        ],
    )
    return response.choices[0].message.content


def _call_anthropic(system_prompt: str, user_content: str, model: str, max_tokens: int) -> str:
    import anthropic
    client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        system=system_prompt,
        messages=[{"role": "user", "content": user_content}],
    )
    return "".join(
        block.text for block in response.content if getattr(block, "type", None) == "text"
    )


class ClaudeJSONAgent:
    def __init__(self, system_prompt_file: str, model: str, max_tokens: int = 2000):
        if not _use_groq():
            settings.require("anthropic_api_key")
        self.system_prompt = load_prompt(system_prompt_file)
        self.model = model
        self.max_tokens = max_tokens
        provider = "Groq" if _use_groq() else "Anthropic"
        print(f"[LLM] Using {provider} for {system_prompt_file}")

    def _call(self, user_content: str) -> str:
        if _use_groq():
            return _call_groq(self.system_prompt, user_content, self.model, self.max_tokens)
        return _call_anthropic(self.system_prompt, user_content, self.model, self.max_tokens)

    def run(self, user_content: str, retry_on_bad_json: bool = True) -> dict:
        raw_text = self._call(user_content)
        try:
            return _extract_json(raw_text)
        except (json.JSONDecodeError, ValueError) as e:
            if not retry_on_bad_json:
                raise LLMError(f"Could not parse JSON: {raw_text[:500]}") from e
            retry_content = user_content + "\n\n[IMPORTANT: Return ONLY valid JSON, no commentary, no markdown fences.]"
            raw_text2 = self._call(retry_content)
            try:
                return _extract_json(raw_text2)
            except (json.JSONDecodeError, ValueError) as e2:
                raise LLMError(f"Could not parse JSON after retry: {raw_text2[:500]}") from e2
