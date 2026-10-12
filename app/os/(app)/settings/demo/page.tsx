import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireActor } from "@/lib/os/auth/session";
import { can } from "@/lib/os/auth/rbac";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/os/ui/card";
import { SeedDemoEnvironmentForm } from "@/components/os/seed-demo-environment-form";

export const metadata: Metadata = { title: "Demo environment" };

export default async function DemoEnvironmentSettingsPage() {
  const actor = await requireActor();
  if (!can(actor.membership.role, "settings:manage")) {
    redirect("/os/settings");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Demo environment</h1>
        <p className="text-sm text-ink-2/70">
          A separate, synthetic-data-only organization for letting people explore CFOIP OS without touching any
          real client's information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shareable demo login</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <SeedDemoEnvironmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
