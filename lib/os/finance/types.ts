/**
 * Every deterministic financial calculation returns this shape — never a
 * bare number. An AI-generated commentary or a report can then say what it
 * computed from, not just what the number is: the formula, the exact
 * inputs used, and whether anything was missing. `value` is null (not 0 or
 * NaN) whenever a required input is missing or the formula is
 * mathematically undefined (e.g. dividing by a zero denominator) — a
 * silently wrong number is worse than a visibly absent one, and this is a
 * financial application.
 */
export type CalculationResult<T = number> = {
  value: T | null;
  formula: string;
  inputs: Record<string, number | string | null>;
  currency: string | null;
  warnings: string[];
  missingInputs: string[];
};

/** Builds a CalculationResult, deriving missingInputs from which named inputs are null/undefined. */
export function buildResult<T>(args: {
  value: T | null;
  formula: string;
  inputs: Record<string, number | string | null | undefined>;
  currency?: string | null;
  warnings?: string[];
}): CalculationResult<T> {
  const inputs: Record<string, number | string | null> = {};
  const missingInputs: string[] = [];
  for (const [key, val] of Object.entries(args.inputs)) {
    if (val === undefined || val === null) {
      inputs[key] = null;
      missingInputs.push(key);
    } else {
      inputs[key] = val;
    }
  }
  return {
    value: args.value,
    formula: args.formula,
    inputs,
    currency: args.currency ?? null,
    warnings: args.warnings ?? [],
    missingInputs,
  };
}
