import { describe, it, expect } from "vitest";
import { calcBudgetVariance, calcForecastVariance, compareScenarios } from "@/lib/os/finance/variance";

describe("calcBudgetVariance", () => {
  it("computes absolute and percent variance", () => {
    const r = calcBudgetVariance({ actual: 1100, budget: 1000, currency: "KES" });
    expect(r.value?.absolute).toBe(100);
    expect(r.value?.percent).toBeCloseTo(0.1);
  });

  it("still returns the absolute variance when budget is zero, with percent null", () => {
    const r = calcBudgetVariance({ actual: 500, budget: 0, currency: "KES" });
    expect(r.value?.absolute).toBe(500);
    expect(r.value?.percent).toBeNull();
    expect(r.warnings.length).toBeGreaterThan(0);
  });

  it("is entirely null when actual is missing", () => {
    const r = calcBudgetVariance({ actual: null, budget: 1000, currency: "KES" });
    expect(r.value).toBeNull();
    expect(r.missingInputs).toEqual(["actual"]);
  });
});

describe("calcForecastVariance", () => {
  it("uses forecast as the baseline", () => {
    const r = calcForecastVariance({ actual: 900, forecast: 1000, currency: "KES" });
    expect(r.value?.absolute).toBe(-100);
    expect(r.value?.percent).toBeCloseTo(-0.1);
  });
});

describe("compareScenarios", () => {
  it("computes deltas against the base case", () => {
    const cmp = compareScenarios({ metricKey: "cashRunwayMonths", currency: "KES", base: 8, upside: 12, downside: 4 });
    expect(cmp.upsideDelta).toBe(4);
    expect(cmp.downsideDelta).toBe(-4);
  });

  it("handles a missing scenario value without throwing", () => {
    const cmp = compareScenarios({ metricKey: "cashRunwayMonths", currency: "KES", base: 8, upside: null, downside: 4 });
    expect(cmp.upsideDelta).toBeNull();
    expect(cmp.downsideDelta).toBe(-4);
  });
});
