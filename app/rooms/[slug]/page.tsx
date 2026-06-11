import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Briefcase,
  Check,
  Compass,
  LineChart,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CheckupTrigger } from "@/components/CheckupTrigger";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROOMS, allRoomSlugs, roomFor, type TierLabel } from "@/lib/rooms";

export function generateStaticParams() {
  return allRoomSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const room = roomFor(params.slug);
  if (!room) return { title: "Room not found | CFO Partners" };
  return {
    title: `${room.name} | CFO Partners`,
    description: `${room.role}. ${room.blurb}`,
  };
}

const ICON_MAP: Record<string, LucideIcon> = {
  compass: Compass,
  "line-chart": LineChart,
  wrench: Wrench,
  megaphone: Megaphone,
  "shield-check": ShieldCheck,
  briefcase: Briefcase,
  users: Users,
};

const TIER_STYLES: Record<TierLabel, string> = {
  Free: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Starter: "bg-bg-alt text-ink-2 border-line",
  Growth: "bg-gold-soft text-accent-2 border-accent/30",
  Expert: "bg-ink text-white border-ink",
};

export default function RoomPage({ params }: { params: { slug: string } }) {
  const room = roomFor(params.slug);
  if (!room) notFound();

  const Icon = ICON_MAP[room.iconKey] ?? Sparkles;
  const otherRooms = ROOMS.filter((r) => r.slug !== room.slug).slice(0, 6);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <Nav />

      {/* HERO */}
      <header className="hero-gradient py-[80px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <Link
            href="/#rooms"
            className="mb-6 inline-flex items-center gap-1.5 text-[0.85rem] text-ink-3 hover:text-ink"
          >
            ← All Executive Rooms
          </Link>
          <div className="grid items-start gap-10 md:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-soft text-accent-2">
                <Icon className="h-7 w-7" />
              </div>
              <span className="mb-3 inline-block text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
                {room.role}
              </span>
              <h1 className="mb-5 text-[clamp(2rem,4vw,3rem)]">{room.name}</h1>
              <p className="mb-8 max-w-[560px] text-[1.1rem] text-ink-2">
                {room.longBlurb}
              </p>
              <div className="flex flex-wrap gap-3">
                <CheckupTrigger variant="primary">
                  Take the free diagnostic
                </CheckupTrigger>
                <Button asChild variant="outline">
                  <Link href="/pricing">
                    See pricing <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <Card className="rounded-2xl bg-white p-8">
              <div className="mb-2 flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink-3">
                <Brain className="h-4 w-4" /> AI Assistant: {room.assistant}
              </div>
              <p className="my-4 font-serif text-[1.3rem] italic leading-snug text-ink">
                &ldquo;{room.prompt}&rdquo;
              </p>
              <p className="text-[0.88rem] text-ink-3">
                Available with{" "}
                <Link href="/pricing" className="text-accent-2 hover:text-accent">
                  Founder OS Growth
                </Link>{" "}
                which unlocks all six AI executive assistants.
              </p>
              <div className="mt-6 border-t border-line pt-5">
                <div className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink-3">
                  What this room helps with
                </div>
                <ul className="space-y-2">
                  {room.helps.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2 text-[0.92rem] text-ink-2"
                    >
                      <Check className="mt-1 h-3.5 w-3.5 flex-none text-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </header>

      {/* TOOLS */}
      <section className="py-[90px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
            Tools inside this room
          </span>
          <h2 className="mb-5 max-w-[780px]">
            {room.slug === "experts"
              ? "Vetted human experts, ready to book."
              : "Practical tools you can use this week."}
          </h2>
          <p className="mb-[60px] max-w-[720px] text-[1.1rem] text-ink-2">
            {room.slug === "experts"
              ? "Each expert is vetted by CFO Partners. Book by the hour or by the engagement. We stand behind every recommendation."
              : "Templates, calculators, and checklists designed for the realities of running a business in East Africa. Built to be used on Tuesday morning, not filed in a folder."}
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {room.tools.map((tool) => (
              <Card
                key={tool.name}
                className="flex flex-col p-7 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-[1.15rem]">{tool.name}</h3>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.06em] ${TIER_STYLES[tool.tier]}`}
                  >
                    {tool.tier === "Expert" ? "On request" : tool.tier}
                  </span>
                </div>
                <p className="text-[0.95rem] text-ink-2">{tool.description}</p>
                {tool.tier === "Free" && (
                  <Link
                    href="/resources"
                    className="mt-4 inline-flex items-center gap-1 text-[0.88rem] font-semibold text-accent-2 hover:text-accent"
                  >
                    Download free
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section className="bg-bg-alt py-[80px]">
        <div className="mx-auto max-w-[820px] px-6 text-center">
          <h2 className="mb-4">
            Unlock {room.shortName} with Founder OS Growth.
          </h2>
          <p className="mx-auto mb-8 max-w-[560px] text-ink-2">
            KES 15,000 / month opens every Executive Room, every AI assistant,
            and the full business template library. Or start with the free
            diagnostic to see which Room your business needs first.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/pricing">
                See pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <CheckupTrigger variant="outline" className="px-7 py-4 text-base">
              Take the diagnostic
            </CheckupTrigger>
          </div>
        </div>
      </section>

      {/* OTHER ROOMS */}
      <section className="py-[90px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
            Explore the suite
          </span>
          <h2 className="mb-[40px]">Other Executive Rooms</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherRooms.map((r) => {
              const OtherIcon = ICON_MAP[r.iconKey] ?? Sparkles;
              return (
                <Link
                  key={r.slug}
                  href={`/rooms/${r.slug}`}
                  className="group block"
                >
                  <Card className="flex h-full flex-col p-6 transition-all group-hover:-translate-y-0.5 group-hover:shadow-card">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft text-accent-2">
                      <OtherIcon className="h-5 w-5" />
                    </div>
                    <span className="mb-1 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-accent-2">
                      {r.role}
                    </span>
                    <h3 className="mb-2 text-[1.05rem]">{r.name}</h3>
                    <p className="text-[0.9rem] text-ink-2">{r.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[0.85rem] font-semibold text-accent-2 group-hover:text-accent">
                      Step into the room
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
