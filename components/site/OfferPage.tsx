import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { Section, SectionHeading } from "@/components/site/Section";
import { PortfolioDashboardSample, SmeDashboardSample } from "@/components/site/SampleDashboards";
import type { OfferContent } from "@/lib/content/offers";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "@/lib/schema";

function enquiryHref(o: OfferContent) {
  return `/contact?enquiry=${o.cta.kind}&offer=${encodeURIComponent(o.cta.offer)}#enquiry`;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="m-0 grid list-none gap-3 p-0">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-[0.97rem] leading-7 text-ink-2">
          <Check className="mt-1.5 h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

/** Shared layout for the two packaged offers. */
export function OfferPage({ o }: { o: OfferContent }) {
  const path = `/${o.slug}`;
  const institutional = o.cta.kind === "institutional";
  const crumbs = [
    { name: "Home", path: "/" },
    { name: institutional ? "Investment Funds" : "Growing Businesses", path: institutional ? "/investment-funds" : "/growing-businesses" },
    { name: o.name, path },
  ];
  const glance = institutional
    ? [
        { label: "For", value: "Investment funds, DFIs, lenders, accelerators and TA facilities" },
        { label: "Ways to start", value: "Portfolio Diagnostic, 90-Day Implementation or Embedded Retainer" },
        { label: "Delivered as", value: "A managed advisory and implementation service, not software" },
        { label: "Where", value: "Kenya and East Africa, with selected African markets" },
        { label: "How to start", value: "A scoping call, then a short written proposal" },
      ]
    : [
        { label: "For", value: "Growing, revenue-generating businesses" },
        { label: "Duration", value: "90 days, fixed scope and defined deliverables" },
        { label: "Your time", value: "About 2 to 3 hours a week from the owner or MD" },
        { label: "Where", value: "Nairobi-based, working across Kenya and East Africa" },
        { label: "Afterwards", value: "Run it yourselves, or continue with a fractional CFO" },
      ];
  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({
            name: o.name,
            path,
            description: o.summary,
            audience: institutional
              ? ["Investment funds and capital providers", "Accelerators and development partners"]
              : ["Growing businesses"],
          }),
          breadcrumbSchema(crumbs),
          faqSchema(o.faqs),
        )}
      />
      <Nav />
      <main id="main">
        <header className="hero-gradient py-[56px] md:py-[72px]">
          <div className="mx-auto max-w-[1180px] px-6">
            <Breadcrumbs items={crumbs} />
            <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
                  {o.eyebrow} · {o.name}
                </span>
                <h1 className="mb-5">{o.h1}</h1>
                <p className="mb-4 max-w-[62ch] text-[1.12rem] leading-8 text-ink">{o.proposition}</p>
                <p className="mb-7 max-w-[62ch] text-[1rem] leading-7 text-ink-2">{o.summary}</p>
                <div className="flex flex-wrap gap-3">
                  <Link href={enquiryHref(o)} className="inline-flex items-center gap-2 rounded-full bg-ink px-[22px] py-[14px] text-[0.95rem] font-semibold text-white hover:bg-ink-2">
                    {o.cta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href={o.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-[22px] py-[14px] text-[0.95rem] font-semibold text-ink hover:bg-ink hover:text-white">
                    {o.secondaryCta.label}
                  </Link>
                </div>
              </div>
              <aside className="rounded-card border border-line bg-white p-6 shadow-card">
                <h2 className="mb-4 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-accent-2">At a glance</h2>
                <dl className="m-0 grid gap-3">
                  {glance.map((f) => (
                    <div key={f.label} className="grid gap-0.5 border-b border-line pb-3 last:border-0 last:pb-0">
                      <dt className="text-[0.8rem] font-semibold text-ink-2">{f.label}</dt>
                      <dd className="m-0 text-[0.95rem] text-ink">{f.value}</dd>
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
              <h2 className="mb-5 text-[1.6rem]">Who it&rsquo;s for</h2>
              <Bullets items={o.whoFor} />
            </div>
            <div>
              <h2 className="mb-5 text-[1.6rem]">The problems it addresses</h2>
              <Bullets items={o.problems} />
            </div>
          </div>
        </Section>

        <Section tone="alt">
          <SectionHeading eyebrow="What's included" title={institutional ? "What the system includes" : "What you receive"} intro={institutional ? "Some components work inside each company; others work across the whole portfolio. The scope of each engagement sets which apply." : undefined} />
          <div className="overflow-x-auto rounded-card border border-line bg-white">
            <table className="w-full min-w-[600px] border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">Components of the {o.name}</caption>
              <thead>
                <tr className="bg-bg-alt text-[0.8rem] uppercase tracking-[0.06em] text-ink-2">
                  <th scope="col" className="px-5 py-3.5">Component</th>
                  {institutional && <th scope="col" className="px-5 py-3.5">Level</th>}
                  <th scope="col" className="px-5 py-3.5">What it means</th>
                </tr>
              </thead>
              <tbody>
                {o.components.map((c) => (
                  <tr key={c.name} className="border-t border-line align-top">
                    <th scope="row" className="px-5 py-3.5 font-semibold text-ink">{c.name}</th>
                    {institutional && <td className="whitespace-nowrap px-5 py-3.5 text-ink-2">{c.level}</td>}
                    <td className="px-5 py-3.5 leading-6 text-ink-2">{c.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {o.options.length > 0 && (
          <Section id="engagements">
            <SectionHeading eyebrow="Ways to engage" title="Three ways to start" intro="Most clients start with a diagnostic or a 90-day pilot. Portfolio sizes and timelines are typical, and every engagement is scoped with you." />
            <ol className="m-0 grid list-none gap-5 p-0 lg:grid-cols-3">
              {o.options.map((opt) => (
                <li key={opt.key} className="flex flex-col rounded-card border border-line bg-white p-6">
                  <span className="mb-1 text-[0.8rem] font-semibold tracking-[0.08em] text-accent-2">Option {opt.key}</span>
                  <h3 className="mb-3 text-[1.25rem]">{opt.name}</h3>
                  <p className="mb-4 text-[0.95rem] leading-6 text-ink-2">{opt.summary}</p>
                  <dl className="mb-4 grid gap-2">
                    {opt.facts.map((f) => (
                      <div key={f.label}>
                        <dt className="text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-ink-2">{f.label}</dt>
                        <dd className="m-0 text-[0.92rem] text-ink">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-ink-2">Deliverables</p>
                  <ul className="mb-0 grid gap-1 pl-5 text-[0.92rem] text-ink-2">
                    {opt.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Section>
        )}

        <Section tone={o.options.length > 0 ? "alt" : "plain"} id="timeline">
          <SectionHeading eyebrow="The 90 days" title={institutional ? "How a 90-day pilot runs" : "What happens in the 90 days"} />
          <ol className={`m-0 grid list-none gap-4 p-0 md:grid-cols-2 ${o.phases.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {o.phases.map((ph) => (
              <li key={ph.weeks} className="rounded-card border border-line border-t-4 border-t-accent-2 bg-white p-5">
                <p className="mb-1 text-[0.8rem] font-semibold text-accent-2">{ph.weeks}</p>
                <h3 className="mb-2 text-[1.1rem]">{ph.stage}</h3>
                <p className="mb-3 text-[0.92rem] leading-6 text-ink-2">{ph.activity}</p>
                <ul className="m-0 grid gap-1 pl-5 text-[0.88rem] text-ink">
                  {ph.receive.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section tone={o.options.length > 0 ? "plain" : "alt"}>
          <SectionHeading
            eyebrow="Sample output"
            title={institutional ? "What your team sees each month" : "The dashboard your team reviews each month"}
            intro="A modelled example to show the format. Real dashboards are built around the indicators agreed with you."
          />
          {institutional ? <PortfolioDashboardSample /> : <SmeDashboardSample />}
        </Section>

        {(o.integration || o.after) && (
          <Section tone="alt">
            {o.integration && (
              <>
                <SectionHeading eyebrow="Technical assistance" title={o.integration.title} />
                <Bullets items={o.integration.points} />
              </>
            )}
            {o.after && (
              <div className="grid gap-6 rounded-card border border-line bg-white p-7 md:grid-cols-[1fr_2fr]">
                <h2 className="m-0 text-[1.6rem]">{o.after.title}</h2>
                <div>
                  <p className="mb-4 text-[1rem] leading-7 text-ink-2">{o.after.text}</p>
                  <Link href={o.after.href} className="font-semibold text-accent-2 underline underline-offset-4 hover:text-ink">{o.after.label}</Link>
                </div>
              </div>
            )}
          </Section>
        )}

        <Section>
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h2 className="mb-4 text-[1.3rem]">What you provide</h2>
              <Bullets items={o.clientProvides} />
            </div>
            <div>
              <h2 className="mb-4 text-[1.3rem]">Not included</h2>
              <ul className="m-0 grid gap-2 pl-5 text-[0.97rem] leading-7 text-ink-2">
                {o.exclusions.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-[1.3rem]">What shapes the price</h2>
              <ul className="m-0 grid gap-2 pl-5 text-[0.97rem] leading-7 text-ink-2">
                {o.pricingDrivers.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className="mt-3 text-[0.88rem] text-ink-2">Every engagement is scoped and priced in a written proposal.</p>
            </div>
          </div>
        </Section>

        <Section tone="alt">
          <div className="grid gap-6 rounded-card border border-line bg-white p-7 md:grid-cols-[1fr_2fr]">
            <div>
              <span className="mb-2 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">Experience</span>
              <h2 className="m-0 text-[1.5rem]">Led by Mary Ndinda, Founder &amp; Managing Partner</h2>
            </div>
            <p className="m-0 text-[1rem] leading-7 text-ink-2">
              {institutional
                ? "Our founder has supported 15+ OceanHub Africa portfolio businesses with financial diagnostics, accounting systems, unit economics, forecasts and capital planning, and has recommended 50+ enterprises for investment consideration (USD 100K–500K; recommendations, not completed investments). She designs portfolio reporting frameworks and dashboards for funds."
                : "Our founder brings 12+ years in SME finance, enterprise development and investment advisory, and has supported 2,000+ businesses across 11 sectors with financial strategy, forecasting, cash-flow management, pricing, management accounts and systems."}{" "}
              <Link href="/about#mary-ndinda" className="font-semibold text-accent-2 underline underline-offset-4 hover:text-ink">About Mary</Link>
            </p>
          </div>
        </Section>

        <Section>
          <SectionHeading eyebrow="FAQs" title={`Questions about the ${o.name}`} />
          <FaqList faqs={o.faqs} />
        </Section>
      </main>
      <CtaBand
        kind={o.cta.kind}
        label={o.cta.label}
        title={institutional ? "Start with a pilot or a diagnostic." : "Start your 90 days."}
        text={
          institutional
            ? "Tell us about your portfolio or programme. We'll reply within two working days to arrange a scoping call."
            : "Tell us about your business. We'll reply within two working days to arrange a consultation."
        }
        secondary={o.secondaryCta}
      />
      <Footer />
    </>
  );
}
