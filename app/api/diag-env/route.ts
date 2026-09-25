import { NextResponse } from "next/server";

/**
 * Temporary read-only diagnostic: reports whether the server actually sees
 * the reCAPTCHA env vars at runtime, without ever exposing their values.
 * Delete this route once the Amplify env var propagation issue is resolved -
 * it isn't meant to be a permanent part of the app.
 */
export async function GET() {
  return NextResponse.json({
    hasSiteKeyPublic: Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
    hasSecretKey: Boolean(process.env.RECAPTCHA_SECRET_KEY),
    hasUpstashUrl: Boolean(process.env.UPSTASH_REDIS_REST_URL),
    hasUpstashToken: Boolean(process.env.UPSTASH_REDIS_REST_TOKEN),
    nodeEnv: process.env.NODE_ENV,
  });
}
