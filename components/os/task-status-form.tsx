"use client";

import { useFormState } from "react-dom";
import { updateTaskStatusAction, type ActionState } from "@/app/os/(app)/work/actions";
import { TASK_STATUS_LABEL, TASK_STATUS_ORDER } from "@/lib/os/workflow/status";
import { PendingSelect } from "@/components/os/ui/pending-select";
import type { TaskStatus } from "@/generated/prisma/enums";

const initialState: ActionState = {};

export function TaskStatusForm({
  taskId,
  currentStatus,
  disabled,
}: {
  taskId: string;
  currentStatus: TaskStatus;
  disabled?: boolean;
}) {
  const [state, formAction] = useFormState(updateTaskStatusAction, initialState);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="taskId" value={taskId} />
      <PendingSelect
        name="status"
        defaultValue={currentStatus}
        disabled={disabled}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="h-9 rounded-md border border-ink/20 bg-white px-2 text-sm text-ink-2 disabled:opacity-50"
      >
        {TASK_STATUS_ORDER.map((status) => (
          <option key={status} value={status}>
            {TASK_STATUS_LABEL[status]}
          </option>
        ))}
      </PendingSelect>
      {state.error ? <span className="text-xs text-red-700">{state.error}</span> : null}
    </form>
  );
}
