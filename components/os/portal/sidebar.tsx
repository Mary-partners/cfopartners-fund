"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PORTAL_NAV_ITEMS } from "@/lib/os/portal-nav";
import { cn } from "@/lib/utils";

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex h-full w-64 flex-col gap-1 border-r border-ink/10 bg-white p-4">
      <Link href="/portal/work" className="mb-4 flex items-center gap-2 px-2 text-ink">
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-hidden>
          <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="2" />
          <path
            d="M10 22 C10 14, 18 10, 18 10 C18 10, 26 14, 26 22"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="18" cy="22" r="2" fill="currentColor" />
        </svg>
        <span className="text-base font-semibold">Client Portal</span>
      </Link>

      <ul className="flex flex-col gap-0.5">
        {PORTAL_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-ink text-bg" : "text-ink-2 hover:bg-ink/5",
                )}
              >
                <Icon size={17} aria-hidden />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
