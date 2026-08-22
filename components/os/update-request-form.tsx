"use client";

import { useFormState } from "react-dom";
import { updateRequestAction, type ActionState } from "@/app/os/(app)/requests/actions";
import { RequestPriority, RequestStatus } from "@/generated/prisma/enums";
import { REQUEST_PRIORITY_LABEL, REQUEST_STATUS_LABEL } from "@/lib/os/requests/status";
import { SubmitButton } from "@/components/os/ui/submit-button";
import { Label } from "@/components/os/ui/label";

const initialState: ActionState = {};

const selectClass =
  "h-9 rounded-md border border-ink/20 bg-white px-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function UpdateRequestForm({
  requestId,
  currentPriority,
  currentStatus,
  currentAssigneeId,
  members,
  canResolve,
}: {
  requestId: string;
  currentPriority: RequestPriority;
  currentStatus: RequestStatus;
  currentAssigneeId: string | null;
  members: { id: string; label: string }[];
  canResolve: boolean;
}) {
  const [state, formAction] = useFormState(updateRequestAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="requestId" value={requestId} />
      {state.error ? <p className="text-xs text-red-700">{state.error}</p> : null}

      <div className="flex flex-wrap gap-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor={`priority-${requestId}`} className="text-xs">
            Priority
          </Label>
          <select id={`priority-${requestId}`} name="priority" defaultValue={currentPriority} className={selectClass}>
            {Object.values(RequestPriority).map((p) => (
              <option key={p} value={p}>
                {REQUEST_PRIORITY_LABEL[p]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor={`assignee-${requestId}`} className="text-xs">
            Assignee
          </Label>
          <select
            id={`assignee-${requestId}`}
            name="assigneeMembershipId"
            defaultValue={currentAssigneeId ?? ""}
            className={selectClass}
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
          <Label htmlFor={`status-${requestId}`} className="text-xs">
            Status
          </Label>
          <select id={`status-${requestId}`} name="status" defaultValue={currentStatus} className={selectClass}>
            {Object.values(RequestStatus)
              .filter((s) => canResolve || (s !== "COMPLETED" && s !== "DECLINED"))
              .map((s) => (
                <option key={s} value={s}>
                  {REQUEST_STATUS_LABEL[s]}
                </option>
              ))}
          </select>
        </div>
      </div>

      <Label htmlFor={`notes-${requestId}`} className="sr-only">
        Resolution notes
      </Label>
      <textarea
        id={`notes-${requestId}`}
        name="resolutionNotes"
        rows={2}
        placeholder="Notes (required to complete or decline)"
        className="w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      {state.fieldErrors?.resolutionNotes ? (
        <p className="text-xs text-red-700">{state.fieldErrors.resolutionNotes}</p>
      ) : null}

      <SubmitButton size="sm" pendingLabel="Saving…" className="self-start">
        Save
      </SubmitButton>
    </form>
  );
}
