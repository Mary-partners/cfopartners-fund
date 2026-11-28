"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  note?: string;
}

const AUDIENCE_LINKS: NavLink[] = [
  { href: "/investment-funds", label: "Investment Funds & Capital Providers", note: "Funds, DFIs, lenders, foundations" },
  { href: "/accelerators-development-partners", label: "Accelerators & Development Partners", note: "Programmes, ESOs, TA facilities" },
  { href: "/growing-businesses", label: "Growing Businesses", note: "Founders and finance leads" },
];

const OFFER_LINKS: NavLink[] = [
  { href: "/portfolio-finance-system", label: "Portfolio Finance System", note: "For funds and enterprise programmes" },
  { href: "/90-day-financial-performance-system", label: "90-Day Financial Performance System", note: "For growing businesses" },
];

const BUSINESS_SERVICES: NavLink[] = [
  { href: "/fractional-cfo-services", label: "Fractional CFO Services" },
  { href: "/investment-readiness", label: "Investment Readiness" },
  { href: "/access-to-finance-advisory", label: "Access to Finance Advisory" },
  { href: "/financial-modelling", label: "Financial Modelling" },
  { href: "/financial-systems", label: "Financial Systems & Operational Efficiency" },
];

const INSTITUTIONAL_SERVICES: NavLink[] = [
  { href: "/portfolio-financial-management", label: "Portfolio Financial Management" },
  { href: "/pre-post-investment-support", label: "Pre- & Post-Investment Support" },
  { href: "/enterprise-development-technical-assistance", label: "Enterprise Development & TA" },
  { href: "/programme-design", label: "Programme Design & Implementation" },
  { href: "/portfolio-intelligence", label: "Portfolio Intelligence" },
];

const PLAIN_LINKS: NavLink[] = [
  { href: "/our-approach", label: "Our Approach" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

type MenuKey = "serve" | "services" | null;

function Wordmark() {
  return (
    <Link href="/" className="flex flex-col leading-none text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2">
      <span className="font-serif text-[1.15rem] font-bold tracking-tight">
        CFO <span className="text-accent-2">Innovation</span> Partners
      </span>
      <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-2">
        CFOIP · Nairobi
      </span>
    </Link>
  );
}

function MenuLinks({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
  return (
    <ul className="m-0 grid list-none gap-1 p-0">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            onClick={onNavigate}
            className="block rounded-lg px-3 py-2 text-[0.92rem] text-ink hover:bg-bg-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2"
          >
            <span className="font-semibold">{l.label}</span>
            {l.note && <span className="block text-[0.8rem] text-ink-2">{l.note}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Nav() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close menus on navigation, outside click and Escape.
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => {
    setOpen(null);
    setMobile(false);
  };
  const toggle = (k: Exclude<MenuKey, null>) => setOpen((cur) => (cur === k ? null : k));

  const triggerCls =
    "inline-flex min-h-[40px] items-center gap-1 rounded-md px-2 py-2 text-[0.92rem] font-medium text-ink-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2";

  return (
    <header ref={navRef} className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-3.5">
        <Wordmark />

        {/* Desktop */}
        <ul className="m-0 hidden list-none items-center gap-1 p-0 lg:flex">
          <li className="relative">
            <button type="button" className={triggerCls} aria-expanded={open === "serve"} aria-controls="menu-serve" onClick={() => toggle("serve")}>
              Who We Serve <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            <div id="menu-serve" hidden={open !== "serve"} className="absolute left-0 top-full mt-2 w-[340px] rounded-card border border-line bg-white p-3 shadow-card">
              <MenuLinks links={AUDIENCE_LINKS} onNavigate={close} />
            </div>
          </li>
          <li className="relative">
            <button type="button" className={triggerCls} aria-expanded={open === "services"} aria-controls="menu-services" onClick={() => toggle("services")}>
              Services <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            <div id="menu-services" hidden={open !== "services"} className="absolute left-1/2 top-full mt-2 w-[640px] [&:not([hidden])]:grid -translate-x-1/2 grid-cols-2 gap-4 rounded-card border border-line bg-white p-4 shadow-card">
              <div className="col-span-2 rounded-lg bg-bg-alt p-2">
                <p className="mb-1 px-3 pt-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-2">Flagship offers</p>
                <div className="grid grid-cols-2 gap-1">
                  <MenuLinks links={OFFER_LINKS.slice(0, 1)} onNavigate={close} />
                  <MenuLinks links={OFFER_LINKS.slice(1)} onNavigate={close} />
                </div>
              </div>
              <div>
                <p className="mb-2 px-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-2">For businesses</p>
                <MenuLinks links={BUSINESS_SERVICES} onNavigate={close} />
              </div>
              <div>
                <p className="mb-2 px-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-2">For funds and programmes</p>
                <MenuLinks links={INSTITUTIONAL_SERVICES} onNavigate={close} />
              </div>
            </div>
          </li>
          {PLAIN_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`${triggerCls} ${pathname === l.href ? "text-ink" : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-semibold text-white hover:bg-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 lg:hidden"
          aria-expanded={mobile}
          aria-controls="mobile-menu"
          aria-label={mobile ? "Close menu" : "Open menu"}
          onClick={() => setMobile((m) => !m)}
        >
          {mobile ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <div id="mobile-menu" hidden={!mobile} className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-white lg:hidden">
        <div className="mx-auto grid max-w-[1180px] gap-5 px-6 py-5">
          <div>
            <p className="mb-2 px-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-2">Who we serve</p>
            <MenuLinks links={AUDIENCE_LINKS} onNavigate={close} />
          </div>
          <div>
            <p className="mb-2 px-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-2">Flagship offers</p>
            <MenuLinks links={OFFER_LINKS} onNavigate={close} />
          </div>
          <div>
            <p className="mb-2 px-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-2">Services for businesses</p>
            <MenuLinks links={BUSINESS_SERVICES} onNavigate={close} />
          </div>
          <div>
            <p className="mb-2 px-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-2">Services for funds and programmes</p>
            <MenuLinks links={INSTITUTIONAL_SERVICES} onNavigate={close} />
          </div>
          <MenuLinks links={PLAIN_LINKS} onNavigate={close} />
          <Link href="/contact" onClick={close} className="inline-flex justify-center rounded-full bg-ink px-5 py-3 text-[0.95rem] font-semibold text-white">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
