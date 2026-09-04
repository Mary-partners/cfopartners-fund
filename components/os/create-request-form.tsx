"use client";

import { useFormState } from "react-dom";
import { createRequestAction, type ActionState } from "@/app/os/(app)/requests/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";
import { Label } from "@/components/os/ui/label";

const initialState: ActionState = {};

export function CreateRequestForm({
  clients,
  fixedClientId,
}: {
  clients?: { id: string; name: string }[];
  fixedClientId?: string;
}) {
  const [state, formAction] = useFormState(createRequestAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      {fixedClientId ? (
        <input type="hidden" name="clientId" value={fixedClientId} />
      ) : (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="requestClientId">Client</Label>
          <select
            id="requestClientId"
            name="clientId"
            required
            defaultValue=""
            className="h-10 rounded-md border border-ink/20 bg-white px-3 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <option value="" disabled>
              Choose a client
            </option>
            {clients?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="requestTitle">What do they need?</Label>
        <input
          id="requestTitle"
          name="title"
          required
          maxLength={200}
          className="h-10 rounded-md border border-ink/20 bg-white px-3 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          placeholder="e.g. A copy of last quarter's board pack"
        />
        {state.fieldErrors?.title ? <p className="text-xs text-red-700">{state.fieldErrors.title}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="requestDescription">Details (optional)</Label>
        <textarea
          id="requestDescription"
          name="description"
          rows={3}
          className="w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      <SubmitButton pendingLabel="Logging…" className="mt-2">
        Log request
      </SubmitButton>
    </form>
  );
}
