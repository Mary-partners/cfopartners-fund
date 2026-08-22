import { z } from "zod";

export const updateCapacitySchema = z.object({
  membershipId: z.uuid(),
  // The action converts an empty form field to `null` before this schema
  // ever sees it — z.coerce.number() would otherwise coerce "" to 0
  // (Number("") === 0), silently turning "clear this field" into "set it
  // to zero hours" instead of "unset".
  weeklyCapacityHours: z.coerce.number().int().min(0).max(168).nullable(),
});
