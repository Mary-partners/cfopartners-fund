"use client";

import { useFormState } from "react-dom";
import { submitReviewAction, type ActionState } from "@/app/os/(app)/quality/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";
import { Label } from "@/components/os/ui/label";

const initialState: ActionState = {};

/**
 * Two submit buttons, one form: each carries its own name/value pair
 * (outcome=APPROVED / outcome=CHANGES_REQUESTED), the standard HTML way to
 * let one form branch on which button was clicked — no client-side state
 * needed. Both buttons show a "pending" state together while either is
 * submitting (useFormStatus reports the whole form, not per-button); a
 * minor cosmetic tradeoff, not worth extra machinery for a two-button form.
 */
export function ReviewTaskForm({ taskId }: { taskId: string }) {
  const [state, formAction] = useFormState(submitReviewAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="taskId" value={taskId} />
      {state.error ? <p className="text-xs text-red-700">{state.error}</p> : null}

      <Label htmlFor={`comments-${taskId}`} className="sr-only">
        Comments
      </Label>
      <textarea
        id={`comments-${taskId}`}
        name="comments"
        rows={2}
        placeholder="Comments (optional, required if requesting changes helps the preparer)"
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
