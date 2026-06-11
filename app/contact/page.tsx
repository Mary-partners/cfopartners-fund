import type { Metadata } from "next";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Building2,
  Sparkles,
  Briefcase,
  Users,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CheckupTrigger } from "@/components/CheckupTrigger";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  OFFICE_ADDRESS,
  LINKEDIN_URL,
  mailto,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact — CFO Partners",
  description:
    "Get in touch with CFO Innovation Partners. Diagnostic-led advisory and execution support for founders, SMEs, scale-ups, and institutional partners across East Africa.",
};

const PATHS = [
  {
    icon: Sparkles,
    title: "For founders",
    description: "Take the diagnostic. Book a review. Join the Expert Advisory Panel.",
    cta: { label: "Take the diagnostic", isCheckup: true },
    altCta: {
      label: "Email us",
      href: mailto("Founder enquiry"),
    },
  },
  {
    icon: Briefcase,
    title: "For scale-ups",
    description:
      "Engage us for a Scale-Up Diagnostic, a Virtual Board, or Fractional CFO support.",
    cta: { label: "Scale-Up enquiry", href: mailto("Scale-Up enquiry") },
  },
  {
    icon: Users,
    title: "For accelerators & ESOs",
    description: "Partner with us to diagnose and support your portfolio companies.",
    cta: {
      label: "Portfolio enquiry",
      href: mailto("Accelerator / ESO enquiry"),
    },
  },
  {
    icon: Building2,
    title: "For banks, investors & DFIs",
    description:
      "Work with us to improve SME readiness, capital preparedness, and enterprise support outcomes.",
    cta: {
      label: "Institutional enquiry",
      href: mailto("Institutional enquiry"),
    },
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg">
      <Nav />

      {/* HERO */}
      <header className="hero-gradient py-[72px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
                Contact
              </span>
              <h1 className="mb-5">
                There is a route from this conversation to a working
                relationship.
              </h1>
              <p className="mb-6 text-[1.1rem] text-ink-2">
                We read every founder, scale-up, and institutional enquiry —
                and reply within two working days.
              </p>
              <div className="flex flex-wrap gap-3">
                <CheckupTrigger variant="accent">
                  Take the free diagnostic
                </CheckupTrigger>
                <Button asChild variant="outline" size="lg">
                  <a href={`mailto:${CONTACT_EMAIL}`}>
                    Email us <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <Card className="rounded-3xl border-2 border-line bg-white p-8 shadow-card">
              <h3 className="mb-5 text-[1.2rem]">CFO Innovation Partners</h3>
              <div className="space-y-4 text-[0.95rem]">
                <ContactRow icon={Mail} label="Email">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-semibold text-ink hover:text-accent-2"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </ContactRow>
                <ContactRow icon={Phone} label="Phone">
                  <a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    className="font-semibold text-ink hover:text-accent-2"
                  >
                    {CONTACT_PHONE}
                  </a>
                </ContactRow>
                <ContactRow icon={MapPin} label="Office">
                  <span className="text-ink-2">
                    {OFFICE_ADDRESS.line1}
                    <br />
                    {OFFICE_ADDRESS.city} {OFFICE_ADDRESS.postcode},{" "}
                    {OFFICE_ADDRESS.country}
                  </span>
                </ContactRow>
                <ContactRow icon={Linkedin} label="LinkedIn">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ink hover:text-accent-2"
                  >
                    linkedin.com/company/cfo-partners
                  </a>
                </ContactRow>
              </div>
              <div className="mt-6 border-t border-line pt-5">
                <div className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
                  Office hours
                </div>
                <p className="m-0 text-[0.88rem] text-ink-2">
                  Monday to Friday · 09:00 — 18:00 EAT
                </p>
              </div>
            </Card>
          </div>
        </div>
      </header>

      {/* FOUR PATHS */}
      <section className="py-[80px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
            Four calibrated paths
          </span>
          <h2 className="mb-5 max-w-[820px]">
            Tell us where you stand. We will route you correctly.
          </h2>
          <p className="mb-12 max-w-[720px] text-[1.1rem] text-ink-2">
            CFO Partners serves four audiences with different needs and
            different rhythms. Use the path that fits — every route ends with a
            real human reply.
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {PATHS.map((path) => {
              const Icon = path.icon;
              return (
                <Card key={path.title} className="flex flex-col p-7">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft text-accent-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-[1.2rem]">{path.title}</h3>
                  <p className="mb-6 text-[0.95rem] text-ink-2">
                    {path.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-3">
                    {path.cta.isCheckup ? (
                      <CheckupTrigger variant="primary">
                        {path.cta.label}
                      </CheckupTrigger>
                    ) : (
                      <Button asChild>
                        <a href={path.cta.href}>
                          {path.cta.label}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {path.altCta && (
                      <Button asChild variant="outline">
                        <a href={path.altCta.href}>{path.altCta.label}</a>
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* OFFICE / MAP placeholder */}
      <section className="bg-bg-alt py-[60px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
                Visit us
              </span>
              <h2 className="mb-4">
                Cove Court, Watermark Business Park, Nairobi.
              </h2>
              <p className="mb-6 text-[1.05rem] text-ink-2">
                Our office sits inside Watermark Business Park along Karen Road
                — a quiet, professional setting designed for the kind of
                structured working sessions our advisory model relies on.
              </p>
              <Button asChild>
                <a
                  href="https://maps.google.com/?q=Watermark+Business+Park+Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div
              aria-hidden="true"
              className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-ink"
            >
              <svg
                viewBox="0 0 800 600"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="map-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#0F172A" />
                    <stop offset="1" stopColor="#1E293B" />
                  </linearGradient>
                </defs>
                <rect width="800" height="600" fill="url(#map-bg)" />
                {/* abstract street grid */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 110 + 40}
                    y1="0"
                    x2={i * 110 + 40}
                    y2="600"
                    stroke="rgba(184,134,11,0.15)"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={i * 110 + 40}
                    x2="800"
                    y2={i * 110 + 40}
                    stroke="rgba(184,134,11,0.15)"
                    strokeWidth="1"
                  />
                ))}
                {/* marker */}
                <circle cx="400" cy="300" r="60" fill="rgba(184,134,11,0.2)" />
                <circle cx="400" cy="300" r="30" fill="rgba(184,134,11,0.4)" />
                <circle cx="400" cy="300" r="12" fill="#B8860B" />
                <text
                  x="400"
                  y="380"
                  fill="#F4F1EA"
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontSize="18"
                  fontWeight="600"
                >
                  Cove Court · Watermark
                </text>
                <text
                  x="400"
                  y="404"
                  fill="rgba(244,241,234,0.6)"
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontSize="14"
                >
                  Nairobi, Kenya
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gold-soft text-accent-2">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-ink-3">
          {label}
        </div>
        <div className="text-[0.95rem]">{children}</div>
      </div>
    </div>
  );
}
