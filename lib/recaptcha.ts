/**
 * Server-side reCAPTCHA verification against Google's siteverify endpoint.
 * Works for both v2 ("I'm not a robot" checkbox, currently in use) and v3
 * (invisible, score-based) tokens - v2 responses simply omit `score`, so the
 * threshold check below is skipped automatically for them.
 */

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const SCORE_THRESHOLD = 0.5;

interface SiteVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
}

export type RecaptchaCheck =
  | { ok: true }
  | { ok: false; reason: "missing-token" | "low-score" | "verify-failed" };

/**
 * Verify a reCAPTCHA token, enforcing the score threshold when one is present.
 *
 * `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` gates whether this deployment runs reCAPTCHA
 * at all - it's compiled into the JS bundle at build time, so it's reliable even
 * on hosts (e.g. some AWS Amplify setups) where server-only env vars don't
 * reliably reach the SSR runtime. When it's set, a request with no token is
 * always rejected - this is the actual anti-bypass gate, and it holds even if
 * `RECAPTCHA_SECRET_KEY` itself fails to load at runtime (in which case we can't
 * score the token, so we accept its mere presence rather than block real users -
 * but a bot skipping the browser entirely, which is what a direct POST to this
 * route looks like, sends no token and gets rejected regardless).
 *
 * If `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` isn't set at all, reCAPTCHA isn't wired up
 * for this deployment (e.g. local dev without `.env.local`) and verification is
 * skipped entirely. If Google's endpoint is unreachable, we fail open rather
 * than block real leads on a third-party outage - the honeypot and rate limit
 * still guard the route.
 */
export async function verifyRecaptcha(token: string | undefined, remoteIp?: string): Promise<RecaptchaCheck> {
  const recaptchaConfigured = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  if (!recaptchaConfigured) return { ok: true };

  if (!token) return { ok: false, reason: "missing-token" };

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) return { ok: true };

  try {
    const params = new URLSearchParams({ secret: secretKey, response: token });
    if (remoteIp) params.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!res.ok) return { ok: true };

    const data = (await res.json()) as SiteVerifyResponse;
    if (!data.success) return { ok: false, reason: "verify-failed" };
    if (typeof data.score === "number" && data.score < SCORE_THRESHOLD) {
      return { ok: false, reason: "low-score" };
    }

    return { ok: true };
  } catch {
    return { ok: true };
  }
}
