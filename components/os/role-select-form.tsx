"use client";

import { useFormState } from "react-dom";
import {
  changeMemberRoleAction,
  type ChangeRoleState,
} from "@/app/os/(app)/settings/team/actions";
import { ROLE_LABELS, OrgRole } from "@/lib/os/auth/rbac";
import { PendingSelect } from "@/components/os/ui/pending-select";

const initialState: ChangeRoleState = {};

export function RoleSelectForm({
  membershipId,
  currentRole,
  disabled,
}: {
  membershipId: string;
  currentRole: OrgRole;
  disabled?: boolean;
}) {
  const [state, formAction] = useFormState(changeMemberRoleAction, initialState);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="membershipId" value={membershipId} />
      <PendingSelect
        name="role"
        defaultValue={currentRole}
        disabled={disabled}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="h-9 rounded-md border border-ink/20 bg-white px-2 text-sm text-ink-2 disabled:opacity-50"
      >
        {Object.values(OrgRole).map((role) => (
          <option key={role} value={role}>
            {ROLE_LABELS[role]}
          </option>
        ))}
      </PendingSelect>
      {state.error ? <span className="text-xs text-red-700">{state.error}</span> : null}
    </form>
  );
}
