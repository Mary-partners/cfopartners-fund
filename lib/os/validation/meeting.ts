import { z } from "zod";
import { DecisionStatus } from "@/generated/prisma/enums";

export const createMeetingSchema = z.object({
  clientId: z.uuid(),
  title: z.string().trim().min(1, "Title is required").max(200),
  heldAt: z.coerce.date(),
  attendees: z.string().trim().max(500).optional().or(z.literal("")),
  notes: z.string().trim().max(4000).optional().or(z.literal("")),
});

export const addDecisionSchema = z.object({
  meetingId: z.uuid(),
  description: z.string().trim().min(1, "Describe the decision").max(1000),
  ownerMembershipId: z.uuid().nullable().optional(),
  // "" -> undefined happens in the action before parsing (formData.get()
  // returns "" for an unfilled date input, and z.coerce.date() would
  // otherwise reject that as an invalid date rather than treating it as
  // "no due date set").
  dueDate: z.coerce.date().nullable().optional(),
});

export const updateDecisionStatusSchema = z.object({
  decisionId: z.uuid(),
  status: z.enum(DecisionStatus, { error: "Choose a status" }),
});
