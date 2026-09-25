/** Shared types, validation, and client submit helper for the contact form. */

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResult {
  ok: boolean;
  error?: string;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENERIC_ERROR = "Something went wrong. Please try again.";

/**
 * Validate a contact payload at the system boundary.
 * Returns a user-facing error message, or `null` when the input is valid.
 */
export function validateContact(input: Partial<ContactPayload>): string | null {
  if (!input.name?.trim()) return "Please enter your name.";
  if (!input.email || !EMAIL_RE.test(input.email)) return "Please enter a valid email address.";
  if (!input.subject?.trim()) return "Please enter a subject.";
  if (!input.message?.trim()) return "Please enter a message.";
  return null;
}

/** Submit the contact form to the internal API route (which proxies upstream). */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      return { ok: false, error: data?.error ?? GENERIC_ERROR };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}
