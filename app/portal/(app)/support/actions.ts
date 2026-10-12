"use server";

import { requirePortalActor } from "@/lib/os/auth/portal-session";
import { sendAskAnything, type AskAnythingResult } from "@/lib/os/support";

export async function submitPortalAskAnythingAction(
  _prevState: AskAnythingResult,
  formData: FormData,
): Promise<AskAnythingResult> {
  const actor = await requirePortalActor();
  return sendAskAnything({
    organizationId: actor.organizationId,
    fromLabel: `${actor.email} (${actor.clientName})`,
    question: String(formData.get("question") ?? ""),
  });
}
