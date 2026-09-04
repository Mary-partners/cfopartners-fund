import { z } from "zod";
import { RequestPriority, RequestStatus } from "@/generated/prisma/enums";

export const createRequestSchema = z.object({
  clientId: z.uuid(),
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(4000).optional().or(z.literal("")),
});

/**
 * One form, one action (updateRequestAction) covers triage (priority,
 * assignee) and status changes together — see the comment on that action
 * for why splitting these into separate forms wasn't worth the extra
 * moving parts for a first slice.
 */
export const updateRequestSchema = z.object({
  requestId: z.uuid(),
  priority: z.enum(RequestPriority, { error: "Choose a priority" }),
  status: z.enum(RequestStatus, { error: "Choose a status" }),
  assigneeMembershipId: z.uuid().nullable().optional(),
  resolutionNotes: z.string().trim().max(4000).optional().or(z.literal("")),
});
