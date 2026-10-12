"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/os/ui/button";

export type TourStep = { href: string; title: string; description: string };

export const OS_TOUR_STEPS: TourStep[] = [
  {
    href: "/os/dashboard",
    title: "Command Centre",
    description: "A single view of the whole portfolio — client health, work in flight, and what's overdue.",
  },
  {
    href: "/os/clients",
    title: "Clients",
    description: "Every client you serve, with its own 360° page: contacts, work history, documents and health.",
  },
  {
    href: "/os/work",
    title: "Work",
    description: "Recurring engagements (management accounts, board packs, ...) tracked task by task, on a template.",
  },
  {
    href: "/os/requests",
    title: "Requests",
    description: "Ad hoc asks from clients land here, get triaged with an SLA, and get resolved.",
  },
  {
    href: "/os/quality",
    title: "Quality",
    description: "Reviewer sign-off before anything ships to a client — and where client approvals surface too.",
  },
  {
    href: "/os/calendar",
    title: "Calendar & Deadlines",
    description: "Every task's due date across every client, in one calendar.",
  },
  {
    href: "/os/meetings",
    title: "Meetings & Decisions",
    description: "Log what was discussed and who owns each decision that came out of it.",
  },
  {
    href: "/os/documents",
    title: "Documents",
    description: "Everything uploaded for a client or a task, stored securely and scoped to that client alone.",
  },
  {
    href: "/os/team",
    title: "Team & Capacity",
    description: "Who's on the team, their role, and how their declared capacity compares to assigned work.",
  },
  {
    href: "/os/reports",
    title: "Reports & Analytics",
    description: "Portfolio-level rollups: delivery, quality and workload, all in one place.",
  },
  {
    href: "/os/templates",
    title: "Templates & Automations",
    description: "The recurring workflows Work is built from — set once, reused every period.",
  },
];

export const PORTAL_TOUR_STEPS: TourStep[] = [
  {
    href: "/portal/work",
    title: "Work",
    description: "Everything your CFO team is working on for you, with progress and what's still to come.",
  },
  {
    href: "/portal/documents",
    title: "Documents",
    description: "Files shared with you, and anywhere you're asked to upload something back.",
  },
  {
    href: "/portal/requests",
    title: "Requests",
    description: "Ask your team for anything ad hoc here, and track it through to done.",
  },
];

export function ProductTour({
  steps = OS_TOUR_STEPS,
  storageKey = "cfoip-os-tour-seen",
}: {
  steps?: TourStep[];
  storageKey?: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      if (!localStorage.getItem(storageKey)) {
        setOpen(true);
      }
    } catch {
      // Private browsing / blocked storage — just don't auto-open.
    }
  }, [storageKey]);

  function close() {
    setOpen(false);
    setStep(0);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      // Nothing to do if storage isn't available — worst case it re-offers next visit.
    }
  }

  const current = steps[step];

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Take a tour
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-2/50">
                Step {step + 1} of {steps.length}
              </p>
              <button onClick={close} aria-label="Close tour" className="text-ink-2/50 hover:text-ink">
                <X size={18} />
              </button>
            </div>
            <h2 className="mt-2 text-lg font-semibold text-ink">{current.title}</h2>
            <p className="mt-2 text-sm text-ink-2/70">{current.description}</p>
            <div className="mt-6 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </Button>
              <div className="flex items-center gap-3">
                <Link href={current.href} onClick={close} className="text-sm font-medium text-ink underline">
                  Go there
                </Link>
                {step < steps.length - 1 ? (
                  <Button type="button" size="sm" onClick={() => setStep((s) => s + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button type="button" size="sm" onClick={close}>
                    Finish
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
