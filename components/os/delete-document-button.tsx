"use client";

import { useFormState } from "react-dom";
import { deleteDocumentAction, type ActionState } from "@/app/os/(app)/documents/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";

const initialState: ActionState = {};

export function DeleteDocumentButton({ documentId, fileName }: { documentId: string; fileName: string }) {
  const [state, formAction] = useFormState(deleteDocumentAction, initialState);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm(`Delete "${fileName}"? This can't be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="documentId" value={documentId} />
      <SubmitButton variant="ghost" size="sm" pendingLabel="Deleting…">
        Delete
      </SubmitButton>
      {state.error ? <p className="mt-1 text-xs text-red-700">{state.error}</p> : null}
    </form>
  );
}
