"use client";

import { useFormState } from "react-dom";
import { inviteClientUserAction, type ActionState } from "@/app/os/(app)/clients/[id]/portal-actions";
import { ClientRole, CLIENT_ROLE_LABELS } from "@/lib/os/auth/portal-rbac";
import { SubmitButton } from "@/components/os/ui/submit-button";
import { Input } from "@/components/os/ui/input";
import { Label } from "@/components/os/ui/label";

const initialState: ActionState = {};

export function InviteClientUserForm({ clientId }: { clientId: string }) {
  const [state, formAction] = useFormState(inviteClientUserAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="clientId" value={clientId} />

      {state.error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="portalEmail">Email</Label>
        <Input id="portalEmail" name="email" type="email" placeholder="name@client.com" required />
        {state.fieldErrors?.email ? <p className="text-xs text-red-700">{state.fieldErrors.email}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="portalDisplayName">Name (optional)</Label>
        <Input id="portalDisplayName" name="displayName" placeholder="Jane Doe" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="portalRole">Access level</Label>
        <select
          id="portalRole"
          name="role"
          defaultValue={ClientRole.CLIENT_COLLABORATOR}
          className="h-10 rounded-md border border-ink/20 bg-white px-3 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {Object.values(ClientRole).map((role) => (
            <option key={role} value={role}>
              {CLIENT_ROLE_LABELS[role]}
            </option>
          ))}
        </select>
        <p className="text-xs text-ink-2/50">
          Only Client Admins can approve or request changes on tasks; Collaborators can view work and
          upload documents.
        </p>
      </div>

      <SubmitButton pendingLabel="Sending invite…" size="sm" className="self-start">
        Send invite
      </SubmitButton>
    </form>
  );
}
