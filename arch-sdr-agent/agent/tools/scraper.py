"""
Website scraper. Uses plain requests + BeautifulSoup, which is enough
for most marketing sites. Swap in Firecrawl or Playwright later for
JS-heavy sites without changing the agent code — scrape_website() is
the only function the rest of the app calls.
"""
import requests
from bs4 import BeautifulSoup

USER_AGENT = "Mozilla/5.0 (compatible; ArchSDRAgent/1.0; +https://archrevenues.com)"
TIMEOUT_SECONDS = 15
MAX_CHARS = 8000  # keep the scraped text small enough to be cheap to send to Claude


class ScrapeError(RuntimeError):
    pass


def scrape_website(url: str) -> dict:
    """Fetch a URL and return cleaned, size-capped text plus basic metadata.

    Returns:
        {"url": str, "title": str, "text": str}
    Raises:
        ScrapeError if the page can't be fetched or parsed.
    """
    try:
        resp = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=TIMEOUT_SECONDS)
        resp.raise_for_status()
    except requests.RequestException as e:
        raise ScrapeError(f"Failed to fetch {url}: {e}") from e

    soup = BeautifulSoup(resp.text, "html.parser")

    for tag in soup(["script", "style", "noscript", "svg"]):
        tag.decompose()

    title = soup.title.string.strip() if soup.title and soup.title.string else ""

    text = soup.get_text(separator="\n")
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    cleaned = "\n".join(lines)[:MAX_CHARS]

    if not cleaned:
        raise ScrapeError(f"No readable text found on {url}")

    return {"url": url, "title": title, "text": cleaned}
