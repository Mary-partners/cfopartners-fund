import { z } from "zod";
import { ClientApprovalOutcome } from "@/generated/prisma/enums";

export const submitClientApprovalSchema = z.object({
  taskId: z.uuid(),
  outcome: z.enum(ClientApprovalOutcome, { error: "Choose an outcome" }),
  comments: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type SubmitClientApprovalInput = z.infer<typeof submitClientApprovalSchema>;
