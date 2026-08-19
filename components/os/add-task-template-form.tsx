"use client";

import { useFormState } from "react-dom";
import { addTaskTemplateAction, type ActionState } from "@/app/os/(app)/templates/actions";
import { SubmitButton } from "@/components/os/ui/submit-button";
import { Input } from "@/components/os/ui/input";
import { Label } from "@/components/os/ui/label";

const initialState: ActionState = {};

export function AddTaskTemplateForm({
  workflowTemplateId,
  nextOrder,
}: {
  workflowTemplateId: string;
  nextOrder: number;
}) {
  const [state, formAction] = useFormState(addTaskTemplateAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="workflowTemplateId" value={workflowTemplateId} />
      <input type="hidden" name="order" value={nextOrder} />

      {state.error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">Task title</Label>
        <Input id="title" name="title" placeholder="e.g. Reconcile bank accounts" required />
        {state.fieldErrors?.title ? (
          <p className="text-xs text-red-700">{state.fieldErrors.title}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="relativeDueDays">Due, days into the period</Label>
        <Input
          id="relativeDueDays"
          name="relativeDueDays"
          type="number"
          min={0}
          defaultValue={0}
          required
        />
        {state.fieldErrors?.relativeDueDays ? (
          <p className="text-xs text-red-700">{state.fieldErrors.relativeDueDays}</p>
        ) : null}
      </div>

      <SubmitButton pendingLabel="Adding…" size="sm" className="self-start">
        Add task
      </SubmitButton>
    </form>
  );
}
