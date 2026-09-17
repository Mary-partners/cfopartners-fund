import { buildResult, type CalculationResult } from "@/lib/os/finance/types";

/** (currentRevenue - priorRevenue) / priorRevenue */
export function calcRevenueGrowth(input: {
  currentRevenue: number | null;
  priorRevenue: number | null;
  currency: string;
}): CalculationResult {
  const { currentRevenue, priorRevenue, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (currentRevenue != null && priorRevenue != null) {
    if (priorRevenue === 0) {
      warnings.push("Prior-period revenue is zero — growth rate is undefined.");
    } else {
      value = (currentRevenue - priorRevenue) / priorRevenue;
      if (priorRevenue < 0) warnings.push("Prior-period revenue is negative — growth rate may be misleading.");
    }
  }

  return buildResult({
    value,
    formula: "(currentRevenue - priorRevenue) / priorRevenue",
    inputs: { currentRevenue, priorRevenue },
    currency,
    warnings,
  });
}

export function calcGrossProfit(input: {
  revenue: number | null;
  costOfSales: number | null;
  currency: string;
}): CalculationResult {
  const { revenue, costOfSales, currency } = input;
  const value = revenue != null && costOfSales != null ? revenue - costOfSales : null;
  return buildResult({
    value,
    formula: "revenue - costOfSales",
    inputs: { revenue, costOfSales },
    currency,
  });
}

export function calcGrossMargin(input: {
  revenue: number | null;
  costOfSales: number | null;
  currency: string;
}): CalculationResult {
  const { revenue, costOfSales, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (revenue != null && costOfSales != null) {
    if (revenue === 0) {
      warnings.push("Revenue is zero — gross margin is undefined.");
    } else {
      value = (revenue - costOfSales) / revenue;
    }
  }

  return buildResult({
    value,
    formula: "(revenue - costOfSales) / revenue",
    inputs: { revenue, costOfSales },
    currency,
    warnings,
  });
}

/**
 * Bottom-up EBITDA: netIncome + interestExpense + taxExpense + depreciation
 * + amortization. Deliberately not "revenue - cogs - opex" — that only
 * equals EBITDA when opex excludes D&A and there's no non-operating income
 * or expense, which isn't reliably true of management accounts as
 * received. The bottom-up form works from whatever P&L structure a client
 * actually uses.
 */
export function calcEbitda(input: {
  netIncome: number | null;
  interestExpense: number | null;
  taxExpense: number | null;
  depreciation: number | null;
  amortization: number | null;
  currency: string;
}): CalculationResult {
  const { netIncome, interestExpense, taxExpense, depreciation, amortization, currency } = input;
  const value =
    netIncome != null && interestExpense != null && taxExpense != null && depreciation != null && amortization != null
      ? netIncome + interestExpense + taxExpense + depreciation + amortization
      : null;
  return buildResult({
    value,
    formula: "netIncome + interestExpense + taxExpense + depreciation + amortization",
    inputs: { netIncome, interestExpense, taxExpense, depreciation, amortization },
    currency,
  });
}

export function calcEbitdaMargin(input: {
  ebitda: number | null;
  revenue: number | null;
  currency: string;
}): CalculationResult {
  const { ebitda, revenue, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (ebitda != null && revenue != null) {
    if (revenue === 0) {
      warnings.push("Revenue is zero — EBITDA margin is undefined.");
    } else {
      value = ebitda / revenue;
    }
  }

  return buildResult({
    value,
    formula: "ebitda / revenue",
    inputs: { ebitda, revenue },
    currency,
    warnings,
  });
}

export function calcOperatingMargin(input: {
  revenue: number | null;
  costOfSales: number | null;
  operatingExpenses: number | null;
  currency: string;
}): CalculationResult {
  const { revenue, costOfSales, operatingExpenses, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (revenue != null && costOfSales != null && operatingExpenses != null) {
    if (revenue === 0) {
      warnings.push("Revenue is zero — operating margin is undefined.");
    } else {
      value = (revenue - costOfSales - operatingExpenses) / revenue;
    }
  }

  return buildResult({
    value,
    formula: "(revenue - costOfSales - operatingExpenses) / revenue",
    inputs: { revenue, costOfSales, operatingExpenses },
    currency,
    warnings,
  });
}

export function calcNetMargin(input: {
  netIncome: number | null;
  revenue: number | null;
  currency: string;
}): CalculationResult {
  const { netIncome, revenue, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (netIncome != null && revenue != null) {
    if (revenue === 0) {
      warnings.push("Revenue is zero — net margin is undefined.");
    } else {
      value = netIncome / revenue;
    }
  }

  return buildResult({
    value,
    formula: "netIncome / revenue",
    inputs: { netIncome, revenue },
    currency,
    warnings,
  });
}
