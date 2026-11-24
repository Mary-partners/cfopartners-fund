"use client";

import { useFormState } from "react-dom";
import {
  markDiagnosticSubmissionReviewedAction,
  type MarkReviewedState,
} from "@/app/os/(app)/diagnostic/[id]/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";

const initialState: MarkReviewedState = {};

export function MarkDiagnosticReviewedForm({ id, reviewerNotes }: { id: string; reviewerNotes: string | null }) {
  const [state, formAction] = useFormState(markDiagnosticSubmissionReviewedAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="id" value={id} />
      {state.error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      <textarea
        name="reviewerNotes"
        defaultValue={reviewerNotes ?? ""}
        rows={3}
        placeholder="Notes for the team — what you told them, what's next."
        className="w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      <div>
        <SubmitButton variant="outline" size="sm" pendingLabel="Saving…">
          Mark reviewed
        </SubmitButton>
      </div>
    </form>
  );
}
