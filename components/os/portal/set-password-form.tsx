"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { setPasswordSchema, type SetPasswordInput } from "@/lib/os/validation/portal-auth";
import { createClient } from "@/lib/os/supabase/client";
import { Button } from "@/components/os/ui/button";
import { Input } from "@/components/os/ui/input";
import { Label } from "@/components/os/ui/label";

export function SetPasswordForm({ email }: { email: string }) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetPasswordInput>({ resolver: zodResolver(setPasswordSchema) });

  async function onSubmit(values: SetPasswordInput) {
    setFormError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: values.password });
    if (error) {
      setFormError(error.message);
      return;
    }
    router.replace("/portal/work");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <div>
        <h1 className="text-xl font-semibold text-ink">Welcome, {email}</h1>
        <p className="mt-1 text-sm text-ink-2/70">Set a password to finish activating your portal access.</p>
      </div>

      {formError ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {formError}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" autoComplete="new-password" {...register("password")} />
        {errors.password ? (
          <p className="text-xs text-red-700">{errors.password.message}</p>
        ) : (
          <p className="text-xs text-ink-2/50">At least 10 characters, with upper, lower and a number.</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? "Saving…" : "Set password and continue"}
      </Button>
    </form>
  );
}
