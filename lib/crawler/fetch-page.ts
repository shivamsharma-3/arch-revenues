import * as cheerio from 'cheerio';
import { convert } from 'html-to-text';

export interface FetchedPage {
  url: string;
  text: string;
  html: string;
}

export function validateUrl(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    const host = url.hostname;
    // Reject local, private, and internal networks
    if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) return false;
    if (host.startsWith('127.') || host.startsWith('10.') || host.startsWith('169.254.') || host.startsWith('192.168.')) return false;
    if (host.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)) return false;
    if (host === '::1') return false;
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Extract rich metadata from HTML even when the body is JS-rendered and mostly empty.
 * Pulls: title, meta description, og:* tags, twitter:* tags, JSON-LD, h1/h2 headings.
 */
function extractMetaContent(html: string, pageUrl: string): string {
  const $ = cheerio.load(html);
  const parts: string[] = [];

  const title = $('title').text().trim();
  if (title) parts.push(`Page title: ${title}`);

  const desc = $('meta[name="description"]').attr('content') ||
               $('meta[property="og:description"]').attr('content') ||
               $('meta[name="twitter:description"]').attr('content');
  if (desc) parts.push(`Meta description: ${desc}`);

  const ogTitle = $('meta[property="og:title"]').attr('content');
  if (ogTitle && ogTitle !== title) parts.push(`OG title: ${ogTitle}`);

  const ogSiteName = $('meta[property="og:site_name"]').attr('content');
  if (ogSiteName) parts.push(`Site name: ${ogSiteName}`);

  // h1/h2 headings — strong signal of what the page is about
  const headings: string[] = [];
  $('h1, h2').each((_, el) => {
    const t = $(el).text().trim();
    if (t && t.length > 3) headings.push(t);
  });
  if (headings.length > 0) parts.push(`Headings: ${headings.slice(0, 10).join(' | ')}`);

  // JSON-LD structured data — very information-dense
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html() || '');
      const str = JSON.stringify(json);
      if (str.length > 20) parts.push(`Structured data: ${str.substring(0, 500)}`);
    } catch {}
  });

  // Visible body text (skip boilerplate elements)
  const bodyText = convert(html, {
    wordwrap: 130,
    selectors: [
      { selector: 'a', options: { ignoreHref: true } },
      { selector: 'img', format: 'skip' },
      { selector: 'nav', format: 'skip' },
      { selector: 'footer', format: 'skip' },
      { selector: 'header', format: 'skip' },
      { selector: 'script', format: 'skip' },
      { selector: 'style', format: 'skip' },
      { selector: 'noscript', format: 'skip' },
    ]
  }).trim();

  if (bodyText.length > 100) {
    parts.push(`Page content:\n${bodyText.substring(0, 6000)}`);
  }

  const combined = parts.join('\n\n');
  return combined.length > 50 ? combined : '';
}

export async function fetchPage(url: string, isHomepage = false): Promise<FetchedPage | null> {
  if (!validateUrl(url)) {
    console.error(`Invalid URL (SSRF prevention): ${url}`);
    return null;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout per page
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) return null;
    
    // Check content type
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('text/html')) return null;

    const html = await response.text();
    
    // Extract rich text including meta tags, headings, JSON-LD — handles JS-heavy sites better
    const text = extractMetaContent(html, response.url);
    const cappedText = text.length > 8000 ? text.substring(0, 8000) + '... [truncated]' : text;

    return {
      url: response.url, // Following redirects
      html,
      text: cappedText
    };
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return null;
  }
}
