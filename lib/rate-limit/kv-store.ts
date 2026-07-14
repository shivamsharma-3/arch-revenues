import { createClient } from '@vercel/kv';

export interface RateLimitData {
  count: number;
  lastAt: number;
}

function getKv() {
  const url = process.env.KV_REST_API_URL?.replace(/^"|"$/g, '');
  const token = process.env.KV_REST_API_TOKEN?.replace(/^"|"$/g, '');
  
  if (!url || !token) return null;
  return createClient({ url, token });
}

export async function getRateLimit(fingerprint: string): Promise<RateLimitData> {
  const kv = getKv();
  if (!kv) {
    return { count: 0, lastAt: Date.now() };
  }
  
  try {
    const count = await kv.get<number>(`ratelimit:${fingerprint}:count`);
    return { count: count || 0, lastAt: Date.now() };
  } catch (e) {
    console.error("KV fetch failed", e);
    return { count: 0, lastAt: Date.now() };
  }
}

export async function incrementRateLimit(fingerprint: string): Promise<RateLimitData> {
  const kv = getKv();
  if (!kv) {
    return { count: 1, lastAt: Date.now() };
  }
  
  try {
    const count = await kv.incr(`ratelimit:${fingerprint}:count`);
    await kv.set(`ratelimit:${fingerprint}:lastAt`, Date.now());
    return { count, lastAt: Date.now() };
  } catch (e) {
    console.error("KV increment failed", e);
    return { count: 1, lastAt: Date.now() };
  }
}
