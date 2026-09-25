"use client";

import { useRef, useState, type FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { templates } from "@/lib/data/templates";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

interface FormState {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  /** Honeypot - must stay empty for a human submission. */
  website: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  company: "",
  interest: "",
  message: "",
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_URL = "/api/contact";

function validate(state: FormState): string | null {
  if (state.website) return null; // honeypot tripped - silently ignore
  if (!state.name.trim()) return "Please enter your name.";
  if (!EMAIL_RE.test(state.email)) return "Please enter a valid email address.";
  if (!state.company.trim()) return "Please enter your company or project name.";
  if (!state.interest.trim()) return "Please select a solution interest.";
  return null;
}

export function DemoForm() {
  const [state, setState] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const set =
    (key: keyof FormState) =>
    (e: { target: { value: string } }) =>
      setState((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validate(state);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setError("Please verify you're not a robot.");
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "demo",
          name: state.name,
          email: state.email,
          company: state.company,
          interest: state.interest,
          message: state.message || "",
          recaptchaToken,
        }),
      });

      const data = (await res.json().catch(() => null)) as { success?: boolean; error?: string; details?: string[] } | null;

      setSubmitting(false);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);

      if (!res.ok || !data?.success) {
        const message = data?.error || data?.details?.join(". ") || "Something went wrong. Please try again.";
        setError(message);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitting(false);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setError("Network error. Please check your connection and try again.");
    }
  }

  if (submitted) {
    return (
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          background: "var(--cyg)",
          border: "1px solid var(--cyr)",
          borderRadius: 8,
          padding: 32,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6, fontFamily: "var(--font-jakarta)" }}>
          Thanks, {state.name.split(" ")[0] || "there"}!
        </h3>
        <p style={{ fontSize: 14, color: "var(--wm)" }}>
          We received your request and will respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 480, margin: "0 auto", textAlign: "left" }}>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="name" className="sr-only">
          Your name
        </label>
        <input
          id="name"
          name="name"
          className="fi"
          placeholder="Your name"
          value={state.name}
          onChange={set("name")}
          autoComplete="name"
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          className="fi"
          placeholder="Email address"
          type="email"
          value={state.email}
          onChange={set("email")}
          autoComplete="email"
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="company" className="sr-only">
          Company / Project name
        </label>
        <input
          id="company"
          name="company"
          className="fi"
          placeholder="Company / Project name"
          value={state.company}
          onChange={set("company")}
          autoComplete="organization"
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="interest" className="sr-only">
          Solution interest
        </label>
        <select id="interest" name="interest" className="fi" value={state.interest} onChange={set("interest")}>
          <option value="" disabled>
            Solution interest
          </option>
          {templates.map((t) => (
            <option key={t.id} value={t.nm}>
              {t.nm}
            </option>
          ))}
          <option value="unsure">Not sure yet</option>
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="message" className="sr-only">
          Tell us about your platform idea (optional)
        </label>
        <textarea
          id="message"
          name="message"
          className="fi"
          rows={3}
          placeholder="Tell us about your platform idea (optional)"
          value={state.message}
          onChange={set("message")}
        />
      </div>

      {/* Honeypot field - hidden from real users. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={state.website}
        onChange={set("website")}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      {RECAPTCHA_SITE_KEY ? (
        <div className={`recaptcha-frame${recaptchaToken ? " verified" : ""}`}>
          <span className="recaptcha-label">{recaptchaToken ? "Verified" : "Security check"}</span>
          <div className="recaptcha-widget">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token) => setRecaptchaToken(token)}
              onExpired={() => setRecaptchaToken(null)}
              theme="dark"
            />
          </div>
        </div>
      ) : null}

      {error ? (
        <p role="alert" style={{ color: "#EF4444", fontSize: 13, margin: "0 0 10px" }}>
          {error}
        </p>
      ) : null}

      <button
        className="btn bp"
        type="submit"
        disabled={submitting || (Boolean(RECAPTCHA_SITE_KEY) && !recaptchaToken)}
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: 4,
          opacity: submitting || (RECAPTCHA_SITE_KEY && !recaptchaToken) ? 0.7 : 1,
        }}
      >
        {submitting ? "Sending…" : "Book My Demo →"}
      </button>
      <p style={{ textAlign: "center", fontSize: 12, color: "var(--wd)", marginTop: 10 }}>
        We respond within 24 hours. No sales pressure.
      </p>
    </form>
  );
}
