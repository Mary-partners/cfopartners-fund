import { z } from "zod";
import { emailSchema } from "@/lib/os/validation/auth";
import { OrgRole } from "@/lib/os/auth/rbac";

export const inviteStaffMemberSchema = z.object({
  email: emailSchema,
  displayName: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((value) => (value ? value : undefined)),
  role: z.enum(OrgRole, { error: "Choose a role" }),
  // Ignored for org-wide roles (Managing Partner / Practice Administrator /
  // Portfolio Lead — see lib/os/auth/client-access.ts) since they see every
  // client regardless. Empty for every other role means "no clients yet" —
  // a real, if unusual, state (e.g. inviting someone before staffing them),
  // not an error.
  clientIds: z.array(z.uuid()).default([]),
});

export type InviteStaffMemberInput = z.infer<typeof inviteStaffMemberSchema>;

export const setClientAccessSchema = z.object({
  membershipId: z.uuid(),
  clientIds: z.array(z.uuid()).default([]),
});

export type SetClientAccessInput = z.infer<typeof setClientAccessSchema>;
