import { SmartLink } from "@/components/site/SmartLink";
import Link from "next/link";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  OFFICE_ADDRESS,
} from "@/lib/links";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Who we serve",
    links: [
      ["/investment-funds", "Investment Funds & Capital Providers"],
      ["/accelerators-development-partners", "Accelerators & Development Partners"],
      ["/growing-businesses", "Growing Businesses"],
    ],
  },
  {
    title: "Services",
    links: [
      ["/fractional-cfo-services", "Fractional CFO Services"],
      ["/investment-readiness", "Investment Readiness"],
      ["/access-to-finance-advisory", "Access to Finance Advisory"],
      ["/financial-modelling", "Financial Modelling"],
      ["/financial-systems", "Financial Systems"],
      ["/portfolio-financial-management", "Portfolio Financial Management"],
      ["/pre-post-investment-support", "Pre- & Post-Investment Support"],
      ["/enterprise-development-technical-assistance", "Enterprise Development & TA"],
      ["/programme-design", "Programme Design"],
      ["/portfolio-intelligence", "Portfolio Intelligence"],
    ],
  },
  {
    title: "Firm",
    links: [
      ["/about", "About"],
      ["/our-approach", "Our Approach"],
      ["/case-studies", "Case Studies"],
      ["/insights", "Insights"],
      ["/resources", "Resources"],
      ["/diagnostic", "Business Diagnostic"],
      ["/contact", "Contact"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-alt pb-8 pt-[60px] text-[0.9rem] text-ink-2">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="mb-4 inline-block font-serif text-[1.3rem] font-bold text-ink">
              CFO <span className="text-accent-2">Innovation</span> Partners
            </Link>
            <p className="mb-5 max-w-[380px] text-[0.92rem] leading-6">
              A Nairobi-based advisory and implementation firm. Financial
              leadership, investment readiness and management systems for
              growing African businesses and the funds and programmes that
              support them.
            </p>
            <ul className="m-0 grid list-none gap-2.5 p-0">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2.5 hover:text-ink">
                  <Mail className="h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_PHONE_TEL}`} className="flex items-center gap-2.5 hover:text-ink">
                  <Phone className="h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
                <address className="not-italic">
                  {OFFICE_ADDRESS.line1}, {OFFICE_ADDRESS.city}, {OFFICE_ADDRESS.country}
                </address>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="CFO Innovation Partners on LinkedIn" className="hover:text-ink">
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="CFO Innovation Partners on Instagram" className="hover:text-ink">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="CFO Innovation Partners on Facebook" className="hover:text-ink">
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          {COLUMNS.map((c, i) => (
            <div key={c.title} className={i === 1 ? "md:col-span-4" : "md:col-span-2"}>
              <h2 className="mb-3 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-ink">{c.title}</h2>
              <ul className={`m-0 list-none p-0 ${i === 1 ? "grid gap-x-6 sm:grid-cols-2" : ""}`}>
                {c.links.map(([href, label]) => (
                  <li key={href}>
                    <SmartLink href={href} className="block py-1.5 hover:text-ink">
                      {label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-6 border-t border-line pt-8 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="mb-1 font-sans text-[0.95rem] font-semibold text-ink">CFOIP Insights, by email</h2>
            <p className="m-0 text-[0.88rem]">New articles and practical tools, once a month.</p>
          </div>
          <NewsletterSignup source="footer" variant="light" />
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-[0.85rem]">
          <span>© {new Date().getFullYear()} CFO Innovation Partners. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-ink hover:underline">Privacy</Link>
            <Link href="/portal" className="hover:text-ink hover:underline">Client portal</Link>
            <Link href="/os" className="hover:text-ink hover:underline">Team login</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
