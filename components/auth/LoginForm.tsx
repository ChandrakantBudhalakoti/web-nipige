"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CtaLink } from "@/components/ui/CtaLink";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    window.setTimeout(() => setStatus("done"), 700);
  }

  if (status === "done") {
    return (
      <div
        style={{
          background: "var(--cd)",
          border: "1px solid var(--wb)",
          borderRadius: 8,
          padding: 28,
          textAlign: "center",
        }}
        role="status"
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
        <p style={{ fontWeight: 700, marginBottom: 6 }}>The Nipige dashboard is launching soon.</p>
        <p style={{ fontSize: 13, color: "var(--wm)", lineHeight: 1.6, marginBottom: 18 }}>
          We&apos;ll email <strong>{email}</strong> the moment login is live. In the meantime, book a live
          demo and we&apos;ll set your account up personally.
        </p>
        <CtaLink href="/demo" variant="primary" small block>
          Book a Demo →
        </CtaLink>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        background: "var(--cd)",
        border: "1px solid var(--wb)",
        borderRadius: 8,
        padding: 28,
        textAlign: "left",
      }}
    >
      <input
        className="fi"
        placeholder="Email address"
        type="email"
        autoComplete="email"
        value={email}
        disabled={status === "submitting"}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={Boolean(errors.email)}
        style={errors.email ? { borderColor: "#EF4444", marginBottom: 4 } : undefined}
      />
      {errors.email ? (
        <p style={{ color: "#EF4444", fontSize: 12, marginBottom: 10 }}>{errors.email}</p>
      ) : null}

      <input
        className="fi"
        placeholder="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        disabled={status === "submitting"}
        onChange={(e) => setPassword(e.target.value)}
        aria-invalid={Boolean(errors.password)}
        style={errors.password ? { borderColor: "#EF4444", marginBottom: 4 } : undefined}
      />
      {errors.password ? (
        <p style={{ color: "#EF4444", fontSize: 12, marginBottom: 10 }}>{errors.password}</p>
      ) : null}

      <button
        className="btn bp"
        type="submit"
        disabled={status === "submitting"}
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: 4,
          opacity: status === "submitting" ? 0.7 : 1,
          cursor: status === "submitting" ? "wait" : "pointer",
        }}
      >
        {status === "submitting" ? "Logging in…" : "Log In →"}
      </button>
      <p style={{ textAlign: "center", fontSize: 12, color: "var(--wd)", marginTop: 12 }}>
        Forgot password? Contact{" "}
        <a href="mailto:contactus@nipige.com" style={{ color: "var(--cy)" }}>
          contactus@nipige.com
        </a>
      </p>
    </form>
  );
}
