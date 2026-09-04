import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/os/db";
import { OrgRole } from "@/lib/os/auth/rbac";
import { getPortfolioDigestData } from "@/lib/os/queries/digest";
import { sendOsEmail } from "@/lib/os/email";
import { recordAuditEvent } from "@/lib/os/audit";

/**
 * Weekly portfolio status digest — see vercel.json's crons entry for the
 * schedule. Vercel signs its own Cron invocations with an
 * `Authorization: Bearer $CRON_SECRET` header automatically once CRON_SECRET
 * is set as a Vercel env var; this route just has to check for it. A
 * request with no/wrong secret is rejected rather than silently sending
 * mail, since this endpoint is publicly routable.
 *
 * Recipients are every active Managing Partner / Portfolio Lead membership
 * across the (currently single) organization — the two roles with org-wide
 * visibility, not just their own clients. See lib/os/auth/rbac.ts.
 */
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const organizations = await db.organization.findMany({ select: { id: true, name: true } });

  let sent = 0;
  for (const org of organizations) {
    const recipients = await db.membership.findMany({
      where: {
        organizationId: org.id,
        isActive: true,
        role: { in: [OrgRole.MANAGING_PARTNER, OrgRole.PORTFOLIO_LEAD] },
      },
      select: { id: true, email: true, displayName: true },
    });

    if (recipients.length === 0) continue;

    const data = await getPortfolioDigestData(org.id);
    const { subject, html, text } = renderDigest(org.name, data);

    for (const recipient of recipients) {
      await sendOsEmail({ to: recipient.email, subject, html, text });
      sent += 1;
    }

    await recordAuditEvent({
      organizationId: org.id,
      action: "PORTFOLIO_DIGEST_SENT",
      targetType: "Organization",
      targetId: org.id,
      metadata: { recipientCount: recipients.length },
    });
  }

  return NextResponse.json({ ok: true, sent });
}

function renderDigest(orgName: string, data: Awaited<ReturnType<typeof getPortfolioDigestData>>) {
  const { operational, quality, requests, portfolio, membersWithOverdueTasks } = data;
  const dateLabel = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const lines: string[] = [
    `Portfolio digest for ${orgName} — ${dateLabel}`,
    "",
    "PORTFOLIO",
    `  ${portfolio.total} clients — ${portfolio.activeCount} active, ${portfolio.onboardingCount} onboarding, ${portfolio.watchCount + portfolio.atRiskCount} watch/at-risk`,
    "",
    "TASKS",
    `  ${operational.totalTasks} total, ${operational.overdueCount} overdue, ${operational.byStatus.DELIVERED ?? 0} delivered`,
  ];

  if (quality.totalReviews > 0) {
    lines.push(
      "",
      "QUALITY",
      `  ${quality.totalReviews} reviews — ${quality.passRate}% approved first pass, ${quality.changesRequested} sent back`,
    );
  }

  if (requests.totalRequests > 0) {
    lines.push(
      "",
      "CLIENT REQUESTS",
      `  ${requests.totalRequests} total, ${requests.openCount} open, ${requests.slaComplianceRate ?? "—"}% resolved within SLA`,
    );
  }

  if (membersWithOverdueTasks.length > 0) {
    lines.push("", "TEAM — OVERDUE WORK", ...membersWithOverdueTasks.map((m) =>
      `  ${m.displayName ?? m.email}: ${m.overdueTaskCount} overdue of ${m.openTaskCount} open`,
    ));
  }

  lines.push("", "Full detail: https://www.cfopartners.fund/os/reports");

  const text = lines.join("\n");
  const html = `<pre style="font:14px/1.5 -apple-system,sans-serif;white-space:pre-wrap;">${escapeHtml(text)}</pre>`;

  return { subject: `Portfolio digest — ${dateLabel}`, text, html };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
}
