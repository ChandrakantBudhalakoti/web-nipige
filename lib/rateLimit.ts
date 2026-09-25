import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

/**
 * Upstash-backed limiter: 3 submissions/min/IP, coordinated across all
 * server instances. `null` when Upstash credentials aren't configured.
 */
const upstashRateLimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(MAX_PER_WINDOW, "1 m"),
        analytics: true,
        prefix: "ratelimit:forms",
      })
    : null;

/**
 * Per-process fallback used only when Upstash isn't configured. Doesn't
 * coordinate across server instances and resets on cold start, so it's
 * meaningfully weaker than the Upstash limiter - but it requires zero
 * configuration and still throttles a bot repeatedly hitting the same warm
 * instance, which is better than no rate limiting at all.
 */
const inMemoryBuckets = new Map<string, { count: number; resetAt: number }>();

function checkInMemoryRateLimit(key: string): boolean {
  const now = Date.now();

  if (inMemoryBuckets.size > 5000) {
    for (const [k, v] of inMemoryBuckets) {
      if (now > v.resetAt) inMemoryBuckets.delete(k);
    }
  }

  const bucket = inMemoryBuckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    inMemoryBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_PER_WINDOW) return false;

  bucket.count += 1;
  return true;
}

/** true = allowed, false = rate limit exceeded. */
export async function checkFormsRateLimit(ip: string): Promise<boolean> {
  if (upstashRateLimit) {
    const { success } = await upstashRateLimit.limit(ip);
    return success;
  }
  return checkInMemoryRateLimit(ip);
}

/** Best-effort client IP from proxy/CDN headers (works behind CloudFront, Vercel, etc). */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}
