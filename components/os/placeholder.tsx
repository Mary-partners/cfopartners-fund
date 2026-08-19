import Link from "next/link";
import { Card, CardContent } from "@/components/os/ui/card";

export function PlaceholderPage({
  title,
  phase,
  description,
}: {
  title: string;
  phase: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12">
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
            Ships {phase}
          </span>
          <h1 className="text-xl font-semibold text-ink">{title}</h1>
          <p className="max-w-md text-sm text-ink-2/70">{description}</p>
          <Link
            href="/os/settings"
            className="mt-2 text-sm font-medium text-ink underline"
          >
            See the full build sequence in Settings → Roadmap
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
