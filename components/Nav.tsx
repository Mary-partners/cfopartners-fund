import Link from "next/link";
import { CheckupTrigger } from "./CheckupTrigger";

const links = [
  { href: "/#rooms", label: "Executive Rooms" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Journal" },
  { href: "/resources", label: "Resources" },
  { href: "/#institutional", label: "For Institutions" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-[1.25rem] font-semibold text-ink"
        >
          CFO<span className="text-accent">Partners</span>
        </Link>
        <div className="flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden text-[0.9rem] font-medium text-ink-2 transition-colors hover:text-ink lg:inline-block"
            >
              {l.label}
            </Link>
          ))}
          <CheckupTrigger variant="primary">Free Check-Up</CheckupTrigger>
        </div>
      </div>
    </nav>
  );
}
