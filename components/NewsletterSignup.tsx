"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  source?: string;
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Newsletter capture form. Posts to /api/subscribe and shows an inline
 * confirmation. The dark variant sits on ink backgrounds (footer, CTA
 * strips); the light variant sits on cream and white sections.
 */
export function NewsletterSignup({
  source = "newsletter",
  variant = "light",
  className = "",
}: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "busy") return;
    setState("busy");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setState("done");
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const dark = variant === "dark";

  if (state === "done") {
    return (
      <div
        className={`flex items-center gap-2.5 rounded-xl px-4 py-3.5 text-[0.95rem] font-medium ${
          dark ? "bg-white/10 text-white" : "bg-gold-soft text-ink"
        } ${className}`}
      >
        <CheckCircle2 className="h-5 w-5 flex-none text-accent" />
        You are on the list. One email a month, no noise.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={className}>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          className={`flex-1 rounded-full border-[1.5px] px-5 py-3.5 text-[0.95rem] outline-none transition-colors ${
            dark
              ? "border-white/25 bg-white/10 text-white placeholder:text-white/50 focus:border-accent"
              : "border-line bg-white text-ink placeholder:text-ink-3 focus:border-accent"
          }`}
        />
        <button
          type="submit"
          disabled={state === "busy"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.92rem] font-semibold text-white transition-all hover:bg-accent-2 disabled:opacity-60"
        >
          {state === "busy" ? "Joining..." : "Join the journal"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {state === "error" && (
        <p
          className={`mt-2 text-[0.85rem] ${dark ? "text-red-300" : "text-red-700"}`}
        >
          {message}
        </p>
      )}
      <p
        className={`mt-2.5 text-[0.78rem] ${dark ? "text-white/50" : "text-ink-3"}`}
      >
        One email a month with cohort findings and practical tools. Unsubscribe
        any time. We never share your address.
      </p>
    </form>
  );
}
