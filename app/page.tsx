import {
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  Check,
  Compass,
  LineChart,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { CheckupTrigger } from "@/components/CheckupTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Insight />
      <ExecutiveRooms />
      <Pricing />
      <Institutional />
      <CaseStudies />
      <About />
      <CTAStrip />
      <Footer />
    </>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  return (
    <header className="hero-gradient pt-20 pb-[60px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="max-w-[920px]">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.85rem] font-semibold text-ink-2 shadow-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            The AI-powered executive support platform for African businesses
          </span>
          <h1 className="mb-6">
            Your business needs more than advice.{" "}
            <span className="text-accent">It needs an executive system.</span>
          </h1>
          <p className="mb-9 max-w-[760px] text-[1.2rem] text-ink-2">
            Most African founders are forced to act as CEO, CFO, COO, CMO,
            salesperson, accountant, and strategist — all at once. CFO Partners
            gives you AI-powered executive assistants, practical business tools,
            diagnostics, and expert support in one platform — so you can build a
            business that is structured, bankable, fundable, and scalable.
          </p>
          <div className="mb-7 flex flex-wrap items-center gap-3.5">
            <CheckupTrigger variant="accent">
              Take the free Business Growth Check-Up
            </CheckupTrigger>
            <a
              href="#rooms"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-ink bg-transparent px-[22px] py-[14px] text-[0.95rem] font-semibold text-ink transition-all hover:bg-ink hover:text-white"
            >
              See the Executive Rooms
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="text-[0.9rem] text-ink-3">
            <strong className="font-semibold text-ink-2">
              10-minute assessment
            </strong>{" "}
            · 6 pillars · No credit card · Get your archetype, room match, and
            tier instantly
          </p>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// STATS
// ============================================================
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

// ============================================================
// INSIGHT — the capital misdiagnosis
// ============================================================
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
          The Executive Rooms were built around this: before we talk about
          funding, growth, or expansion, we install the structure that makes
          those conversations possible. That&apos;s why 82% of African SMEs
          don&apos;t make it past year 5 — and why the ones who work with us are
          still here.
        </p>
      </div>
    </section>
  );
}

// ============================================================
// EXECUTIVE ROOMS — the 7 rooms
// ============================================================
const ROOMS = [
  {
    name: "The CEO Room",
    role: "Strategy & Direction",
    assistant: "CEO Advisor",
    icon: Compass,
    blurb:
      "Clarify your business model, goals, priorities, and growth path. Pressure-test strategic decisions before you commit.",
    prompt:
      "Based on my diagnostic results, what are the top 3 strategic decisions I need to make this quarter?",
  },
  {
    name: "The CFO Room",
    role: "Finance & Bankability",
    assistant: "Virtual CFO",
    icon: LineChart,
    blurb:
      "Revenue, costs, cash flow, margins, founder salary discipline, investor and loan readiness. Our strongest wedge — and where most founders should start.",
    prompt: "Am I ready to borrow money, and what would a lender worry about?",
    highlighted: true,
  },
  {
    name: "The COO Room",
    role: "Operations & Systems",
    assistant: "Operations Architect",
    icon: Wrench,
    blurb:
      "Workflows, team roles, SOPs, delivery systems, weekly operating rhythm, internal controls, execution discipline.",
    prompt:
      "Create a simple operating system for my business based on my team size and revenue stage.",
  },
  {
    name: "The CMO Room",
    role: "Sales, Marketing & Growth",
    assistant: "Growth Strategist",
    icon: Megaphone,
    blurb:
      "Customer segmentation, sales scripts, offer design, lead generation, content strategy, customer retention.",
    prompt: "Help me create a 30-day customer acquisition plan for my business.",
  },
  {
    name: "The CRO Room",
    role: "Risk, Compliance & Resilience",
    assistant: "Risk Advisor",
    icon: ShieldCheck,
    blurb:
      "KRA basics, registration, customer concentration risk, cash flow risk, debt risk, governance basics, business continuity.",
    prompt:
      "What are the biggest risks in my business based on my current diagnostic score?",
  },
  {
    name: "The Board Room",
    role: "Governance & Decision Support",
    assistant: "Board Advisor",
    icon: Briefcase,
    blurb:
      "Monthly board-style reports, decision memos, investor updates, partner updates, KPI tracking. Board-level thinking before you have a formal board.",
    prompt: "Prepare a one-page board update from my monthly business data.",
  },
  {
    name: "The Expert Marketplace",
    role: "Human Escalation",
    assistant: "Vetted practitioners",
    icon: Users,
    blurb:
      "When AI isn't enough: tax, accounting cleanup, legal, fundraising, credit readiness, strategy workshops, operational implementation. The Sndbx model, rebuilt digitally.",
    prompt: "Book a 45-minute session with a vetted CFO, accountant, or strategist.",
  },
];

function ExecutiveRooms() {
  return (
    <section id="rooms" className="py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
          The platform architecture
        </span>
        <h2 className="mb-5 max-w-[820px]">
          Seven Executive Rooms. One digital business support house.
        </h2>
        <p className="mb-[60px] max-w-[760px] text-[1.1rem] text-ink-2">
          Each room pairs an AI executive assistant with the tools, templates,
          and human experts you need for that function. Step into the room your
          business needs next — guided by your diagnostic.
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((r) => {
            const Icon = r.icon;
            return (
              <Card
                key={r.name}
                className={`flex h-full flex-col p-7 transition-all hover:-translate-y-0.5 hover:shadow-card ${
                  r.highlighted ? "border-2 border-accent" : ""
                }`}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft text-accent-2">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="mb-1 text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-accent-2">
                  {r.role}
                </span>
                <h3 className="mb-2 text-[1.2rem]">{r.name}</h3>
                <p className="mb-4 text-[0.95rem] text-ink-2">{r.blurb}</p>
                <div className="mt-auto rounded-xl border border-line bg-bg-alt p-4">
                  <div className="mb-1 flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-ink-3">
                    <Brain className="h-3.5 w-3.5" /> AI: {r.assistant}
                  </div>
                  <p className="m-0 font-serif text-[0.95rem] italic leading-snug text-ink">
                    &ldquo;{r.prompt}&rdquo;
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRICING — 6 tiers
// ============================================================
const PLANS = [
  {
    name: "Free Diagnostic",
    label: "Start here",
    price: "Free",
    period: "",
    description:
      "For founders who want to understand what is really blocking business growth before paying for support.",
    bestFor: "Founders seeking clarity",
    cta: "Take the Free Check-Up",
    isCheckup: true,
    features: [
      "Growth Readiness Score",
      "Business archetype",
      "Basic diagnosis",
      "Recommended next step",
      "Email summary of results",
    ],
  },
  {
    name: "Founder OS Starter",
    label: "Self-guided structure",
    price: "KES 5,000",
    period: "/ month",
    description:
      "For early-stage founders who need simple structure, practical tools, and AI-guided business support.",
    bestFor: "Hustlers and early Operators",
    cta: "Start with Starter",
    ctaHref:
      "mailto:hello@cfopartners.fund?subject=Founder%20OS%20Starter%20enrolment",
    features: [
      "AI business assistants (CFO + COO Rooms)",
      "Basic finance and operations templates",
      "Monthly founder checklist",
      "Saved diagnostic results",
      "Basic reports",
      "Recommended monthly actions",
    ],
  },
  {
    name: "Founder OS Growth",
    label: "Most useful for growing businesses",
    price: "KES 15,000",
    period: "/ month",
    description:
      "For founders with revenue who need stronger systems, better reporting, and bankability readiness.",
    bestFor: "Operators and Stabilizers",
    cta: "Choose Growth",
    ctaHref:
      "mailto:hello@cfopartners.fund?subject=Founder%20OS%20Growth%20enrolment",
    highlighted: true,
    features: [
      "All AI Executive Assistants (all 6 rooms)",
      "Full business template library",
      "Monthly business review report",
      "Bankability Score",
      "Growth action plan",
      "Quarterly diagnostic refresh",
      "Community access",
      "Monthly group review session",
    ],
  },
  {
    name: "Business Readiness Review",
    label: "Expert interpretation",
    price: "KES 35,000",
    period: " one-time",
    description:
      "For founders who want an expert to review their diagnostic results and translate them into a practical action plan.",
    bestFor: "Founders ready for expert guidance",
    cta: "Book a Review",
    ctaHref:
      "mailto:hello@cfopartners.fund?subject=Business%20Readiness%20Review%20enquiry",
    features: [
      "Diagnostic review",
      "Expert strategy call",
      "Business readiness report",
      "30-day action plan",
      "Recommended support path",
      "Capital readiness view",
    ],
  },
  {
    name: "Business Build Sprint",
    label: "Guided implementation",
    price: "From KES 75,000",
    period: " one-time",
    description:
      "A 4-week guided implementation sprint to fix the foundations: money, records, systems, reporting, and execution rhythm.",
    bestFor: "Founders ready to implement",
    cta: "Join the Sprint",
    ctaHref:
      "mailto:hello@cfopartners.fund?subject=Business%20Build%20Sprint%20enrolment",
    features: [
      "4-week guided implementation",
      "Weekly accountability sessions",
      "Finance and operations setup",
      "Expert review",
      "Business structure toolkit",
      "90-day growth roadmap",
      "Group and private options available",
    ],
  },
  {
    name: "Virtual Executive Bench",
    label: "Premium support",
    price: "From KES 195,000",
    period: " / month",
    description:
      "For growing companies that need senior finance, operations, growth, and strategic support without hiring a full executive team.",
    bestFor: "Scalers and growth-stage SMEs",
    cta: "Apply for Executive Support",
    ctaHref:
      "mailto:hello@cfopartners.fund?subject=Virtual%20Executive%20Bench%20enquiry",
    features: [
      "Virtual CFO / COO / Growth support",
      "Monthly management reporting",
      "Strategic advisory",
      "Founder review calls",
      "Investor or bank readiness",
      "Board-style reporting",
      "Integrated Executive Bench from KES 350,000/month",
    ],
  },
];

function Pricing() {
  return (
    <section id="pricing" className="bg-bg-alt py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
          Pricing
        </span>
        <h2 className="mb-5 max-w-[820px]">
          Choose the level of support your business needs next.
        </h2>
        <p className="mb-[60px] max-w-[760px] text-[1.1rem] text-ink-2">
          Start with a free diagnosis. Then move into the tools, expert
          guidance, implementation support, or executive bench your business
          needs to become structured, bankable, fundable, and scalable.
        </p>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: (typeof PLANS)[number] }) {
  return (
    <Card
      className={`relative flex h-full flex-col rounded-3xl ${
        plan.highlighted
          ? "border-2 border-ink shadow-2xl"
          : "border-line shadow-sm"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-6 rounded-full bg-ink px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-white">
          Recommended
        </div>
      )}
      <CardContent className="flex h-full flex-col p-7 pt-7">
        <div className="mb-5">
          <p className="mb-3 text-[0.85rem] font-medium text-ink-3">
            {plan.label}
          </p>
          <h3 className="text-[1.5rem] font-bold tracking-tight text-ink">
            {plan.name}
          </h3>
          <p className="mt-3 min-h-[80px] text-[0.9rem] leading-6 text-ink-2">
            {plan.description}
          </p>
        </div>
        <div className="mb-5">
          <div className="flex items-end gap-1">
            <span className="font-serif text-[1.9rem] font-semibold tracking-tight text-ink">
              {plan.price}
            </span>
            {plan.period && (
              <span className="pb-1 text-[0.9rem] text-ink-3">
                {plan.period}
              </span>
            )}
          </div>
          <p className="mt-2 text-[0.85rem] font-medium text-ink-2">
            Best for: {plan.bestFor}
          </p>
        </div>
        {plan.isCheckup ? (
          <CheckupTrigger
            variant={plan.highlighted ? "primary" : "outline"}
            className="mb-6 w-full"
          >
            {plan.cta} <ArrowRight className="h-4 w-4" />
          </CheckupTrigger>
        ) : (
          <Button
            asChild
            variant={plan.highlighted ? "default" : "outline"}
            size="lg"
            className="mb-6 w-full"
          >
            <a href={plan.ctaHref}>
              {plan.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        )}
        <div className="mt-auto space-y-3">
          {plan.features.map((feature) => (
            <div
              key={feature}
              className="flex gap-3 text-[0.88rem] leading-5 text-ink-2"
            >
              <Check className="mt-0.5 h-4 w-4 flex-none text-accent" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================
// INSTITUTIONAL — Portfolio Intelligence Platform
// ============================================================
const INSTITUTIONAL_FEATURES = [
  "Cohort diagnostics for accelerators and programs",
  "Portfolio dashboards for banks, DFIs, and foundations",
  "Readiness scoring and risk segmentation",
  "Intervention recommendations",
  "Progress tracking across founder cohorts",
  "Custom reporting for funders and partners",
];

function Institutional() {
  return (
    <section id="institutional" className="py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid gap-8 rounded-[2rem] bg-ink p-8 text-white md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.85rem] text-white/80">
              <Building2 className="h-4 w-4" />
              For banks, accelerators, DFIs, foundations, and ecosystem builders
            </div>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight text-white">
              Portfolio Intelligence Platform
            </h2>
            <p className="mt-5 max-w-[640px] text-[1.05rem] leading-7 text-white/75">
              Diagnose, segment, support, and track multiple businesses through
              one portfolio-level intelligence layer. Designed for institutions
              that need to understand founder readiness, risk, growth gaps, and
              the right interventions across cohorts.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <FeaturePill icon={Users} label="Cohort diagnostics" />
              <FeaturePill icon={BarChart3} label="Portfolio dashboards" />
              <FeaturePill icon={ShieldCheck} label="Risk segmentation" />
            </div>
          </div>
          <Card className="rounded-[20px] border-0 bg-white p-7 text-ink">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink-3">
              Institutional pricing
            </p>
            <h3 className="mt-3 font-serif text-[2rem] font-bold">Custom</h3>
            <p className="mt-3 text-[0.88rem] leading-6 text-ink-2">
              Pricing depends on cohort size, platform access, reporting
              requirements, implementation support, and partner needs.
            </p>
            <div className="mt-6 space-y-3">
              {INSTITUTIONAL_FEATURES.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 text-[0.88rem] leading-5 text-ink-2"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-none text-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="mt-7 w-full"
              variant="default"
            >
              <a href="mailto:hello@cfopartners.fund?subject=Portfolio%20Intelligence%20Platform%20%E2%80%94%20Institutional%20enquiry">
                Request Institutional Pricing
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <p className="mt-4 text-[0.75rem] leading-5 text-ink-3">
              Cohort diagnostics from KES 500,000 · platform licensing from USD
              15,000/year · custom engagements from USD 50,000+
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function FeaturePill({
  icon: Icon,
  label,
}: {
  icon: typeof Users;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-5">
      <Icon className="mb-4 h-5 w-5" />
      <p className="text-[0.88rem] text-white/70">{label}</p>
    </div>
  );
}

// ============================================================
// CASE STUDIES
// ============================================================
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
    <section id="case-studies" className="bg-bg-alt py-[90px]">
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
            <Card key={c.title} className="rounded-card p-7">
              <span className="mb-3.5 inline-block rounded-full bg-gold-soft px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-accent-2">
                {c.tag}
              </span>
              <h3 className="mb-2 text-[1.15rem]">{c.title}</h3>
              <div className="mb-3.5 text-[0.85rem] text-ink-3">{c.meta}</div>
              <p className="text-[0.92rem] text-ink-2">{c.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT MARY
// ============================================================
function About() {
  return (
    <section id="about" className="py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 items-center gap-[60px] md:grid-cols-[1fr_1.6fr]">
          <div
            aria-hidden="true"
            className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-card font-serif text-[3rem] text-accent-2"
            style={{
              background: "linear-gradient(135deg, #F5EBD0, #E6D9B8)",
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
              unaddressed. The Executive Rooms are the answer she wished
              existed for them.
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

// ============================================================
// CTA STRIP
// ============================================================
function CTAStrip() {
  return (
    <section className="bg-ink py-20 text-center text-white">
      <div className="mx-auto max-w-[820px] px-6">
        <h2 className="text-white">
          Not sure where to start? Begin with the Check-Up.
        </h2>
        <p className="mx-auto mb-8 max-w-[600px] text-slate-300">
          Take the free diagnostic first. It shows whether your business needs
          finance structure, operating discipline, growth support, risk clarity,
          or executive-level guidance — and which Executive Room to step into
          first.
        </p>
        <CheckupTrigger variant="accent" className="px-7 py-4 text-base">
          Start with the Free Check-Up
          <ArrowRight className="h-4 w-4" />
        </CheckupTrigger>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="border-t border-line bg-bg-alt py-[50px] pb-[30px] text-[0.88rem] text-ink-3">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <div className="mb-3 font-serif text-[1.25rem] font-semibold text-ink">
              CFO<span className="text-accent">Partners</span>
            </div>
            <p className="max-w-[360px] text-[0.88rem] text-ink-3">
              The AI-powered executive support platform for African businesses.
              Seven Executive Rooms. Six pricing tiers. One front door.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-[0.85rem] font-semibold uppercase tracking-[0.06em] text-ink">
              Platform
            </h4>
            <FooterLink href="#rooms">Executive Rooms</FooterLink>
            <FooterLink href="#pricing">Pricing</FooterLink>
            <FooterLink href="#institutional">For Institutions</FooterLink>
            <FooterLink href="#case-studies">Case Studies</FooterLink>
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
            <FooterLink href="#about">About Mary</FooterLink>
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
