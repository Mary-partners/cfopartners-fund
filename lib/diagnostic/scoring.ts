import { ALL_QUESTIONS, type PillarKey, type Question } from "./questions";

/**
 * FIRST-DRAFT scoring engine — see docs/decision-log.md "Founder Diagnostic
 * automation" for the full reasoning. There is no documented live formula
 * for the current 40-question/7-pillar instrument (only one exists for an
 * older, superseded 30-question/6-pillar version); today a human scores
 * each submission by hand. Per an explicit decision, this adapts that old
 * rubric's method — score each answer by its option's position, best to
 * worst — onto the current question set, grouped into the current seven
 * pillars using the exact Q-to-pillar mapping stated in Notion's
 * "Diagnostic Framework — Master Synthesis" doc where it exists (Team
 * Capacity = Q4,Q10; Capital Readiness = Q15-17) and a best-effort,
 * explicitly-a-draft grouping for the rest. Mary/Alex/Esther should treat
 * these thresholds and groupings as a starting point to refine against
 * real submissions — exactly how they describe their own capital-fit
 * heuristic in that same document.
 */

export type DiagnosticAnswers = Record<string, string | string[] | undefined>;

const PILLAR_LABELS: Record<PillarKey, string> = {
  financialClarity: "Financial Clarity",
  revenueQuality: "Revenue Quality",
  operations: "Operations",
  teamCapacity: "Team Capacity",
  governance: "Governance",
  capitalReadiness: "Capital Readiness",
  advisoryUrgency: "Advisory Urgency",
};

const PILLAR_ORDER: PillarKey[] = [
  "financialClarity",
  "revenueQuality",
  "operations",
  "teamCapacity",
  "governance",
  "capitalReadiness",
  "advisoryUrgency",
];

export type ReadinessBand = "FOUNDATION" | "GROWTH_READINESS" | "SCALE_UP_SUPPORT_NEEDED" | "CAPITAL_ADVISORY_READY";
export type FounderArchetype = "HUSTLER" | "OPERATOR" | "STABILIZER" | "SCALER";
export type LeadTemperature = "HOT" | "WARM" | "NURTURE" | "COLD";

const READINESS_LABELS: Record<ReadinessBand, string> = {
  FOUNDATION: "Foundation (7-10)",
  GROWTH_READINESS: "Growth Readiness (11-15)",
  SCALE_UP_SUPPORT_NEEDED: "Scale-Up Support Needed (16-19)",
  CAPITAL_ADVISORY_READY: "Capital / Advisory Ready (20-21)",
};

const ARCHETYPE_LABELS: Record<FounderArchetype, string> = {
  HUSTLER: "The Hustler",
  OPERATOR: "The Operator",
  STABILIZER: "The Stabilizer",
  SCALER: "The Scaler",
};

/** 0-5 points for a select answer by its best-to-worst rank among N options. */
function scoreForRank(rank: number, optionCount: number): number {
  if (optionCount <= 1) return 5;
  return Math.round(((optionCount - 1 - rank) / (optionCount - 1)) * 5);
}

function scoreSelectQuestion(question: Question, answer: string | undefined): number | null {
  if (!question.scoredOptions || !answer) return null;
  const rank = question.scoredOptions.indexOf(answer);
  if (rank === -1) return null;
  return scoreForRank(rank, question.scoredOptions.length);
}

function scoreMultiSelectReadinessQuestion(question: Question, answer: string[] | undefined): number | null {
  if (!question.scoredOptions) return null;
  if (!answer || answer.length === 0) return 0;
  const negativeOptions = new Set(["None of the above yet — I need help preparing these", "Not applicable — I am not raising"]);
  if (answer.some((a) => negativeOptions.has(a))) return 0;
  const positiveOptionCount = question.scoredOptions.filter((o) => !negativeOptions.has(o)).length;
  const fraction = Math.min(answer.length / Math.max(positiveOptionCount, 1), 1);
  return Math.round(fraction * 5);
}

/** A single question's 0-5 points, or null if unanswered/not pillar-scored. */
function scoreQuestion(question: Question, answers: DiagnosticAnswers): number | null {
  if (!question.pillar) return null;
  const answer = answers[question.id];
  if (question.type === "multi_select") {
    return scoreMultiSelectReadinessQuestion(question, answer as string[] | undefined);
  }
  return scoreSelectQuestion(question, answer as string | undefined);
}

/** Pillar score 1-3, from the average 0-5 point value of its questions. */
function computePillarScore(pillar: PillarKey, answers: DiagnosticAnswers): number {
  const questions = ALL_QUESTIONS.filter((q) => q.pillar === pillar);
  const points = questions.map((q) => scoreQuestion(q, answers)).filter((p): p is number => p !== null);
  if (points.length === 0) return 1;
  const avg = points.reduce((sum, p) => sum + p, 0) / points.length;
  const fraction = avg / 5;
  if (fraction >= 2 / 3) return 3;
  if (fraction >= 1 / 3) return 2;
  return 1;
}

function bandForTotal(total: number): ReadinessBand {
  if (total >= 20) return "CAPITAL_ADVISORY_READY";
  if (total >= 16) return "SCALE_UP_SUPPORT_NEEDED";
  if (total >= 11) return "GROWTH_READINESS";
  return "FOUNDATION";
}

const ARCHETYPE_FOR_BAND: Record<ReadinessBand, FounderArchetype> = {
  FOUNDATION: "HUSTLER",
  GROWTH_READINESS: "OPERATOR",
  SCALE_UP_SUPPORT_NEEDED: "STABILIZER",
  CAPITAL_ADVISORY_READY: "SCALER",
};

export type PillarResult = { pillar: PillarKey; label: string; score: number };

export type OperationalMaturityResult = {
  pillars: PillarResult[];
  totalScore: number;
  readinessBand: ReadinessBand;
  readinessLabel: string;
  archetype: FounderArchetype;
  archetypeLabel: string;
};

export function computeOperationalMaturity(answers: DiagnosticAnswers): OperationalMaturityResult {
  const pillars = PILLAR_ORDER.map((pillar) => ({
    pillar,
    label: PILLAR_LABELS[pillar],
    score: computePillarScore(pillar, answers),
  }));
  const totalScore = pillars.reduce((sum, p) => sum + p.score, 0);
  const readinessBand = bandForTotal(totalScore);
  return {
    pillars,
    totalScore,
    readinessBand,
    readinessLabel: READINESS_LABELS[readinessBand],
    archetype: ARCHETYPE_FOR_BAND[readinessBand],
    archetypeLabel: ARCHETYPE_LABELS[ARCHETYPE_FOR_BAND[readinessBand]],
  };
}

// --- Capital Fit (Q30-39) ---------------------------------------------
// Transcribes the "Segment matching table (first-draft heuristic)" from
// Notion's Diagnostic Framework doc directly — not an invented rule. Still
// explicitly a first draft in that source document.

export type CapitalFitResult = {
  segment: string;
  recommended: string[];
  unsuitable: string[];
};

function val(answers: DiagnosticAnswers, id: string): string {
  return (answers[id] as string | undefined) ?? "";
}

export function computeCapitalFit(answers: DiagnosticAnswers): CapitalFitResult {
  const revenue = val(answers, "q30");
  const maturity = val(answers, "q31");
  const collateral = val(answers, "q32");
  const intensity = val(answers, "q33");
  const market = val(answers, "q34");
  const growth = val(answers, "q35");
  const margin = val(answers, "q36");
  const ownership = val(answers, "q37");
  const fx = val(answers, "q39");

  const segment = `${revenue || "Not stated"} · ${maturity || "Not stated"} · ${collateral || "Not stated"} · ${intensity || "Not stated"} · ${market || "Not stated"} · ${growth || "Not stated"} · ${margin || "Not stated"}`;

  let recommended: string[] = [];
  let unsuitable: string[] = [];

  const isPreRevenueOrNovel = revenue === "Pre-revenue — not yet selling" || maturity.startsWith("Novel");
  const hasNoCollateral = collateral === "No meaningful collateral";
  const isLightAndPortable = intensity.startsWith("Light") && (market.startsWith("Significant") || market.startsWith("Moderate"));
  const isHighMargin = margin.startsWith("High") || margin.startsWith("Medium to High");
  const isHighGrowth = growth.startsWith("High") || growth.startsWith("Medium to High");
  const isRecurring = revenue === "Fully recurring and predictable" || revenue.startsWith("Emerging repeatability");
  const isMature = maturity.startsWith("Mature");
  const hasStrongCollateral = collateral.startsWith("Strong");
  const isHeavy = intensity.startsWith("High");
  const isConstrained = market.startsWith("Constrained");
  const isLowGrowth = growth.startsWith("Low");
  const isLowMargin = margin.startsWith("Low");

  if (isPreRevenueOrNovel) {
    // Profile A
    recommended = ["Grant", "Angel investment", "Convertible note"];
    unsuitable = ["Working capital loan", "Asset finance"];
  } else if (isLightAndPortable && isHighMargin && (isHighGrowth || isRecurring)) {
    // Profile D
    recommended = ["Venture equity", "Convertible note", "Revenue-based financing"];
    unsuitable = ["Asset finance"];
  } else if (isMature && hasStrongCollateral && isHeavy && isConstrained && isLowGrowth && isLowMargin) {
    // Profile C
    recommended = ["Working capital loan", "Asset finance", "Patient equity"];
    unsuitable = ["Venture equity", "Grant"];
  } else if (isRecurring && isMature && hasNoCollateral) {
    // Profile E
    recommended = ["Revenue-based financing", "Redeemable equity", "Patient equity"];
    unsuitable = ["Bank debt", "Venture equity"];
  } else {
    // Profile B — the general "early revenue, validated, some collateral" default
    recommended = ["Revenue-based financing", "Working capital loan", "Angel investment"];
    unsuitable = ["Venture equity", "Long-tenor bank debt"];
  }

  // Interpretation filter overrides (Q37, Q39) — stated explicitly in the source doc.
  if (ownership.startsWith("Very important")) {
    recommended = recommended.filter((r) => r !== "Venture equity" && r !== "Patient equity");
    if (!recommended.includes("Revenue-based financing")) recommended.push("Revenue-based financing");
    if (!unsuitable.includes("Venture equity")) unsuitable.push("Venture equity");
  }
  if (fx.startsWith("High exposure")) {
    recommended = recommended.filter((r) => r !== "Venture equity");
    if (!recommended.includes("Grant")) recommended.unshift("Grant");
  }

  return { segment, recommended: Array.from(new Set(recommended)), unsuitable: Array.from(new Set(unsuitable)) };
}

// --- Directly-observable gaps and founder flags -------------------------
// Each tag below corresponds to one specific weak answer — nothing here is
// inferred or judged, only reported back.

const GAP_RULES: { test: (a: DiagnosticAnswers) => boolean; gap: string }[] = [
  { test: (a) => val(a, "q8") === "No", gap: "Poor financial records" },
  { test: (a) => val(a, "q7") === "No", gap: "Weak revenue clarity" },
  { test: (a) => val(a, "q36").startsWith("Low"), gap: "Weak cost visibility" },
  { test: (a) => val(a, "q11") === "No", gap: "No documented processes" },
  { test: (a) => val(a, "q12") === "No", gap: "No KPI dashboard" },
  { test: (a) => val(a, "q10") === "Yes — almost everything depends on me", gap: "Founder dependency" },
  { test: (a) => val(a, "q13") === "No", gap: "Weak governance" },
  { test: (a) => val(a, "q9") !== "Yes", gap: "No cash buffer" },
  { test: (a) => val(a, "q5") === "No", gap: "Personal funds mixed with business" },
  {
    test: (a) => {
      const q17 = a.q17 as string[] | undefined;
      return !q17 || q17.includes("None of the above yet — I need help preparing these");
    },
    gap: "Weak investor / bank readiness",
  },
];

export function computeTopGaps(answers: DiagnosticAnswers): string[] {
  return GAP_RULES.filter((r) => r.test(answers)).map((r) => r.gap).slice(0, 3);
}

const LAYER_FLAG_RULES: { test: (a: DiagnosticAnswers) => boolean; flag: string }[] = [
  {
    test: (a) => val(a, "q26") === "Depleted — burning out" || val(a, "q26") === "Recovering — coming back from burnout",
    flag: "Mind and Emotion — the mental operating system",
  },
  { test: (a) => val(a, "q29") !== "No — current trajectory is forward", flag: "Internal Turmoil — navigating the self" },
  { test: (a) => val(a, "q24") === "Break — hit a wall and reassessing", flag: "External Chaos — surviving the terrain" },
  { test: (a) => val(a, "q24") === "Legacy — focused on long-term impact", flag: "Legacy and Identity — beyond survival" },
];

export function computeFounderOperatingLayerFlags(answers: DiagnosticAnswers): string[] {
  return LAYER_FLAG_RULES.filter((r) => r.test(answers)).map((r) => r.flag);
}

export function computeLeadTemperature(answers: DiagnosticAnswers): LeadTemperature {
  const urgency = val(answers, "q19");
  const willingness = val(answers, "q20");
  if (urgency === "Immediate" && (willingness === "Yes immediately" || willingness === "Yes within 30 days")) return "HOT";
  if (urgency === "Within 30 days" || willingness === "Yes immediately") return "WARM";
  if (willingness === "Not right now") return "COLD";
  return "NURTURE";
}

const OFFER_BY_BAND: Record<ReadinessBand, string> = {
  FOUNDATION: "Founder Diagnostic Report (KES 5-10K)",
  GROWTH_READINESS: "Expert Advisory Panel (KES 20K)",
  SCALE_UP_SUPPORT_NEEDED: "90-Day Advisory Support (KES 50K+/mo)",
  CAPITAL_ADVISORY_READY: "Scale-Up Diagnostic + Virtual Board / Fractional CFO",
};

export function computeRecommendedOffer(readinessBand: ReadinessBand): string {
  return OFFER_BY_BAND[readinessBand];
}

export type DiagnosticResult = {
  maturity: OperationalMaturityResult;
  capitalFit: CapitalFitResult;
  topGaps: string[];
  founderOperatingLayerFlags: string[];
  leadTemperature: LeadTemperature;
  recommendedOffer: string;
};

export function computeDiagnosticResult(answers: DiagnosticAnswers): DiagnosticResult {
  const maturity = computeOperationalMaturity(answers);
  return {
    maturity,
    capitalFit: computeCapitalFit(answers),
    topGaps: computeTopGaps(answers),
    founderOperatingLayerFlags: computeFounderOperatingLayerFlags(answers),
    leadTemperature: computeLeadTemperature(answers),
    recommendedOffer: computeRecommendedOffer(maturity.readinessBand),
  };
}
