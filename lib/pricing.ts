/**
 * Pricing: the single source of truth for every tier shown on the site.
 * Change a number here and the pricing page, homepage teaser, and room
 * pages all update on the next deploy.
 *
 * Positioning: premium. Prices reflect senior practitioner time, the AI
 * platform, and measured outcomes, and sit in line with the regional
 * market for board-level advisory. USD figures are rounded price points,
 * not live conversions (approx. KES 130 per USD).
 */

export interface Tier {
  key: string;
  name: string;
  label: string;
  priceKes: string; // "65,000" or "Free" or "From 385,000"
  priceUsd: string | null; // "495" or null when free
  period: "" | "/ month" | " one-time";
  fromPrice?: boolean;
  description: string;
  bestFor: string;
  cta: string;
  isCheckup?: boolean;
  highlighted?: boolean;
  features: string[];
}

export const TIERS: Tier[] = [
  {
    key: "diagnostic",
    name: "Free Diagnostic",
    label: "Start here",
    priceKes: "Free",
    priceUsd: null,
    period: "",
    description:
      "For founders who want to understand what is really blocking business growth before paying for support.",
    bestFor: "Founders seeking clarity",
    cta: "Take the Free Check-Up",
    isCheckup: true,
    features: [
      "Growth Readiness Score",
      "Business archetype",
      "Basic diagnosis",
      "Recommended next step",
      "Email summary of results",
    ],
  },
  {
    key: "starter",
    name: "Founder OS Starter",
    label: "Self-guided structure",
    priceKes: "25,000",
    priceUsd: "195",
    period: "/ month",
    description:
      "For early-stage founders who need simple structure, practical tools, and AI-guided business support.",
    bestFor: "Hustlers and early Operators",
    cta: "Start with Starter",
    features: [
      "AI business assistants",
      "Basic finance and operations templates",
      "Monthly founder checklist",
      "Saved diagnostic results",
      "Basic reports",
      "Recommended monthly actions",
    ],
  },
  {
    key: "growth",
    name: "Founder OS Growth",
    label: "Most useful for growing businesses",
    priceKes: "65,000",
    priceUsd: "495",
    period: "/ month",
    description:
      "For founders with revenue who need stronger systems, better reporting, and bankability readiness.",
    bestFor: "Operators and Stabilizers",
    cta: "Choose Growth",
    highlighted: true,
    features: [
      "All AI executive assistants",
      "Leadership dashboard: goals, team skills, friction points",
      "Data-backed decision briefs",
      "Full business template library",
      "Monthly business review report",
      "Bankability Score",
      "Growth action plan",
      "Quarterly diagnostic refresh",
      "Community access",
      "Monthly group review session",
    ],
  },
  {
    key: "review",
    name: "Business Readiness Review",
    label: "Expert interpretation",
    priceKes: "125,000",
    priceUsd: "950",
    period: " one-time",
    description:
      "For founders who want a senior practitioner to review their diagnostic results and translate them into a practical action plan.",
    bestFor: "Founders ready for expert guidance",
    cta: "Book a Review",
    features: [
      "Diagnostic review",
      "Expert strategy call",
      "Business readiness report",
      "30-day action plan",
      "Recommended support path",
      "Capital readiness view",
    ],
  },
  {
    key: "sprint",
    name: "Business Build Sprint",
    label: "Guided implementation",
    priceKes: "385,000",
    priceUsd: "2,950",
    period: " one-time",
    fromPrice: true,
    description:
      "A 4-week guided implementation sprint to fix the foundations: money, records, systems, reporting, and execution rhythm.",
    bestFor: "Founders ready to implement",
    cta: "Join the Sprint",
    features: [
      "4-week guided implementation",
      "Weekly accountability sessions",
      "Finance and operations setup",
      "Expert review",
      "Business structure toolkit",
      "90-day growth roadmap",
      "Group and private options available",
    ],
  },
  {
    key: "bench",
    name: "Virtual Executive Bench",
    label: "Premium support",
    priceKes: "520,000",
    priceUsd: "3,950",
    period: "/ month",
    fromPrice: true,
    description:
      "For growing companies that need senior finance, operations, growth, and strategic support without hiring a full executive team.",
    bestFor: "Scalers and growth-stage SMEs",
    cta: "Apply for Executive Support",
    features: [
      "Virtual CFO / COO / Growth support",
      "Full leadership decision cockpit, built for your business",
      "Team skills evaluation and upskilling plans",
      "Monthly management reporting",
      "Strategic advisory",
      "Founder review calls",
      "Investor or bank readiness",
      "Board-style reporting",
      "Integrated Executive Bench from KES 1,000,000 (USD 7,500)/month",
    ],
  },
];

/** "KES 65,000 (USD 495)" or "Free"; prefix "From " when fromPrice. */
export function priceLine(t: Tier): string {
  if (t.priceUsd === null) return t.priceKes;
  const base = `KES ${t.priceKes} (USD ${t.priceUsd})`;
  return t.fromPrice ? `From ${base}` : base;
}

/** Compact form for teasers: "KES 65K ($495)/mo" */
export function priceCompact(t: Tier): string {
  if (t.priceUsd === null) return t.priceKes;
  const kesNum = t.priceKes.replace(/,/g, "");
  const k = `${Math.round(parseInt(kesNum, 10) / 1000)}K`;
  const per = t.period === "/ month" ? "/mo" : "";
  const from = t.fromPrice ? "From " : "";
  return `${from}KES ${k} ($${t.priceUsd})${per}`;
}
