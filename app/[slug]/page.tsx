import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { SmartLink } from "@/components/site/SmartLink";
import { Section, SectionHeading } from "@/components/site/Section";
import {
  AUDIENCES,
  SERVICES,
  audienceFor,
  audienceName,
  firstSentence,
  serviceFor,
  servicesBySlug,
} from "@/lib/content";
import type {
  AudienceContent,
  Evidence,
  ServiceContent,
  Step,
} from "@/lib/content/types";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";

// Service and audience pages, all generated from lib/content.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...SERVICES, ...AUDIENCES].map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = serviceFor(params.slug) ?? audienceFor(params.slug);
  if (!page) return {};
  const path = `/${page.slug}`;
  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: path },
    openGraph: { title: page.seo.title, description: page.seo.description, url: path },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const service = serviceFor(params.slug);
  if (service) return <ServicePage s={service} />;
  const audience = audienceFor(params.slug);
  if (audience) return <AudiencePage a={audience} />;
  notFound();
}

function Hero({
  crumbs,
  eyebrow,
  h1,
  summary,
  cta,
  secondary,
  status,
  aside,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  h1: string;
  summary: string;
  cta: { kind: string; label: string };
  secondary: { label: string; href: string };
  status?: string;
  aside: React.ReactNode;
}) {
  return (
    <header className="hero-gradient py-[56px] md:py-[72px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <Breadcrumbs items={crumbs} />
        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <span className="mb-4 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
              {eyebrow}
            </span>
            <h1 className="mb-5">{h1}</h1>
            <p className="mb-7 max-w-[62ch] text-[1.1rem] leading-8 text-ink-2">{summary}</p>
            {status && (
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold text-ink">
                <span className="h-2 w-2 rounded-full bg-accent-2" aria-hidden="true" />
                Status: {status}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/contact?enquiry=${cta.kind}#enquiry`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-[22px] py-[14px] text-[0.95rem] font-semibold text-white transition-colors hover:bg-ink-2"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <SmartLink
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-[22px] py-[14px] text-[0.95rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                {secondary.label}
              </SmartLink>
            </div>
          </div>
          {aside}
        </div>
      </div>
    </header>
  );
}

function FactCard({ title, facts }: { title: string; facts: { label: string; value: string }[] }) {
  return (
    <aside className="rounded-card border border-line bg-white p-6 shadow-card">
      <h2 className="mb-4 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
        {title}
      </h2>
      <dl className="m-0 grid gap-3.5">
        {facts.map((f) => (
          <div key={f.label} className="grid gap-0.5 border-b border-line pb-3 last:border-0 last:pb-0">
            <dt className="text-[0.8rem] font-semibold text-ink-2">{f.label}</dt>
            <dd className="m-0 text-[0.95rem] text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 grid list-none gap-3 p-0">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-[0.98rem] leading-7 text-ink-2">
          <Check className="mt-1.5 h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function Process({ steps, intro }: { steps: Step[]; intro: string }) {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow="How we work" title="Diagnose. Interpret. Recommend. Advise. Execute. Track." intro={intro} />
      <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.stage} className="rounded-card border border-line bg-white p-5">
            <div className="mb-1 text-[0.75rem] font-semibold tracking-[0.08em] text-accent-2">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mb-2 text-[1.1rem]">{s.stage}</h3>
            <p className="m-0 text-[0.92rem] leading-6 text-ink-2">{s.detail}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-[0.92rem]">
        <Link href="/our-approach" className="font-semibold text-accent-2 underline underline-offset-4 hover:text-ink">
          Read more about our approach
        </Link>
      </p>
    </Section>
  );
}

function EvidenceBlock({ e }: { e: Evidence }) {
  return (
    <Section>
      <div className="grid gap-6 rounded-card border border-line bg-bg-alt p-7 md:grid-cols-[1fr_2fr] md:p-9">
        <div>
          <span className="mb-2 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
            Experience
          </span>
          <h2 className="m-0 text-[1.5rem]">{e.title}</h2>
        </div>
        <div>
          <p className="mb-3 text-[1rem] leading-7 text-ink-2">{e.text}</p>
          {e.href && (
            <Link href={e.href} className="font-semibold text-accent-2 underline underline-offset-4 hover:text-ink">
              {e.href === "/about" ? "About our founder" : "See how we work with clients"}
            </Link>
          )}
        </div>
      </div>
    </Section>
  );
}

function ServiceCards({ services, title, eyebrow }: { services: ServiceContent[]; title: string; eyebrow: string }) {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/${s.slug}`}
              className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-shadow hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2"
            >
              <h3 className="mb-2 text-[1.12rem]">{s.name}</h3>
              <p className="mb-4 text-[0.92rem] leading-6 text-ink-2">{firstSentence(s.summary)}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-[0.88rem] font-semibold text-accent-2 group-hover:text-ink">
                Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ServicePage({ s }: { s: ServiceContent }) {
  const path = `/${s.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/#services" },
    { name: s.name, path },
  ];
  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: s.name,
            path,
            description: s.summary,
            audience: s.audiences.map(audienceName),
          }),
          breadcrumbSchema([crumbs[0], crumbs[2]]),
          faqSchema(s.faqs),
        )}
      />
      <Nav />
      <main id="main">
        <Hero
          crumbs={crumbs}
          eyebrow={s.eyebrow}
          h1={s.h1}
          summary={s.summary}
          cta={s.cta}
          secondary={{ label: "See what's included", href: "#deliverables" }}
          status={s.status}
          aside={<FactCard title="At a glance" facts={s.atAGlance} />}
        />

        <Section>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-5 text-[1.6rem]">Who it&rsquo;s for</h2>
              <BulletList items={s.whoFor} />
            </div>
            <div>
              <h2 className="mb-5 text-[1.6rem]">Problems we address</h2>
              <BulletList items={s.problems} />
            </div>
          </div>
        </Section>

        <Section id="deliverables" tone="alt">
          <SectionHeading eyebrow="Deliverables" title="What you receive" />
          <div className="overflow-x-auto rounded-card border border-line bg-white">
            <table className="w-full min-w-[620px] border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">Deliverables for {s.name}</caption>
              <thead>
                <tr className="bg-bg-alt">
                  <th scope="col" className="px-5 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink-2">Deliverable</th>
                  <th scope="col" className="px-5 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink-2">What it covers</th>
                  <th scope="col" className="px-5 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink-2">When</th>
                </tr>
              </thead>
              <tbody>
                {s.deliverables.map((d) => (
                  <tr key={d.name} className="border-t border-line align-top">
                    <th scope="row" className="px-5 py-4 font-semibold text-ink">{d.name}</th>
                    <td className="px-5 py-4 leading-6 text-ink-2">{d.detail}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-ink-2">{d.cadence ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Process steps={s.process} intro={`How the six stages of our method apply to ${s.name.toLowerCase()}.`} />

        <Section>
          <SectionHeading eyebrow="Engagement" title="How an engagement is structured" intro="Every engagement is scoped after a first conversation. This is the typical shape." />
          <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.engagement.map((f) => (
              <div key={f.label} className="rounded-card border border-line bg-white p-5">
                <dt className="mb-1 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink-2">{f.label}</dt>
                <dd className="m-0 text-[0.98rem] leading-6 text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {s.evidence && <EvidenceBlock e={s.evidence} />}

        <Section tone="alt">
          <SectionHeading eyebrow="FAQs" title={`Questions about ${s.name.toLowerCase()}`} />
          <FaqList faqs={s.faqs} />
        </Section>

        <ServiceCards services={servicesBySlug(s.related)} eyebrow="Related services" title="Often combined with" />
      </main>
      <CtaBand
        kind={s.cta.kind}
        label={s.cta.label}
        title={s.cta.kind === "institutional" ? "Let's scope the support your portfolio needs." : "Talk to us about your numbers."}
        text={
          s.cta.kind === "institutional"
            ? "Tell us about your portfolio or programme. We'll come back within two working days to arrange a scoping call."
            : "Tell us where the business is and what you need. We'll come back within two working days to arrange a consultation."
        }
        secondary={
          s.cta.kind === "sme"
            ? { label: "Take the Business Diagnostic", href: "/diagnostic" }
            : { label: "See our approach", href: "/our-approach" }
        }
      />
      <Footer />
    </>
  );
}

function AudiencePage({ a }: { a: AudienceContent }) {
  const path = `/${a.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: a.name, path },
  ];
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs), faqSchema(a.faqs))} />
      <Nav />
      <main id="main">
        <Hero
          crumbs={crumbs}
          eyebrow={a.eyebrow}
          h1={a.h1}
          summary={a.summary}
          cta={a.cta}
          secondary={a.secondaryCta}
          aside={
            <aside className="rounded-card border border-line bg-white p-6 shadow-card">
              <h2 className="mb-4 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
                Who we work with
              </h2>
              <BulletList items={a.whoFor} />
            </aside>
          }
        />

        <Section>
          <SectionHeading eyebrow="The problem" title="What we hear most often" />
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {a.problems.map((p) => (
              <li key={p} className="rounded-card border border-line bg-white p-5 text-[0.98rem] leading-7 text-ink-2">
                {p}
              </li>
            ))}
          </ul>
        </Section>

        <ServiceCards services={servicesBySlug(a.services)} eyebrow="Services" title="How we can help" />

        <Process steps={a.process} intro="The same six stages, applied to the businesses you work with." />

        {a.evidence && <EvidenceBlock e={a.evidence} />}

        <Section tone="alt">
          <SectionHeading eyebrow="FAQs" title="Common questions" />
          <FaqList faqs={a.faqs} />
        </Section>
      </main>
      <CtaBand
        kind={a.cta.kind}
        label={a.cta.label}
        title={a.cta.kind === "institutional" ? "Let's scope the support you need." : "Talk to us about your numbers."}
        text="Tell us what you're working on. We'll come back within two working days."
        secondary={a.secondaryCta}
      />
      <Footer />
    </>
  );
}
