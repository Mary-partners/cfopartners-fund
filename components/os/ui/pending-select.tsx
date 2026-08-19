"use client";

import { useFormStatus } from "react-dom";

/**
 * A <select> that disables itself while its parent <form>'s action is
 * pending. Must be its own component (not inlined into the form component)
 * for the same reason as SubmitButton — see that file's comment.
 */
export function PendingSelect({
  disabled,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { pending } = useFormStatus();
  return <select disabled={pending || disabled} {...props} />;
}
