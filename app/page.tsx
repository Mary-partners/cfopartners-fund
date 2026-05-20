import { Nav } from "@/components/Nav";
import { CheckupTrigger } from "@/components/CheckupTrigger";

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Insight />
      <Suite />
      <Tiers />
      <Disciplines />
      <CaseStudies />
      <About />
      <CTAStrip />
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <header className="hero-gradient pt-20 pb-[60px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="max-w-[880px]">
          <span className="mb-6 inline-block rounded-full bg-gold-soft px-3.5 py-1.5 text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
            The Virtual C-Suite for African Founders
          </span>
          <h1 className="mb-6">
            The CFO most African founders need can&apos;t be hired full-time. So
            we built one you can.
          </h1>
          <p className="mb-9 max-w-[720px] text-[1.2rem] text-ink-2">
            Human strategist. AI-powered platform. M-Pesa-native. KRA-fluent. CFO
            Partners installs the systems, financial visibility, and growth
            discipline African businesses need to scale — without taking on
            capital they&apos;re not ready for.
          </p>
          <div className="mb-7 flex flex-wrap items-center gap-3.5">
            <CheckupTrigger variant="accent">
              Take the free Business Growth Check-Up →
            </CheckupTrigger>
            <a
              href="#suite"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-ink bg-transparent px-[22px] py-[14px] text-[0.95rem] font-semibold text-ink transition-all hover:bg-ink hover:text-white"
            >
              See the full suite
            </a>
          </div>
          <p className="text-[0.9rem] text-ink-3">
            <strong className="font-semibold text-ink-2">
              10-minute assessment
            </strong>{" "}
            · 6 pillars · No credit card · Get your archetype + tier match
            instantly
          </p>
        </div>
      </div>
    </header>
  );
}

function Stats() {
  const items = [
    { num: "50+", label: "Founders Served" },
    { num: "92%", label: "Client Retention" },
    { num: "$50M+", label: "Capital Unlocked" },
    { num: "3", label: "Countries Active" },
  ];
  return (
    <section className="border-y border-line bg-bg-alt py-[50px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-2 gap-y-9 text-center sm:grid-cols-4 sm:gap-6">
          {items.map((s) => (
            <div key={s.label}>
              <div className="mb-2 font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-none text-ink">
                {s.num}
              </div>
              <div className="text-[0.9rem] text-ink-3">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Insight() {
  return (
    <section className="bg-ink py-[90px] text-[#F4F1EA]">
      <div className="mx-auto max-w-[820px] px-6">
        <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent">
          From our diagnostic data
        </span>
        <h2 className="mb-5 max-w-[780px] text-white">
          Most founders blame capital. The data says it&apos;s something else.
        </h2>
        <p className="mb-4 text-[#CBD5E1]">
          We&apos;ve been running the Business Growth Check-Up with founders
          across East Africa. A consistent pattern keeps emerging: when asked
          what&apos;s holding the business back, founders name <em>money</em>.
          But when we look at the structure underneath — bank accounts, sales
          records, tax registration, customer concentration — the real blocker
          is almost never capital.
        </p>
        <div className="my-10 border-l-[3px] border-accent pl-6 font-serif text-[clamp(1.4rem,3vw,2rem)] leading-[1.35] text-white">
          &ldquo;Capital can&apos;t fix what structure hasn&apos;t built
          yet.&rdquo;
        </div>
        <p className="text-[0.9rem] text-slate-400">
          — A finding from the CFO Partners diagnostic cohort, 2026
        </p>
        <p className="mt-7 text-[#CBD5E1]">
          The Virtual C-Suite was built around this: before we talk about
          funding, growth, or expansion, we install the structure that makes
          those conversations possible. That&apos;s why 82% of African SMEs
          don&apos;t make it past year 5 — and why the ones who work with us are
          still here.
        </p>
      </div>
    </section>
  );
}

function Suite() {
  const execs = [
    {
      key: "CFO",
      title: "Virtual CFO",
      domain: "cfopartners.fund",
      desc:
        "Financial visibility, cash discipline, board-ready reporting, and investor readiness — without the cost of a full-time finance lead.",
    },
    {
      key: "COO",
      title: "Virtual COO",
      domain: "climate.cfopartners.fund",
      desc:
        "Operations, systems, and climate-compliance frameworks for businesses serving DFI-aligned or regulated value chains.",
    },
    {
      key: "CGO",
      title: "Virtual CGO",
      domain: "invest.cfopartners.fund",
      desc:
        "Growth strategy, investor mapping, and capital pathway design — so you raise from the right partners at the right stage.",
    },
    {
      key: "CRO",
      title: "Virtual CRO",
      domain: "venture.cfopartners.fund",
      desc:
        "Risk frameworks, governance scaffolding, and venture-grade controls for companies preparing to scale or be acquired.",
    },
  ];
  return (
    <section id="suite" className="py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
          The Virtual C-Suite
        </span>
        <h2 className="mb-5 max-w-[780px]">
          Four virtual executives. One integrated platform.
        </h2>
        <p className="mb-[60px] max-w-[720px] text-[1.1rem] text-ink-2">
          Each role combines a human practitioner with our AI-powered platform —
          built specifically for the realities of running a business in East
          Africa.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {execs.map((e) => (
            <div
              key={e.key}
              className="rounded-card border border-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="mb-[18px] flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft font-serif font-bold text-accent-2">
                {e.key}
              </div>
              <h3 className="mb-2 text-[1.2rem]">{e.title}</h3>
              <span className="mb-3.5 block text-[0.85rem] font-medium text-accent-2">
                {e.domain}
              </span>
              <p className="text-[0.95rem] text-ink-2">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tiers() {
  const tiers = [
    {
      title: "Free Check-Up",
      archetype: "All archetypes",
      price: "KES 0",
      priceNote: "One-time, 10 minutes",
      features: [
        "30-question diagnostic",
        "6-pillar scorecard",
        "Your archetype + tier match",
        "Downloadable results report",
      ],
      cta: "Start Check-Up",
      isCheckup: true,
    },
    {
      title: "Bankable Foundation",
      archetype: "Hustler",
      price: "KES 12,500",
      priceNote: "One-time, 4 weeks",
      features: [
        "Separate personal & business money",
        "KRA registration & PIN setup",
        "Bankable revenue records",
        "Weekly group coaching call",
      ],
      cta: "Get details",
      ctaHref:
        "mailto:hello@cfopartners.fund?subject=Bankable%20Foundation%20enrolment",
    },
    {
      title: "Founder Cohort",
      archetype: "Operator",
      price: "KES 150,000",
      priceNote: "8-week cohort program",
      features: [
        "Live weekly strategy sessions",
        "Customer concentration playbook",
        "Pricing & margin diagnostic",
        "Peer cohort of 12 founders",
      ],
      cta: "Apply for next cohort",
      ctaHref:
        "mailto:hello@cfopartners.fund?subject=Founder%20Cohort%20enrolment",
    },
    {
      title: "Strategic Diagnostic",
      archetype: "Stabilizer",
      price: "KES 580,000",
      priceNote: "6-week deep engagement",
      features: [
        "Full-business diagnostic across all 5 Disciplines",
        "Investor-ready financial pack",
        "Board-quality reporting setup",
        "90-day execution roadmap",
        "1:1 with senior practitioner",
      ],
      cta: "Book a discovery call",
      ctaHref:
        "mailto:hello@cfopartners.fund?subject=Strategic%20Diagnostic%20enquiry",
      featured: true,
    },
    {
      title: "Virtual CFO Bench",
      archetype: "Scaler",
      price: "From KES 195,000",
      priceUnit: "/mo",
      priceNote: "Ongoing fractional engagement",
      features: [
        "Embedded fractional CFO + AI platform",
        "Monthly board reporting",
        "Capital raise & investor support",
        "Quarterly strategy reviews",
        "Full access to the Virtual C-Suite",
      ],
      cta: "Talk to us",
      ctaHref:
        "mailto:hello@cfopartners.fund?subject=Virtual%20CFO%20Bench%20enquiry",
    },
  ];
  return (
    <section className="bg-bg-alt py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
          Five tiers, mapped to where you are
        </span>
        <h2 className="mb-5 max-w-[780px]">
          Start where you stand. Move when you&apos;re ready.
        </h2>
        <p className="mb-[60px] max-w-[720px] text-[1.1rem] text-ink-2">
          Every engagement begins with the free Business Growth Check-Up. We
          match you to the tier that fits your archetype, not the one that fits
          our revenue target.
        </p>
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-5">
          {tiers.map((t) => (
            <div
              key={t.title}
              className={`relative flex flex-col rounded-card border bg-white px-6 py-7 ${
                t.featured
                  ? "border-2 border-accent bg-gradient-to-b from-[#FFFCF3] to-white"
                  : "border-line"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-white">
                  Most Chosen
                </span>
              )}
              <h3 className="mb-1.5 text-[1.1rem]">{t.title}</h3>
              <span className="mb-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-accent-2">
                {t.archetype}
              </span>
              <div className="mb-1 font-serif text-[1.6rem] font-semibold text-ink">
                {t.price}
                {t.priceUnit && (
                  <span className="text-[0.95rem] font-normal text-ink-3">
                    {t.priceUnit}
                  </span>
                )}
              </div>
              <div className="mb-[18px] text-[0.8rem] text-ink-3">
                {t.priceNote}
              </div>
              <ul className="mb-6 flex-1 list-none p-0">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="relative py-1.5 pl-[22px] text-[0.88rem] text-ink-2 before:absolute before:left-0 before:top-1.5 before:font-bold before:text-accent before:content-['✓']"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              {t.isCheckup ? (
                <CheckupTrigger variant="outline" className="w-full">
                  {t.cta}
                </CheckupTrigger>
              ) : (
                <a
                  href={t.ctaHref}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-[22px] py-[14px] text-[0.95rem] font-semibold transition-all ${
                    t.featured
                      ? "bg-accent text-white hover:bg-accent-2 hover:-translate-y-0.5 hover:shadow-card"
                      : "border-[1.5px] border-ink bg-transparent text-ink hover:bg-ink hover:text-white"
                  }`}
                >
                  {t.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Disciplines() {
  const items = [
    {
      num: "01",
      title: "Diagnose",
      desc: "Assess where the business actually stands across cash, customers, costs, and capability.",
    },
    {
      num: "02",
      title: "Structure",
      desc: "Install the financial, legal, and operational foundation that makes the business bankable.",
    },
    {
      num: "03",
      title: "Steer",
      desc: "Build the reporting and decision rhythms a founder actually uses week to week.",
    },
    {
      num: "04",
      title: "Scale",
      desc: "Engineer the systems, controls, and capital pathway that growth needs to survive.",
    },
    {
      num: "05",
      title: "Sustain",
      desc: "Lock in the gains with governance, risk, and succession scaffolding built to outlast the founder.",
    },
  ];
  return (
    <section id="disciplines" className="bg-bg-alt py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
          Our Method
        </span>
        <h2 className="mb-5 max-w-[780px]">The 5 Disciplines</h2>
        <p className="mb-[60px] max-w-[720px] text-[1.1rem] text-ink-2">
          Every engagement — from Bankable Foundation to the Virtual CFO Bench —
          works through the same five disciplines. The depth changes; the
          sequence doesn&apos;t.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((d) => (
            <div
              key={d.num}
              className="rounded-card border border-line bg-white p-6"
            >
              <div className="mb-3 font-serif text-[2rem] leading-none text-accent">
                {d.num}
              </div>
              <h3 className="mb-1.5 text-[1.05rem]">{d.title}</h3>
              <p className="text-[0.9rem] text-ink-2">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  const cases = [
    {
      tag: "Stabilizer → Scaler",
      title: "KisoByte",
      meta: "SaaS · Kenya",
      body: "Came in with strong revenue but no investor-ready financials. Six weeks later: clean monthly reporting, defensible unit economics, and a capital pathway mapped to two qualified DFI partners.",
    },
    {
      tag: "Operator → Stabilizer",
      title: "Mewell",
      meta: "Health · Kenya",
      body: "Customer concentration of 80% with one off-taker. We installed the diversification playbook and a new pricing structure. Six months later: largest customer down to 35%, gross margin up 14 points.",
    },
    {
      tag: "Hustler → Operator",
      title: "Mavuno Bora",
      meta: "Agribusiness · Kenya",
      body: "Tracking sales in a notebook at 12 employees. We built the foundation — business bank account, KRA filings, weekly cash dashboard — that turned the business into something a bank could finance.",
    },
  ];
  return (
    <section id="case-studies" className="py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
          Founder stories
        </span>
        <h2 className="mb-5 max-w-[780px]">
          Real businesses. Real structural change.
        </h2>
        <p className="mb-[60px] max-w-[720px] text-[1.1rem] text-ink-2">
          These aren&apos;t testimonials. They&apos;re the receipts.
        </p>
        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div
              key={c.title}
              className="rounded-card border border-line bg-white p-7"
            >
              <span className="mb-3.5 inline-block rounded-full bg-gold-soft px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-accent-2">
                {c.tag}
              </span>
              <h3 className="mb-2 text-[1.15rem]">{c.title}</h3>
              <div className="mb-3.5 text-[0.85rem] text-ink-3">{c.meta}</div>
              <p className="text-[0.92rem] text-ink-2">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-bg-alt py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 items-center gap-[60px] md:grid-cols-[1fr_1.6fr]">
          <div
            aria-hidden="true"
            className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-card font-serif text-[3rem] text-accent-2"
            style={{
              background:
                "linear-gradient(135deg, #F5EBD0, #E6D9B8)",
            }}
          >
            MN
          </div>
          <div>
            <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
              About the founder
            </span>
            <h2 className="mb-4">Mary Ndinda</h2>
            <p className="text-ink-2">
              Mary is the founder of CFO Partners. She spent her career on the
              inside of fast-growth African businesses — building the finance
              and operating structure that lets ambitious founders raise
              capital, pass due diligence, and survive the years that kill most
              companies.
            </p>
            <p className="mt-3 text-ink-2">
              She started CFO Partners because she kept watching the same
              pattern: founders blaming a capital problem they didn&apos;t
              actually have, while a structural problem they could fix went
              unaddressed. The Virtual C-Suite is the answer she wished existed
              for them.
            </p>
            <p className="mt-[18px]">
              <a
                href="https://www.linkedin.com/in/mary-ndinda/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-2 hover:text-accent"
              >
                Connect on LinkedIn →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAStrip() {
  return (
    <section className="bg-ink py-20 text-center text-white">
      <div className="mx-auto max-w-[820px] px-6">
        <h2 className="text-white">
          10 minutes. Six pillars. Your archetype and tier match.
        </h2>
        <p className="mx-auto mb-8 max-w-[600px] text-slate-300">
          The Business Growth Check-Up is the front door to everything we do.
          It&apos;s free, it takes about ten minutes, and at the end you&apos;ll
          know exactly where you stand — and what to do next.
        </p>
        <CheckupTrigger variant="accent" className="px-7 py-4 text-base">
          Take the Check-Up →
        </CheckupTrigger>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-bg-alt py-[50px] pb-[30px] text-[0.88rem] text-ink-3">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <div className="mb-3 font-serif text-[1.25rem] font-semibold text-ink">
              CFO<span className="text-accent">Partners</span>
            </div>
            <p className="max-w-[320px] text-[0.88rem] text-ink-3">
              The Virtual C-Suite for African Founders. Human strategist,
              AI-powered platform, built for the realities of East Africa.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-[0.85rem] font-semibold uppercase tracking-[0.06em] text-ink">
              The Suite
            </h4>
            <FooterLink href="#suite">Virtual CFO</FooterLink>
            <FooterLink href="#suite">Virtual COO</FooterLink>
            <FooterLink href="#suite">Virtual CGO</FooterLink>
            <FooterLink href="#suite">Virtual CRO</FooterLink>
          </div>
          <div>
            <h4 className="mb-3 text-[0.85rem] font-semibold uppercase tracking-[0.06em] text-ink">
              Contact
            </h4>
            <FooterLink href="mailto:hello@cfopartners.fund">
              hello@cfopartners.fund
            </FooterLink>
            <FooterLink
              href="https://www.linkedin.com/company/cfo-partners"
              external
            >
              LinkedIn
            </FooterLink>
            <FooterLink href="#disciplines">5 Disciplines</FooterLink>
            <FooterLink href="#case-studies">Case Studies</FooterLink>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-6">
          <span>
            © {new Date().getFullYear()} CFO Innovation Partners. All rights
            reserved.
          </span>
          <span>Nairobi, Kenya</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block py-1 text-[0.9rem] text-ink-3 hover:text-ink"
    >
      {children}
    </a>
  );
}
