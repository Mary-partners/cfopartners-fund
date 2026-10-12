"use client";

import { useFormState } from "react-dom";
import { seedDemoEnvironmentAction, type SeedDemoState } from "@/app/os/(app)/settings/demo/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";

const initialState: SeedDemoState = {};

export function SeedDemoEnvironmentForm() {
  const [state, formAction] = useFormState(seedDemoEnvironmentAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {state.error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      {state.credentials ? (
        <div className="flex flex-col gap-2 rounded-md bg-emerald-50 px-3 py-3 text-sm text-emerald-900">
          <p className="font-medium">Demo environment ready — share whichever login fits:</p>
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-700/70">Staff login (full internal OS)</p>
            <p>
              {state.credentials.staffEmail} / {state.credentials.password}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-700/70">
              Client Portal login ({state.credentials.clientName})
            </p>
            <p>
              {state.credentials.portalEmail} / {state.credentials.password}
            </p>
          </div>
          <p className="text-xs text-emerald-700/70">
            Everything they see lives in a separate demo organization — none of it is real client data, and none of
            your real clients are visible to it. Run this again anytime to reset it back to this state.
          </p>
        </div>
      ) : null}

      <div>
        <SubmitButton variant="outline" pendingLabel="Setting up…">
          {state.credentials ? "Refresh demo environment" : "Set up demo environment"}
        </SubmitButton>
      </div>
    </form>
  );
}
