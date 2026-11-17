/**
 * Figures and content shown on the public site.
 *
 * Every published number needs a source, period, definition and approval
 * before it goes here. FOUNDER_EXPERIENCE is the owner-approved master set
 * (confirmed Nov 2026); evidence for each figure is held by CFOIP.
 */

export interface ImpactStat {
  num: string;
  label: string;
  note?: string;
}

/**
 * Founder's professional experience, including work before CFOIP was
 * established. Always present these as the founder's experience, and the
 * investment figure as recommendations for consideration, never capital raised.
 */
export const FOUNDER_EXPERIENCE: ImpactStat[] = [
  { num: "12+", label: "Years in SME finance and investment advisory" },
  { num: "2,000+", label: "Businesses supported across 11 sectors" },
  { num: "50+", label: "Enterprises recommended for investment consideration (USD 100K–500K)" },
  { num: "15+", label: "OceanHub Africa portfolio businesses supported" },
  { num: "800+", label: "SMEs reached through enterprise programmes" },
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
 * + classification. Every detail is from a live engagement.
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
      "The advisory letter named the absence of a CRM and the unfiled tax position as the two highest-leverage unlocks. The founder replied within 48 hours, confirmed both as priorities for the next quarter, and moved into ongoing advisory support.",
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
    pathwayLabel: "Adaptive management: instrument refinement",
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
