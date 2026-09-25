import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { checkFormsRateLimit, getClientIp } from "@/lib/rateLimit";

/**
 * Base URL of the upstream forms API (server-side only - never exposed to the client).
 * The contact submission is forwarded to `${FORMS_API_BASE_URL}/contact`.
 *
 * The env variable can override the default, but the default is hardcoded so the
 * forms work out of the box without requiring additional deployment configuration.
 */
const FORMS_API_BASE_URL =
  process.env.FORMS_API_BASE_URL || "https://8kgtju0kg2.execute-api.ap-south-1.amazonaws.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormType = "contact" | "demo" | "agency";

interface ContactRequest {
  type?: FormType;
  /** Honeypot for contact/demo forms - must stay empty for a human submission. */
  website?: string;
  /** Honeypot for agency form - must stay empty for a human submission. */
  hp?: string;
  /** reCAPTCHA v3 token generated client-side via useGoogleReCaptcha(). */
  recaptchaToken?: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
  interest?: string;
  agencyName?: string;
  clientsPerYear?: string;
  about?: string;
}

function validate(type: FormType, body: ContactRequest): string | null {
  if (type === "contact") {
    return validateContact(body);
  }

  if (type === "demo") {
    if (!body.name?.trim()) return "Please enter your name.";
    if (!body.email || !EMAIL_RE.test(body.email)) return "Please enter a valid email address.";
    if (!body.company?.trim()) return "Please enter your company or project name.";
    if (!body.interest?.trim()) return "Please select a solution interest.";
    return null;
  }

  if (type === "agency") {
    if (!body.agencyName?.trim()) return "Please enter your agency name.";
    if (!body.name?.trim()) return "Please enter your name.";
    if (!body.email || !EMAIL_RE.test(body.email)) return "Please enter a valid email address.";
    if (!body.website?.trim()) return "Please enter your agency website URL.";
    if (!body.clientsPerYear?.trim()) return "Please enter how many client projects you handle per year.";
    if (!body.interest?.trim()) return "Please select a primary solution interest.";
    return null;
  }

  return "Invalid form type.";
}

function buildUpstreamPayload(type: FormType, body: ContactRequest): Record<string, unknown> | null {
  if (type === "contact") {
    return {
      type: "contact",
      name: body.name!.trim(),
      email: body.email!.trim(),
      subject: body.subject!.trim(),
      message: body.message!.trim(),
    };
  }

  if (type === "demo") {
    return {
      type: "demo",
      name: body.name!.trim(),
      email: body.email!.trim(),
      company: body.company!.trim(),
      interest: body.interest!.trim(),
      message: (body.message || "").trim(),
    };
  }

  if (type === "agency") {
    return {
      type: "agency",
      agencyName: body.agencyName!.trim(),
      name: body.name!.trim(),
      email: body.email!.trim(),
      website: body.website!.trim(),
      clientsPerYear: body.clientsPerYear!.trim(),
      interest: body.interest!.trim(),
      message: (body.about || "").trim(),
    };
  }

  return null;
}

export async function POST(request: Request) {
  let body: ContactRequest;
  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const type = body.type || "contact";

  // Honeypot tripped - accept silently without forwarding to the upstream service.
  // `website` is the honeypot field for contact/demo forms; `hp` is the honeypot for agency.
  if ((type !== "agency" && body.website) || body.hp) {
    return NextResponse.json({ success: true });
  }

  const rateLimitOk = await checkFormsRateLimit(getClientIp(request));
  if (!rateLimitOk) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  const validationError = validate(type, body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const recaptchaCheck = await verifyRecaptcha(body.recaptchaToken, getClientIp(request));
  if (!recaptchaCheck.ok) {
    return NextResponse.json(
      { error: "We couldn't verify your submission. Please refresh the page and try again." },
      { status: 400 },
    );
  }

  if (!FORMS_API_BASE_URL) {
    return NextResponse.json(
      { error: "Contact service is not configured." },
      { status: 503 },
    );
  }

  const payload = buildUpstreamPayload(type, body);
  if (!payload) {
    return NextResponse.json({ error: "Invalid form type." }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${FORMS_API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Unable to submit your message right now. Please try again later." },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the contact service. Please try again later." },
      { status: 502 },
    );
  }
}
