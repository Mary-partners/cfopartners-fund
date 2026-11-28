import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Building2, Briefcase, MapPin, Users } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BlogCover } from "@/components/BlogCover";
import { JsonLd } from "@/components/site/JsonLd";
import { Section, SectionHeading } from "@/components/site/Section";
import { FOUNDER_EXPERIENCE } from "@/lib/impact";
import { POSTS } from "@/lib/blog";
import { ABOUT, APPROACH } from "@/lib/content/pages";
import { graph, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const PATHWAYS = [
  {
    icon: Building2,
    title: "Investment Funds & Capital Providers",
    href: "/investment-funds",
    problem:
      "Limited visibility into how portfolio companies are performing, inconsistent reporting, and thin finance capacity after investment.",
    solution:
      "Pre-investment assessments, standardised portfolio reporting, risk monitoring and fractional CFO support inside your companies.",
    cta: "Discuss a Portfolio Finance Pilot",
    kind: "institutional",
  },
  {
    icon: Users,
    title: "Accelerators & Development Partners",
    href: "/accelerators-development-partners",
    problem:
      "Generic training, weak segmentation and little evidence that businesses run differently after the programme.",
    solution:
      "Diagnostics, tailored technical assistance pathways, financial capacity building, programme design and cohort reporting.",
    cta: "Discuss an Enterprise Support Programme",
    kind: "institutional",
  },
  {
    icon: Briefcase,
    title: "Growing Businesses",
    href: "/growing-businesses",
    problem:
      "Numbers you can't rely on, poor cash visibility, and no senior finance lead to prepare you for lenders or investors.",
    solution:
      "Fractional CFO leadership, forecasting and cash management, financial systems, financial models and investment readiness.",
    cta: "Book a Financial Strategy Consultation",
    kind: "sme",
  },
] as const;

const DELIVER = [
  {
    title: "Investment readiness & capital planning",
    text: "Readiness diagnostics, three-statement models, data rooms and funding strategy for debt, equity and grant routes.",
    links: [
      ["/investment-readiness", "Investment Readiness"],
      ["/access-to-finance-advisory", "Access to Finance"],
      ["/financial-modelling", "Financial Modelling"],
    ],
  },
  {
    title: "Fractional CFO & financial performance",
    text: "Management accounts, rolling cash-flow forecasts, budgets, working-capital control and board reporting.",
    links: [["/fractional-cfo-services", "Fractional CFO Services"]],
  },
  {
    title: "Portfolio financial management",
    text: "Standard reporting, financial risk indicators, cash-runway monitoring and reporting dashboards across a portfolio.",
    links: [
      ["/portfolio-financial-management", "Portfolio Financial Management"],
      ["/portfolio-intelligence", "Portfolio Intelligence"],
    ],
  },
  {
    title: "Pre- and post-investment support",
    text: "Pre-investment assessments, investment committee briefings, 100-day finance plans and technical assistance after closing.",
    links: [["/pre-post-investment-support", "Pre- & Post-Investment Support"]],
  },
  {
    title: "Enterprise development & technical assistance",
    text: "Diagnostics, segmentation and tailored technical assistance for programme cohorts, with reporting on capability change.",
    links: [
      ["/enterprise-development-technical-assistance", "Enterprise Development & TA"],
      ["/programme-design", "Programme Design"],
    ],
  },
  {
    title: "Financial systems & operational efficiency",
    text: "Accounting set-up and migration, month-end close, internal controls, management reporting and practical automation.",
    links: [["/financial-systems", "Financial Systems"]],
  },
] as const;

const STATUS_CLS: Record<string, string> = {
  Available: "bg-emerald-50 text-emerald-800 border-emerald-200",
  "Delivered within engagements": "bg-gold-soft text-ink border-accent/30",
  "In development": "bg-bg-alt text-ink-2 border-line",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(websiteSchema())} />
      <Nav />
      <main id="main">
        <Hero />
        <Pathways />
        <Offers />
        <Deliver />
        <Method />
        <Experience />
        <Tools />
        <Insights />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <header className="hero-gradient py-[56px] md:py-[72px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.82rem] font-semibold text-ink-2 shadow-sm">
              <MapPin className="h-4 w-4 flex-none text-accent-2" aria-hidden="true" />
              The finance partner for African investment portfolios and growing businesses
            </span>
            <h1 className="mb-6">
              Financial Leadership. Investment Readiness.{" "}
              <span className="text-accent-2">Stronger African Businesses.</span>
            </h1>
            <p className="mb-8 text-[1.1rem] leading-8 text-ink-2">
              CFO Innovation Partners works with investment funds, accelerators,
              development partners and growing businesses to strengthen financial
              management, prepare enterprises for financing and improve portfolio
              performance.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-[22px] py-[14px] text-[0.95rem] font-semibold text-white transition-colors hover:bg-ink-2"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/contact?enquiry=institutional#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-ink px-[22px] py-[14px] text-[0.95rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                Discuss a Partnership
              </Link>
            </div>
          </div>
          <aside className="rounded-3xl border-2 border-line bg-white p-8 shadow-card">
            <div className="mb-2 flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
              <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
              Founder experience
            </div>
            <h2 className="mb-6 font-serif text-[1.3rem] leading-tight">
              Led by Mary Ndinda, Founder &amp; Managing Partner.
            </h2>
            <dl className="m-0 grid grid-cols-2 gap-5">
              {FOUNDER_EXPERIENCE.map((s) => (
                <div key={s.label} className="last:odd:col-span-2">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="m-0">
                    <div className="font-serif text-[2rem] font-semibold leading-none text-ink">{s.num}</div>
                    <div className="mt-1.5 text-[0.85rem] font-medium text-ink-2">{s.label}</div>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mb-0 mt-6 border-t border-line pt-5 text-[0.8rem] leading-5 text-ink-2">
              Figures reflect the founder&rsquo;s professional experience, including
              work before CFO Innovation Partners was registered in 2024.
              Investment recommendations are proposals for investor
              consideration, not capital raised.{" "}
              <Link href="/about#mary-ndinda" className="underline underline-offset-2 hover:text-ink">
                About Mary
              </Link>
            </p>
          </aside>
        </div>
      </div>
    </header>
  );
}

function Pathways() {
  return (
    <Section id="who-we-serve">
      <SectionHeading
        eyebrow="Who we serve"
        title="Three ways we work"
        intro="We support enterprises before and after financing, and help the institutions behind them assess, develop and monitor the businesses they back."
      />
      <ul className="m-0 grid list-none gap-5 p-0 lg:grid-cols-3">
        {PATHWAYS.map((p) => {
          const Icon = p.icon;
          return (
            <li key={p.href} className="flex flex-col rounded-card border border-line bg-white p-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft text-accent-2">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-4 text-[1.25rem]">
                <Link href={p.href} className="hover:underline">
                  {p.title}
                </Link>
              </h3>
              <p className="mb-2 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink">The problem</p>
              <p className="mb-4 text-[0.95rem] leading-6 text-ink-2">{p.problem}</p>
              <p className="mb-2 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink">What we do</p>
              <p className="mb-6 text-[0.95rem] leading-6 text-ink-2">{p.solution}</p>
              <div className="mt-auto flex flex-col gap-3">
                <Link
                  href={`/contact?enquiry=${p.kind}#enquiry`}
                  className="inline-flex items-center justify-between gap-2 rounded-full bg-ink px-5 py-3 text-[0.9rem] font-semibold text-white hover:bg-ink-2"
                >
                  {p.cta}
                  <ArrowRight className="h-4 w-4 flex-none" aria-hidden="true" />
                </Link>
                <Link href={p.href} className="text-[0.9rem] font-semibold text-accent-2 underline underline-offset-4 hover:text-ink">
                  How we work with {p.kind === "sme" ? "growing businesses" : p.href === "/investment-funds" ? "funds" : "programmes"}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function Offers() {
  const offers = [
    {
      audience: "For funds & enterprise programmes",
      name: "Portfolio Finance System",
      text: "A repeatable framework for strengthening financial management across multiple enterprises: diagnostics, one reporting standard, cash and risk monitoring, a portfolio dashboard and embedded finance support where it is needed.",
      steps: ["Portfolio Diagnostic", "90-Day Implementation", "Embedded Retainer"],
      stepsLabel: "Three ways to start",
      href: "/portfolio-finance-system",
      cta: "Explore Portfolio Finance Support",
    },
    {
      audience: "For growing businesses",
      name: "90-Day Financial Performance System",
      text: "A defined implementation engagement that improves financial visibility, forecasting, management reporting and decision-making, with an optional fractional CFO afterwards.",
      steps: ["Diagnose", "Cash forecast", "Profitability", "Budget", "Dashboard", "Roadmap"],
      stepsLabel: "In 90 days",
      href: "/90-day-financial-performance-system",
      cta: "Explore the 90-Day System",
    },
  ];
  return (
    <Section id="offers" tone="alt">
      <SectionHeading
        eyebrow="Flagship offers"
        title="Structured Financial Support. From Diagnosis to Implementation."
        intro="Two clearly defined ways to start working with us. Both are delivered by our team as advisory and implementation services."
      />
      <ul className="m-0 grid list-none gap-5 p-0 lg:grid-cols-2">
        {offers.map((o) => (
          <li key={o.href} className="flex flex-col rounded-card border-2 border-ink bg-white p-7">
            <p className="mb-2 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">{o.audience}</p>
            <h3 className="mb-3 text-[1.5rem]">
              <Link href={o.href} className="hover:underline">{o.name}</Link>
            </h3>
            <p className="mb-5 text-[0.98rem] leading-7 text-ink-2">{o.text}</p>
            <p className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-ink">{o.stepsLabel}</p>
            <ol className="mb-6 flex list-none flex-wrap gap-2 p-0">
              {o.steps.map((s, i) => (
                <li key={s} className="rounded-full border border-line bg-bg-alt px-3 py-1 text-[0.82rem] font-medium text-ink">
                  {o.stepsLabel === "In 90 days" ? `${i + 1}. ` : ""}{s}
                </li>
              ))}
            </ol>
            <Link
              href={o.href}
              className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-ink px-6 py-3.5 text-[0.95rem] font-semibold text-white hover:bg-ink-2"
            >
              {o.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Deliver() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we deliver"
        title="Financial analysis connected to practical implementation"
        intro="Not every client needs a 90-day implementation. Each service is also available on its own, and the models, reports, controls and dashboards stay with you after the engagement."
      />
      <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
        {DELIVER.map((d) => (
          <li key={d.title} className="flex flex-col rounded-card border border-line bg-white p-6">
            <h3 className="mb-2 text-[1.12rem]">{d.title}</h3>
            <p className="mb-4 text-[0.93rem] leading-6 text-ink-2">{d.text}</p>
            <ul className="mt-auto flex list-none flex-wrap gap-x-4 gap-y-1 p-0">
              {d.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="inline-flex items-center gap-1 text-[0.88rem] font-semibold text-accent-2 hover:text-ink">
                    {label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Method() {
  return (
    <Section id="approach" tone="alt">
      <SectionHeading
        eyebrow="How we work"
        title="Diagnose. Interpret. Recommend. Advise. Execute. Track."
        intro="One method for a single business or a whole portfolio. For institutions, every company goes through the same instrument, so results can be compared and tracked."
      />
      <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {APPROACH.stages.map((s, i) => (
          <li key={s.stage} className="rounded-card border border-line border-t-4 border-t-accent-2 bg-white p-5">
            <div className="mb-1 text-[0.72rem] font-semibold tracking-[0.08em] text-accent-2">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="mb-2 text-[1.1rem]">{s.stage}</h3>
            <p className="m-0 text-[0.9rem] leading-6 text-ink-2">{s.summary}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6">
        <Link href="/our-approach" className="font-semibold text-accent-2 underline underline-offset-4 hover:text-ink">
          How each stage works for a business and for a portfolio
        </Link>
      </p>
    </Section>
  );
}

function Experience() {
  const items = [
    {
      title: "Portfolio financial support",
      text: "Financial diagnostics, accounting systems, unit economics, forecasts and capital planning for 15+ OceanHub Africa portfolio businesses.",
      href: "/portfolio-financial-management",
    },
    {
      title: "Investment assessment",
      text: "50+ enterprises recommended for investment consideration, with proposed tickets of USD 100K–500K. These are recommendations, not completed investments.",
      href: "/investment-readiness",
    },
    {
      title: "Enterprise programmes",
      text: "Diagnostics, segmentation and tailored advisory pathways within programmes reaching 800+ SMEs.",
      href: "/enterprise-development-technical-assistance",
    },
  ];
  return (
    <Section>
      <SectionHeading
        eyebrow="Experience"
        title="Work our founder has led"
        intro="Client case studies are published only with permission and are being prepared. This is the experience behind them."
      />
      <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
        {items.map((x) => (
          <li key={x.title} className="flex flex-col rounded-card border border-line bg-white p-6">
            <h3 className="mb-2 text-[1.1rem]">{x.title}</h3>
            <p className="mb-4 text-[0.93rem] leading-6 text-ink-2">{x.text}</p>
            <Link href={x.href} className="mt-auto text-[0.88rem] font-semibold text-accent-2 underline underline-offset-4 hover:text-ink">
              About this service
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link href="/case-studies" className="font-semibold text-accent-2 underline underline-offset-4 hover:text-ink">
          How we document case studies
        </Link>
      </p>
    </Section>
  );
}

function Tools() {
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="Digital tools"
        title="Tools that support our advisors"
        intro="Each tool is labelled with its current status. They make our work faster and more consistent; they don't replace professional judgement."
      />
      <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
        {ABOUT.tools.map((t) => (
          <li key={t.name} className="rounded-card border border-line bg-white p-5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="m-0 text-[1.05rem]">{t.name}</h3>
              <span className={`rounded-full border px-3 py-1 text-[0.75rem] font-semibold ${STATUS_CLS[t.status]}`}>{t.status}</span>
            </div>
            <p className="m-0 text-[0.92rem] leading-6 text-ink-2">{t.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Insights() {
  const latest = POSTS.slice(0, 3);
  return (
    <Section>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[720px]">
          <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">Insights</span>
          <h2 className="m-0">From our advisory work</h2>
        </div>
        <Link href="/insights" className="font-semibold text-accent-2 underline underline-offset-4 hover:text-ink">
          All insights
        </Link>
      </div>
      <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-3">
        {latest.map((p) => (
          <li key={p.slug}>
            <Link href={`/insights/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white">
              <BlogCover post={p} className="aspect-[16/9]" />
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-accent-2">{p.category}</span>
                <h3 className="mb-2 text-[1.05rem] leading-snug group-hover:underline">{p.title}</h3>
                <p className="m-0 text-[0.88rem] text-ink-2">
                  {p.author} · {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function FinalCta() {
  return (
    <section className="bg-ink py-[72px] text-white">
      <div className="mx-auto grid max-w-[1180px] gap-6 px-6 md:grid-cols-2">
        <div className="rounded-card border border-white/15 bg-white/5 p-7">
          <p className="mb-2 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent">For institutions</p>
          <h2 className="mb-3 text-[1.6rem] text-white">Supporting a portfolio or a cohort?</h2>
          <p className="mb-6 text-slate-300">Start with a diagnostic or a 90-day pilot. Tell us about your portfolio and we&rsquo;ll scope it with you.</p>
          <Link href="/contact?enquiry=institutional&offer=Portfolio%20Finance%20System%3A%2090-day%20pilot#enquiry" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.95rem] font-semibold text-ink hover:bg-white">
            Discuss a Portfolio Finance Pilot <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="rounded-card border border-white/15 bg-white/5 p-7">
          <p className="mb-2 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent">For businesses</p>
          <h2 className="mb-3 text-[1.6rem] text-white">Need a clear view of your numbers?</h2>
          <p className="mb-6 text-slate-300">Plan your 90 days with us, or start with the Management Capability Assessment.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact?enquiry=sme&offer=90-Day%20Financial%20Performance%20System#enquiry" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.95rem] font-semibold text-ink hover:bg-white">
              Discuss Your 90-Day Financial Plan <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="/diagnostic" className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/50 px-6 py-3.5 text-[0.95rem] font-semibold text-white hover:bg-white hover:text-ink">
              Take the Management Capability Assessment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
