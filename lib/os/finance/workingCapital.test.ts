import { describe, it, expect } from "vitest";
import {
  calcReceivableDays,
  calcPayableDays,
  calcInventoryDays,
  calcCashConversionCycle,
} from "@/lib/os/finance/workingCapital";

describe("calcReceivableDays", () => {
  it("computes DSO", () => {
    const r = calcReceivableDays({ accountsReceivable: 100, revenue: 1200, daysInPeriod: 365, currency: "KES" });
    expect(r.value).toBeCloseTo((100 / 1200) * 365);
  });
});

describe("calcPayableDays", () => {
  it("computes DPO", () => {
    const r = calcPayableDays({ accountsPayable: 80, costOfSales: 600, daysInPeriod: 365, currency: "KES" });
    expect(r.value).toBeCloseTo((80 / 600) * 365);
  });
});

describe("calcInventoryDays", () => {
  it("computes DIO", () => {
    const r = calcInventoryDays({ inventory: 50, costOfSales: 600, daysInPeriod: 365, currency: "KES" });
    expect(r.value).toBeCloseTo((50 / 600) * 365);
  });
});

describe("calcCashConversionCycle", () => {
  it("adds DIO + DSO and subtracts DPO", () => {
    const r = calcCashConversionCycle({ inventoryDays: 30, receivableDays: 45, payableDays: 20, currency: "KES" });
    expect(r.value).toBe(55);
  });

  it("is null if any component day-count is missing", () => {
    const r = calcCashConversionCycle({ inventoryDays: 30, receivableDays: null, payableDays: 20, currency: "KES" });
    expect(r.value).toBeNull();
  });
});
