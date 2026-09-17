import { buildResult, type CalculationResult } from "@/lib/os/finance/types";

export type VarianceResult = CalculationResult<{ absolute: number; percent: number | null }>;

/**
 * Shared shape for budget and forecast variance — same formula, different
 * baseline (budget vs. forecast). `value.percent` is null when the
 * baseline is zero (percent variance is undefined), but `value.absolute`
 * is always computable.
 */
function calcVarianceAgainstBaseline(input: {
  actual: number | null;
  baseline: number | null;
  baselineLabel: "budget" | "forecast";
  currency: string;
}): VarianceResult {
  const { actual, baseline, baselineLabel, currency } = input;
  const warnings: string[] = [];

  if (actual == null || baseline == null) {
    return buildResult({
      value: null,
      formula: `actual - ${baselineLabel}, and (actual - ${baselineLabel}) / ${baselineLabel}`,
      inputs: { actual, baseline },
      currency,
    });
  }

  const absolute = actual - baseline;
  let percent: number | null = null;
  if (baseline === 0) {
    warnings.push(`${baselineLabel[0]!.toUpperCase()}${baselineLabel.slice(1)} is zero — percent variance is undefined; only the absolute variance is meaningful.`);
  } else {
    percent = absolute / baseline;
  }

  return buildResult({
    value: { absolute, percent },
    formula: `actual - ${baselineLabel}, and (actual - ${baselineLabel}) / ${baselineLabel}`,
    inputs: { actual, baseline },
    currency,
    warnings,
  });
}

export function calcBudgetVariance(input: {
  actual: number | null;
  budget: number | null;
  currency: string;
}): VarianceResult {
  return calcVarianceAgainstBaseline({ ...input, baseline: input.budget, baselineLabel: "budget" });
}

export function calcForecastVariance(input: {
  actual: number | null;
  forecast: number | null;
  currency: string;
}): VarianceResult {
  return calcVarianceAgainstBaseline({ ...input, baseline: input.forecast, baselineLabel: "forecast" });
}

/**
 * Lines up the same metric across base/upside/downside scenarios. Operates
 * on already-computed values (from the other calculation functions), not
 * raw inputs — a scenario comparison is a presentation of results, not a
 * formula of its own.
 */
export type ScenarioComparison = {
  metricKey: string;
  currency: string | null;
  base: number | null;
  upside: number | null;
  downside: number | null;
  upsideDelta: number | null;
  downsideDelta: number | null;
};

export function compareScenarios(input: {
  metricKey: string;
  currency: string | null;
  base: number | null;
  upside: number | null;
  downside: number | null;
}): ScenarioComparison {
  const { metricKey, currency, base, upside, downside } = input;
  return {
    metricKey,
    currency,
    base,
    upside,
    downside,
    upsideDelta: base != null && upside != null ? upside - base : null,
    downsideDelta: base != null && downside != null ? downside - base : null,
  };
}
