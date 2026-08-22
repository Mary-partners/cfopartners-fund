import type { Metadata } from "next";
import Link from "next/link";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { db } from "@/lib/os/db";
import { getMeetingsForOrg } from "@/lib/os/queries/meetings";
import { getClientOptions } from "@/lib/os/queries/clients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { Badge } from "@/components/os/ui/badge";
import { CreateMeetingForm } from "@/components/os/create-meeting-form";
import { AddDecisionForm } from "@/components/os/add-decision-form";
import { DecisionStatusToggle } from "@/components/os/decision-status-toggle";

export const metadata: Metadata = { title: "Meetings & Decisions" };

export default async function MeetingsPage() {
  const actor = await requireActor();
  const canView = can(actor.membership.role, "meeting:view");

  if (!canView) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-ink">Meetings & Decisions</h1>
        <p className="text-sm text-ink-2/60">Your role doesn&apos;t have permission to view meetings.</p>
      </div>
    );
  }

  const canManage = can(actor.membership.role, "meeting:manage");

  const [meetings, clients, members] = await Promise.all([
    getMeetingsForOrg(actor.organizationId),
    canManage ? getClientOptions(actor.organizationId) : Promise.resolve([]),
    canManage
      ? db.membership.findMany({
          where: { organizationId: actor.organizationId, isActive: true },
          select: { id: true, displayName: true, email: true },
        })
      : Promise.resolve([]),
  ]);
  const memberOptions = members.map((m) => ({ id: m.id, label: m.displayName ?? m.email }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Meetings & Decisions</h1>
        <p className="text-sm text-ink-2/70">{meetings.length} logged across the portfolio.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {meetings.length === 0 ? (
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-ink-2/60">No meetings logged yet.</p>
              </CardContent>
            </Card>
          ) : (
            meetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{meeting.title}</CardTitle>
                      <p className="text-xs text-ink-2/50">
                        <Link href={`/os/clients/${meeting.client.id}`} className="hover:underline">
                          {meeting.client.name}
                        </Link>{" "}
                        · {new Date(meeting.heldAt).toLocaleDateString()}
                        {meeting.attendees ? ` · ${meeting.attendees}` : ""}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 pt-0">
                  {meeting.notes ? <p className="text-sm text-ink-2/70">{meeting.notes}</p> : null}

                  <div className="flex flex-col gap-1.5">
                    {meeting.decisions.length === 0 ? (
                      <p className="text-xs text-ink-2/50">No decisions logged for this meeting.</p>
                    ) : (
                      <ul className="flex flex-col gap-1.5">
                        {meeting.decisions.map((decision) => (
                          <li
                            key={decision.id}
                            className="flex items-center justify-between gap-2 rounded-md bg-ink/5 px-3 py-2"
                          >
                            <div className="text-sm">
                              <span className={decision.status === "DONE" ? "text-ink-2/50 line-through" : "text-ink"}>
                                {decision.description}
                              </span>
                              <div className="text-xs text-ink-2/50">
                                {decision.owner?.displayName ?? decision.owner?.email ?? "Unassigned"}
                                {decision.dueDate ? ` · due ${new Date(decision.dueDate).toLocaleDateString()}` : ""}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge tone={decision.status === "DONE" ? "success" : "warning"}>
                                {decision.status === "DONE" ? "Done" : "Open"}
                              </Badge>
                              {canManage || decision.owner?.id === actor.membership.id ? (
                                <DecisionStatusToggle decisionId={decision.id} isDone={decision.status === "DONE"} />
                              ) : null}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {canManage ? <AddDecisionForm meetingId={meeting.id} members={memberOptions} /> : null}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Log a meeting</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            {canManage ? (
              <CreateMeetingForm clients={clients} />
            ) : (
              <p className="text-sm text-ink-2/60">Your role can&apos;t log meetings.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
