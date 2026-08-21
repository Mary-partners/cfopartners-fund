import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Service-role client: bypasses Row Level Security and Storage policies
// entirely. Used ONLY for the Storage operations in lib/os/storage.ts,
// which are themselves only ever called from server actions/route handlers
// that have already checked requireActor() + can(role, "document:*") first.
// Never import this into a client component or expose the key it reads
// (SUPABASE_SERVICE_ROLE_KEY) to the browser.
let adminClient: SupabaseClient | undefined;

export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) {
    return adminClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set — " +
        "document storage is unavailable until they're configured. See /docs/setup.md.",
    );
  }

  adminClient = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return adminClient;
}
