"use client";

import { useFormState } from "react-dom";
import { inviteStaffMemberAction, type InviteStaffState } from "@/app/os/(app)/settings/team/actions";
import { ROLE_LABELS, OrgRole } from "@/lib/os/auth/rbac";
import { SubmitButton } from "@/components/os/ui/submit-button";
import { Input } from "@/components/os/ui/input";
import { Label } from "@/components/os/ui/label";

const initialState: InviteStaffState = {};

export function InviteStaffMemberForm() {
  const [state, formAction] = useFormState(inviteStaffMemberAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {state.error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="staffEmail">Work email</Label>
        <Input id="staffEmail" name="email" type="email" placeholder="name@cfopartners.fund" required />
        {state.fieldErrors?.email ? <p className="text-xs text-red-700">{state.fieldErrors.email}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="staffDisplayName">Name (optional)</Label>
        <Input id="staffDisplayName" name="displayName" placeholder="Jane Doe" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="staffRole">Role</Label>
        <select
          id="staffRole"
          name="role"
          defaultValue={OrgRole.PREPARER_ANALYST}
          className="h-10 rounded-md border border-ink/20 bg-white px-3 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {Object.values(OrgRole).map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </select>
      </div>

      <SubmitButton pendingLabel="Sending invite…" size="sm" className="self-start">
        Send invite
      </SubmitButton>
    </form>
  );
}
