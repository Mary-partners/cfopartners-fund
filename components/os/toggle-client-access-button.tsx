"use client";

import { useFormState } from "react-dom";
import {
  setClientMembershipActiveAction,
  type ActionState,
} from "@/app/os/(app)/clients/[id]/portal-actions";
import { SubmitButton } from "@/components/os/ui/submit-button";

const initialState: ActionState = {};

export function ToggleClientAccessButton({
  clientMembershipId,
  isActive,
  email,
}: {
  clientMembershipId: string;
  isActive: boolean;
  email: string;
}) {
  const [state, formAction] = useFormState(setClientMembershipActiveAction, initialState);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (isActive && !window.confirm(`Revoke portal access for ${email}?`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="clientMembershipId" value={clientMembershipId} />
      <input type="hidden" name="isActive" value={isActive ? "false" : "true"} />
      <SubmitButton
        variant="ghost"
        size="sm"
        pendingLabel={isActive ? "Revoking…" : "Restoring…"}
      >
        {isActive ? "Revoke" : "Restore"}
      </SubmitButton>
      {state.error ? <p className="mt-1 text-xs text-red-700">{state.error}</p> : null}
    </form>
  );
}
