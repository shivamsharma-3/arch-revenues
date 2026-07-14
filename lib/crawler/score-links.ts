export function scoreLinks(links: string[], baseUrl: string, limit = 12): string[] {
  const scoredLinks = links.map(link => {
    let score = 0;
    
    // Depth penalty only (prefer shallower pages)
    const depth = link.split('/').length - 3; // subtracting protocol & hostname
    score -= depth * 5;
    
    // Ensure homepage isn't rescored too high if passed again
    if (link === baseUrl || link === baseUrl + '/') score = -1000;

    return { url: link, score };
  });

  scoredLinks.sort((a, b) => b.score - a.score);
  return scoredLinks.slice(0, limit).map(l => l.url);
}
