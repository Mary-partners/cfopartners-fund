"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { DIAGNOSTIC_URL } from "@/lib/links";

interface FormData {
  automate: string;
  success: string;
  timeline: string;
  dependencies: string;
  name: string;
  email: string;
  business: string;
  phone: string;
}

const EMPTY: FormData = {
  automate: "",
  success: "",
  timeline: "",
  dependencies: "",
  name: "",
  email: "",
  business: "",
  phone: "",
};

const TIMELINES = [
  "Within 2 weeks",
  "Within a month",
  "This quarter",
  "Still exploring, no fixed date",
];

const STEPS = [
  "What to automate",
  "What success looks like",
  "Your timeline",
  "Dependencies and team",
  "Where to reach you",
] as const;

/**
 * Guided five-step intake for the AI Automation Sprint. Captures the four
 * scoping questions, then contact details, and posts everything to
 * /api/automation. The confirmation invites the visitor into the
 * AI Automation Diagnostic build.
 */
export function AutomationIntake() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(EMPTY);
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const set =
    (key: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setData((d) => ({ ...d, [key]: e.target.value }));

  const stepValid = () => {
    switch (step) {
      case 0:
        return data.automate.trim().length >= 10;
      case 1:
        return data.success.trim().length >= 5;
      case 2:
        return data.timeline !== "";
      case 3:
        return true; // dependencies are optional
      case 4:
        return (
          data.name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(data.email)
        );
      default:
        return false;
    }
  };

  const submit = async () => {
    if (state === "busy") return;
    setState("busy");
    setMessage("");
    try {
      const res = await fetch("/api/automation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const out = await res.json();
      if (!res.ok || !out.ok) {
        setState("error");
        setMessage(out.error ?? "Something went wrong. Please try again.");
        return;
      }
      setState("done");
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (state === "done") {
    return (
      <div className="rounded-3xl border-2 border-accent bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-accent" />
        <h3 className="mb-3 font-serif text-[1.6rem]">
          Your automation brief is in.
        </h3>
        <p className="mx-auto mb-2 max-w-[480px] text-[0.95rem] text-ink-2">
          We will review it and reply within two working days with a scoping
          call invitation and an honest read on whether automation is the
          right fix.
        </p>
        <p className="mx-auto mb-6 max-w-[480px] text-[0.95rem] text-ink-2">
          You are also on the early list for the AI Automation Diagnostic we
          are building. Briefs like yours shape it, and you will be among the
          first to run it.
        </p>
        <a
          href={DIAGNOSTIC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-ink-2"
        >
          Meanwhile, take the Business Growth Check-Up
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-8">
      {/* progress */}
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
          <Sparkles className="h-3.5 w-3.5" />
          Automation brief
        </span>
        <span className="text-[0.8rem] text-ink-3">
          Step {step + 1} of {STEPS.length}
        </span>
      </div>
      <div className="mb-1 h-1.5 overflow-hidden rounded bg-bg-alt">
        <div
          className="h-full rounded bg-accent transition-all duration-300"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>
      <div className="mb-6 text-[0.8rem] text-ink-3">{STEPS[step]}</div>

      {step === 0 && (
        <StepShell
          title="What do you want to automate?"
          hint="Describe the task in your own words. The more specific, the better we can scope it."
        >
          <textarea
            value={data.automate}
            onChange={set("automate")}
            rows={5}
            placeholder="Example: Every Friday I spend 3 hours matching M-Pesa till payments to invoices in my spreadsheet, then chasing the customers who have not paid."
            className="w-full rounded-2xl border-[1.5px] border-line bg-bg p-4 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:bg-white"
          />
        </StepShell>
      )}

      {step === 1 && (
        <StepShell
          title="What does success look like?"
          hint="If this automation works perfectly, what changes for you and the business?"
        >
          <textarea
            value={data.success}
            onChange={set("success")}
            rows={5}
            placeholder="Example: Reconciliation happens daily without me. I get one WhatsApp summary each morning, and overdue customers get an automatic polite reminder."
            className="w-full rounded-2xl border-[1.5px] border-line bg-bg p-4 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:bg-white"
          />
        </StepShell>
      )}

      {step === 2 && (
        <StepShell
          title="How much time do you have to get this done?"
          hint="An honest timeline helps us recommend the right depth of build."
        >
          <div className="grid gap-2.5">
            {TIMELINES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setData((d) => ({ ...d, timeline: t }))}
                className={`rounded-xl border-[1.5px] px-5 py-4 text-left text-[0.95rem] transition-all ${
                  data.timeline === t
                    ? "border-accent bg-gold-soft text-ink"
                    : "border-line bg-bg text-ink hover:border-accent hover:bg-gold-soft"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </StepShell>
      )}

      {step === 3 && (
        <StepShell
          title="Any dependencies or team to work with?"
          hint="Other teammates involved, systems the automation must talk to, approvals needed. Leave blank if it is just you."
        >
          <textarea
            value={data.dependencies}
            onChange={set("dependencies")}
            rows={5}
            placeholder="Example: My accountant does the final check monthly. The data lives in QuickBooks and a Google Sheet my operations lead maintains."
            className="w-full rounded-2xl border-[1.5px] border-line bg-bg p-4 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:bg-white"
          />
        </StepShell>
      )}

      {step === 4 && (
        <StepShell
          title="Where should we send the scoping reply?"
          hint="We reply within two working days."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={data.name}
              onChange={set("name")}
              placeholder="Your name *"
              aria-label="Your name"
              className="rounded-full border-[1.5px] border-line bg-bg px-5 py-3.5 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:bg-white"
            />
            <input
              type="email"
              value={data.email}
              onChange={set("email")}
              placeholder="Email *"
              aria-label="Email"
              className="rounded-full border-[1.5px] border-line bg-bg px-5 py-3.5 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:bg-white"
            />
            <input
              type="text"
              value={data.business}
              onChange={set("business")}
              placeholder="Business name"
              aria-label="Business name"
              className="rounded-full border-[1.5px] border-line bg-bg px-5 py-3.5 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:bg-white"
            />
            <input
              type="tel"
              value={data.phone}
              onChange={set("phone")}
              placeholder="Phone or WhatsApp"
              aria-label="Phone or WhatsApp"
              className="rounded-full border-[1.5px] border-line bg-bg px-5 py-3.5 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:bg-white"
            />
          </div>
        </StepShell>
      )}

      {state === "error" && (
        <p className="mt-3 text-[0.88rem] text-red-700">{message}</p>
      )}

      <div className="mt-7 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.9rem] font-semibold text-ink-2 hover:text-ink ${
            step === 0 ? "invisible" : ""
          }`}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            disabled={!stepValid()}
            onClick={() => setStep((s) => s + 1)}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.92rem] font-semibold text-white transition-all hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={!stepValid() || state === "busy"}
            onClick={submit}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.92rem] font-semibold text-white transition-all hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {state === "busy" ? "Sending..." : "Send my automation brief"}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function StepShell({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-1.5 font-serif text-[1.35rem] leading-snug">
        {title}
      </h3>
      <p className="mb-5 text-[0.9rem] text-ink-3">{hint}</p>
      {children}
    </div>
  );
}
