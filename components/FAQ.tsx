"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "How is CFO Partners different from accounting software?",
    a: "Accounting software records what already happened. We help you decide what to do next. Our diagnostics show where the business stands, our advisory names what is blocking growth, and our execution support helps you fix it. Many of our clients use QuickBooks or Zoho alongside us; the two solve different problems.",
  },
  {
    q: "Do I need a finance background to work with you?",
    a: "No. The diagnostic is written in plain language and takes about ten minutes. Every recommendation we make comes with an explanation of why it matters and what to do about it. Most of the founders we serve have never worked with a CFO before.",
  },
  {
    q: "My business is pre-revenue. Is this for me?",
    a: "Yes. The Business Growth Check-Up covers idea-stage and early-revenue businesses, and around a third of our Q2 2026 cohort was at that stage. The earlier you put structure in place, the cheaper it is to build.",
  },
  {
    q: "How long does it take to get started?",
    a: "The free diagnostic takes about ten minutes and you receive your classification and recommended next step shortly after. Paid engagements typically begin within one to two weeks of a discovery call.",
  },
  {
    q: "Is my business data safe?",
    a: "Yes. Diagnostic responses are stored securely, we never sell or share founder data, and anything you share in an advisory engagement is covered by confidentiality terms in our engagement letter.",
  },
  {
    q: "Do you work with accelerators, banks, and investors?",
    a: "Yes. Our Portfolio Intelligence Platform serves institutions that support many businesses at once: cohort diagnostics, readiness scoring, founder segmentation, and progress tracking. Write to us for institutional pricing.",
  },
  {
    q: "What happens after I complete the free diagnostic?",
    a: "You receive your archetype classification, a six-pillar scorecard, and a written recommendation on what to fix first. Every completed diagnostic is routed to a named next step. There is no obligation to buy anything.",
  },
  {
    q: "Can I cancel a subscription?",
    a: "Yes. Monthly plans can be cancelled at any time and you keep access until the end of the billing period. Sprint and review engagements are one-time purchases with no ongoing commitment.",
  },
];

/**
 * Accessible accordion. One item open at a time.
 */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-card border border-line bg-white">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-bg"
            >
              <span className="text-[1rem] font-semibold text-ink">
                {item.q}
              </span>
              <ChevronDown
                className={`h-5 w-5 flex-none text-accent-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className="grid overflow-hidden px-6 transition-all duration-300"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                paddingBottom: isOpen ? "20px" : "0px",
              }}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="m-0 max-w-[720px] text-[0.95rem] leading-7 text-ink-2">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
