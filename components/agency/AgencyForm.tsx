"use client";

import { useRef, useState, type FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { templates } from "@/lib/data/templates";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

interface FormState {
  agencyName: string;
  name: string;
  email: string;
  agencyUrl: string;
  projects: string;
  interest: string;
  about: string;
  /** Honeypot - must stay empty for a human submission. */
  hp: string;
}

const EMPTY: FormState = {
  agencyName: "",
  name: "",
  email: "",
  agencyUrl: "",
  projects: "",
  interest: "",
  about: "",
  hp: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_URL = "/api/contact";

function validate(state: FormState): string | null {
  if (state.hp) return null; // honeypot tripped - silently ignore
  if (!state.agencyName.trim()) return "Please enter your agency name.";
  if (!state.name.trim()) return "Please enter your name.";
  if (!EMAIL_RE.test(state.email)) return "Please enter a valid email address.";
  if (!state.agencyUrl.trim()) return "Please enter your agency website URL.";
  if (!state.projects.trim()) return "Please enter how many client projects you handle per year.";
  if (!state.interest.trim()) return "Please select a primary solution interest.";
  return null;
}

export function AgencyForm() {
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
          type: "agency",
          agencyName: state.agencyName,
          name: state.name,
          email: state.email,
          website: state.agencyUrl,
          clientsPerYear: state.projects,
          interest: state.interest,
          message: state.about || "",
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
          background: "var(--cyg)",
          border: "1px solid var(--cyr)",
          borderRadius: 8,
          padding: 32,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6, fontFamily: "var(--font-jakarta)" }}>
          Application received!
        </h3>
        <p style={{ fontSize: 14, color: "var(--wm)" }}>
          We review applications within 48 hours and will be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ textAlign: "left" }}>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="agencyName" className="sr-only">
          Agency name
        </label>
        <input
          id="agencyName"
          name="agencyName"
          className="fi"
          placeholder="Agency name"
          value={state.agencyName}
          onChange={set("agencyName")}
          autoComplete="organization"
        />
      </div>
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
        <label htmlFor="website" className="sr-only">
          Agency website URL
        </label>
        <input
          id="website"
          name="website"
          className="fi"
          placeholder="Agency website URL"
          value={state.agencyUrl}
          onChange={set("agencyUrl")}
          autoComplete="url"
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="clientsPerYear" className="sr-only">
          How many client projects per year?
        </label>
        <input
          id="clientsPerYear"
          name="clientsPerYear"
          className="fi"
          placeholder="How many client projects per year?"
          value={state.projects}
          onChange={set("projects")}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="interest" className="sr-only">
          Primary solution interest
        </label>
        <select id="interest" name="interest" className="fi" value={state.interest} onChange={set("interest")}>
          <option value="" disabled>
            Select
          </option>
          {templates
            .filter((t) => t.id === "restaurant" || t.id === "realestate" || t.id === "services")
            .map((t) => (
              <option key={t.id} value={t.nm}>
                {t.nm}
              </option>
            ))}
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="message" className="sr-only">
          Tell us about your agency (optional)
        </label>
        <textarea
          id="message"
          name="message"
          className="fi"
          rows={3}
          placeholder="Tell us about your agency (optional)"
          value={state.about}
          onChange={set("about")}
        />
      </div>

      {/* Honeypot field - hidden from real users. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={state.hp}
        onChange={set("hp")}
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
          opacity: submitting || (RECAPTCHA_SITE_KEY && !recaptchaToken) ? 0.7 : 1,
        }}
      >
        {submitting ? "Sending…" : "Apply Now →"}
      </button>
      <p style={{ textAlign: "center", fontSize: 12, color: "var(--wd)", marginTop: 10 }}>
        We review applications within 48 hours.
      </p>
    </form>
  );
}
