/**
 * CFO Innovation Partners — Q2 2026 impact data.
 * Source: CFOIP Monitoring, Evaluation and Impact Report Q2 2026.
 * All figures audited against published FY 2026 targets.
 */

export interface ImpactStat {
  num: string;
  label: string;
  note?: string;
}

export const HEADLINE_STATS: ImpactStat[] = [
  { num: "56", label: "Founders served", note: "Q2 2026" },
  {
    num: "44%",
    label: "Women founders",
    note: "vs ~17% commercial bank benchmark",
  },
  { num: "11", label: "Sectors represented" },
  {
    num: "16%",
    label: "Diagnostic-to-paid conversion",
    note: "vs 8–12% market benchmark",
  },
];

export const FOOTER_STATS: ImpactStat[] = [
  { num: "47", label: "Business Growth Check-Ups completed" },
  { num: "6", label: "Scale-Up Business Assessments completed" },
  { num: "~40", label: "Written personalised advisory letters" },
  { num: "100%", label: "Completed diagnostics routed to a next-step pathway" },
];

export interface SectorStat {
  name: string;
  count: number;
}

export const SECTORS_Q2_2026: SectorStat[] = [
  { name: "Agribusiness", count: 7 },
  { name: "Tech / Digital", count: 5 },
  { name: "Retail / Wholesale", count: 5 },
  { name: "Professional Services", count: 4 },
  { name: "Fashion / Apparel", count: 3 },
  { name: "Construction / Real Estate", count: 2 },
  { name: "Manufacturing", count: 2 },
  { name: "Health / Wellness", count: 2 },
  { name: "Logistics / Transport", count: 2 },
  { name: "Food / Beverage", count: 1 },
  { name: "Creative / Media", count: 1 },
];

export const CORE_BELIEF = {
  lines: [
    "Clarity before capital.",
    "Structure before scale.",
    "Capability before complexity.",
  ],
  blurb:
    "We believe most businesses do not fail to grow because founders lack ambition. They struggle because the business lacks the financial clarity, systems, governance, leadership rhythm, and decision-support infrastructure required for the next stage.",
  tagline: "Our work helps founders stop guessing and start building from evidence.",
};

export interface AdvisoryStep {
  num: string;
  name: string;
  description: string;
}

export const ADVISORY_MODEL: AdvisoryStep[] = [
  {
    num: "01",
    name: "Diagnose",
    description:
      "Assess business fundamentals, scale-up readiness, or advisory need through a structured instrument.",
  },
  {
    num: "02",
    name: "Interpret",
    description:
      "Classify the business by stage, archetype, profile, and binding constraint.",
  },
  {
    num: "03",
    name: "Recommend",
    description: "Provide a 90-day or 6-to-12-month action map with priorities ordered.",
  },
  {
    num: "04",
    name: "Advise",
    description:
      "Deliver expert input through advisory sessions, the Expert Advisory Panel, virtual board, or strategy committee.",
  },
  {
    num: "05",
    name: "Execute",
    description:
      "Deploy fractional CFO, operational, financial, systems, or investor readiness support.",
  },
  {
    num: "06",
    name: "Track",
    description:
      "Monitor progress through reports, KPIs, check-ins, and a defined accountability rhythm.",
  },
];

export const MARKET_INSIGHTS = [
  "Founders know their revenue better than their margins.",
  "Sales activity is consistently mistaken for business structure.",
  "Customer concentration is under-recognised as a risk.",
  "Many founders seek capital before they are operationally ready.",
  "Scale-ups are constrained by leadership, governance, and execution rhythm.",
  "Financial records remain the principal readiness gap.",
  "Founders want practical next steps, not generic training.",
  "Affordable senior advisory is a clear market need.",
];

export interface CaseStudy {
  archetype: string;
  score: string;
  sector: string;
  location: string;
  story: string;
  outcome: string;
  pathway: "A" | "B" | "C";
  pathwayLabel: string;
}

/**
 * Real vignettes from the Q2 2026 MEL report. Anonymised by sector
 * + classification — every detail is from a live engagement.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    archetype: "Scaler",
    score: "117 / 150",
    sector: "Woman-led manufacturing",
    location: "Kenya",
    story:
      "A woman founder running a five-year manufacturing business at over KES 500,000 monthly revenue, with a fully diversified customer base and a repaid formal loan, completed the Business Growth Check-Up and was classified as a Scaler.",
    outcome:
      "The advisory letter named the absence of a CRM and the unfiled tax position as the two highest-leverage unlocks. The founder replied within 48 hours, confirmed both as priorities for the next quarter, and was routed into a paid Monthly Membership at the Expert Advisory Panel.",
    pathway: "A",
    pathwayLabel: "Diagnostic → Action → Paid engagement",
  },
  {
    archetype: "Stabilizer",
    score: "103 / 150",
    sector: "Woman-led fashion",
    location: "Uganda",
    story:
      "A woman founder running a fashion business in Uganda completed the Business Growth Check-Up unprompted, scoring 103 of 150 as a Stabilizer.",
    outcome:
      "The advisory letter named URSB registration and a Uganda Revenue Authority Tax Identification Number as the two highest-leverage unlocks, with a defined sequence for both. The submission triggered the development of a Uganda-specific advisory routing capability inside CFOIP.",
    pathway: "C",
    pathwayLabel: "Cohort intelligence → Service expansion",
  },
  {
    archetype: "Scaler",
    score: "115 / 150",
    sector: "Woman-led herb-export agribusiness",
    location: "Kenya",
    story:
      "A woman founder running a five-year herb export agribusiness with cold-chain infrastructure, a formal Shareholder Agreement, and shareholders willing to inject further capital, completed the Business Growth Check-Up and surfaced as a Scaler.",
    outcome:
      "Founder replied to the advisory letter with substantive feedback, including the absence of a profitability question and a revenue band that capped below her actual position. CFOIP committed to a diagnostic upgrade and is scoping a custom advisory engagement.",
    pathway: "C",
    pathwayLabel: "Adaptive management — instrument refinement",
  },
];

export const FIVE_SEGMENTS = [
  {
    num: "01",
    name: "Early & growing founders",
    description:
      "Need financial clarity, structure, records, business model discipline, and a defined growth path.",
  },
  {
    num: "02",
    name: "SMEs & established businesses",
    description:
      "Need reporting, governance, systems, cash flow discipline, team accountability, and decision support.",
  },
  {
    num: "03",
    name: "Scale-ups",
    description:
      "Need fractional CFO and COO support, virtual board, strategy committee, capital readiness, and execution rhythm.",
  },
  {
    num: "04",
    name: "Accelerators & ESOs",
    description:
      "Need better portfolio diagnostics, founder segmentation, post-programme support, and readiness tracking.",
  },
  {
    num: "05",
    name: "Banks, investors & development partners",
    description:
      "Need stronger SME pipeline, better-prepared businesses, evidence-backed enterprise support, and capital readiness improvement.",
  },
];
