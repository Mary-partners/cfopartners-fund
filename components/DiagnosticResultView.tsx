import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { CheckupTrigger } from "@/components/CheckupTrigger";
import { CONTACT_EMAIL, mailto } from "@/lib/links";

export type DiagnosticResultView = {
  businessName: string;
  founderName: string;
  readinessBand: string;
  archetype: string;
  totalScore: number;
  pillars: Record<string, number>;
  capitalFitSegment: string;
  recommendedCapitalStructures: string[];
  unsuitableCapitalStructures: string[];
  topGaps: string[];
  founderOperatingLayerFlags: string[];
  leadTemperature: string;
  recommendedOffer: string;
};

const READINESS_LABEL: Record<string, string> = {
  FOUNDATION: "Foundation",
  GROWTH_READINESS: "Growth Readiness",
  SCALE_UP_SUPPORT_NEEDED: "Scale-Up Support Needed",
  CAPITAL_ADVISORY_READY: "Capital / Advisory Ready",
};

const ARCHETYPE_LABEL: Record<string, string> = {
  HUSTLER: "The Hustler",
  OPERATOR: "The Operator",
  STABILIZER: "The Stabilizer",
  SCALER: "The Scaler",
};

const PILLAR_LABEL: Record<string, string> = {
  financialClarity: "Financial Clarity",
  revenueQuality: "Revenue Quality",
  operations: "Operations",
  teamCapacity: "Team Capacity",
  governance: "Governance",
  capitalReadiness: "Capital Readiness",
  advisoryUrgency: "Advisory Urgency",
};

export function DiagnosticResultView({ result }: { result: DiagnosticResultView }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-3xl border-2 border-accent bg-white p-8 text-center">
        <p className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
          {result.founderName}, here's where {result.businessName} stands
        </p>
        <h2 className="mt-2 font-serif text-[2rem] leading-tight">
          {READINESS_LABEL[result.readinessBand] ?? result.readinessBand}
        </h2>
        <p className="mt-1 text-[0.95rem] text-ink-2">
          Archetype: <strong>{ARCHETYPE_LABEL[result.archetype] ?? result.archetype}</strong> · Score {result.totalScore}/21
        </p>
        <p className="mx-auto mt-4 max-w-[560px] text-[0.85rem] text-ink-3">
          This read is instant and automated — a full review of your answers by our team, with a personalised
          note, follows within 24 hours.
        </p>
      </div>

      <div className="rounded-3xl border border-line bg-white p-8">
        <h3 className="mb-4 font-serif text-[1.3rem]">Operational maturity, by pillar</h3>
        <div className="flex flex-col gap-3">
          {Object.entries(result.pillars).map(([key, score]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="w-40 shrink-0 text-[0.85rem] text-ink-2">{PILLAR_LABEL[key] ?? key}</span>
              <div className="h-2 flex-1 overflow-hidden rounded bg-bg-alt">
                <div className="h-full rounded bg-accent" style={{ width: `${(score / 3) * 100}%` }} />
              </div>
              <span className="w-8 shrink-0 text-right text-[0.85rem] text-ink-3">{score}/3</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-white p-8">
        <h3 className="mb-1 font-serif text-[1.3rem]">What kind of capital fits your business</h3>
        <p className="mb-5 text-[0.85rem] text-ink-3">Profile: {result.capitalFitSegment}</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[0.85rem] font-semibold text-ink">
              <CheckCircle2 className="h-4 w-4 text-accent" /> Worth exploring
            </p>
            <ul className="flex flex-col gap-1.5 text-[0.9rem] text-ink-2">
              {result.recommendedCapitalStructures.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[0.85rem] font-semibold text-ink">
              <XCircle className="h-4 w-4 text-ink-3" /> Not a fit right now
            </p>
            <ul className="flex flex-col gap-1.5 text-[0.9rem] text-ink-2">
              {result.unsuitableCapitalStructures.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {result.topGaps.length > 0 && (
        <div className="rounded-3xl border border-line bg-white p-8">
          <h3 className="mb-3 font-serif text-[1.3rem]">Your top gaps right now</h3>
          <ul className="flex flex-wrap gap-2">
            {result.topGaps.map((g) => (
              <li key={g} className="rounded-full bg-gold-soft px-3 py-1.5 text-[0.85rem] text-ink">
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-3xl border-2 border-ink bg-ink p-8 text-center text-white">
        <h3 className="font-serif text-[1.4rem]">What we'd recommend next</h3>
        <p className="mx-auto mt-2 max-w-[480px] text-[0.95rem] text-white/80">{result.recommendedOffer}</p>
        <a
          href={mailto(`Following up on my Founder Diagnostic — ${result.businessName}`)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-accent-2"
        >
          Talk to our team <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mt-4 text-[0.8rem] text-white/60">Or email {CONTACT_EMAIL} any time.</p>
      </div>
    </div>
  );
}

export function DiagnosticAnotherCta() {
  return (
    <div className="text-center">
      <CheckupTrigger variant="outline">Know another founder who should take this?</CheckupTrigger>
    </div>
  );
}
