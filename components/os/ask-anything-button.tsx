"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/os/ui/button";
import { SubmitButton } from "@/components/os/ui/submit-button";
import type { AskAnythingResult } from "@/lib/os/support";

const initialState: AskAnythingResult = {};

/**
 * "Ask us anything" — takes the same (prevState, formData) action shape on
 * both /os (submitAskAnythingAction) and /portal (submitPortalAskAnythingAction)
 * so this one component works for either side. No AI behind it yet: it
 * emails the asker's own Managing Partner(s) — see lib/os/support.ts.
 */
export function AskAnythingButton({
  action,
}: {
  action: (prevState: AskAnythingResult, formData: FormData) => Promise<AskAnythingResult>;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(action, initialState);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Ask us anything
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold text-ink">Ask us anything</h2>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-ink-2/50 hover:text-ink">
                <X size={18} />
              </button>
            </div>
            <p className="mt-1 text-sm text-ink-2/70">
              Goes straight to your CFOIP team — no need to know who to email.
            </p>

            {state.sent ? (
              <div className="mt-4 flex flex-col gap-3">
                <p role="status" className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                  Sent — we'll get back to you.
                </p>
                <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            ) : (
              <form action={formAction} className="mt-4 flex flex-col gap-3">
                {state.error ? (
                  <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {state.error}
                  </p>
                ) : null}
                <textarea
                  name="question"
                  required
                  rows={4}
                  placeholder="What do you want to know?"
                  className="w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <SubmitButton size="sm" pendingLabel="Sending…">
                    Send
                  </SubmitButton>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
