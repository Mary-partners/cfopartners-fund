"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Download, Lock } from "lucide-react";

interface Props {
  resourceSlug: string;
  fileUrl: string;
  fileLabel: string;
}

/**
 * Email gate for downloadable resources. The visitor leaves an email,
 * we record it through /api/subscribe, and the download starts
 * immediately. The file itself is a public static asset; the gate is a
 * fair exchange rather than a lock.
 */
export function ResourceGate({ resourceSlug, fileUrl, fileLabel }: Props) {
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
        body: JSON.stringify({
          email,
          source: "resource-download",
          resource: resourceSlug,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setState("done");
      // Start the download straight away.
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (state === "done") {
    return (
      <div className="rounded-2xl border-2 border-accent bg-gold-soft p-6">
        <div className="mb-2 flex items-center gap-2 font-semibold text-ink">
          <CheckCircle2 className="h-5 w-5 text-accent-2" />
          Your download has started.
        </div>
        <p className="mb-4 text-[0.9rem] text-ink-2">
          If it did not start automatically, use the button below. We have
          also added you to the journal: one email a month, unsubscribe any
          time.
        </p>
        <a
          href={fileUrl}
          download
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.9rem] font-semibold text-white transition-colors hover:bg-ink-2"
        >
          <Download className="h-4 w-4" />
          {fileLabel}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-line bg-white p-6"
    >
      <div className="mb-1.5 flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
        <Lock className="h-3.5 w-3.5" />
        Free download
      </div>
      <p className="mb-4 text-[0.92rem] text-ink-2">
        Tell us where to send updates and the download starts immediately.
      </p>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          className="flex-1 rounded-full border-[1.5px] border-line bg-bg px-5 py-3.5 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:bg-white"
        />
        <button
          type="submit"
          disabled={state === "busy"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.92rem] font-semibold text-white transition-all hover:bg-accent-2 disabled:opacity-60"
        >
          {state === "busy" ? "One moment..." : "Get the checklist"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {state === "error" && (
        <p className="mt-2 text-[0.85rem] text-red-700">{message}</p>
      )}
      <p className="mt-2.5 text-[0.78rem] text-ink-3">
        We never share your address. Unsubscribe any time.
      </p>
    </form>
  );
}
