import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { randomUUID } from "node:crypto";

/**
 * A real tenant-isolation test — not a mock, not an assertion about a
 * hand-read query string. It seeds two real Organizations (with a Client
 * each) into a real Postgres database, then calls the actual query
 * functions app pages use (lib/os/queries/clients.ts) and asserts
 * Organization A's actor can never see Organization B's data through them.
 *
 * Requires a real, disposable Postgres database — set DATABASE_URL and
 * DIRECT_URL to one before running (e.g. the same local instance used to
 * generate this migration: `postgresql://postgres:<password>@localhost:5432/<db>`,
 * migrated with `npx prisma migrate deploy`). Skips itself (not fails) when
 * no DATABASE_URL is set, since CI/Vercel builds don't run `npm test`
 * against a live database — this is a deliberately opt-in, not automatic,
 * check. See /docs/qa-plan.md.
 */
const hasTestDb = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasTestDb)("tenant isolation — getClientList / getClientById", () => {
  // Imported inside the describe block, after the skip check, so importing
  // lib/os/db.ts (which throws if DATABASE_URL is unset) never happens when
  // this suite is skipped.
  let db: typeof import("@/lib/os/db").db;
  let getClientList: typeof import("@/lib/os/queries/clients").getClientList;
  let getClientById: typeof import("@/lib/os/queries/clients").getClientById;

  let orgA: { id: string };
  let orgB: { id: string };
  let clientA: { id: string };
  let clientB: { id: string };

  beforeAll(async () => {
    ({ db } = await import("@/lib/os/db"));
    ({ getClientList, getClientById } = await import("@/lib/os/queries/clients"));

    orgA = await db.organization.create({
      data: { slug: `test-org-a-${randomUUID()}`, name: "Test Org A" },
    });
    orgB = await db.organization.create({
      data: { slug: `test-org-b-${randomUUID()}`, name: "Test Org B" },
    });
    clientA = await db.client.create({
      data: { organizationId: orgA.id, name: "Client A", country: "KE", serviceBucket: "MONTHLY_CFO" },
    });
    clientB = await db.client.create({
      data: { organizationId: orgB.id, name: "Client B", country: "KE", serviceBucket: "MONTHLY_CFO" },
    });
  });

  afterAll(async () => {
    // Cascades: deleting the Organization removes its Client too.
    await db.organization.delete({ where: { id: orgA.id } });
    await db.organization.delete({ where: { id: orgB.id } });
  });

  it("getClientList only returns the requested organization's clients", async () => {
    const listA = await getClientList(orgA.id);
    expect(listA.map((c) => c.id)).toEqual([clientA.id]);
    expect(listA.map((c) => c.id)).not.toContain(clientB.id);

    const listB = await getClientList(orgB.id);
    expect(listB.map((c) => c.id)).toEqual([clientB.id]);
  });

  it("getClientById refuses to resolve another organization's client, even by exact ID", async () => {
    // Org A's actor asking for Org B's real, existing client ID.
    const crossTenantResult = await getClientById(orgA.id, clientB.id);
    expect(crossTenantResult).toBeNull();

    // Sanity check: the same call succeeds for the client's own org.
    const sameTenantResult = await getClientById(orgB.id, clientB.id);
    expect(sameTenantResult?.id).toBe(clientB.id);
  });
});
