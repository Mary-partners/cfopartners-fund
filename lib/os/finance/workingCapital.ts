import { buildResult, type CalculationResult } from "@/lib/os/finance/types";

/** (accountsReceivable / revenue) * daysInPeriod — a.k.a. DSO. */
export function calcReceivableDays(input: {
  accountsReceivable: number | null;
  revenue: number | null;
  daysInPeriod: number;
  currency: string;
}): CalculationResult {
  const { accountsReceivable, revenue, daysInPeriod, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (accountsReceivable != null && revenue != null) {
    if (revenue === 0) {
      warnings.push("Revenue is zero — receivable days is undefined.");
    } else {
      value = (accountsReceivable / revenue) * daysInPeriod;
    }
  }

  return buildResult({
    value,
    formula: "(accountsReceivable / revenue) * daysInPeriod",
    inputs: { accountsReceivable, revenue, daysInPeriod },
    currency,
    warnings,
  });
}

/** (accountsPayable / costOfSales) * daysInPeriod — a.k.a. DPO. */
export function calcPayableDays(input: {
  accountsPayable: number | null;
  costOfSales: number | null;
  daysInPeriod: number;
  currency: string;
}): CalculationResult {
  const { accountsPayable, costOfSales, daysInPeriod, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (accountsPayable != null && costOfSales != null) {
    if (costOfSales === 0) {
      warnings.push("Cost of sales is zero — payable days is undefined.");
    } else {
      value = (accountsPayable / costOfSales) * daysInPeriod;
    }
  }

  return buildResult({
    value,
    formula: "(accountsPayable / costOfSales) * daysInPeriod",
    inputs: { accountsPayable, costOfSales, daysInPeriod },
    currency,
    warnings,
  });
}

/** (inventory / costOfSales) * daysInPeriod — a.k.a. DIO. */
export function calcInventoryDays(input: {
  inventory: number | null;
  costOfSales: number | null;
  daysInPeriod: number;
  currency: string;
}): CalculationResult {
  const { inventory, costOfSales, daysInPeriod, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (inventory != null && costOfSales != null) {
    if (costOfSales === 0) {
      warnings.push("Cost of sales is zero — inventory days is undefined.");
    } else {
      value = (inventory / costOfSales) * daysInPeriod;
    }
  }

  return buildResult({
    value,
    formula: "(inventory / costOfSales) * daysInPeriod",
    inputs: { inventory, costOfSales, daysInPeriod },
    currency,
    warnings,
  });
}

/** DIO + DSO - DPO, computed from the three already-calculated day counts. */
export function calcCashConversionCycle(input: {
  inventoryDays: number | null;
  receivableDays: number | null;
  payableDays: number | null;
  currency: string;
}): CalculationResult {
  const { inventoryDays, receivableDays, payableDays, currency } = input;
  const value =
    inventoryDays != null && receivableDays != null && payableDays != null
      ? inventoryDays + receivableDays - payableDays
      : null;
  return buildResult({
    value,
    formula: "inventoryDays + receivableDays - payableDays",
    inputs: { inventoryDays, receivableDays, payableDays },
    currency,
  });
}
