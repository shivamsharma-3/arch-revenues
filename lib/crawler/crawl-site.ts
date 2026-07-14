import { fetchPage, validateUrl, FetchedPage } from './fetch-page';
import { extractInternalLinks } from './extract-links';
import { scoreLinks } from './score-links';

const SITEMAP_CAP = 30;

/**
 * Try to fetch /sitemap.xml and parse <loc> URLs from it.
 * Returns an array of valid URLs (capped at SITEMAP_CAP), or null if sitemap is unavailable.
 */
async function fetchSitemapUrls(origin: string): Promise<string[] | null> {
  const sitemapUrl = `${origin}/sitemap.xml`;
  if (!validateUrl(sitemapUrl)) return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(sitemapUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/xml, text/xml, */*',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') || '';
    // Must be some form of XML
    if (!contentType.includes('xml') && !contentType.includes('text/plain')) return null;

    const xml = await res.text();
    if (!xml.includes('<loc>')) return null;

    // Parse all <loc>...</loc> entries
    const locMatches = [...xml.matchAll(/<loc>\s*(https?:\/\/[^<\s]+)\s*<\/loc>/gi)];
    const urls = locMatches
      .map(m => m[1].trim())
      .filter(u => validateUrl(u))
      .slice(0, SITEMAP_CAP);

    console.log(`Sitemap found at ${sitemapUrl}: ${urls.length} URLs`);
    return urls.length > 0 ? urls : null;
  } catch (e) {
    console.log(`Sitemap not available at ${sitemapUrl}:`, (e as Error).message);
    return null;
  }
}

export async function crawlSite(startUrl: string, maxPages = 12): Promise<FetchedPage[]> {
  const pages: FetchedPage[] = [];

  console.log(`Starting crawl at: ${startUrl}`);
  const homePage = await fetchPage(startUrl, true);

  if (!homePage) {
    throw new Error(`Failed to fetch homepage: ${startUrl}`);
  }

  pages.push(homePage);

  const origin = new URL(homePage.url).origin;

  // --- Sitemap-first strategy ---
  const sitemapUrls = await fetchSitemapUrls(origin);

  let candidateUrls: string[];

  if (sitemapUrls && sitemapUrls.length > 0) {
    // Use sitemap URLs, exclude the homepage itself
    candidateUrls = sitemapUrls.filter(u => {
      try { return new URL(u).pathname !== '/'; } catch { return false; }
    });
    console.log(`Using sitemap strategy: ${candidateUrls.length} candidate URLs`);
  } else {
    // Fallback: extract links from homepage HTML and depth-score them
    const allLinks = extractInternalLinks(homePage.html, homePage.url);
    candidateUrls = scoreLinks(allLinks, homePage.url, maxPages - 1);
    console.log(`Using homepage-extraction fallback: ${candidateUrls.length} candidate URLs`);
  }

  // Cap to maxPages - 1 (homepage already added)
  const topLinks = candidateUrls.slice(0, maxPages - 1);
  console.log(`Selected ${topLinks.length} additional pages to crawl.`);

  const fetchPromises = topLinks.map(link => fetchPage(link));
  const results = await Promise.allSettled(fetchPromises);

  results.forEach(result => {
    if (result.status === 'fulfilled' && result.value) {
      pages.push(result.value);
    }
  });

  return pages;
}
