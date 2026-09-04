import "server-only";

import { db } from "@/lib/os/db";

const MEETING_INCLUDE = {
  client: { select: { id: true, name: true } },
  loggedBy: { select: { displayName: true, email: true } },
  decisions: {
    orderBy: { createdAt: "asc" as const },
    include: { owner: { select: { id: true, displayName: true, email: true } } },
  },
};

export async function getMeetingsForOrg(organizationId: string, limit = 30) {
  return db.meeting.findMany({
    where: { organizationId },
    orderBy: { heldAt: "desc" },
    take: limit,
    include: MEETING_INCLUDE,
  });
}

export async function getMeetingsForClient(organizationId: string, clientId: string) {
  return db.meeting.findMany({
    where: { organizationId, clientId },
    orderBy: { heldAt: "desc" },
    include: MEETING_INCLUDE,
  });
}
