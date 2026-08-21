import { z } from "zod";
import { ReviewOutcome } from "@/generated/prisma/enums";

export const submitReviewSchema = z.object({
  taskId: z.uuid(),
  outcome: z.enum(ReviewOutcome, { error: "Choose an outcome" }),
  comments: z.string().trim().max(4000).optional().or(z.literal("")),
});
