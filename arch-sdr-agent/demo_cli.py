#!/usr/bin/env python3
"""
The fastest way to see the agent actually work.

Usage:
    export ANTHROPIC_API_KEY=sk-ant-...
    python demo_cli.py https://someprospect.com "We build AI SDR agents for agencies"

This runs the real Researcher -> Writer pipeline end to end:
  1. Scrapes the URL for real (requests + BeautifulSoup)
  2. Sends the scraped text to Claude Haiku to extract research data
  3. Sends the research data to Claude Sonnet to write the 5-piece
     outreach sequence
  4. Prints everything, and saves a JSON copy to ./demo_output.json

No database, no email sending, no external services besides Anthropic
and the target website. This is the "working demo" tier of the build.
"""
import json
import sys

from agent.agents.researcher import ResearcherAgent
from agent.agents.writer import WriterAgent
from agent.config import settings
from agent.tools.llm import LLMError


def main():
    if sys.stdout and hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    if len(sys.argv) < 2:
        print("Usage: python demo_cli.py <prospect_url> [value_prop]")
        sys.exit(1)

    url = sys.argv[1]
    value_prop = sys.argv[2] if len(sys.argv) > 2 else "We build AI SDR agents for agencies"

    if not settings.anthropic_api_key and not settings.groq_api_key:
        print("ERROR: No API key set. Run one of:\n  export ANTHROPIC_API_KEY=sk-ant-...\n  export GROQ_API_KEY=gsk_...")
        sys.exit(1)

    print(f"\n1/2  Researching {url} ...")
    researcher = ResearcherAgent()
    research = researcher.research(url, icp_description="Founder-led agencies, $500K-$5M revenue")

    if research.get("icp_fit_reason", "").startswith("research_failed"):
        print(f"Research failed: {research['icp_fit_reason']}")
        sys.exit(1)

    print(json.dumps(research, indent=2))

    print("\n2/2  Writing outreach sequence ...")
    writer = WriterAgent()
    client_brief = {
        "value_prop": value_prop,
        "voice_description": "Confident, concise, founder-to-founder",
        "offer": "Free 30-min strategy call",
        "icp_description": "Founder-led agencies, $500K-$5M revenue",
        "signature": "Shivam\nARCH Revenues",
    }

    try:
        sequence = writer.write_sequence(research, client_brief)
    except (LLMError, ValueError) as e:
        print(f"Writer failed: {e}")
        sys.exit(1)

    print("\n--- COLD EMAIL ---")
    print(sequence["email_1"])
    print("\n--- LINKEDIN NOTE ---")
    print(sequence["linkedin_note"])
    print("\n--- FOLLOW-UP (Day 3) ---")
    print(sequence["followup_day3"])
    print("\n--- FOLLOW-UP (Day 7) ---")
    print(sequence["followup_day7"])
    print("\n--- FOLLOW-UP (Day 14) ---")
    print(sequence["followup_day14"])

    with open("demo_output.json", "w", encoding="utf-8") as f:
        json.dump({"research": research, "sequence": sequence}, f, indent=2)
    print("\nSaved full output to demo_output.json")


if __name__ == "__main__":
    main()
