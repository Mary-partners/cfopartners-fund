"use client";

import { useFormState } from "react-dom";
import { addDecisionAction, type ActionState } from "@/app/os/(app)/meetings/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";
import { Label } from "@/components/os/ui/label";

const initialState: ActionState = {};

export function AddDecisionForm({
  meetingId,
  members,
}: {
  meetingId: string;
  members: { id: string; label: string }[];
}) {
  const [state, formAction] = useFormState(addDecisionAction, initialState);

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="meetingId" value={meetingId} />
      {state.error ? <p className="w-full text-xs text-red-700">{state.error}</p> : null}

      <div className="flex min-w-[180px] flex-1 flex-col gap-1">
        <Label htmlFor={`decision-${meetingId}`} className="text-xs">
          Decision
        </Label>
        <input
          id={`decision-${meetingId}`}
          name="description"
          required
          maxLength={1000}
          className="h-9 rounded-md border border-ink/20 bg-white px-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={`owner-${meetingId}`} className="text-xs">
          Owner
        </Label>
        <select
          id={`owner-${meetingId}`}
          name="ownerMembershipId"
          defaultValue=""
          className="h-9 rounded-md border border-ink/20 bg-white px-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <option value="">Unassigned</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={`due-${meetingId}`} className="text-xs">
          Due
        </Label>
        <input
          id={`due-${meetingId}`}
          name="dueDate"
          type="date"
          className="h-9 rounded-md border border-ink/20 bg-white px-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      <SubmitButton size="sm" pendingLabel="Adding…">
        Add
      </SubmitButton>
    </form>
  );
}
