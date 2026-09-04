"use client";

import { useFormState } from "react-dom";
import { deletePortalDocumentAction, type ActionState } from "@/app/portal/(app)/documents/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";

const initialState: ActionState = {};

export function PortalDeleteDocumentButton({ documentId, fileName }: { documentId: string; fileName: string }) {
  const [state, formAction] = useFormState(deletePortalDocumentAction, initialState);

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
