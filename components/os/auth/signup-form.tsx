"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/lib/os/validation/auth";
import { createClient } from "@/lib/os/supabase/client";
import { Button } from "@/components/os/ui/button";
import { Input } from "@/components/os/ui/input";
import { Label } from "@/components/os/ui/label";

export function SignupForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema) });

  async function onSubmit(values: SignUpInput) {
    setFormError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { full_name: values.fullName },
        emailRedirectTo: `${window.location.origin}/os/auth/callback`,
      },
    });
    if (error) {
      setFormError(error.message);
      return;
    }
    setSubmitted(values.email);
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-xl font-semibold text-ink">Check your inbox</h1>
        <p className="text-sm text-ink-2/70">
          We sent a confirmation link to <strong>{submitted}</strong>. Follow it to
          activate your CFOIP OS account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <div>
        <h1 className="text-xl font-semibold text-ink">Create your account</h1>
        <p className="mt-1 text-sm text-ink-2/70">
          The first person to join a fresh CFOIP workspace becomes its Managing
          Partner. Everyone after that starts as Preparer/Analyst pending a role
          change from Settings → Team.
        </p>
      </div>

      {formError ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {formError}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" autoComplete="name" {...register("fullName")} />
        {errors.fullName ? (
          <p className="text-xs text-red-700">{errors.fullName.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Work email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
        {errors.email ? (
          <p className="text-xs text-red-700">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-xs text-red-700">{errors.password.message}</p>
        ) : (
          <p className="text-xs text-ink-2/50">
            At least 10 characters, with upper, lower and a number.
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-center text-sm text-ink-2/70">
        Already have an account?{" "}
        <a href="/os/login" className="font-medium text-ink underline">
          Sign in
        </a>
      </p>
    </form>
  );
}
