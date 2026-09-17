import { describe, it, expect } from "vitest";
import {
  calcMonthlyBurn,
  calcNetBurn,
  calcCashRunway,
  calcBreakEvenRevenue,
  calcFundingRequirement,
  calcMinimumCashBuffer,
} from "@/lib/os/finance/cashRunway";

describe("calcMonthlyBurn", () => {
  it("averages outflow over months", () => {
    const r = calcMonthlyBurn({ totalCashOutflow: 300000, monthsInPeriod: 3, currency: "KES" });
    expect(r.value).toBe(100000);
  });
});

describe("calcNetBurn", () => {
  it("nets inflow against outflow", () => {
    const r = calcNetBurn({ totalCashOutflow: 300000, totalCashInflow: 60000, monthsInPeriod: 3, currency: "KES" });
    expect(r.value).toBe(80000);
  });

  it("is negative (cash-generative) when inflow exceeds outflow", () => {
    const r = calcNetBurn({ totalCashOutflow: 100000, totalCashInflow: 150000, monthsInPeriod: 1, currency: "KES" });
    expect(r.value).toBe(-50000);
  });
});

describe("calcCashRunway", () => {
  it("divides current cash by net monthly burn", () => {
    const r = calcCashRunway({ currentCash: 800000, netMonthlyBurn: 100000, currency: "KES" });
    expect(r.value).toBe(8);
  });

  it("is not applicable, and warns, for a cash-generative company (zero or negative burn)", () => {
    const r = calcCashRunway({ currentCash: 800000, netMonthlyBurn: -20000, currency: "KES" });
    expect(r.value).toBeNull();
    expect(r.warnings[0]).toMatch(/cash-generative/i);
  });

  it("returns zero runway (not null) for a company already out of cash", () => {
    const r = calcCashRunway({ currentCash: 0, netMonthlyBurn: 50000, currency: "KES" });
    expect(r.value).toBe(0);
  });
});

describe("calcBreakEvenRevenue", () => {
  it("divides fixed costs by contribution margin", () => {
    const r = calcBreakEvenRevenue({ fixedCosts: 400000, contributionMarginRatio: 0.4, currency: "KES" });
    expect(r.value).toBe(1000000);
  });

  it("warns when contribution margin is zero or negative", () => {
    const r = calcBreakEvenRevenue({ fixedCosts: 400000, contributionMarginRatio: 0, currency: "KES" });
    expect(r.value).toBeNull();
  });
});

describe("calcFundingRequirement", () => {
  it("is the shortfall below the minimum buffer", () => {
    const r = calcFundingRequirement({ lowestProjectedCash: 200000, minimumCashBuffer: 500000, currency: "KES" });
    expect(r.value).toBe(300000);
  });

  it("is zero (never negative) when the buffer is never breached", () => {
    const r = calcFundingRequirement({ lowestProjectedCash: 900000, minimumCashBuffer: 500000, currency: "KES" });
    expect(r.value).toBe(0);
  });
});

describe("calcMinimumCashBuffer", () => {
  it("multiplies average monthly opex by the buffer target", () => {
    const r = calcMinimumCashBuffer({ averageMonthlyOperatingExpense: 200000, bufferMonths: 3, currency: "KES" });
    expect(r.value).toBe(600000);
    expect(r.warnings.length).toBeGreaterThan(0);
  });
});
