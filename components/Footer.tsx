import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  OFFICE_ADDRESS,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-alt pt-[60px] pb-8 text-[0.88rem] text-ink-3">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="mb-4 inline-block font-serif text-[1.4rem] font-semibold text-ink"
            >
              CFO<span className="text-accent">Partners</span>
            </Link>
            <p className="mb-5 max-w-[380px] text-[0.92rem] text-ink-2">
              An advisory and execution support firm for African founders,
              SMEs, and scale-ups. We help businesses move from ambition to
              structure, from structure to readiness, and from readiness to
              growth.
            </p>
            <div className="space-y-2.5 text-[0.9rem]">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2.5 text-ink-2 hover:text-ink"
              >
                <Mail className="h-4 w-4 flex-none text-accent" />
                <span>{CONTACT_EMAIL}</span>
              </a>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="flex items-center gap-2.5 text-ink-2 hover:text-ink"
              >
                <Phone className="h-4 w-4 flex-none text-accent" />
                <span>{CONTACT_PHONE}</span>
              </a>
              <div className="flex items-start gap-2.5 text-ink-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent" />
                <span>
                  {OFFICE_ADDRESS.line1}
                  <br />
                  {OFFICE_ADDRESS.city} {OFFICE_ADDRESS.postcode},{" "}
                  {OFFICE_ADDRESS.country}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-3 text-[0.85rem] font-semibold uppercase tracking-[0.06em] text-ink">
              Platform
            </h4>
            <FLink href="/#rooms">Executive Rooms</FLink>
            <FLink href="/pricing">Pricing</FLink>
            <FLink href="/blog">Journal</FLink>
            <FLink href="/#institutional">For Institutions</FLink>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-3 text-[0.85rem] font-semibold uppercase tracking-[0.06em] text-ink">
              Rooms
            </h4>
            <FLink href="/rooms/cfo">CFO Room</FLink>
            <FLink href="/rooms/coo">COO Room</FLink>
            <FLink href="/rooms/cmo">CMO Room</FLink>
            <FLink href="/rooms/cro">CRO Room</FLink>
            <FLink href="/rooms/board">Board Room</FLink>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-3 text-[0.85rem] font-semibold uppercase tracking-[0.06em] text-ink">
              Company
            </h4>
            <FLink href="/#team">Our team</FLink>
            <FLink href="/contact">Contact</FLink>
            <div className="mt-2 flex items-center gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CFO Partners on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink-2 transition-colors hover:border-accent hover:text-accent-2"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CFO Partners on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink-2 transition-colors hover:border-accent hover:text-accent-2"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CFO Partners on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink-2 transition-colors hover:border-accent hover:text-accent-2"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-line pt-6">
          <span>
            © {new Date().getFullYear()} CFO Innovation Partners. All rights
            reserved.
          </span>
          <span>Diagnostic-led advisory · Nairobi, Kenya</span>
        </div>
      </div>
    </footer>
  );
}

function FLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block py-1 text-[0.9rem] text-ink-3 hover:text-ink"
    >
      {children}
    </Link>
  );
}
