import { buildResult, type CalculationResult } from "@/lib/os/finance/types";

/** Gross monthly cash outflow: total cash spent over the period, averaged per month. */
export function calcMonthlyBurn(input: {
  totalCashOutflow: number | null;
  monthsInPeriod: number;
  currency: string;
}): CalculationResult {
  const { totalCashOutflow, monthsInPeriod, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (totalCashOutflow != null) {
    if (monthsInPeriod <= 0) {
      warnings.push("Period has no months — monthly burn is undefined.");
    } else {
      value = totalCashOutflow / monthsInPeriod;
    }
  }

  return buildResult({
    value,
    formula: "totalCashOutflow / monthsInPeriod",
    inputs: { totalCashOutflow, monthsInPeriod },
    currency,
    warnings,
  });
}

/** Net monthly cash burn: (outflow - inflow) / months — negative means the company is cash-generative. */
export function calcNetBurn(input: {
  totalCashOutflow: number | null;
  totalCashInflow: number | null;
  monthsInPeriod: number;
  currency: string;
}): CalculationResult {
  const { totalCashOutflow, totalCashInflow, monthsInPeriod, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (totalCashOutflow != null && totalCashInflow != null) {
    if (monthsInPeriod <= 0) {
      warnings.push("Period has no months — net burn is undefined.");
    } else {
      value = (totalCashOutflow - totalCashInflow) / monthsInPeriod;
    }
  }

  return buildResult({
    value,
    formula: "(totalCashOutflow - totalCashInflow) / monthsInPeriod",
    inputs: { totalCashOutflow, totalCashInflow, monthsInPeriod },
    currency,
    warnings,
  });
}

/**
 * currentCash / netMonthlyBurn, in months. A net burn of zero or negative
 * (cash-generative) has no finite runway — value is null with a warning
 * rather than Infinity, since "Infinity" is not a number a report or a
 * materiality check should have to handle.
 */
export function calcCashRunway(input: {
  currentCash: number | null;
  netMonthlyBurn: number | null;
  currency: string;
}): CalculationResult {
  const { currentCash, netMonthlyBurn, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (currentCash != null && netMonthlyBurn != null) {
    if (netMonthlyBurn <= 0) {
      warnings.push("Net burn is zero or negative — the company is cash-generative; runway is not applicable.");
    } else {
      value = currentCash / netMonthlyBurn;
      if (currentCash < 0) warnings.push("Current cash is negative.");
    }
  }

  return buildResult({
    value,
    formula: "currentCash / netMonthlyBurn",
    inputs: { currentCash, netMonthlyBurn },
    currency,
    warnings,
  });
}

/** fixedCosts / contributionMarginRatio — the revenue level at which net profit is zero. */
export function calcBreakEvenRevenue(input: {
  fixedCosts: number | null;
  contributionMarginRatio: number | null;
  currency: string;
}): CalculationResult {
  const { fixedCosts, contributionMarginRatio, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (fixedCosts != null && contributionMarginRatio != null) {
    if (contributionMarginRatio <= 0) {
      warnings.push("Contribution margin is zero or negative — no revenue level breaks even.");
    } else {
      value = fixedCosts / contributionMarginRatio;
    }
  }

  return buildResult({
    value,
    formula: "fixedCosts / contributionMarginRatio",
    inputs: { fixedCosts, contributionMarginRatio },
    currency,
    warnings,
  });
}

/** Additional cash needed to keep the balance at or above the minimum buffer through the lowest projected point. */
export function calcFundingRequirement(input: {
  lowestProjectedCash: number | null;
  minimumCashBuffer: number | null;
  currency: string;
}): CalculationResult {
  const { lowestProjectedCash, minimumCashBuffer, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (lowestProjectedCash != null && minimumCashBuffer != null) {
    value = Math.max(0, minimumCashBuffer - lowestProjectedCash);
    if (value === 0) warnings.push("Projected cash never falls below the minimum buffer — no funding gap identified.");
  }

  return buildResult({
    value,
    formula: "max(0, minimumCashBuffer - lowestProjectedCash)",
    inputs: { lowestProjectedCash, minimumCashBuffer },
    currency,
    warnings,
  });
}

/** A suggested minimum cash buffer: a manager-set number of months of average operating expense. */
export function calcMinimumCashBuffer(input: {
  averageMonthlyOperatingExpense: number | null;
  bufferMonths: number;
  currency: string;
}): CalculationResult {
  const { averageMonthlyOperatingExpense, bufferMonths, currency } = input;
  const value = averageMonthlyOperatingExpense != null ? averageMonthlyOperatingExpense * bufferMonths : null;
  return buildResult({
    value,
    formula: "averageMonthlyOperatingExpense * bufferMonths",
    inputs: { averageMonthlyOperatingExpense, bufferMonths },
    currency,
    warnings: ["This is a suggested figure from a configurable months-of-cover target, not a derived requirement — confirm the target with the Managing Partner."],
  });
}
