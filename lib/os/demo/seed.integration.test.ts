import { describe, it, expect, afterAll } from "vitest";

/**
 * Real-database test for the demo environment's DB-only seeding — the part
 * that doesn't need Supabase Auth/Storage (see seed.ts's split between
 * seedDemoOrgData and seedDemoEnvironment). Proves two things that matter
 * for handing this login out publicly: it's idempotent (safe to "refresh"),
 * and it never touches an unrelated organization's rows. Requires a real
 * disposable Postgres — see tenant-isolation.integration.test.ts for setup.
 */
const hasTestDb = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasTestDb)("seedDemoOrgData", () => {
  let db: typeof import("@/lib/os/db").db;
  let seedDemoOrgData: typeof import("./seed").seedDemoOrgData;
  let DEMO_ORG_SLUG: typeof import("./seed").DEMO_ORG_SLUG;
  let realOrg: { id: string };

  afterAll(async () => {
    await db.organization.delete({ where: { id: realOrg.id } }).catch(() => {});
    await db.organization.delete({ where: { slug: DEMO_ORG_SLUG } }).catch(() => {});
  });

  it("creates the demo org's clients, work, requests and meeting without touching an unrelated org", async () => {
    ({ db } = await import("@/lib/os/db"));
    ({ seedDemoOrgData, DEMO_ORG_SLUG } = await import("./seed"));

    // An unrelated real-looking org with its own client, to prove seeding
    // the demo never reads or writes across the boundary.
    realOrg = await db.organization.create({
      data: { slug: `real-org-${crypto.randomUUID()}`, name: "A Real Practice" },
    });
    const realClient = await db.client.create({
      data: { organizationId: realOrg.id, name: "A Real Client", country: "KE", serviceBucket: "MONTHLY_CFO" },
    });

    const result = await seedDemoOrgData();

    expect(result.orgId).not.toBe(realOrg.id);

    const demoOrg = await db.organization.findUnique({ where: { id: result.orgId } });
    expect(demoOrg?.slug).toBe(DEMO_ORG_SLUG);

    const demoClients = await db.client.findMany({ where: { organizationId: result.orgId } });
    expect(demoClients.length).toBeGreaterThanOrEqual(2);
    expect(demoClients.map((c) => c.id)).not.toContain(realClient.id);

    const requests = await db.request.findMany({ where: { organizationId: result.orgId } });
    expect(requests.length).toBeGreaterThanOrEqual(2);

    const meetings = await db.meeting.findMany({ where: { organizationId: result.orgId }, include: { decisions: true } });
    expect(meetings.length).toBeGreaterThanOrEqual(1);
    expect(meetings[0].decisions.length).toBeGreaterThanOrEqual(1);

    const thresholds = await db.materialityThreshold.findMany({ where: { organizationId: result.orgId } });
    expect(thresholds.length).toBe(9);

    // The unrelated org is completely untouched.
    const realOrgClientsAfter = await db.client.findMany({ where: { organizationId: realOrg.id } });
    expect(realOrgClientsAfter.map((c) => c.id)).toEqual([realClient.id]);
  });

  it("is idempotent: running it again doesn't duplicate clients, requests or thresholds", async () => {
    const before = await db.client.count({ where: { organizationId: (await db.organization.findUniqueOrThrow({ where: { slug: DEMO_ORG_SLUG } })).id } });

    const result = await seedDemoOrgData();
    const after = await db.client.count({ where: { organizationId: result.orgId } });
    const requestsAfter = await db.request.count({ where: { organizationId: result.orgId } });
    const thresholdsAfter = await db.materialityThreshold.count({ where: { organizationId: result.orgId } });

    expect(after).toBe(before);
    expect(requestsAfter).toBe(2);
    expect(thresholdsAfter).toBe(9);
  });
});
