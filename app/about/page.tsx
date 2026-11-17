import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { Section, SectionHeading } from "@/components/site/Section";
import { ABOUT } from "@/lib/content/pages";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: ABOUT.seo.title,
  description: ABOUT.seo.description,
  alternates: { canonical: "/about" },
  openGraph: { title: ABOUT.seo.title, description: ABOUT.seo.description, url: "/about" },
};

const STATUS_CLS: Record<string, string> = {
  Available: "bg-emerald-50 text-emerald-800 border-emerald-200",
  "Delivered within engagements": "bg-gold-soft text-ink border-accent/30",
  "In development": "bg-bg-alt text-ink-2 border-line",
};

export default function AboutPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];
  const f = ABOUT.founder;
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(ABOUT.faqs))} />
      <Nav />
      <main id="main">
        <header className="hero-gradient py-[56px] md:py-[72px]">
          <div className="mx-auto max-w-[1180px] px-6">
            <Breadcrumbs items={crumbs} />
            <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
              <div>
                <span className="mb-4 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
                  About us
                </span>
                <h1 className="mb-5">{ABOUT.h1}</h1>
                <p className="m-0 max-w-[62ch] text-[1.1rem] leading-8 text-ink-2">{ABOUT.summary}</p>
              </div>
              <aside className="rounded-card border border-line bg-white p-6 shadow-card">
                <h2 className="mb-4 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
                  The firm at a glance
                </h2>
                <dl className="m-0 grid gap-3">
                  {ABOUT.firmFacts.map((x) => (
                    <div key={x.label} className="grid gap-0.5 border-b border-line pb-3 last:border-0 last:pb-0">
                      <dt className="text-[0.8rem] font-semibold text-ink-2">{x.label}</dt>
                      <dd className="m-0 text-[0.95rem] text-ink">{x.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </div>
        </header>

        <Section>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-5 text-[1.6rem]">What we do</h2>
              <ul className="m-0 grid list-none gap-4 p-0">
                {ABOUT.whatWeDo.map((x) => (
                  <li key={x} className="text-[0.98rem] leading-7 text-ink-2">{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-[1.6rem]">How we work</h2>
              <ul className="m-0 grid list-none gap-3 p-0">
                {ABOUT.howWeWork.map((x) => (
                  <li key={x} className="flex gap-3 text-[0.98rem] leading-7 text-ink-2">
                    <Check className="mt-1.5 h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="mary-ndinda" tone="alt">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
                Leadership
              </span>
              <h2 className="mb-1">{f.name}</h2>
              <p className="mb-6 text-[1.05rem] font-semibold text-ink-2">{f.title}</p>
              {f.bio.map((p) => (
                <p key={p.slice(0, 40)} className="mb-4 max-w-[68ch] text-[1rem] leading-7 text-ink-2">{p}</p>
              ))}
              <p className="mb-0 max-w-[68ch] text-[1rem] leading-7 text-ink-2">{f.research}</p>
            </div>
            <div>
              <h3 className="mb-4 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
                Professional experience
              </h3>
              <dl className="m-0 grid grid-cols-2 gap-4">
                {f.experience.map((x) => (
                  <div key={x.label} className="rounded-card border border-line bg-white p-4">
                    <dt className="sr-only">{x.label}</dt>
                    <dd className="m-0">
                      <div className="font-serif text-[1.8rem] font-semibold leading-none text-ink">{x.num}</div>
                      <div className="mt-1.5 text-[0.85rem] leading-5 text-ink-2">{x.label}</div>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[0.82rem] leading-6 text-ink-2">
                Figures reflect Mary&rsquo;s professional experience, including work before CFO
                Innovation Partners was registered in 2024. Investment recommendations are proposals
                for investor consideration, not capital raised.
              </p>
            </div>
          </div>
        </Section>

        <Section>
          <SectionHeading eyebrow="Our bench" title="Specialists matched to each engagement" intro="Engagements are led by CFOIP and draw on associate specialists in these areas, chosen for the sector, stage and problem." />
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
            {ABOUT.bench.map((b) => (
              <li key={b.area} className="rounded-card border border-line bg-white p-5">
                <h3 className="mb-2 text-[1.05rem]">{b.area}</h3>
                <p className="m-0 text-[0.92rem] leading-6 text-ink-2">{b.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section tone="alt">
          <SectionHeading eyebrow="Tools" title="Digital tools that support our advisors" intro="Each tool is labelled with its current status. They support our judgement; they don't replace it." />
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {ABOUT.tools.map((t) => (
              <li key={t.name} className="rounded-card border border-line bg-white p-5">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="m-0 text-[1.05rem]">{t.name}</h3>
                  <span className={`rounded-full border px-3 py-1 text-[0.75rem] font-semibold ${STATUS_CLS[t.status]}`}>
                    {t.status}
                  </span>
                </div>
                <p className="m-0 text-[0.92rem] leading-6 text-ink-2">{t.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <SectionHeading eyebrow="FAQs" title="About working with us" />
          <FaqList faqs={ABOUT.faqs} />
          <p className="mt-6 text-[0.95rem]">
            <Link href="/our-approach" className="font-semibold text-accent-2 underline underline-offset-4 hover:text-ink">
              See our six-stage approach
            </Link>
          </p>
        </Section>
      </main>
      <CtaBand
        kind="institutional"
        label="Discuss a Partnership"
        title="Work with CFO Innovation Partners."
        text="Funds, development partners and growing businesses: tell us what you need and we'll reply within two working days."
        secondary={{ label: "Book a Financial Strategy Consultation", href: "/contact?enquiry=sme#enquiry" }}
      />
      <Footer />
    </>
  );
}
