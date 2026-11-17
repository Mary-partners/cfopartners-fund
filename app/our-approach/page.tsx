import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { Section, SectionHeading } from "@/components/site/Section";
import { APPROACH } from "@/lib/content/pages";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: APPROACH.seo.title,
  description: APPROACH.seo.description,
  alternates: { canonical: "/our-approach" },
  openGraph: { title: APPROACH.seo.title, description: APPROACH.seo.description, url: "/our-approach" },
};

export default function ApproachPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Our Approach", path: "/our-approach" },
  ];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(APPROACH.faqs))} />
      <Nav />
      <main id="main">
        <header className="hero-gradient py-[56px] md:py-[72px]">
          <div className="mx-auto max-w-[1180px] px-6">
            <Breadcrumbs items={crumbs} />
            <span className="mb-4 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
              Our approach
            </span>
            <h1 className="mb-5 max-w-[900px]">{APPROACH.h1}</h1>
            <p className="m-0 max-w-[68ch] text-[1.1rem] leading-8 text-ink-2">{APPROACH.summary}</p>
          </div>
        </header>

        <Section>
          <ol className="m-0 grid list-none gap-6 p-0">
            {APPROACH.stages.map((s, i) => (
              <li key={s.stage} className="rounded-card border border-line bg-white p-6 md:p-8">
                <div className="mb-4 flex flex-wrap items-baseline gap-3">
                  <span className="font-serif text-[1.4rem] text-accent-2">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="m-0 text-[1.6rem]">{s.stage}</h2>
                </div>
                <p className="mb-5 max-w-[70ch] text-[1.02rem] leading-7 text-ink-2">{s.summary}</p>
                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <h3 className="mb-2 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink">For one business</h3>
                    <p className="m-0 text-[0.94rem] leading-6 text-ink-2">{s.enterprise}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink">Across a portfolio or cohort</h3>
                    <p className="m-0 text-[0.94rem] leading-6 text-ink-2">{s.portfolio}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink">Outputs</h3>
                    <ul className="m-0 grid gap-1.5 pl-4 text-[0.94rem] leading-6 text-ink-2">
                      {s.outputs.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section tone="alt">
          <SectionHeading eyebrow="Principles" title="What guides the work" />
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
            {APPROACH.principles.map((p) => (
              <li key={p.title} className="rounded-card border border-line bg-white p-5">
                <h3 className="mb-2 text-[1.05rem]">{p.title}</h3>
                <p className="m-0 text-[0.92rem] leading-6 text-ink-2">{p.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <SectionHeading eyebrow="FAQs" title="Questions about our approach" />
          <FaqList faqs={APPROACH.faqs} />
        </Section>
      </main>
      <CtaBand
        kind="institutional"
        label="Discuss a Partnership"
        title="See how the method fits your portfolio or business."
        text="We'll walk you through how each stage would work for you, and what it would take."
        secondary={{ label: "Take the Business Diagnostic", href: "/diagnostic" }}
      />
      <Footer />
    </>
  );
}
