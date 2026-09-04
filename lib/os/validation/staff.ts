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
});

export type InviteStaffMemberInput = z.infer<typeof inviteStaffMemberSchema>;
