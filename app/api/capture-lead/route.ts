import { NextResponse } from 'next/server';
import { createClient } from '@vercel/kv';

function getKv() {
  const url = process.env.KV_REST_API_URL?.replace(/^"|"$/g, '');
  const token = process.env.KV_REST_API_TOKEN?.replace(/^"|"$/g, '');
  
  if (!url || !token) return null;
  return createClient({ url, token });
}

export async function POST(req: Request) {
  try {
    const { email, url } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    
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
    
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Capture lead failed", e);
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}
