"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/os/ui/button";

/**
 * React 18 / Next 14 form-action pending state: useFormStatus only reports
 * a parent <form>'s status when called from a *different* component than
 * the one rendering the <form> itself — so this must be its own component,
 * used as a child of the <form>, not inlined into the form component.
 */
export function SubmitButton({
  children,
  pendingLabel,
  ...props
}: ButtonProps & { pendingLabel?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || props.disabled} {...props}>
      {pending ? (pendingLabel ?? children) : children}
    </Button>
  );
}
