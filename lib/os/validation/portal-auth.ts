import { z } from "zod";
import { passwordSchema } from "@/lib/os/validation/auth";

export const setPasswordSchema = z.object({
  password: passwordSchema,
});

export type SetPasswordInput = z.infer<typeof setPasswordSchema>;
