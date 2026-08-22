"use client";

import { useFormState } from "react-dom";
import { submitClientRequestAction, type ActionState } from "@/app/portal/(app)/requests/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";
import { Label } from "@/components/os/ui/label";

const initialState: ActionState = {};

export function PortalCreateRequestForm() {
  const [state, formAction] = useFormState(submitClientRequestAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="portalRequestTitle">What do you need?</Label>
        <input
          id="portalRequestTitle"
          name="title"
          required
          maxLength={200}
          className="h-10 rounded-md border border-ink/20 bg-white px-3 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          placeholder="e.g. A copy of last quarter's board pack"
        />
        {state.fieldErrors?.title ? <p className="text-xs text-red-700">{state.fieldErrors.title}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="portalRequestDescription">Details (optional)</Label>
        <textarea
          id="portalRequestDescription"
          name="description"
          rows={3}
          className="w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      <SubmitButton pendingLabel="Sending…" className="mt-2">
        Send request
      </SubmitButton>
    </form>
  );
}
