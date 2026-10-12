"use server";

import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { seedDemoEnvironment, type DemoCredentials } from "@/lib/os/demo/seed";

export type SeedDemoState = {
  error?: string;
  credentials?: DemoCredentials;
};

export async function seedDemoEnvironmentAction(_prevState: SeedDemoState): Promise<SeedDemoState> {
  const actor = await requireActor();
  if (!can(actor.membership.role, "settings:manage")) {
    return { error: "You don't have permission to manage the demo environment." };
  }

  try {
    const credentials = await seedDemoEnvironment(actor.membership.id);
    return { credentials };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return { error: `Could not set up the demo environment: ${detail}` };
  }
}
