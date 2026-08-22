import { z } from "zod";
import { ClientRole } from "@/lib/os/auth/portal-rbac";
import { emailSchema } from "@/lib/os/validation/auth";

export const inviteClientUserSchema = z.object({
  clientId: z.string().uuid("Missing client."),
  email: emailSchema,
  displayName: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((value) => (value ? value : undefined)),
  role: z.nativeEnum(ClientRole),
});

export type InviteClientUserInput = z.infer<typeof inviteClientUserSchema>;
