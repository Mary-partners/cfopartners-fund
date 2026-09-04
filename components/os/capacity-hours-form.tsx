"use client";

import { useFormState } from "react-dom";
import { updateCapacityAction, type ActionState } from "@/app/os/(app)/team/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";

const initialState: ActionState = {};

export function CapacityHoursForm({
  membershipId,
  currentHours,
}: {
  membershipId: string;
  currentHours: number | null;
}) {
  const [state, formAction] = useFormState(updateCapacityAction, initialState);

  return (
    <form action={formAction} className="flex items-center gap-1.5">
      <input type="hidden" name="membershipId" value={membershipId} />
      <input
        type="number"
        name="weeklyCapacityHours"
        min={0}
        max={168}
        defaultValue={currentHours ?? ""}
        placeholder="—"
        aria-label="Weekly capacity hours"
        className="h-8 w-16 rounded-md border border-ink/20 bg-white px-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      <SubmitButton variant="ghost" size="sm" pendingLabel="…">
        Save
      </SubmitButton>
      {state.error ? <p className="text-xs text-red-700">{state.error}</p> : null}
    </form>
  );
}
