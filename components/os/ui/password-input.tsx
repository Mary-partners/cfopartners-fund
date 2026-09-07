"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/os/ui/input";
import { cn } from "@/lib/utils";

/**
 * Input + a show/hide toggle, for every password field in the app (sign
 * in, sign up, set password). Not just a convenience — a login that
 * silently fails with "Invalid login credentials" is very hard to debug
 * blind when the field is masked and the value came from a password
 * manager or a copy-paste that may not have landed cleanly.
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function PasswordInput({ className, ...props }, ref) {
    const [visible, setVisible] = React.useState(false);

    return (
      <div className="relative">
        <Input ref={ref} type={visible ? "text" : "password"} className={cn("pr-10", className)} {...props} />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-ink-2/50 hover:text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  },
);
