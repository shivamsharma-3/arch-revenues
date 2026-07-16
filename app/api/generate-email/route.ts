import { NextResponse } from 'next/server';
import { crawlSite } from '@/lib/crawler/crawl-site';
import { extractPains, InsufficientDataError } from '@/lib/llm/extract-pains';
import { composeEmail } from '@/lib/llm/compose-email';
import { getRateLimit, incrementRateLimit } from '@/lib/rate-limit/kv-store';
import { sendLeadEmail } from '@/lib/email/resend';
import { validateUrl } from '@/lib/crawler/fetch-page';

export const maxDuration = 60; // Max allowed duration on Hobby

export async function POST(req: Request) {
  try {
    const { url, fingerprint, email, senderBusiness } = await req.json();

    if (!url || !fingerprint || !senderBusiness) {
      return NextResponse.json({ error: 'URL, fingerprint, and sender business are required' }, { status: 400 });
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
    const generatedContent = await composeEmail(url, painPoints, senderBusiness);
    
    // Increment rate limit usage ONLY after successful generation
    const rateData = await incrementRateLimit(fingerprint);

    // 3rd+ email (email provided by frontend): send to inbox, don't return content to client
    if (email) {
      await sendLeadEmail(email, url, generatedContent);
      return NextResponse.json({
        sentToInbox: true,
        usageCount: rateData.count
      });
    }

    return NextResponse.json({ 
      email: generatedContent, 
      painPoints,
      usageCount: rateData.count
    });

  } catch (error: any) {
    // User-facing error: site content was too thin to personalise
    if (error instanceof InsufficientDataError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    console.error('Email generation failed:', error);
    
    let message = error?.message || String(error);
    
    // Handle Gemini API Quota errors gracefully
    if (message.includes('429') && message.includes('quota')) {
      message = "Google AI API quota exceeded. Please wait a minute and try again, or upgrade your Gemini API tier.";
    } else {
      message = `Failed to generate email: ${message}`;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
