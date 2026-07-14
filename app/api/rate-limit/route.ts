import { NextResponse } from 'next/server';
import { getRateLimit } from '@/lib/rate-limit/kv-store';

export async function POST(req: Request) {
  try {
    const { fingerprint } = await req.json();
    if (!fingerprint) return NextResponse.json({ error: 'Fingerprint required' }, { status: 400 });
    
    const data = await getRateLimit(fingerprint);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ count: 0, lastAt: 0 });
  }
}
