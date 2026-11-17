import type { Metadata } from "next";
import { Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ContactForms } from "@/components/site/ContactForms";
import { JsonLd } from "@/components/site/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  LINKEDIN_URL,
  OFFICE_ADDRESS,
  WHATSAPP_URL,
} from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact CFO Innovation Partners | Nairobi, Kenya",
  description:
    "Contact CFO Innovation Partners in Nairobi about fractional CFO support, investment readiness, portfolio financial management or enterprise programmes.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <Nav />
      <main id="main">
        <header className="hero-gradient py-[56px] md:py-[64px]">
          <div className="mx-auto max-w-[1180px] px-6">
            <Breadcrumbs items={crumbs} />
            <h1 className="mb-4 max-w-[820px]">Contact CFO Innovation Partners</h1>
            <p className="m-0 max-w-[64ch] text-[1.1rem] leading-8 text-ink-2">
              Tell us about your portfolio, programme or business. We reply
              within two working days to arrange a scoping call or consultation.
            </p>
          </div>
        </header>

        <section id="enquiry" className="scroll-mt-24 bg-white py-[64px]">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="min-w-0">
              <h2 className="mb-5 text-[1.6rem]">Send an enquiry</h2>
              <ContactForms />
            </div>
            <aside className="min-w-0">
              <h2 className="mb-5 text-[1.6rem]">Other ways to reach us</h2>
              <ul className="m-0 grid list-none gap-4 p-0 text-[0.98rem]">
                <li className="flex gap-3">
                  <Mail className="mt-1 h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline-offset-4 hover:underline">{CONTACT_EMAIL}</a>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-1 h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
                  <a href={`tel:${CONTACT_PHONE_TEL}`} className="text-ink underline-offset-4 hover:underline">{CONTACT_PHONE}</a>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="mt-1 h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-ink underline-offset-4 hover:underline">WhatsApp us</a>
                </li>
                <li className="flex gap-3">
                  <Linkedin className="mt-1 h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-ink underline-offset-4 hover:underline">LinkedIn</a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
                  <address className="not-italic text-ink">
                    {OFFICE_ADDRESS.line1}
                    <br />
                    {OFFICE_ADDRESS.city}, {OFFICE_ADDRESS.country}
                  </address>
                </li>
              </ul>
              <div className="mt-8 rounded-card border border-line bg-bg-alt p-5">
                <h3 className="mb-2 text-[1.05rem]">Responding to a ToR or RFP?</h3>
                <p className="m-0 text-[0.92rem] leading-6 text-ink-2">
                  Send the terms of reference to {CONTACT_EMAIL} with the
                  deadline in the subject line, and we&rsquo;ll confirm whether
                  we can respond.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
