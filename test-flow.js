
const { crawlSite } = require('./lib/crawler/crawl-site');
const { extractPains } = require('./lib/llm/extract-pains');
const { composeEmail } = require('./lib/llm/compose-email');

async function test() {
  const url = "https://softspheretechnologies.org";
  console.log("Crawling...");
  const pages = await crawlSite(url, 2);
  console.log(`Crawled ${pages.length} pages.`);
  
  try {
    console.log("Extracting pains...");
    const pains = await extractPains(url, pages);
    console.log("Pains:", pains);
    
    console.log("Composing...");
    const email = await composeEmail(url, pains);
    console.log("Email:", email);
  } catch (e) {
    console.error("FAILED:", e);
  }
}

test();
