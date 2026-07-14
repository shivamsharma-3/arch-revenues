import * as cheerio from 'cheerio';

export function extractInternalLinks(html: string, baseUrl: string): string[] {
  const $ = cheerio.load(html);
  const links = new Set<string>();
  
  let base: URL;
  try {
    base = new URL(baseUrl);
  } catch (e) {
    return [];
  }

  $('a').each((_, el) => {
    let href = $(el).attr('href');
    if (!href) return;
    
    href = href.trim();
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    
    try {
      const url = new URL(href, base.href);
      if (url.hostname === base.hostname) {
        url.hash = '';
        // Normalize trailing slashes
        let cleanHref = url.href;
        if (cleanHref.endsWith('/') && cleanHref.length > base.origin.length + 1) {
          cleanHref = cleanHref.slice(0, -1);
        }
        links.add(cleanHref);
      }
    } catch (e) {}
  });

  return Array.from(links);
}
