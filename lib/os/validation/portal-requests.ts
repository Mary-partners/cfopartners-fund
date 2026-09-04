import { z } from "zod";

/**
 * No clientId field — a portal-submitted request is always for the
 * signed-in actor's own client, the same "derived server-side, never
 * caller-supplied" shape as every other portal write. See
 * app/portal/(app)/requests/actions.ts.
 */
export const submitClientRequestSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(4000).optional().or(z.literal("")),
});
