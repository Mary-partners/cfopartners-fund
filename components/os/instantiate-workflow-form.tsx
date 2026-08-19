"use client";

import { useFormState } from "react-dom";
import { instantiateWorkflowAction, type ActionState } from "@/app/os/(app)/work/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";
import { Input } from "@/components/os/ui/input";
import { Label } from "@/components/os/ui/label";

const initialState: ActionState = {};

const todayIso = () => new Date().toISOString().slice(0, 10);

export function InstantiateWorkflowForm({
  clients,
  templates,
}: {
  clients: { id: string; name: string }[];
  templates: { id: string; name: string }[];
}) {
  const [state, formAction] = useFormState(instantiateWorkflowAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="clientId">Client</Label>
        <select
          id="clientId"
          name="clientId"
          required
          defaultValue=""
          className="h-10 rounded-md border border-ink/20 bg-white px-3 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <option value="" disabled>
            Choose a client
          </option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="workflowTemplateId">Template</Label>
        <select
          id="workflowTemplateId"
          name="workflowTemplateId"
          required
          defaultValue=""
          className="h-10 rounded-md border border-ink/20 bg-white px-3 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <option value="" disabled>
            Choose a template
          </option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="periodStart">Period start</Label>
        <Input id="periodStart" name="periodStart" type="date" defaultValue={todayIso()} required />
      </div>

      <SubmitButton pendingLabel="Starting…" disabled={templates.length === 0} className="mt-2">
        Start work
      </SubmitButton>
      {templates.length === 0 ? (
        <p className="text-xs text-ink-2/50">
          No templates yet — create one under Templates & Automations first.
        </p>
      ) : null}
    </form>
  );
}
