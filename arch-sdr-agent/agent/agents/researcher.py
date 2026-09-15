"""
Agent 1: Researcher.
Takes a prospect URL, scrapes it, and asks Claude to turn the raw
text into structured research data the Writer agent can use.
"""
import json

from agent.config import settings
from agent.tools.llm import ClaudeJSONAgent
from agent.tools.scraper import scrape_website, ScrapeError


class ResearcherAgent(ClaudeJSONAgent):
    def __init__(self):
        super().__init__(
            system_prompt_file="researcher_system.txt",
            model=settings.model_cheap,
            max_tokens=1200,
        )

    def research(self, url: str, icp_description: str = "") -> dict:
        """Scrape the URL and extract structured research data.

        Returns a dict matching the researcher_system.txt schema, plus
        the raw scraped url/title for traceability.
        """
        try:
            page = scrape_website(url)
        except ScrapeError as e:
            # Fail closed: no research data means the Writer agent
            # should not run for this prospect. Return a clearly
            # marked failure instead of pretending we know something.
            return {
                "company_name": None,
                "decision_maker": {"name": None, "title": None, "linkedin": None},
                "company_size": None,
                "services": [],
                "recent_news": [],
                "tech_stack": [],
                "personalization_hooks": [],
                "icp_fit_score": 0,
                "icp_fit_reason": f"research_failed: {e}",
                "source_url": url,
            }

        user_content = f"""<icp_description>
{icp_description or "No specific ICP provided — score generously based on general B2B fit."}
</icp_description>

<scraped_page title="{page['title']}" url="{page['url']}">
{page['text']}
</scraped_page>

Extract the research data as instructed."""

        result = self.run(user_content)
        result["source_url"] = url
        return result


if __name__ == "__main__":
    import sys

    url = sys.argv[1] if len(sys.argv) > 1 else "https://example.com"
    agent = ResearcherAgent()
    print(json.dumps(agent.research(url), indent=2))
