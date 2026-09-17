import { describe, it, expect } from "vitest";
import {
  calcRevenueGrowth,
  calcGrossProfit,
  calcGrossMargin,
  calcEbitda,
  calcEbitdaMargin,
  calcOperatingMargin,
  calcNetMargin,
} from "@/lib/os/finance/profitability";

describe("calcRevenueGrowth", () => {
  it("computes growth correctly", () => {
    const r = calcRevenueGrowth({ currentRevenue: 1200, priorRevenue: 1000, currency: "KES" });
    expect(r.value).toBeCloseTo(0.2);
    expect(r.missingInputs).toEqual([]);
  });

  it("handles a decline", () => {
    const r = calcRevenueGrowth({ currentRevenue: 800, priorRevenue: 1000, currency: "KES" });
    expect(r.value).toBeCloseTo(-0.2);
  });

  it("returns null and lists missing inputs when priorRevenue is absent", () => {
    const r = calcRevenueGrowth({ currentRevenue: 1200, priorRevenue: null, currency: "KES" });
    expect(r.value).toBeNull();
    expect(r.missingInputs).toEqual(["priorRevenue"]);
  });

  it("warns instead of dividing by zero when prior revenue is zero", () => {
    const r = calcRevenueGrowth({ currentRevenue: 1200, priorRevenue: 0, currency: "KES" });
    expect(r.value).toBeNull();
    expect(r.warnings.length).toBeGreaterThan(0);
  });
});

describe("calcGrossProfit / calcGrossMargin", () => {
  it("computes gross profit and margin", () => {
    const profit = calcGrossProfit({ revenue: 1000, costOfSales: 600, currency: "KES" });
    expect(profit.value).toBe(400);

    const margin = calcGrossMargin({ revenue: 1000, costOfSales: 600, currency: "KES" });
    expect(margin.value).toBeCloseTo(0.4);
  });

  it("gross margin is undefined (not divide-by-zero) when revenue is zero", () => {
    const r = calcGrossMargin({ revenue: 0, costOfSales: 100, currency: "KES" });
    expect(r.value).toBeNull();
    expect(r.warnings[0]).toMatch(/zero/i);
  });
});

describe("calcEbitda / calcEbitdaMargin", () => {
  it("sums the bottom-up components", () => {
    const r = calcEbitda({
      netIncome: 100,
      interestExpense: 20,
      taxExpense: 30,
      depreciation: 40,
      amortization: 10,
      currency: "KES",
    });
    expect(r.value).toBe(200);
  });

  it("is null when any component is missing", () => {
    const r = calcEbitda({
      netIncome: 100,
      interestExpense: 20,
      taxExpense: null,
      depreciation: 40,
      amortization: 10,
      currency: "KES",
    });
    expect(r.value).toBeNull();
    expect(r.missingInputs).toEqual(["taxExpense"]);
  });

  it("computes EBITDA margin from a precomputed EBITDA", () => {
    const r = calcEbitdaMargin({ ebitda: 200, revenue: 1000, currency: "KES" });
    expect(r.value).toBeCloseTo(0.2);
  });
});

describe("calcOperatingMargin", () => {
  it("computes operating margin", () => {
    const r = calcOperatingMargin({ revenue: 1000, costOfSales: 600, operatingExpenses: 200, currency: "KES" });
    expect(r.value).toBeCloseTo(0.2);
  });
});

describe("calcNetMargin", () => {
  it("computes net margin", () => {
    const r = calcNetMargin({ netIncome: 150, revenue: 1000, currency: "KES" });
    expect(r.value).toBeCloseTo(0.15);
  });

  it("returns null when netIncome is missing, not silently treating it as zero", () => {
    const r = calcNetMargin({ netIncome: null, revenue: 1000, currency: "KES" });
    expect(r.value).toBeNull();
    expect(r.missingInputs).toEqual(["netIncome"]);
  });
});
