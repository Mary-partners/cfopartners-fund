import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { Section, SectionHeading } from "@/components/site/Section";

// Not indexed until the first client-approved case studies are published,
// so search engines don't treat an empty page as the firm's evidence.
export const metadata: Metadata = {
  title: "Case Studies | CFO Innovation Partners",
  description:
    "How CFO Innovation Partners supports investment funds, development partners and growing businesses. Case studies are published with client permission.",
  alternates: { canonical: "/case-studies" },
  robots: { index: false, follow: true },
};

const TYPES = [
  {
    title: "Portfolio financial support",
    text: "Financial diagnostics, accounting systems, unit economics, forecasts and capital planning across a fund's or accelerator's portfolio. Our founder has supported 15+ OceanHub Africa portfolio businesses with this work.",
    href: "/portfolio-financial-management",
  },
  {
    title: "Investment assessment",
    text: "Assessing enterprises for investor consideration and preparing them for due diligence. Our founder has recommended 50+ enterprises for investment consideration, with proposed tickets of USD 100K–500K. These are recommendations, not completed investments.",
    href: "/investment-readiness",
  },
  {
    title: "Enterprise development programmes",
    text: "Diagnostics, segmentation and tailored technical assistance for programme cohorts. Our founder's programme experience includes initiatives reaching 800+ SMEs.",
    href: "/enterprise-development-technical-assistance",
  },
  {
    title: "Fractional CFO engagements",
    text: "Monthly management accounts, cash-flow forecasting, budgets and board reporting for growing businesses, measured by what changes in the finance function.",
    href: "/fractional-cfo-services",
  },
];

const TEMPLATE = [
  ["Client and context", "Type of organisation, sector, country and stage (anonymised unless the client agrees to be named)."],
  ["The problem", "What the client needed to solve, in their terms."],
  ["What we did", "The stages of our method we used, the team and the timeline."],
  ["Deliverables", "The specific outputs: models, reports, systems, dashboards, training."],
  ["What changed", "Verified results, such as reporting turnaround, forecast accuracy or cash visibility, or verified outputs where results can't yet be measured."],
  ["Evidence", "Source, reporting period and client approval for every figure quoted."],
];

export default function CaseStudiesPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/case-studies" },
  ];
  return (
    <>
      <Nav />
      <main id="main">
        <header className="hero-gradient py-[56px] md:py-[64px]">
          <div className="mx-auto max-w-[1180px] px-6">
            <Breadcrumbs items={crumbs} />
            <h1 className="mb-4 max-w-[820px]">Case studies</h1>
            <p className="m-0 max-w-[64ch] text-[1.1rem] leading-8 text-ink-2">
              We publish case studies only with our clients&rsquo; permission,
              and every figure we quote has a source and an approval. The first
              are being prepared now. Until then, these are the kinds of work
              we do.
            </p>
          </div>
        </header>

        <Section>
          <SectionHeading eyebrow="Types of engagement" title="The work behind our case studies" />
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {TYPES.map((t) => (
              <li key={t.title} className="rounded-card border border-line bg-white p-6">
                <h3 className="mb-2 text-[1.15rem]">{t.title}</h3>
                <p className="mb-4 text-[0.95rem] leading-7 text-ink-2">{t.text}</p>
                <Link href={t.href} className="font-semibold text-accent-2 underline underline-offset-4 hover:text-ink">
                  About this service
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section tone="alt">
          <SectionHeading eyebrow="How we write them" title="What every case study will show" />
          <dl className="m-0 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TEMPLATE.map(([k, v]) => (
              <div key={k} className="rounded-card border border-line bg-white p-5">
                <dt className="mb-1 font-semibold text-ink">{k}</dt>
                <dd className="m-0 text-[0.92rem] leading-6 text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </main>
      <CtaBand
        kind="institutional"
        label="Discuss a Partnership"
        title="Ask us about relevant experience."
        text="We can share anonymised examples that match your portfolio or programme during a scoping call."
      />
      <Footer />
    </>
  );
}
