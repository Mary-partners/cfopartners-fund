"use client";

import { CheckupTrigger } from "./CheckupTrigger";

const links = [
  { href: "#suite", label: "The Suite" },
  { href: "#disciplines", label: "5 Disciplines" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#about", label: "About" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-serif text-[1.25rem] font-semibold text-ink"
        >
          CFO<span className="text-accent">Partners</span>
        </a>
        <div className="flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden text-[0.95rem] font-medium text-ink-2 transition-colors hover:text-ink sm:inline-block"
            >
              {l.label}
            </a>
          ))}
          <CheckupTrigger variant="primary">Free Check-Up</CheckupTrigger>
        </div>
      </div>
    </nav>
  );
}
