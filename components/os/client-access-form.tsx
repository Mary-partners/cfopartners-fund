"use client";

import { useFormState } from "react-dom";
import { setMemberClientAccessAction, type SetClientAccessState } from "@/app/os/(app)/settings/team/actions";
import { ClientAccessChecklist } from "@/components/os/client-access-checklist";
import { SubmitButton } from "@/components/os/ui/submit-button";

const initialState: SetClientAccessState = {};

export function ClientAccessForm({
  membershipId,
  clients,
  grantedClientIds,
}: {
  membershipId: string;
  clients: { id: string; name: string }[];
  grantedClientIds: string[];
}) {
  const [state, formAction] = useFormState(setMemberClientAccessAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="membershipId" value={membershipId} />
      <ClientAccessChecklist clients={clients} defaultCheckedIds={grantedClientIds} />
      <div className="flex items-center gap-2">
        <SubmitButton pendingLabel="Saving…" size="sm">
          Save access
        </SubmitButton>
        {state.error ? <span className="text-xs text-red-700">{state.error}</span> : null}
      </div>
    </form>
  );
}
