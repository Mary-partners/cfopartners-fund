import "server-only";

import { db } from "@/lib/os/db";
import { getSupabaseAdmin } from "@/lib/os/supabase/admin";
import { OrgRole } from "@/lib/os/auth/rbac";
import { ClientRole } from "@/lib/os/auth/portal-rbac";
import { computePeriodEnd, computeTaskDueDate } from "@/lib/os/workflow/period";
import { recordAuditEvent } from "@/lib/os/audit";
import { buildStoragePath, uploadPlaceholderFile } from "@/lib/os/storage";

/**
 * A second, fully isolated Organization ("CFOIP Demo Practice") that exists
 * only so there's something safe to hand out login credentials for. It is
 * invisible to — and never contains — anything from the real practice's
 * "cfoip" organization: every query in the app scopes by organizationId
 * (see /docs/security.md), and lib/os/auth/session.ts now resolves a
 * signed-in user's org from their own Membership row rather than assuming
 * there is only one. Re-running this is always safe: every write below is
 * an upsert keyed on something stable, so "refresh the demo environment"
 * never duplicates data or drifts the shared demo password.
 */
export const DEMO_ORG_SLUG = "cfoip-demo";
const DEMO_STAFF_EMAIL = "demo.staff@cfopartners.fund";
const DEMO_PORTAL_EMAIL = "demo.client@cfopartners.fund";
const DEMO_PASSWORD = "CFOIPDemo2026!";

export type DemoCredentials = {
  staffEmail: string;
  portalEmail: string;
  password: string;
  clientName: string;
};

async function upsertDemoAuthUser(email: string): Promise<string> {
  const supabase = getSupabaseAdmin();

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password: DEMO_PASSWORD,
    email_confirm: true,
  });
  if (!createError && created.user) {
    return created.user.id;
  }

  // Already exists from a previous seed run — find it and reset the
  // password back to the known demo one, so re-running this always leaves
  // the shared login in a known, shareable state even if an explorer
  // changed it along the way.
  const { data: list, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (listError) throw listError;
  const existing = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!existing) {
    throw createError ?? new Error(`Could not create or find demo auth user ${email}`);
  }

  const { data: updated, error: updateError } = await supabase.auth.admin.updateUserById(existing.id, {
    password: DEMO_PASSWORD,
    email_confirm: true,
  });
  if (updateError) throw updateError;
  return updated.user.id;
}

type SeedClient = {
  name: string;
  country: string;
  currency: string;
  serviceBucket: "MONTHLY_CFO" | "BOOKKEEPING_OVERSIGHT" | "CASH_FLOW_ADVISORY" | "INVESTOR_READINESS";
  lifecycleStage: "ACTIVE" | "ONBOARDING";
  healthScore: number | null;
  healthStatus: "HEALTHY" | "WATCH" | "AT_RISK" | null;
  contact: { name: string; email: string; role: string };
};

const DEMO_CLIENTS: SeedClient[] = [
  {
    name: "Sunrise Textiles Ltd",
    country: "Kenya",
    currency: "KES",
    serviceBucket: "MONTHLY_CFO",
    lifecycleStage: "ACTIVE",
    healthScore: 86,
    healthStatus: "HEALTHY",
    contact: { name: "Amara Njoki", email: "amara@sunrisetextiles.example", role: "Finance Manager" },
  },
  {
    name: "Meridian Foods Group",
    country: "Kenya",
    currency: "KES",
    serviceBucket: "CASH_FLOW_ADVISORY",
    lifecycleStage: "ACTIVE",
    healthScore: 63,
    healthStatus: "WATCH",
    contact: { name: "Brian Otieno", email: "brian@meridianfoods.example", role: "CEO" },
  },
  {
    name: "Zenith Logistics Partners",
    country: "Tanzania",
    currency: "USD",
    serviceBucket: "INVESTOR_READINESS",
    lifecycleStage: "ONBOARDING",
    healthScore: null,
    healthStatus: null,
    contact: { name: "Halima Juma", email: "halima@zenithlogistics.example", role: "COO" },
  },
];

const DEMO_TEMPLATE = {
  name: "Monthly Management Accounts",
  description: "Close the books, prepare management accounts and deliver the pack.",
  serviceBucket: "MONTHLY_CFO" as const,
  recurrence: "MONTHLY" as const,
  tasks: [
    { title: "Request source data from client", order: 0, relativeDueDays: 1 },
    { title: "Confirm bookkeeping close", order: 1, relativeDueDays: 5 },
    { title: "Prepare management accounts", order: 2, relativeDueDays: 10 },
    { title: "Internal quality review", order: 3, relativeDueDays: 12 },
    { title: "Release pack to client", order: 4, relativeDueDays: 15 },
  ],
};

type DemoOrgData = {
  orgId: string;
  primaryClient: { id: string; name: string };
  secondClient: { id: string; name: string };
};

/**
 * Everything below needs only Postgres — no Supabase Auth/Storage — so it's
 * exercised directly by lib/os/demo/seed.integration.test.ts against a real
 * local database. seedDemoEnvironment layers the Supabase-dependent parts
 * (the placeholder document upload, the two Auth users) on top.
 */
export async function seedDemoOrgData(): Promise<DemoOrgData> {
  const org = await db.organization.upsert({
    where: { slug: DEMO_ORG_SLUG },
    update: {},
    create: { slug: DEMO_ORG_SLUG, name: "CFOIP Demo Practice", currency: "KES", timezone: "Africa/Nairobi" },
  });

  const clientsByName = new Map<string, { id: string; name: string }>();
  for (const c of DEMO_CLIENTS) {
    const existing = await db.client.findFirst({ where: { organizationId: org.id, name: c.name } });
    const client = existing
      ? await db.client.update({
          where: { id: existing.id },
          data: {
            country: c.country,
            currency: c.currency,
            serviceBucket: c.serviceBucket,
            lifecycleStage: c.lifecycleStage,
            healthScore: c.healthScore,
            healthStatus: c.healthStatus,
          },
        })
      : await db.client.create({
          data: {
            organizationId: org.id,
            name: c.name,
            country: c.country,
            currency: c.currency,
            serviceBucket: c.serviceBucket,
            lifecycleStage: c.lifecycleStage,
            healthScore: c.healthScore,
            healthStatus: c.healthStatus,
          },
        });
    clientsByName.set(c.name, client);

    const hasContact = await db.clientContact.findFirst({
      where: { clientId: client.id, email: c.contact.email },
    });
    if (!hasContact) {
      await db.clientContact.create({
        data: { clientId: client.id, name: c.contact.name, email: c.contact.email, role: c.contact.role, isPrimary: true },
      });
    }
  }

  const primaryClient = clientsByName.get(DEMO_CLIENTS[0].name)!;
  const secondClient = clientsByName.get(DEMO_CLIENTS[1].name)!;

  // Workflow template + one instance in progress on the primary client.
  let template = await db.workflowTemplate.findFirst({ where: { organizationId: org.id, name: DEMO_TEMPLATE.name } });
  if (!template) {
    template = await db.workflowTemplate.create({
      data: {
        organizationId: org.id,
        name: DEMO_TEMPLATE.name,
        description: DEMO_TEMPLATE.description,
        serviceBucket: DEMO_TEMPLATE.serviceBucket,
        recurrence: DEMO_TEMPLATE.recurrence,
      },
    });
  }
  const taskTemplateCount = await db.taskTemplate.count({ where: { workflowTemplateId: template.id } });
  if (taskTemplateCount === 0) {
    await db.taskTemplate.createMany({
      data: DEMO_TEMPLATE.tasks.map((t) => ({
        workflowTemplateId: template!.id,
        title: t.title,
        order: t.order,
        relativeDueDays: t.relativeDueDays,
      })),
    });
  }

  const periodStart = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));
  let instance = await db.workflowInstance.findFirst({
    where: { clientId: primaryClient.id, workflowTemplateId: template.id, periodStart },
  });
  if (!instance) {
    const periodEnd = computePeriodEnd(periodStart, DEMO_TEMPLATE.recurrence);
    instance = await db.workflowInstance.create({
      data: {
        organizationId: org.id,
        clientId: primaryClient.id,
        workflowTemplateId: template.id,
        name: template.name,
        serviceBucket: template.serviceBucket,
        periodStart,
        periodEnd,
        tasks: {
          create: DEMO_TEMPLATE.tasks.map((t, index) => ({
            title: t.title,
            order: t.order,
            dueDate: computeTaskDueDate(periodStart, t.relativeDueDays),
            status: index <= 1 ? "DELIVERED" : index === 2 ? "IN_PROGRESS" : "NOT_STARTED",
          })),
        },
      },
    });
  }

  // Requests — one new, one already resolved.
  const existingRequests = await db.request.count({ where: { organizationId: org.id } });
  if (existingRequests === 0) {
    await db.request.create({
      data: {
        organizationId: org.id,
        clientId: primaryClient.id,
        title: "Can we get this month's bank statements re-sent?",
        description: "Last upload was cut off partway through.",
        priority: "MEDIUM",
        status: "NEW",
      },
    });
    await db.request.create({
      data: {
        organizationId: org.id,
        clientId: secondClient.id,
        title: "Please confirm year-end date for FY26 close",
        priority: "LOW",
        status: "COMPLETED",
        resolutionNotes: "Confirmed 31 December.",
        resolvedAt: new Date(),
      },
    });
  }

  // A logged meeting with one open decision.
  const existingMeeting = await db.meeting.findFirst({ where: { organizationId: org.id } });
  if (!existingMeeting) {
    const meeting = await db.meeting.create({
      data: {
        organizationId: org.id,
        clientId: primaryClient.id,
        title: "Monthly review call",
        heldAt: new Date(),
        attendees: "Amara Njoki (Sunrise Textiles), Demo Managing Partner",
        notes: "Walked through July management accounts; agreed to tighten receivables follow-up.",
      },
    });
    await db.decision.create({
      data: {
        meetingId: meeting.id,
        description: "Send a 30-day aged receivables reminder to top 5 customers",
        status: "OPEN",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  await seedDemoMaterialityThresholds(org.id);

  return { orgId: org.id, primaryClient, secondClient };
}

export async function seedDemoEnvironment(actorMembershipId: string): Promise<DemoCredentials> {
  const { orgId, primaryClient } = await seedDemoOrgData();

  // One real, tiny placeholder document so the Documents feature has
  // something to show — content is synthetic, not a real client file.
  const existingDocument = await db.document.findFirst({ where: { organizationId: orgId, clientId: primaryClient.id } });
  if (!existingDocument) {
    const fileName = "sample-management-accounts.txt";
    const storagePath = buildStoragePath(orgId, primaryClient.id, fileName);
    const content = "Sample management accounts pack (demo placeholder — not a real financial document).";
    await uploadPlaceholderFile(storagePath, content, "text/plain");
    await db.document.create({
      data: {
        organizationId: orgId,
        clientId: primaryClient.id,
        fileName,
        storagePath,
        mimeType: "text/plain",
        sizeBytes: Buffer.byteLength(content, "utf-8"),
      },
    });
  }

  // Auth users + memberships.
  const staffUserId = await upsertDemoAuthUser(DEMO_STAFF_EMAIL);
  const staffMembership = await db.membership.upsert({
    where: { organizationId_email: { organizationId: orgId, email: DEMO_STAFF_EMAIL } },
    update: { userId: staffUserId, role: OrgRole.MANAGING_PARTNER, isActive: true },
    create: {
      organizationId: orgId,
      userId: staffUserId,
      email: DEMO_STAFF_EMAIL,
      displayName: "Demo Managing Partner",
      role: OrgRole.MANAGING_PARTNER,
      weeklyCapacityHours: 35,
    },
  });
  if (staffMembership.weeklyCapacityHours == null) {
    await db.membership.update({ where: { id: staffMembership.id }, data: { weeklyCapacityHours: 35 } });
  }

  const portalUserId = await upsertDemoAuthUser(DEMO_PORTAL_EMAIL);
  await db.clientMembership.upsert({
    where: { clientId_email: { clientId: primaryClient.id, email: DEMO_PORTAL_EMAIL } },
    update: { userId: portalUserId, role: ClientRole.CLIENT_ADMIN, isActive: true },
    create: {
      clientId: primaryClient.id,
      userId: portalUserId,
      email: DEMO_PORTAL_EMAIL,
      displayName: "Demo Client Admin",
      role: ClientRole.CLIENT_ADMIN,
    },
  });

  await recordAuditEvent({
    organizationId: orgId,
    actorMembershipId,
    action: "DEMO_ENVIRONMENT_SEEDED",
    targetType: "Organization",
    targetId: orgId,
  });

  return {
    staffEmail: DEMO_STAFF_EMAIL,
    portalEmail: DEMO_PORTAL_EMAIL,
    password: DEMO_PASSWORD,
    clientName: primaryClient.name,
  };
}

/** Same org-wide KES default thresholds as the real practice's seed — see prisma/seed.ts. */
async function seedDemoMaterialityThresholds(organizationId: string) {
  const rows: {
    category: "FINANCIAL_EXCEPTION" | "BUDGET_VARIANCE" | "CASH_RUNWAY";
    riskRating: "CRITICAL" | "HIGH" | "MEDIUM";
    percentThreshold: number | null;
    absoluteThreshold: number | null;
    benchmark?: string;
  }[] = [
    { category: "FINANCIAL_EXCEPTION", riskRating: "CRITICAL", percentThreshold: 0.1, absoluteThreshold: 1_000_000 },
    { category: "FINANCIAL_EXCEPTION", riskRating: "HIGH", percentThreshold: 0.05, absoluteThreshold: 250_000 },
    { category: "FINANCIAL_EXCEPTION", riskRating: "MEDIUM", percentThreshold: 0.01, absoluteThreshold: 50_000 },
    { category: "BUDGET_VARIANCE", riskRating: "CRITICAL", percentThreshold: 0.2, absoluteThreshold: 500_000 },
    { category: "BUDGET_VARIANCE", riskRating: "HIGH", percentThreshold: 0.1, absoluteThreshold: 250_000 },
    { category: "BUDGET_VARIANCE", riskRating: "MEDIUM", percentThreshold: 0.05, absoluteThreshold: 50_000 },
    { category: "CASH_RUNWAY", riskRating: "CRITICAL", percentThreshold: null, absoluteThreshold: 8, benchmark: "RUNWAY_WEEKS" },
    { category: "CASH_RUNWAY", riskRating: "HIGH", percentThreshold: null, absoluteThreshold: 13, benchmark: "RUNWAY_WEEKS" },
    { category: "CASH_RUNWAY", riskRating: "MEDIUM", percentThreshold: null, absoluteThreshold: 26, benchmark: "RUNWAY_WEEKS" },
  ];

  for (const row of rows) {
    const existing = await db.materialityThreshold.findFirst({
      where: { organizationId, clientId: null, category: row.category, riskRating: row.riskRating },
      select: { id: true },
    });
    const data = {
      percentThreshold: row.percentThreshold,
      absoluteThreshold: row.absoluteThreshold,
      currency: "KES",
      benchmark: row.benchmark ?? "REVENUE",
    };
    if (existing) {
      await db.materialityThreshold.update({ where: { id: existing.id }, data });
    } else {
      await db.materialityThreshold.create({
        data: { organizationId, clientId: null, category: row.category, riskRating: row.riskRating, ...data },
      });
    }
  }
}
