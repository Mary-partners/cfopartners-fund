"use client";

import { useFormState } from "react-dom";
import { submitClientApprovalAction, type ActionState } from "@/app/portal/(app)/work/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";
import { Label } from "@/components/os/ui/label";

const initialState: ActionState = {};

/** Same two-submit-buttons-one-form shape as components/os/review-task-form.tsx. */
export function ClientApprovalForm({ taskId }: { taskId: string }) {
  const [state, formAction] = useFormState(submitClientApprovalAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="taskId" value={taskId} />
      {state.error ? <p className="text-xs text-red-700">{state.error}</p> : null}

      <Label htmlFor={`client-comments-${taskId}`} className="sr-only">
        Comments
      </Label>
      <textarea
        id={`client-comments-${taskId}`}
        name="comments"
        rows={2}
        placeholder="Comments (required if requesting changes helps your team)"
        className="w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />

      <div className="flex gap-2">
        <SubmitButton name="outcome" value="APPROVED" size="sm" pendingLabel="Saving…">
          Approve
        </SubmitButton>
        <SubmitButton
          name="outcome"
          value="CHANGES_REQUESTED"
          variant="outline"
          size="sm"
          pendingLabel="Saving…"
        >
          Request changes
        </SubmitButton>
      </div>
    </form>
  );
}
