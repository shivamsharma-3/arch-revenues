# ARCH Revenues Lead Magnet (Email Generator) Architecture

## Overview
A progressive, AI-powered cold email generator that crawls a prospect's website, identifies their specific pain points, and drafts a personalized outbound email.

## Progressive Gating Strategy
1. **1st Generation (Free):** User inputs URL -> Crawls site -> Generates email -> Shows blurred preview -> User enters email to unlock full text (on-site).
2. **2nd+ Generation (Inbox Delivery):** User inputs URL -> Crawls site -> Generates email -> Delivers email directly to their inbox with a soft CTA to book a call (not shown on-site).
3. **Limit Reached:** "Want more? Book a call."

## Crawler Design (The "Budget" Approach)
Instead of crawling the entire site, we use a budgeted exploration:
1. **Discovery:** Fetch homepage, extract internal links.
2. **Scoring:** Score links based on depth and keywords (e.g., "about", "pricing", "blog", "case-studies").
3. **Selection:** Pick the top 10 most relevant pages.
4. **Crawl:** Fetch these pages in parallel, strip HTML, and cap text length to prevent context explosion.

## LLM Strategy
We split the LLM tasks to improve quality:
1. **Pain Extraction:** Reads the crawled text and identifies the 3 most specific pain points with evidence.
2. **Email Composition:** Takes the top pain point and writes a highly personalized, 5-7 sentence cold email opening.

## Stack
- **Framework:** Next.js (App Router)
- **Crawler:** `cheerio` (HTML parsing) + `html-to-text` (content extraction)
- **AI:** Gemini API (replacing Groq for seamless AI Studio integration)
- **Database/Rate Limiting:** Vercel KV + FingerprintJS
- **Email Delivery:** Resend
