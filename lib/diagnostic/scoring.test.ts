import { describe, it, expect } from "vitest";
import { computeDiagnosticResult, type DiagnosticAnswers } from "./scoring";

const WEAK_ANSWERS: DiagnosticAnswers = {
  q1: "Idea — not yet selling",
  q2: "Less than 6 months",
  q3: "No consistent revenue yet",
  q4: "Founder only",
  q5: "No",
  q6: "I do not keep proper books yet",
  q7: "No",
  q8: "No",
  q9: "I am not sure what that is",
  q10: "Yes — almost everything depends on me",
  q11: "No",
  q12: "No",
  q13: "No",
  q14: "Understanding my numbers",
  q15: "No - not raising and not planning to",
  q16: "I do not know yet — help me figure out what fits",
  q17: ["None of the above yet — I need help preparing these"],
  q18: "I need a recommendation",
  q19: "Important but not urgent",
  q20: "Not right now",
  q21: "Open to a recommendation based on business evaluation need",
  q24: "Start — building from scratch",
  q25: "Finding customers — proving demand",
  q26: "Steady — managing well day to day",
  q29: "No — current trajectory is forward",
  q30: "Pre-revenue — not yet selling",
  q31: "Novel or unvalidated — nothing like this exists locally",
  q32: "No meaningful collateral",
  q33: "Light operational intensity — digital, asset-light, replicable",
  q34: "Constrained — small local market, model does not travel",
  q35: "Low — 0 to 5 percent",
  q36: "Low — 0 to 20 percent",
  q37: "Not sure yet",
  q38: ["Working capital"],
  q39: "Not sure",
};

const STRONG_ANSWERS: DiagnosticAnswers = {
  q1: "Preparing for funding / credit / expansion",
  q2: "5+ years",
  q3: "KES 5M+",
  q4: "50+",
  q5: "Yes fully",
  q6: "Weekly",
  q7: "Yes clearly",
  q8: "Yes",
  q9: "Yes",
  q10: "No — team can operate without me",
  q11: "Yes - most key processes documented",
  q12: "Yes",
  q13: "Yes",
  q14: "Scaling into a new market",
  q15: "Yes - actively raising right now",
  q16: "A mix of these",
  q17: [
    "Audited or reviewed accounts for the last 2 to 3 years",
    "Current management accounts (monthly or quarterly with variance)",
    "12 to 18 month cash flow forecast with scenarios",
    "Board pack or regular KPI reporting format",
  ],
  q18: "Investor or bank readiness support",
  q19: "Immediate",
  q20: "Yes immediately",
  q21: "KES 500K+ — embedded or retainer",
  q24: "Scale — pushing for growth",
  q25: "Raising capital — bringing in external funding",
  q26: "Energised — clear and focused",
  q29: "No — current trajectory is forward",
  q30: "Fully recurring and predictable",
  q31: "Mature model — established local playbook exists",
  q32: "Strong collateral — real estate, significant equipment, verified receivables",
  q33: "Light operational intensity — digital, asset-light, replicable",
  q34: "Significant — large addressable market or highly portable",
  q35: "High — above 100 percent",
  q36: "High — above 80 percent",
  q37: "Not a priority — I care more about growth than control",
  q38: ["Geographic expansion", "Team hiring"],
  q39: "Low exposure — mostly local currency both sides",
};

describe("computeDiagnosticResult", () => {
  it("scores a weak, early-stage business into the Foundation band / Hustler archetype", () => {
    const result = computeDiagnosticResult(WEAK_ANSWERS);
    expect(result.maturity.readinessBand).toBe("FOUNDATION");
    expect(result.maturity.archetype).toBe("HUSTLER");
    expect(result.maturity.totalScore).toBeGreaterThanOrEqual(7);
    expect(result.maturity.totalScore).toBeLessThanOrEqual(10);
    expect(result.topGaps.length).toBeGreaterThan(0);
    expect(result.topGaps).toContain("Poor financial records");
    expect(result.leadTemperature).toBe("COLD");
  });

  it("scores a strong, established business into the Capital/Advisory Ready band / Scaler archetype", () => {
    const result = computeDiagnosticResult(STRONG_ANSWERS);
    expect(result.maturity.readinessBand).toBe("CAPITAL_ADVISORY_READY");
    expect(result.maturity.archetype).toBe("SCALER");
    expect(result.maturity.totalScore).toBeGreaterThanOrEqual(20);
    expect(result.topGaps).toEqual([]);
    expect(result.leadTemperature).toBe("HOT");
  });

  it("every pillar score is always between 1 and 3", () => {
    for (const answers of [WEAK_ANSWERS, STRONG_ANSWERS, {}]) {
      const result = computeDiagnosticResult(answers);
      for (const pillar of result.maturity.pillars) {
        expect(pillar.score).toBeGreaterThanOrEqual(1);
        expect(pillar.score).toBeLessThanOrEqual(3);
      }
      expect(result.maturity.totalScore).toBeGreaterThanOrEqual(7);
      expect(result.maturity.totalScore).toBeLessThanOrEqual(21);
    }
  });

  it("recommends against venture equity for a pre-revenue, novel-model business (Capital Fit Profile A)", () => {
    const result = computeDiagnosticResult(WEAK_ANSWERS);
    expect(result.capitalFit.recommended).toContain("Grant");
    expect(result.capitalFit.recommended).not.toContain("Venture equity");
  });

  it("a founder who wants full control never gets venture equity recommended, even with fitting economics", () => {
    const ownershipSensitive: DiagnosticAnswers = { ...STRONG_ANSWERS, q37: "Very important — I want to retain full control" };
    const result = computeDiagnosticResult(ownershipSensitive);
    expect(result.capitalFit.recommended).not.toContain("Venture equity");
    expect(result.capitalFit.unsuitable).toContain("Venture equity");
  });

  it("handles a completely empty submission without throwing", () => {
    expect(() => computeDiagnosticResult({})).not.toThrow();
  });
});
