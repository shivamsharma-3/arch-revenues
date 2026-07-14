import { fetchPage, FetchedPage } from './fetch-page';
import { extractInternalLinks } from './extract-links';
import { scoreLinks } from './score-links';

export async function crawlSite(startUrl: string, maxPages = 12): Promise<FetchedPage[]> {
  const pages: FetchedPage[] = [];
  
  console.log(`Starting crawl at: ${startUrl}`);
  const homePage = await fetchPage(startUrl, true);
  
  if (!homePage) {
    throw new Error(`Failed to fetch homepage: ${startUrl}`);
  }
  
  pages.push(homePage);
  
  const allLinks = extractInternalLinks(homePage.html, homePage.url); // Use redirected URL
  const topLinks = scoreLinks(allLinks, homePage.url, maxPages - 1);
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
