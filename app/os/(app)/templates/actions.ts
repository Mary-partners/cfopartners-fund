"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/os/db";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { recordAuditEvent } from "@/lib/os/audit";
import { createWorkflowTemplateSchema, addTaskTemplateSchema } from "@/lib/os/validation/workflow";

export type ActionState = { error?: string; fieldErrors?: Record<string, string> };

function fieldErrorsFrom(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

export async function createWorkflowTemplateAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "workflow:manageTemplates")) {
    return { error: "You don't have permission to create workflow templates." };
  }

  const parsed = createWorkflowTemplateSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    serviceBucket: formData.get("serviceBucket"),
    recurrence: formData.get("recurrence"),
  });
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }

  const template = await db.workflowTemplate.create({
    data: {
      organizationId: actor.organizationId,
      name: parsed.data.name,
      description: parsed.data.description || null,
      serviceBucket: parsed.data.serviceBucket,
      recurrence: parsed.data.recurrence,
    },
  });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "WORKFLOW_TEMPLATE_CREATED",
    targetType: "WorkflowTemplate",
    targetId: template.id,
    metadata: { name: template.name, recurrence: template.recurrence },
  });

  revalidatePath("/os/templates");
  redirect(`/os/templates/${template.id}`);
}

export async function addTaskTemplateAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "workflow:manageTemplates")) {
    return { error: "You don't have permission to edit workflow templates." };
  }

  const workflowTemplateId = formData.get("workflowTemplateId");
  if (typeof workflowTemplateId !== "string") {
    return { error: "Invalid request." };
  }

  const template = await db.workflowTemplate.findFirst({
    where: { id: workflowTemplateId, organizationId: actor.organizationId },
  });
  if (!template) {
    return { error: "Template not found." };
  }

  const parsed = addTaskTemplateSchema.safeParse({
    title: formData.get("title"),
    // FormData.get() returns null for a field that isn't in the form at
    // all (AddTaskTemplateForm has no description input) — the schema's
    // .optional() only accepts undefined, not null, so an un-normalized
    // null here fails validation silently (no visible error, since the
    // form doesn't render a "description" field error either) and the
    // task template is never created. Same normalization the "description
    // || null" write below already does, just needed before parsing too.
    description: formData.get("description") || undefined,
    order: formData.get("order"),
    relativeDueDays: formData.get("relativeDueDays"),
  });
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsFrom(parsed.error.issues) };
  }

  const taskTemplate = await db.taskTemplate.create({
    data: {
      workflowTemplateId: template.id,
      title: parsed.data.title,
      description: parsed.data.description || null,
      order: parsed.data.order,
      relativeDueDays: parsed.data.relativeDueDays,
    },
  });

  await recordAuditEvent({
    organizationId: actor.organizationId,
    actorMembershipId: actor.membership.id,
    action: "TASK_TEMPLATE_ADDED",
    targetType: "TaskTemplate",
    targetId: taskTemplate.id,
    metadata: { workflowTemplateId: template.id, title: taskTemplate.title },
  });

  revalidatePath(`/os/templates/${template.id}`);
  return {};
}
