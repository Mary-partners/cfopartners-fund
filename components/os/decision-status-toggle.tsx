"use client";

import { useFormState } from "react-dom";
import { updateDecisionStatusAction, type ActionState } from "@/app/os/(app)/meetings/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";

const initialState: ActionState = {};

export function DecisionStatusToggle({ decisionId, isDone }: { decisionId: string; isDone: boolean }) {
  const [state, formAction] = useFormState(updateDecisionStatusAction, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="decisionId" value={decisionId} />
      <input type="hidden" name="status" value={isDone ? "OPEN" : "DONE"} />
      <SubmitButton variant="ghost" size="sm" pendingLabel="Saving…">
        {isDone ? "Reopen" : "Mark done"}
      </SubmitButton>
      {state.error ? <p className="mt-1 text-xs text-red-700">{state.error}</p> : null}
    </form>
  );
}
