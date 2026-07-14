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
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) return null;
    
    // Check content type
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('text/html')) return null;

    const html = await response.text();
    
    // Extract readable text from HTML
    const text = convert(html, {
      wordwrap: 130,
      selectors: [
        { selector: 'a', options: { ignoreHref: true } },
        { selector: 'img', format: 'skip' },
        { selector: 'nav', format: 'skip' },
        { selector: 'footer', format: 'skip' }
      ]
    });

    const cappedText = text.length > 8000 ? text.substring(0, 8000) + "... [truncated]" : text;

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
