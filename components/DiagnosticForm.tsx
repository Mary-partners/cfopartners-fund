"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { SECTIONS, SECTOR_OPTIONS, CONSENTS, type Question } from "@/lib/diagnostic/questions";
import { DiagnosticResultView, type DiagnosticResultView as ResultType } from "@/components/DiagnosticResultView";

type Identity = {
  businessName: string;
  founderName: string;
  email: string;
  phone: string;
  location: string;
  sector: string;
  websiteUrl: string;
};

const EMPTY_IDENTITY: Identity = {
  businessName: "",
  founderName: "",
  email: "",
  phone: "",
  location: "",
  sector: "",
  websiteUrl: "",
};

type Answers = Record<string, string | string[] | undefined>;
type Consents = { consentData: boolean; consentSharing: boolean; consentWithdrawal: boolean };

// Step 0 = identity, steps 1..SECTIONS.length = each section, last step = consent.
const TOTAL_STEPS = SECTIONS.length + 2;

export function DiagnosticForm() {
  const [step, setStep] = useState(0);
  const [identity, setIdentity] = useState<Identity>(EMPTY_IDENTITY);
  const [answers, setAnswers] = useState<Answers>({});
  const [consents, setConsents] = useState<Consents>({ consentData: false, consentSharing: false, consentWithdrawal: false });
  const [state, setState] = useState<"idle" | "busy" | "error">("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ResultType | null>(null);

  const setIdentityField = (key: keyof Identity) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setIdentity((d) => ({ ...d, [key]: e.target.value }));

  const setSelect = (questionId: string, value: string) => setAnswers((a) => ({ ...a, [questionId]: value }));

  const toggleMulti = (questionId: string, value: string) =>
    setAnswers((a) => {
      const current = (a[questionId] as string[] | undefined) ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...a, [questionId]: next };
    });

  const setText = (questionId: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAnswers((a) => ({ ...a, [questionId]: e.target.value }));

  function isAnswered(q: Question): boolean {
    const v = answers[q.id];
    if (!q.required) return true;
    if (Array.isArray(v)) return v.length > 0;
    return typeof v === "string" && v.trim().length > 0;
  }

  function stepValid(): boolean {
    if (step === 0) {
      return (
        identity.businessName.trim().length > 1 &&
        identity.founderName.trim().length > 1 &&
        /^\S+@\S+\.\S+$/.test(identity.email) &&
        identity.sector !== ""
      );
    }
    if (step === TOTAL_STEPS - 1) {
      return consents.consentData && consents.consentWithdrawal;
    }
    const section = SECTIONS[step - 1];
    return section.questions.every(isAnswered);
  }

  async function submit() {
    if (state === "busy") return;
    setState("busy");
    setMessage("");
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...identity, answers, ...consents }),
      });
      const out = await res.json();
      if (!res.ok || !out.ok) {
        setState("error");
        setMessage(out.error ?? "Something went wrong. Please try again.");
        return;
      }
      setResult(out.result);
      setState("idle");
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `/diagnostic/results/${out.id}`);
      }
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (result) {
    return <DiagnosticResultView result={result} />;
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
          <Sparkles className="h-3.5 w-3.5" />
          The Founder Diagnostic
        </span>
        <span className="text-[0.8rem] text-ink-3">
          Step {step + 1} of {TOTAL_STEPS}
        </span>
      </div>
      <div className="mb-6 h-1.5 overflow-hidden rounded bg-bg-alt">
        <div
          className="h-full rounded bg-accent transition-all duration-300"
          style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {step === 0 && <IdentityStep identity={identity} setField={setIdentityField} />}

      {step > 0 && step < TOTAL_STEPS - 1 && (
        <SectionStep
          section={SECTIONS[step - 1]}
          answers={answers}
          setSelect={setSelect}
          toggleMulti={toggleMulti}
          setText={setText}
        />
      )}

      {step === TOTAL_STEPS - 1 && <ConsentStep consents={consents} setConsents={setConsents} />}

      {state === "error" && <p className="mt-4 text-[0.88rem] text-red-700">{message}</p>}

      <div className="mt-7 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.9rem] font-semibold text-ink-2 hover:text-ink ${step === 0 ? "invisible" : ""}`}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < TOTAL_STEPS - 1 ? (
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
            {state === "busy" ? "Scoring your answers..." : "Get my results"}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function IdentityStep({
  identity,
  setField,
}: {
  identity: Identity;
  setField: (key: keyof Identity) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <h3 className="mb-1.5 font-serif text-[1.35rem] leading-snug">Tell us who you are</h3>
      <p className="mb-5 text-[0.9rem] text-ink-3">Takes about 15 minutes, and your results are ready the moment you finish.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Business name *">
          <input value={identity.businessName} onChange={setField("businessName")} className={inputClass} />
        </Field>
        <Field label="Your name *">
          <input value={identity.founderName} onChange={setField("founderName")} className={inputClass} />
        </Field>
        <Field label="Email *">
          <input type="email" value={identity.email} onChange={setField("email")} className={inputClass} />
        </Field>
        <Field label="Phone / WhatsApp">
          <input type="tel" value={identity.phone} onChange={setField("phone")} className={inputClass} />
        </Field>
        <Field label="Location">
          <input value={identity.location} onChange={setField("location")} className={inputClass} placeholder="City, country" />
        </Field>
        <Field label="Sector *">
          <select value={identity.sector} onChange={setField("sector")} className={inputClass}>
            <option value="">Select one</option>
            {SECTOR_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Website or social link">
          <input value={identity.websiteUrl} onChange={setField("websiteUrl")} className={inputClass} />
        </Field>
      </div>
    </div>
  );
}

function SectionStep({
  section,
  answers,
  setSelect,
  toggleMulti,
  setText,
}: {
  section: (typeof SECTIONS)[number];
  answers: Answers;
  setSelect: (id: string, value: string) => void;
  toggleMulti: (id: string, value: string) => void;
  setText: (id: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <h3 className="mb-1.5 font-serif text-[1.35rem] leading-snug">{section.title}</h3>
      <p className="mb-6 text-[0.9rem] text-ink-3">{section.intro}</p>
      <div className="flex flex-col gap-7">
        {section.questions.map((q) => (
          <div key={q.id}>
            <p className="mb-1 text-[0.95rem] font-medium text-ink">{q.label}</p>
            {q.helperText && <p className="mb-3 text-[0.85rem] text-ink-3">{q.helperText}</p>}
            {q.type === "select" && (
              <div className="grid gap-2">
                {(q.displayOptions ?? []).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelect(q.id, opt)}
                    className={optionClass(answers[q.id] === opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {q.type === "multi_select" && (
              <div className="grid gap-2">
                {(q.displayOptions ?? []).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleMulti(q.id, opt)}
                    className={optionClass(((answers[q.id] as string[] | undefined) ?? []).includes(opt))}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {q.type === "text" && (
              <textarea
                value={(answers[q.id] as string | undefined) ?? ""}
                onChange={setText(q.id)}
                rows={3}
                className="w-full rounded-2xl border-[1.5px] border-line bg-bg p-4 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:bg-white"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsentStep({
  consents,
  setConsents,
}: {
  consents: Consents;
  setConsents: React.Dispatch<React.SetStateAction<Consents>>;
}) {
  const keys: (keyof Consents)[] = ["consentData", "consentSharing", "consentWithdrawal"];
  return (
    <div>
      <h3 className="mb-1.5 font-serif text-[1.35rem] leading-snug">Before you see your results</h3>
      <p className="mb-6 text-[0.9rem] text-ink-3">A few things we want you to know and agree to.</p>
      <div className="flex flex-col gap-4">
        {CONSENTS.map((c, i) => (
          <label key={c.id} className="flex items-start gap-3 text-[0.9rem] text-ink-2">
            <input
              type="checkbox"
              checked={consents[keys[i]]}
              onChange={(e) => setConsents((prev) => ({ ...prev, [keys[i]]: e.target.checked }))}
              className="mt-1 h-4 w-4 shrink-0"
            />
            <span>{c.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-[0.85rem] text-ink-3">
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "rounded-full border-[1.5px] border-line bg-bg px-5 py-3.5 text-[0.95rem] text-ink outline-none transition-colors focus:border-accent focus:bg-white";

function optionClass(selected: boolean): string {
  return `rounded-xl border-[1.5px] px-5 py-4 text-left text-[0.9rem] transition-all ${
    selected ? "border-accent bg-gold-soft text-ink" : "border-line bg-bg text-ink hover:border-accent hover:bg-gold-soft"
  }`;
}
