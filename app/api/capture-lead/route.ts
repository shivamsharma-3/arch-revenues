import { NextResponse } from 'next/server';
import { createClient } from '@vercel/kv';
import { sendLeadEmail, sendLeadNotification } from '@/lib/email/resend';

function getKv() {
  const url = process.env.KV_REST_API_URL?.replace(/^"|"$/g, '');
  const token = process.env.KV_REST_API_TOKEN?.replace(/^"|"$/g, '');
  
  if (!url || !token) return null;
  return createClient({ url, token });
}

export async function POST(req: Request) {
  try {
    const { email, url, generatedEmail } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    
    // Save lead to KV
    const kv = getKv();
    if (kv) {
      await kv.set(`lead:${email}`, { 
        email, 
        sourceUrl: url, 
        capturedAt: new Date().toISOString() 
      });
    } else {
      console.warn('KV store not configured, lead not saved:', email);
    }

    // Send the generated email to the user who just unlocked
    if (generatedEmail) {
      await sendLeadEmail(email, url, generatedEmail);
    }

    // Notify Shivam that a new lead came in
    await sendLeadNotification(email, url);
    
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Capture lead failed", e);
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}
