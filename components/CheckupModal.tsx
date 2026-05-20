"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCheckup } from "./CheckupProvider";
import {
  ARCHETYPES,
  PILLARS,
  QUESTIONS,
  archetypeFor,
  type Archetype,
  type PillarKey,
} from "@/lib/checkup-data";

type Screen = "intro" | "question" | "lead" | "results";

interface LeadData {
  name: string;
  email: string;
  business: string;
  phone: string;
  country: string;
  role: string;
}

const initialLead: LeadData = {
  name: "",
  email: "",
  business: "",
  phone: "",
  country: "Kenya",
  role: "Founder/Owner",
};

export function CheckupModal() {
  const { isOpen, close } = useCheckup();
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(QUESTIONS.length).fill(null),
  );
  const [lead, setLead] = useState<LeadData>(initialLead);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Reset state every time we open
  useEffect(() => {
    if (isOpen) {
      setScreen("intro");
      setCurrentQ(0);
      setAnswers(new Array(QUESTIONS.length).fill(null));
      setLead(initialLead);
      setError(null);
      setSubmitting(false);
    }
  }, [isOpen]);

  // Keyboard nav
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (screen !== "question") return;
      if (e.key === "ArrowRight") nextQuestion();
      else if (e.key === "ArrowLeft") prevQuestion();
      else if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        selectOption(idx);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, screen, currentQ, answers]);

  const selectOption = (i: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = i;
      return next;
    });
  };

  const nextQuestion = () => {
    if (answers[currentQ] === null) return;
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setScreen("lead");
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  };

  const results = useMemo(() => {
    const pillarScores: Record<PillarKey, number> = {
      revenue: 0,
      customer: 0,
      cost: 0,
      finance: 0,
      ops: 0,
      growth: 0,
    };
    QUESTIONS.forEach((q, i) => {
      const idx = answers[i];
      if (idx !== null) pillarScores[q.pillar] += q.a[idx].s;
    });
    const total = Object.values(pillarScores).reduce((a, b) => a + b, 0);
    const archetype = archetypeFor(total);
    return { pillarScores, total, archetype };
  }, [answers]);

  const getSource = () => {
    if (typeof window === "undefined") return "direct";
    const params = new URLSearchParams(window.location.search);
    return (
      params.get("source") ||
      params.get("utm_source") ||
      document.referrer ||
      "direct"
    );
  };

  const submitLead = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      if (!lead.name.trim() || !lead.email.trim()) {
        setError("Please fill in your name and email.");
        return;
      }
      setSubmitting(true);

      const payload = {
        ...lead,
        source: getSource(),
        submittedAt: new Date().toISOString(),
        total: results.total,
        archetype: results.archetype.key,
        tier: results.archetype.tier,
        pillarScores: results.pillarScores,
        answers: answers,
      };

      // localStorage backup — always works
      try {
        const existing = JSON.parse(
          localStorage.getItem("cfopartners_leads") || "[]",
        );
        existing.push(payload);
        localStorage.setItem(
          "cfopartners_leads",
          JSON.stringify(existing),
        );
      } catch {
        /* ignore */
      }

      // Server-side capture
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("Lead submit to /api/leads failed", err);
      }

      setSubmitting(false);
      setScreen("results");
    },
    [lead, answers, results],
  );

  const downloadReport = () => {
    const { pillarScores, total, archetype } = results;
    const lines = [
      "CFO PARTNERS — BUSINESS GROWTH CHECK-UP",
      "========================================",
      "",
      `Name: ${lead.name}`,
      `Business: ${lead.business || "(not provided)"}`,
      `Email: ${lead.email}`,
      `Country: ${lead.country}`,
      `Date: ${new Date().toLocaleDateString()}`,
      "",
      `ARCHETYPE: ${archetype.key}`,
      `SCORE: ${total} / 150`,
      "",
      "PILLAR BREAKDOWN",
      "----------------",
      ...PILLARS.map((p) => `${p.name}: ${pillarScores[p.key]} / 25`),
      "",
      "RECOMMENDED TIER",
      "----------------",
      `${archetype.tier} — ${archetype.tierPrice}`,
      "",
      archetype.blurb,
      "",
      "----",
      "Next step: book a discovery call at hello@cfopartners.fund",
      "https://www.cfopartners.fund/",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CFOPartners_Check-Up_${(lead.name || "results").replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkup-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        className="modal-scroll relative max-h-[92vh] w-full max-w-[720px] animate-modal-in overflow-y-auto rounded-[20px] bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg-alt text-ink hover:bg-line"
        >
          ×
        </button>
        <div className="p-10 max-sm:p-6">
          {screen === "intro" && <IntroScreen onBegin={() => setScreen("question")} />}
          {screen === "question" && (
            <QuestionScreen
              index={currentQ}
              selected={answers[currentQ]}
              onSelect={selectOption}
              onNext={nextQuestion}
              onPrev={prevQuestion}
            />
          )}
          {screen === "lead" && (
            <LeadFormScreen
              lead={lead}
              setLead={setLead}
              onSubmit={submitLead}
              onBack={() => {
                setCurrentQ(QUESTIONS.length - 1);
                setScreen("question");
              }}
              submitting={submitting}
              error={error}
            />
          )}
          {screen === "results" && (
            <ResultsScreen
              pillarScores={results.pillarScores}
              total={results.total}
              archetype={results.archetype}
              onDownload={downloadReport}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function IntroScreen({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="py-5 text-center">
      <span className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-ink-3">
        Business Growth Check-Up
      </span>
      <h2 id="checkup-title" className="my-3 font-serif text-[1.8rem]">
        Where does your business actually stand?
      </h2>
      <p className="mx-auto mb-7 max-w-[480px] text-ink-2">
        30 questions. About 10 minutes. We score your business across 6 pillars and
        match you to one of four founder archetypes — so you know exactly what to
        do next.
      </p>
      <button
        type="button"
        onClick={onBegin}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-white transition-all hover:bg-accent-2 hover:-translate-y-0.5 hover:shadow-card"
      >
        Begin Check-Up →
      </button>
      <p className="mt-[18px] text-[0.82rem] text-ink-3">
        No credit card. Your data stays private.
      </p>
    </div>
  );
}

function QuestionScreen({
  index,
  selected,
  onSelect,
  onNext,
  onPrev,
}: {
  index: number;
  selected: number | null;
  onSelect: (i: number) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const q = QUESTIONS[index];
  const pillar = PILLARS.find((p) => p.key === q.pillar)!;
  const pct = ((index + 1) / QUESTIONS.length) * 100;

  return (
    <div>
      <div className="mb-6 h-1 overflow-hidden rounded-sm bg-bg-alt">
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mb-2 text-[0.82rem] font-semibold uppercase tracking-[0.06em] text-ink-3">
        Question {index + 1} of {QUESTIONS.length}
      </div>
      <div className="mb-1 text-[0.85rem] font-semibold text-accent-2">
        {pillar.name}
      </div>
      <div className="mt-2 mb-6 font-serif text-[1.35rem] leading-[1.3] text-ink">
        {q.q}
      </div>
      <div className="flex flex-col gap-2.5" role="radiogroup">
        {q.a.map((opt, i) => {
          const isSelected = selected === i;
          return (
            <button
              type="button"
              key={i}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(i)}
              className={`flex items-center gap-3.5 rounded-xl border-[1.5px] px-5 py-4 text-left text-[0.97rem] leading-[1.4] transition-all ${
                isSelected
                  ? "border-accent bg-gold-soft"
                  : "border-line bg-bg hover:border-accent hover:bg-gold-soft"
              }`}
            >
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[0.85rem] font-semibold ${
                  isSelected
                    ? "border-[1.5px] border-accent bg-accent text-white"
                    : "border-[1.5px] border-line bg-white text-ink-3"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-ink">{opt.t}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-7 flex justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          className={`rounded-full px-4 py-2.5 text-[0.95rem] font-semibold text-ink-2 hover:text-ink ${index === 0 ? "invisible" : ""}`}
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={selected === null}
          className="rounded-full bg-ink px-[22px] py-[14px] text-[0.95rem] font-semibold text-white transition-all hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {index === QUESTIONS.length - 1 ? "See results" : "Next →"}
        </button>
      </div>
    </div>
  );
}

function LeadFormScreen({
  lead,
  setLead,
  onSubmit,
  onBack,
  submitting,
  error,
}: {
  lead: LeadData;
  setLead: React.Dispatch<React.SetStateAction<LeadData>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const update =
    (key: keyof LeadData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setLead((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div>
      <span className="text-[0.85rem] font-semibold text-accent-2">
        Last step
      </span>
      <h2 className="mb-3 mt-1.5 font-serif text-[1.6rem]">
        Where should we send your results?
      </h2>
      <p className="mb-[22px] text-ink-2">
        We&apos;ll show your archetype and tier match on the next screen — and
        email you a downloadable copy.
      </p>
      {error && (
        <div className="mb-3.5 rounded-lg bg-red-50 px-3.5 py-3 text-[0.88rem] text-red-700">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <Field label="Your name *" required>
            <input
              type="text"
              required
              maxLength={80}
              value={lead.name}
              onChange={update("name")}
              className="w-full rounded-[10px] border-[1.5px] border-line bg-bg px-3.5 py-3 text-[0.95rem] text-ink transition-colors focus:border-accent focus:bg-white focus:outline-none"
            />
          </Field>
          <Field label="Email *" required>
            <input
              type="email"
              required
              maxLength={120}
              value={lead.email}
              onChange={update("email")}
              className="w-full rounded-[10px] border-[1.5px] border-line bg-bg px-3.5 py-3 text-[0.95rem] text-ink transition-colors focus:border-accent focus:bg-white focus:outline-none"
            />
          </Field>
          <Field label="Business name">
            <input
              type="text"
              maxLength={120}
              value={lead.business}
              onChange={update("business")}
              className="w-full rounded-[10px] border-[1.5px] border-line bg-bg px-3.5 py-3 text-[0.95rem] text-ink transition-colors focus:border-accent focus:bg-white focus:outline-none"
            />
          </Field>
          <Field label="Phone (optional)">
            <input
              type="tel"
              maxLength={30}
              value={lead.phone}
              onChange={update("phone")}
              className="w-full rounded-[10px] border-[1.5px] border-line bg-bg px-3.5 py-3 text-[0.95rem] text-ink transition-colors focus:border-accent focus:bg-white focus:outline-none"
            />
          </Field>
          <Field label="Country">
            <select
              value={lead.country}
              onChange={update("country")}
              className="w-full rounded-[10px] border-[1.5px] border-line bg-bg px-3.5 py-3 text-[0.95rem] text-ink transition-colors focus:border-accent focus:bg-white focus:outline-none"
            >
              {[
                "Kenya",
                "Uganda",
                "Tanzania",
                "Rwanda",
                "Nigeria",
                "South Africa",
                "Ghana",
                "Other",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Your role">
            <select
              value={lead.role}
              onChange={update("role")}
              className="w-full rounded-[10px] border-[1.5px] border-line bg-bg px-3.5 py-3 text-[0.95rem] text-ink transition-colors focus:border-accent focus:bg-white focus:outline-none"
            >
              {[
                "Founder/Owner",
                "Co-founder",
                "CEO/MD",
                "Finance lead",
                "Other",
              ].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <p className="mt-4 text-[0.78rem] text-ink-3">
          By submitting, you agree to our use of your contact info to share
          your results and occasionally relevant updates. We don&apos;t sell
          your data.
        </p>
        <div className="mt-7 flex justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full px-4 py-2.5 text-[0.95rem] font-semibold text-ink-2 hover:text-ink"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-accent px-[22px] py-[14px] text-[0.95rem] font-semibold text-white transition-all hover:bg-accent-2 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Show my results →"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.82rem] font-semibold text-ink-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function ResultsScreen({
  pillarScores,
  total,
  archetype,
  onDownload,
}: {
  pillarScores: Record<PillarKey, number>;
  total: number;
  archetype: Archetype;
  onDownload: () => void;
}) {
  return (
    <div>
      <div className="mb-7 rounded-[14px] bg-ink px-8 py-8 text-center text-white">
        <div className="text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-accent">
          Your archetype
        </div>
        <h2 className="my-2 font-serif text-[2.2rem] text-white">
          {archetype.key}
        </h2>
        <div className="text-base text-slate-300">Score: {total} / 150</div>
      </div>

      <h3 className="mb-3.5 text-[1.1rem] font-semibold">Your 6 pillars</h3>
      <div className="mb-8">
        {PILLARS.map((p) => {
          const pct = (pillarScores[p.key] / 25) * 100;
          return (
            <div key={p.key} className="mb-3">
              <div className="mb-1 flex justify-between text-[0.88rem]">
                <span className="font-medium text-ink">{p.name}</span>
                <span className="text-ink-3">{pillarScores[p.key]} / 25</span>
              </div>
              <div className="h-2 overflow-hidden rounded-sm bg-bg-alt">
                <div
                  className="h-full rounded-sm bg-accent transition-[width] duration-700 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-6 rounded-xl border-l-4 border-accent bg-gold-soft px-6 py-6">
        <h3 className="mb-1.5 text-[1.1rem] font-semibold">
          Recommended tier: {archetype.tier}
        </h3>
        <p className="mb-2.5 text-[0.85rem] text-ink-3">{archetype.tierPrice}</p>
        <p className="text-[0.95rem] text-ink-2">{archetype.blurb}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="flex-1 min-w-[160px] rounded-full bg-accent px-[22px] py-[14px] text-[0.95rem] font-semibold text-white transition-all hover:bg-accent-2"
        >
          Download results
        </button>
        <a
          className="flex-1 min-w-[160px] rounded-full border-[1.5px] border-ink bg-transparent px-[22px] py-[14px] text-center text-[0.95rem] font-semibold text-ink transition-all hover:bg-ink hover:text-white"
          href={`mailto:hello@cfopartners.fund?subject=${encodeURIComponent(`Check-Up follow-up — ${archetype.key}`)}&body=${encodeURIComponent(`Hi, I just completed the Business Growth Check-Up and was matched to ${archetype.key} / ${archetype.tier}. I would like to discuss next steps.`)}`}
        >
          Book a call
        </a>
      </div>
      <p className="mt-[18px] text-center text-[0.82rem] text-ink-3">
        A copy of these results has been logged. We&apos;ll be in touch within 2
        business days.
      </p>
    </div>
  );
}
