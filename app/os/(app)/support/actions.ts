"use server";

import { requireActor } from "@/lib/os/auth/session";
import { sendAskAnything, type AskAnythingResult } from "@/lib/os/support";

export async function submitAskAnythingAction(
  _prevState: AskAnythingResult,
  formData: FormData,
): Promise<AskAnythingResult> {
  const actor = await requireActor();
  return sendAskAnything({
    organizationId: actor.organizationId,
    fromLabel: actor.email,
    question: String(formData.get("question") ?? ""),
  });
}
