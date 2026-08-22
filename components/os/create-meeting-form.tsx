"use client";

import { useFormState } from "react-dom";
import { createMeetingAction, type ActionState } from "@/app/os/(app)/meetings/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";
import { Input } from "@/components/os/ui/input";
import { Label } from "@/components/os/ui/label";

const initialState: ActionState = {};

const todayIso = () => new Date().toISOString().slice(0, 10);

export function CreateMeetingForm({
  clients,
  fixedClientId,
}: {
  clients?: { id: string; name: string }[];
  fixedClientId?: string;
}) {
  const [state, formAction] = useFormState(createMeetingAction, initialState);

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
          <Label htmlFor="meetingClientId">Client</Label>
          <select
            id="meetingClientId"
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
        <Label htmlFor="meetingTitle">Title</Label>
        <Input id="meetingTitle" name="title" required maxLength={200} placeholder="e.g. Monthly review" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="meetingHeldAt">Date</Label>
        <Input id="meetingHeldAt" name="heldAt" type="date" defaultValue={todayIso()} required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="meetingAttendees">Attendees (optional)</Label>
        <Input id="meetingAttendees" name="attendees" maxLength={500} placeholder="e.g. Jane, Sam, CFO team" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="meetingNotes">Notes (optional)</Label>
        <textarea
          id="meetingNotes"
          name="notes"
          rows={3}
          className="w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      <SubmitButton pendingLabel="Logging…" className="mt-2">
        Log meeting
      </SubmitButton>
    </form>
  );
}
