import { buildResult, type CalculationResult } from "@/lib/os/finance/types";

export function calcCurrentRatio(input: {
  currentAssets: number | null;
  currentLiabilities: number | null;
  currency: string;
}): CalculationResult {
  const { currentAssets, currentLiabilities, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (currentAssets != null && currentLiabilities != null) {
    if (currentLiabilities === 0) {
      warnings.push("Current liabilities are zero — current ratio is undefined.");
    } else {
      value = currentAssets / currentLiabilities;
    }
  }

  return buildResult({
    value,
    formula: "currentAssets / currentLiabilities",
    inputs: { currentAssets, currentLiabilities },
    currency,
    warnings,
  });
}

export function calcQuickRatio(input: {
  currentAssets: number | null;
  inventory: number | null;
  currentLiabilities: number | null;
  currency: string;
}): CalculationResult {
  const { currentAssets, inventory, currentLiabilities, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (currentAssets != null && inventory != null && currentLiabilities != null) {
    if (currentLiabilities === 0) {
      warnings.push("Current liabilities are zero — quick ratio is undefined.");
    } else {
      value = (currentAssets - inventory) / currentLiabilities;
    }
  }

  return buildResult({
    value,
    formula: "(currentAssets - inventory) / currentLiabilities",
    inputs: { currentAssets, inventory, currentLiabilities },
    currency,
    warnings,
  });
}

export function calcDebtToEquity(input: {
  totalDebt: number | null;
  totalEquity: number | null;
  currency: string;
}): CalculationResult {
  const { totalDebt, totalEquity, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (totalDebt != null && totalEquity != null) {
    if (totalEquity === 0) {
      warnings.push("Total equity is zero — debt-to-equity is undefined.");
    } else {
      value = totalDebt / totalEquity;
      if (totalEquity < 0) warnings.push("Total equity is negative — ratio sign may be misleading; review directly.");
    }
  }

  return buildResult({
    value,
    formula: "totalDebt / totalEquity",
    inputs: { totalDebt, totalEquity },
    currency,
    warnings,
  });
}

/** EBITDA / (principal due + interest due) for the period. */
export function calcDebtServiceCoverageRatio(input: {
  ebitda: number | null;
  principalDue: number | null;
  interestDue: number | null;
  currency: string;
}): CalculationResult {
  const { ebitda, principalDue, interestDue, currency } = input;
  const warnings: string[] = [];
  let value: number | null = null;

  if (ebitda != null && principalDue != null && interestDue != null) {
    const debtService = principalDue + interestDue;
    if (debtService === 0) {
      warnings.push("No debt service due in the period — DSCR is undefined.");
    } else {
      value = ebitda / debtService;
      if (ebitda < 0) warnings.push("EBITDA is negative — the company cannot cover debt service from operations.");
    }
  }

  return buildResult({
    value,
    formula: "ebitda / (principalDue + interestDue)",
    inputs: { ebitda, principalDue, interestDue },
    currency,
    warnings,
  });
}
