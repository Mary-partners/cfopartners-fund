"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  BUDGET_OPTIONS,
  BUSINESS_STAGES,
  FINANCE_CAPACITY,
  INSTITUTIONAL_OFFERS,
  INSTITUTIONAL_SUPPORT,
  ORG_TYPES,
  SME_CHALLENGES,
  SME_SUPPORT,
  START_OPTIONS,
} from "@/lib/enquiry";
import type { EnquiryKind } from "@/lib/content/types";
import { track } from "@/lib/track";
import { CONTACT_EMAIL } from "@/lib/links";

const inputCls =
  "w-full rounded-lg border border-ink-3 bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-1 aria-[invalid=true]:border-red-700";

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: (describedBy: string | undefined) => React.ReactNode;
}

function Field({ id, label, optional, error, hint, children }: FieldProps) {
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.88rem] font-semibold text-ink">
        {label}
        {optional && <span className="font-normal text-ink-2"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="m-0 text-[0.8rem] text-ink-2">
          {hint}
        </p>
      )}
      {children(describedBy)}
      {error && (
        <p id={`${id}-error`} className="m-0 text-[0.82rem] font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  options,
  describedBy,
  invalid,
  defaultValue,
}: {
  id: string;
  options: readonly string[];
  describedBy?: string;
  invalid?: boolean;
  defaultValue?: string;
}) {
  return (
    <select
      id={id}
      name={id}
      defaultValue={defaultValue && options.includes(defaultValue) ? defaultValue : ""}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className={inputCls}
    >
      <option value="" disabled>
        Choose one
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/**
 * Enquiry form for institutions (funds, DFIs, programmes) or businesses.
 * Posts to /api/enquiry with the page and referral source attached.
 */
export function EnquiryForm({
  kind,
  defaultOffer,
}: {
  kind: EnquiryKind;
  /** Preselects the offer (institutional) or interest (business). */
  defaultOffer?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<{ field?: string; message: string } | null>(null);
  const source = useRef<Record<string, string>>({});
  const p = kind === "institutional" ? "inst" : "sme";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    source.current = {
      landingPage: window.location.pathname,
      referrer: document.referrer.slice(0, 300),
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
    };
  }, []);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const get = (k: string) => {
      const v = fd.get(`${p}-${k}`);
      return typeof v === "string" && v.trim() ? v.trim() : undefined;
    };
    const payload =
      kind === "institutional"
        ? {
            kind,
            organisation: get("organisation") ?? "",
            name: get("name") ?? "",
            email: get("email") ?? "",
            orgType: get("orgType"),
            country: get("country") ?? "",
            offer: get("offer"),
            support: get("support"),
            capacity: get("capacity"),
            size: get("size"),
            start: get("start"),
            budget: get("budget"),
            message: get("message") ?? "",
            website: get("website"),
            source: source.current,
          }
        : {
            kind,
            business: get("business") ?? "",
            sector: get("sector") ?? "",
            country: get("country") ?? "",
            stage: get("stage"),
            challenge: get("challenge"),
            support: get("support"),
            timeline: get("timeline"),
            name: get("name") ?? "",
            email: get("email") ?? "",
            phone: get("phone"),
            message: get("message") ?? "",
            website: get("website"),
            source: source.current,
          };

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; field?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError({ field: json.field, message: json.error ?? "Please check the form." });
        if (json.field) document.getElementById(`${p}-${json.field}`)?.focus();
        return;
      }
      setStatus("sent");
      track(kind === "institutional" ? "institutional_enquiry" : "sme_enquiry", {
        support: String(("offer" in payload ? payload.offer : payload.support) ?? ""),
      });
    } catch {
      setStatus("error");
      setError({
        message: `We couldn't send your enquiry. Please try again, or email ${CONTACT_EMAIL}.`,
      });
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-card border border-line bg-white p-7">
        <CheckCircle2 className="mb-3 h-7 w-7 text-accent-2" aria-hidden="true" />
        <h3 className="mb-2 text-[1.2rem]">Thank you. Your enquiry has been sent.</h3>
        <p className="m-0 text-ink-2">
          We&rsquo;ll reply within two working days to set up a 30-minute
          discovery call. If it&rsquo;s urgent, email{" "}
          <a className="font-semibold text-accent-2 underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        {kind === "sme" && (
          <p className="mb-0 mt-3 text-ink-2">
            While you wait, you can{" "}
            <a className="font-semibold text-accent-2 underline" href="/diagnostic">
              start the Management Capability Assessment
            </a>
            .
          </p>
        )}
      </div>
    );
  }

  const err = (f: string) => (error?.field === f ? error.message : undefined);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-4 rounded-card border border-line bg-white p-6 sm:grid-cols-2 sm:p-7"
    >
      {kind === "institutional" ? (
        <>
          <Field id={`${p}-organisation`} label="Organisation" error={err("organisation")}>
            {(d) => <input id={`${p}-organisation`} name={`${p}-organisation`} autoComplete="organization" aria-describedby={d} aria-invalid={!!err("organisation") || undefined} className={inputCls} />}
          </Field>
          <Field id={`${p}-name`} label="Your name" error={err("name")}>
            {(d) => <input id={`${p}-name`} name={`${p}-name`} autoComplete="name" aria-describedby={d} aria-invalid={!!err("name") || undefined} className={inputCls} />}
          </Field>
          <Field id={`${p}-email`} label="Work email" error={err("email")}>
            {(d) => <input id={`${p}-email`} name={`${p}-email`} type="email" autoComplete="email" aria-describedby={d} aria-invalid={!!err("email") || undefined} className={inputCls} />}
          </Field>
          <Field id={`${p}-orgType`} label="Organisation type" error={err("orgType")}>
            {(d) => <Select id={`${p}-orgType`} options={ORG_TYPES} describedBy={d} invalid={!!err("orgType")} />}
          </Field>
          <Field id={`${p}-country`} label="Countries of operation" error={err("country")} hint="For example, Kenya, Uganda and Rwanda.">
            {(d) => <input id={`${p}-country`} name={`${p}-country`} aria-describedby={d} aria-invalid={!!err("country") || undefined} className={inputCls} />}
          </Field>
          <Field id={`${p}-offer`} label="How would you like to start?" error={err("offer")}>
            {(d) => <Select id={`${p}-offer`} options={INSTITUTIONAL_OFFERS} describedBy={d} invalid={!!err("offer")} defaultValue={defaultOffer} />}
          </Field>
          <Field id={`${p}-support`} label="Main financial support needed" error={err("support")}>
            {(d) => <Select id={`${p}-support`} options={INSTITUTIONAL_SUPPORT} describedBy={d} invalid={!!err("support")} />}
          </Field>
          <Field id={`${p}-capacity`} label="Finance capacity in your companies today" error={err("capacity")}>
            {(d) => <Select id={`${p}-capacity`} options={FINANCE_CAPACITY} describedBy={d} invalid={!!err("capacity")} />}
          </Field>
          <Field id={`${p}-size`} label="Portfolio or cohort size" optional hint="For example, 12 portfolio companies or a cohort of 40.">
            {(d) => <input id={`${p}-size`} name={`${p}-size`} aria-describedby={d} className={inputCls} />}
          </Field>
          <Field id={`${p}-start`} label="Expected start" error={err("start")}>
            {(d) => <Select id={`${p}-start`} options={START_OPTIONS} describedBy={d} invalid={!!err("start")} />}
          </Field>
          <Field id={`${p}-budget`} label="Budget range" optional>
            {(d) => <Select id={`${p}-budget`} options={BUDGET_OPTIONS} describedBy={d} />}
          </Field>
        </>
      ) : (
        <>
          <Field id={`${p}-business`} label="Business name" error={err("business")}>
            {(d) => <input id={`${p}-business`} name={`${p}-business`} autoComplete="organization" aria-describedby={d} aria-invalid={!!err("business") || undefined} className={inputCls} />}
          </Field>
          <Field id={`${p}-sector`} label="Sector" error={err("sector")}>
            {(d) => <input id={`${p}-sector`} name={`${p}-sector`} aria-describedby={d} aria-invalid={!!err("sector") || undefined} className={inputCls} />}
          </Field>
          <Field id={`${p}-country`} label="Country" error={err("country")}>
            {(d) => <input id={`${p}-country`} name={`${p}-country`} autoComplete="country-name" aria-describedby={d} aria-invalid={!!err("country") || undefined} className={inputCls} />}
          </Field>
          <Field id={`${p}-stage`} label="Business stage" error={err("stage")}>
            {(d) => <Select id={`${p}-stage`} options={BUSINESS_STAGES} describedBy={d} invalid={!!err("stage")} />}
          </Field>
          <Field id={`${p}-challenge`} label="Main financial challenge" error={err("challenge")}>
            {(d) => <Select id={`${p}-challenge`} options={SME_CHALLENGES} describedBy={d} invalid={!!err("challenge")} />}
          </Field>
          <Field id={`${p}-support`} label="What are you interested in?" error={err("support")}>
            {(d) => <Select id={`${p}-support`} options={SME_SUPPORT} describedBy={d} invalid={!!err("support")} defaultValue={defaultOffer} />}
          </Field>
          <Field id={`${p}-timeline`} label="When would you like to start?" error={err("timeline")}>
            {(d) => <Select id={`${p}-timeline`} options={START_OPTIONS} describedBy={d} invalid={!!err("timeline")} />}
          </Field>
          <Field id={`${p}-name`} label="Your name" error={err("name")}>
            {(d) => <input id={`${p}-name`} name={`${p}-name`} autoComplete="name" aria-describedby={d} aria-invalid={!!err("name") || undefined} className={inputCls} />}
          </Field>
          <Field id={`${p}-email`} label="Email" error={err("email")}>
            {(d) => <input id={`${p}-email`} name={`${p}-email`} type="email" autoComplete="email" aria-describedby={d} aria-invalid={!!err("email") || undefined} className={inputCls} />}
          </Field>
          <Field id={`${p}-phone`} label="Phone or WhatsApp" optional>
            {(d) => <input id={`${p}-phone`} name={`${p}-phone`} type="tel" autoComplete="tel" aria-describedby={d} className={inputCls} />}
          </Field>
        </>
      )}

      <div className="sm:col-span-2">
        <Field id={`${p}-message`} label="Brief description" error={err("message")} hint="What you need help with and any timing we should know about.">
          {(d) => <textarea id={`${p}-message`} name={`${p}-message`} rows={5} aria-describedby={d} aria-invalid={!!err("message") || undefined} className={inputCls} />}
        </Field>
      </div>

      {/* Honeypot for bots; hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${p}-website`}>Leave this field empty</label>
        <input id={`${p}-website`} name={`${p}-website`} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 text-[0.8rem] text-ink-2">
          We use these details only to reply to your enquiry. See our{" "}
          <a href="/privacy" className="underline">privacy notice</a>.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {status === "error" && error && !error.field && (
        <p role="alert" className="m-0 text-[0.88rem] font-medium text-red-700 sm:col-span-2">
          {error.message}
        </p>
      )}
      {status === "error" && error?.field && (
        <p role="alert" className="sr-only">{error.message}</p>
      )}
    </form>
  );
}
