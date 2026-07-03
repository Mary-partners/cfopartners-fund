"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronDown,
  Compass,
  FileSearch,
  LineChart,
  Menu,
  Megaphone,
  Rocket,
  ShieldCheck,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { CheckupTrigger } from "./CheckupTrigger";
import { ROOMS } from "@/lib/rooms";
import { SERVICE_GROUPS } from "@/lib/services";

const ROOM_ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  "line-chart": LineChart,
  wrench: Wrench,
  megaphone: Megaphone,
  "shield-check": ShieldCheck,
  briefcase: Briefcase,
  users: Users,
};

const SERVICE_ICONS: Record<string, LucideIcon> = {
  diagnostics: FileSearch,
  advisory: Briefcase,
  finance: LineChart,
  execution: Rocket,
};

type MenuKey = "services" | "rooms" | null;

export function Nav() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on Escape and on click outside.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const enter = (key: Exclude<MenuKey, null>) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };
  const closeAll = () => {
    setOpen(null);
    setMobileOpen(false);
    setMobileSection(null);
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur"
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={closeAll}
          className="font-serif text-[1.25rem] font-semibold text-ink"
        >
          CFO<span className="text-accent">Partners</span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden items-center gap-6 lg:flex">
          <DropTrigger
            label="Services"
            active={open === "services"}
            onEnter={() => enter("services")}
            onLeave={scheduleClose}
          />
          <DropTrigger
            label="Executive Rooms"
            active={open === "rooms"}
            onEnter={() => enter("rooms")}
            onLeave={scheduleClose}
          />
          {[
            { href: "/ai-automations", label: "AI Automations" },
            { href: "/pricing", label: "Pricing" },
            { href: "/blog", label: "Journal" },
            { href: "/resources", label: "Resources" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeAll}
              className="text-[0.9rem] font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <CheckupTrigger variant="primary">Free Check-Up</CheckupTrigger>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex items-center gap-3 lg:hidden">
          <CheckupTrigger
            variant="primary"
            className="px-4 py-2.5 text-[0.85rem]"
          >
            Check-Up
          </CheckupTrigger>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* DESKTOP MEGA PANELS */}
      <div
        onMouseEnter={() => open && enter(open)}
        onMouseLeave={scheduleClose}
        className="absolute inset-x-0 top-full hidden lg:block"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.22s ease, transform 0.22s ease",
        }}
      >
        <div className="border-b border-line bg-white shadow-card">
          <div className="mx-auto max-w-[1180px] px-6 py-8">
            {open === "services" && <ServicesPanel onNavigate={closeAll} />}
            {open === "rooms" && <RoomsPanel onNavigate={closeAll} />}
          </div>
        </div>
      </div>

      {/* MOBILE PANEL */}
      <div
        className="overflow-hidden border-b border-line bg-bg lg:hidden"
        style={{
          maxHeight: mobileOpen ? "80vh" : "0px",
          transition: "max-height 0.35s ease",
        }}
      >
        <div className="max-h-[80vh] overflow-y-auto px-6 py-4">
          <MobileAccordion
            label="Services"
            open={mobileSection === "services"}
            onToggle={() =>
              setMobileSection(
                mobileSection === "services" ? null : "services",
              )
            }
          >
            {SERVICE_GROUPS.map((g) => {
              const Icon = SERVICE_ICONS[g.key] ?? Briefcase;
              return (
                <Link
                  key={g.key}
                  href="/#services"
                  onClick={closeAll}
                  className="flex items-center gap-3 py-2.5"
                >
                  <Icon className="h-4 w-4 flex-none text-accent-2" />
                  <span className="text-[0.95rem] text-ink-2">{g.name}</span>
                </Link>
              );
            })}
          </MobileAccordion>
          <MobileAccordion
            label="Executive Rooms"
            open={mobileSection === "rooms"}
            onToggle={() =>
              setMobileSection(mobileSection === "rooms" ? null : "rooms")
            }
          >
            {ROOMS.map((r) => {
              const Icon = ROOM_ICONS[r.iconKey] ?? Compass;
              return (
                <Link
                  key={r.slug}
                  href={`/rooms/${r.slug}`}
                  onClick={closeAll}
                  className="flex items-center gap-3 py-2.5"
                >
                  <Icon className="h-4 w-4 flex-none text-accent-2" />
                  <span className="text-[0.95rem] text-ink-2">
                    {r.shortName}
                  </span>
                </Link>
              );
            })}
          </MobileAccordion>
          {[
            { href: "/ai-automations", label: "AI Automations" },
            { href: "/pricing", label: "Pricing" },
            { href: "/blog", label: "Journal" },
            { href: "/resources", label: "Resources" },
            { href: "/#institutional", label: "For Institutions" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeAll}
              className="block border-b border-line py-3.5 text-[1rem] font-medium text-ink"
            >
              {l.label}
            </Link>
          ))}
          <div className="py-4">
            <CheckupTrigger variant="accent" className="w-full">
              Take the free Check-Up
            </CheckupTrigger>
          </div>
        </div>
      </div>
    </nav>
  );
}

function DropTrigger({
  label,
  active,
  onEnter,
  onLeave,
}: {
  label: string;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={active}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onClick={onEnter}
      className={`flex items-center gap-1 text-[0.9rem] font-medium transition-colors ${
        active ? "text-ink" : "text-ink-2 hover:text-ink"
      }`}
    >
      {label}
      <ChevronDown
        className={`h-3.5 w-3.5 transition-transform duration-200 ${active ? "rotate-180" : ""}`}
      />
    </button>
  );
}

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {SERVICE_GROUPS.map((g) => {
          const Icon = SERVICE_ICONS[g.key] ?? Briefcase;
          return (
            <Link
              key={g.key}
              href="/#services"
              onClick={onNavigate}
              className="group rounded-2xl border border-line bg-bg p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-card"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft text-accent-2">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mb-1 font-semibold text-ink">{g.name}</div>
              <p className="m-0 text-[0.85rem] leading-5 text-ink-3">
                {g.summary}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[0.82rem] font-semibold text-accent-2 opacity-0 transition-opacity group-hover:opacity-100">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </div>
      <Link
        href="/ai-automations"
        onClick={onNavigate}
        className="mt-4 flex items-center justify-between rounded-2xl border-2 border-accent bg-gold-soft/40 px-6 py-4 text-ink transition-colors hover:bg-gold-soft"
      >
        <span className="flex items-center gap-3">
          <Rocket className="h-5 w-5 text-accent-2" />
          <span>
            <span className="block text-[0.95rem] font-semibold">
              AI Automations
            </span>
            <span className="block text-[0.82rem] text-ink-3">
              Tell us what to automate. We scope it, build it with you, and
              train your team.
            </span>
          </span>
        </span>
        <ArrowRight className="h-4 w-4 flex-none text-accent-2" />
      </Link>
      <Link
        href="/#institutional"
        onClick={onNavigate}
        className="mt-3 flex items-center justify-between rounded-2xl bg-ink px-6 py-4 text-white transition-colors hover:bg-ink-2"
      >
        <span className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-accent" />
          <span>
            <span className="block text-[0.95rem] font-semibold">
              Portfolio Intelligence Platform
            </span>
            <span className="block text-[0.82rem] text-white/60">
              For banks, accelerators, DFIs, foundations, and ecosystem
              builders
            </span>
          </span>
        </span>
        <ArrowRight className="h-4 w-4 flex-none" />
      </Link>
    </div>
  );
}

function RoomsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
        {ROOMS.map((r) => {
          const Icon = ROOM_ICONS[r.iconKey] ?? Compass;
          return (
            <Link
              key={r.slug}
              href={`/rooms/${r.slug}`}
              onClick={onNavigate}
              className={`group flex items-start gap-3 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-card ${
                r.highlighted
                  ? "border-accent bg-gold-soft/40"
                  : "border-line bg-bg"
              }`}
            >
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gold-soft text-accent-2">
                <Icon className="h-4 w-4" />
              </div>
              <span>
                <span className="block text-[0.92rem] font-semibold text-ink">
                  {r.shortName}
                </span>
                <span className="block text-[0.78rem] leading-4 text-ink-3">
                  {r.role}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-line bg-bg-alt px-6 py-3.5">
        <span className="text-[0.88rem] text-ink-2">
          Each room pairs an AI assistant with named tools and human experts.
        </span>
        <Link
          href="/#rooms"
          onClick={onNavigate}
          className="inline-flex items-center gap-1 text-[0.85rem] font-semibold text-accent-2 hover:text-accent"
        >
          See all rooms <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function MobileAccordion({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3.5 text-left text-[1rem] font-medium text-ink"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 text-accent-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid overflow-hidden transition-all duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden pb-2 pl-1">{children}</div>
      </div>
    </div>
  );
}
