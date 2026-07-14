import { NextResponse } from 'next/server';
import { crawlSite } from '@/lib/crawler/crawl-site';
import { extractPains } from '@/lib/llm/extract-pains';
import { composeEmail } from '@/lib/llm/compose-email';
import { getRateLimit, incrementRateLimit } from '@/lib/rate-limit/kv-store';
import { sendLeadEmail } from '@/lib/email/resend';
import { validateUrl } from '@/lib/crawler/fetch-page';

export const maxDuration = 60; // Max allowed duration on Hobby

export async function POST(req: Request) {
  try {
    const { url, fingerprint, email } = await req.json();

    if (!url || !fingerprint) {
      return NextResponse.json({ error: 'URL and fingerprint required' }, { status: 400 });
    }

    if (!validateUrl(url)) {
      return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
    }

    // Check rate limit upfront (max 5 free generations per fingerprint)
    const rateLimit = await getRateLimit(fingerprint);
    if (rateLimit.count >= 5) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Crawl site
    const pages = await crawlSite(url, 12);
    if (!pages || pages.length === 0) {
      return NextResponse.json({ error: 'Could not fetch website content' }, { status: 400 });
    }

    // Extract pains
    const painPoints = await extractPains(url, pages);
    
    // Compose email
    const generatedContent = await composeEmail(url, painPoints);
    
    // Increment rate limit usage ONLY after successful generation
    const rateData = await incrementRateLimit(fingerprint);
    
    // If email is provided (2nd generation+), send it via Resend
    if (email) {
      await sendLeadEmail(email, url, generatedContent);
    }

    return NextResponse.json({ 
      email: generatedContent, 
      painPoints,
      usageCount: rateData.count
    });

  } catch (error: any) {
    console.error('Email generation failed:', error);
    const isDev = process.env.NODE_ENV === 'development';
    const message = isDev
      ? `Failed to generate email: ${error?.message || String(error)}`
      : 'Failed to generate email';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
