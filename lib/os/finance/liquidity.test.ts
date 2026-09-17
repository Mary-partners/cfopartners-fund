import { describe, it, expect } from "vitest";
import {
  calcCurrentRatio,
  calcQuickRatio,
  calcDebtToEquity,
  calcDebtServiceCoverageRatio,
} from "@/lib/os/finance/liquidity";

describe("calcCurrentRatio", () => {
  it("computes the ratio", () => {
    const r = calcCurrentRatio({ currentAssets: 500, currentLiabilities: 250, currency: "KES" });
    expect(r.value).toBe(2);
  });

  it("is undefined, not Infinity, when liabilities are zero", () => {
    const r = calcCurrentRatio({ currentAssets: 500, currentLiabilities: 0, currency: "KES" });
    expect(r.value).toBeNull();
    expect(Number.isFinite(r.value as unknown as number)).toBe(false);
    expect(r.warnings.length).toBeGreaterThan(0);
  });
});

describe("calcQuickRatio", () => {
  it("excludes inventory from current assets", () => {
    const r = calcQuickRatio({ currentAssets: 500, inventory: 100, currentLiabilities: 200, currency: "KES" });
    expect(r.value).toBe(2);
  });
});

describe("calcDebtToEquity", () => {
  it("computes the ratio", () => {
    const r = calcDebtToEquity({ totalDebt: 300, totalEquity: 150, currency: "KES" });
    expect(r.value).toBe(2);
  });

  it("warns on negative equity rather than returning a misleading ratio silently", () => {
    const r = calcDebtToEquity({ totalDebt: 300, totalEquity: -50, currency: "KES" });
    expect(r.value).toBe(-6);
    expect(r.warnings.some((w) => /negative/i.test(w))).toBe(true);
  });
});

describe("calcDebtServiceCoverageRatio", () => {
  it("computes DSCR from EBITDA and debt service", () => {
    const r = calcDebtServiceCoverageRatio({ ebitda: 300, principalDue: 100, interestDue: 50, currency: "KES" });
    expect(r.value).toBe(2);
  });

  it("flags negative EBITDA as unable to cover debt service", () => {
    const r = calcDebtServiceCoverageRatio({ ebitda: -50, principalDue: 100, interestDue: 50, currency: "KES" });
    expect(r.value).toBeCloseTo(-50 / 150);
    expect(r.warnings.some((w) => /negative/i.test(w))).toBe(true);
  });

  it("is undefined when there is no debt service due", () => {
    const r = calcDebtServiceCoverageRatio({ ebitda: 300, principalDue: 0, interestDue: 0, currency: "KES" });
    expect(r.value).toBeNull();
  });
});
