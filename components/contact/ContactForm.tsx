"use client";

import { useRef, useState, type FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { validateContact } from "@/lib/contact";

const API_URL = "/api/contact";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot - must stay empty for a human submission. */
  website: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export function ContactForm() {
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
    if (state.website) {
      setSubmitted(true); // honeypot tripped - silently ignore
      return;
    }
    const validationError = validateContact(state);
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
          type: "contact",
          name: state.name,
          email: state.email,
          subject: state.subject,
          message: state.message,
          recaptchaToken,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
        details?: string[];
      } | null;

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
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6, fontFamily: "var(--font-jakarta)" }}>
          Thanks, {state.name.split(" ")[0] || "there"}!
        </h2>
        <p style={{ fontSize: 14, color: "var(--wm)" }}>
          We received your message and will respond within 24 hours.
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
        <label htmlFor="subject" className="sr-only">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          className="fi"
          placeholder="Subject"
          value={state.subject}
          onChange={set("subject")}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="message" className="sr-only">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          className="fi"
          rows={4}
          placeholder="How can we help?"
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
        {submitting ? "Sending…" : "Send Message →"}
      </button>
      <p style={{ textAlign: "center", fontSize: 12, color: "var(--wd)", marginTop: 10 }}>
        We respond within 24 hours.
      </p>
    </form>
  );
}
