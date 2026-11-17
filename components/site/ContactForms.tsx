"use client";

import { useEffect, useState } from "react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import type { EnquiryKind } from "@/lib/content/types";

const TABS: { kind: EnquiryKind; label: string; note: string }[] = [
  {
    kind: "institutional",
    label: "Funds, DFIs and programmes",
    note: "For investment funds, lenders, DFIs, foundations, accelerators and development partners.",
  },
  {
    kind: "sme",
    label: "Growing businesses",
    note: "For founders and finance leads of growing businesses.",
  },
];

/** Two enquiry forms behind an accessible tab switch; ?enquiry=sme preselects. */
export function ContactForms() {
  const [active, setActive] = useState<EnquiryKind>("institutional");
  const [offer, setOffer] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("enquiry");
    if (q === "sme" || q === "institutional") setActive(q);
    setOffer(params.get("offer") ?? undefined);
  }, []);

  function onKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = active === "institutional" ? "sme" : "institutional";
      setActive(next);
      document.getElementById(`tab-${next}`)?.focus();
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Who is the enquiry from?" className="mb-5 inline-flex flex-wrap gap-2 rounded-full border border-line bg-white p-1.5">
        {TABS.map((t) => (
          <button
            key={t.kind}
            id={`tab-${t.kind}`}
            role="tab"
            type="button"
            aria-selected={active === t.kind}
            aria-controls={`panel-${t.kind}`}
            tabIndex={active === t.kind ? 0 : -1}
            onClick={() => setActive(t.kind)}
            onKeyDown={onKey}
            className={`rounded-full px-4 py-2 text-[0.9rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 ${
              active === t.kind ? "bg-ink text-white" : "text-ink-2 hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t) => (
        <div
          key={t.kind}
          id={`panel-${t.kind}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.kind}`}
          hidden={active !== t.kind}
        >
          <p className="mb-4 text-[0.95rem] text-ink-2">{t.note}</p>
          {/* Remount once the offer is read so the select picks up the default. */}
          <EnquiryForm key={`${t.kind}-${offer ?? ""}`} kind={t.kind} defaultOffer={offer} />
        </div>
      ))}
    </div>
  );
}
