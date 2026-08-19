"use client";

import { useFormState } from "react-dom";
import { assignTaskAction, type ActionState } from "@/app/os/(app)/work/actions";
import { PendingSelect } from "@/components/os/ui/pending-select";

const initialState: ActionState = {};

export function TaskAssigneeForm({
  taskId,
  currentAssigneeId,
  members,
  disabled,
}: {
  taskId: string;
  currentAssigneeId: string | null;
  members: { id: string; label: string }[];
  disabled?: boolean;
}) {
  const [state, formAction] = useFormState(assignTaskAction, initialState);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="taskId" value={taskId} />
      <PendingSelect
        name="assigneeMembershipId"
        defaultValue={currentAssigneeId ?? ""}
        disabled={disabled}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="h-9 rounded-md border border-ink/20 bg-white px-2 text-sm text-ink-2 disabled:opacity-50"
      >
        <option value="">Unassigned</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </PendingSelect>
      {state.error ? <span className="text-xs text-red-700">{state.error}</span> : null}
    </form>
  );
}
