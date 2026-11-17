import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Check,
  Compass,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CheckupTrigger } from "@/components/CheckupTrigger";
import { Reveal } from "@/components/Reveal";
import { FAQ } from "@/components/FAQ";
import { RoomFinder } from "@/components/RoomFinder";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROOMS } from "@/lib/rooms";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import {
  FOUNDER_EXPERIENCE,
  CORE_BELIEF,
  ADVISORY_MODEL,
  CASE_STUDIES,
  MARKET_INSIGHTS,
} from "@/lib/impact";
import { POSTS } from "@/lib/blog";
import { BlogCover } from "@/components/BlogCover";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  OFFICE_ADDRESS,
} from "@/lib/links";

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <CoreBelief />
      <AdvisoryModel />
      <Services />
      <ExecutiveRooms />
      <FinderSection />
      <Insight />
      <Institutional />
      <CaseStudies />
      <RunByExperts />
      <JournalTeaser />
      <FAQSection />
      <ContactSection />
      <Footer />
    </>
  );
}

// ============================================================
// HERO: balanced 2-column with impact card on right
// ============================================================
function Hero() {
  return (
    <header className="hero-gradient py-[72px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.82rem] font-semibold text-ink-2 shadow-sm">
              <MapPin className="h-4 w-4 text-accent-2" />
              CFO Innovation Partners · Nairobi, Kenya
            </span>
            <h1 className="mb-6">
              Financial Leadership. Investment Readiness.{" "}
              <span className="text-accent-2">
                Stronger African Businesses.
              </span>
            </h1>
            <p className="mb-8 text-[1.1rem] text-ink-2">
              CFO Innovation Partners works with investment funds,
              accelerators, development partners and growing businesses to
              strengthen financial management, prepare enterprises for
              financing and improve portfolio performance.
            </p>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-[22px] py-[14px] text-[0.95rem] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-2 hover:shadow-card"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#institutional"
                className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-ink bg-transparent px-[22px] py-[14px] text-[0.95rem] font-semibold text-ink transition-all hover:bg-ink hover:text-white"
              >
                Discuss a Partnership
              </a>
            </div>
            <p className="text-[0.92rem] text-ink-2">
              Running a growing business?{" "}
              <CheckupTrigger
                variant="ghost"
                className="!inline !p-0 font-semibold text-accent-2 underline underline-offset-4 hover:text-ink"
              >
                Take the free Business Growth Check-Up
              </CheckupTrigger>
            </p>
          </div>

          {/* Right-side impact card balances the hero */}
          <HeroImpactCard />
        </div>
      </div>
    </header>
  );
}

function HeroImpactCard() {
  return (
    <Card className="rounded-3xl border-2 border-line bg-white p-8 shadow-card">
      <div className="mb-2 flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
        <BarChart3 className="h-3.5 w-3.5" />
        Founder experience
      </div>
      <h2 className="mb-6 font-serif text-[1.3rem] leading-tight">
        Led by Mary Ndinda, Founder &amp; Managing Partner.
      </h2>
      <dl className="grid grid-cols-2 gap-5">
        {FOUNDER_EXPERIENCE.map((s) => (
          <div key={s.label}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="m-0">
              <div className="font-serif text-[2rem] font-semibold leading-none text-ink">
                {s.num}
              </div>
              <div className="mt-1.5 text-[0.85rem] font-medium text-ink-2">
                {s.label}
              </div>
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 border-t border-line pt-5">
        <p className="m-0 text-[0.8rem] text-ink-2">
          Figures reflect the founder&rsquo;s professional experience,
          including work before CFO Innovation Partners was established.
          Investment recommendations are proposals for investor
          consideration, not capital raised.
        </p>
      </div>
    </Card>
  );
}

// ============================================================
// CORE BELIEF
// ============================================================
function CoreBelief() {
  return (
    <section className="bg-ink py-[90px] text-white">
      <div className="mx-auto max-w-[1180px] px-6">
        <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent">
          Our core belief
        </span>
        <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {CORE_BELIEF.lines.map((line, i) => (
              <div
                key={line}
                className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.15] text-accent"
                style={{ opacity: 1 - i * 0.15 }}
              >
                {line}
              </div>
            ))}
          </div>
          <div className="text-[1.05rem] leading-7 text-slate-300">
            <p className="mb-4">{CORE_BELIEF.blurb}</p>
            <p className="m-0 font-serif italic text-accent">
              {CORE_BELIEF.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ADVISORY MODEL: 6 steps
// ============================================================
function AdvisoryModel() {
  return (
    <section id="model" className="py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-[60px]">
          <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
            Our advisory model
          </span>
          <h2 className="mb-5 max-w-[820px]">
            Diagnose. Interpret. Recommend. Advise. Execute. Track.
          </h2>
          <p className="m-0 max-w-[640px] text-[1.1rem] text-ink-2">
            Sequential, not modular. Each stage works because the stages before
            it were delivered with discipline.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {ADVISORY_MODEL.map((step) => (
            <Card
              key={step.num}
              className="flex flex-col border-t-4 border-t-accent bg-white p-5"
            >
              <div className="mb-2 text-[0.7rem] font-semibold tracking-[0.08em] text-accent-2">
                {step.num}
              </div>
              <h3 className="mb-2 text-[1.05rem] text-accent-2">{step.name}</h3>
              <p className="m-0 text-[0.85rem] leading-snug text-ink-2">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// EXECUTIVE ROOMS
// ============================================================
const ROOM_ICON_MAP: Record<string, typeof Compass> = {
  compass: Compass,
  "line-chart": LineChart,
  wrench: Wrench,
  megaphone: Megaphone,
  "shield-check": ShieldCheck,
  briefcase: Briefcase,
  users: Users,
};

function ExecutiveRooms() {
  return (
    <section id="rooms" className="bg-bg-alt py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
          Focus areas
        </span>
        <h2 className="mb-5 max-w-[820px]">
          Seven areas of a growing business, one advisory team.
        </h2>
        <p className="mb-[60px] max-w-[760px] text-[1.1rem] text-ink-2">
          Each Executive Room brings together the questions, practical
          resources and specialist support for one area of your business.
          Start with the one your diagnostic points to.
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((r) => {
            const Icon = ROOM_ICON_MAP[r.iconKey] ?? Compass;
            return (
              <Link
                key={r.slug}
                href={`/rooms/${r.slug}`}
                className="group block"
              >
                <Card
                  className={`flex h-full flex-col p-7 transition-all group-hover:-translate-y-0.5 group-hover:shadow-card ${
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
                  <div className="rounded-xl border border-line bg-bg-alt p-4">
                    <div className="mb-1 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-ink-2">
                      A question we help answer
                    </div>
                    <p className="m-0 font-serif text-[0.95rem] italic leading-snug text-ink">
                      &ldquo;{r.prompt}&rdquo;
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-[0.85rem] font-semibold text-accent-2 group-hover:text-ink">
                    Explore this area
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INSIGHT
// ============================================================
function Insight() {
  return (
    <section className="bg-ink py-[90px] text-[#F4F1EA]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-12 grid items-start gap-10 md:grid-cols-[1fr_1fr]">
          <div>
            <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent">
              What we are seeing in the market
            </span>
            <h2 className="mb-5 max-w-[640px] text-white">
              The biggest gaps are structural, not motivational.
            </h2>
            <p className="m-0 text-[1.05rem] leading-7 text-slate-300">
              Eight patterns we see again and again in our diagnostic and
              advisory work, across business ages, sectors and stages. Each one
              is structural. None of them is solved by capital alone.
            </p>
          </div>
          <Card className="border-0 bg-white/5 p-6 backdrop-blur">
            <div className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-accent">
              What we see
            </div>
            <p className="m-0 font-serif text-[1.3rem] leading-[1.35] text-white">
              &ldquo;Capital cannot fix what structure has not built yet.&rdquo;
            </p>
            <p className="mt-4 text-[0.85rem] text-slate-400">
              From our diagnostic and advisory work with founders
            </p>
          </Card>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {MARKET_INSIGHTS.map((insight, i) => (
            <div
              key={insight}
              className="flex items-start gap-4 rounded-xl bg-white/5 p-4 backdrop-blur"
            >
              <span className="font-serif text-[1.15rem] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.95rem] leading-6 text-slate-200">
                {insight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INSTITUTIONAL
// ============================================================
const INSTITUTIONAL_FEATURES = [
  "Financial diagnostics across a portfolio or cohort",
  "Investment-readiness assessments before financing",
  "Fractional CFO support inside portfolio companies",
  "Standardised financial reporting and risk indicators",
  "Portfolio reporting dashboards, built and run for each engagement",
  "Tailored technical assistance and progress tracking",
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
              Portfolio and programme support
            </h2>
            <p className="mt-5 max-w-[640px] text-[1.05rem] leading-7 text-white/75">
              We help funds, lenders, DFIs, accelerators and foundations
              assess, support and monitor the businesses they back, before and
              after financing. Our team works inside the companies, and we
              build the reporting that shows you how each one is performing.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <FeaturePill icon={Users} label="Cohort diagnostics" />
              <FeaturePill icon={BarChart3} label="Portfolio dashboards" />
              <FeaturePill icon={ShieldCheck} label="Risk segmentation" />
            </div>
          </div>
          <Card className="rounded-[20px] border-0 bg-white p-7 text-ink">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink-3">
              Institutional partnerships
            </p>
            <h3 className="mt-3 font-serif text-[2rem] font-bold">Built around your portfolio</h3>
            <p className="mt-3 text-[0.88rem] leading-6 text-ink-2">
              Every partnership is scoped to your cohort size, platform access,
              reporting requirements, implementation support, and partner needs.
            </p>
            <div className="mt-6 space-y-3">
              {INSTITUTIONAL_FEATURES.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 text-[0.88rem] leading-5 text-ink-2"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-none text-ink" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="mt-7 h-auto w-full whitespace-normal py-3 text-center"
              variant="default"
            >
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Portfolio support: Institutional enquiry")}`}
              >
                Discuss a Portfolio Support Mandate
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
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
// CASE STUDIES: real Q2 2026 vignettes
// ============================================================
function CaseStudies() {
  return (
    <section id="case-studies" className="bg-bg-alt py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
          From our diagnostic work · Q2 2026
        </span>
        <h2 className="mb-5 max-w-[780px]">What the diagnostic surfaced for three founders.</h2>
        <p className="mb-[60px] max-w-[720px] text-[1.1rem] text-ink-2">
          Three anonymised examples. Each shows what the diagnostic found and
          the next step that followed.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((c) => (
            <Card key={c.story.slice(0, 40)} className="flex flex-col p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-gold-soft px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-ink">
                  {c.archetype}
                </span>
                <span className="text-[0.78rem] text-ink-3">
                  Score: {c.score}
                </span>
              </div>
              <h3 className="mb-1 text-[1.05rem]">{c.sector}</h3>
              <div className="mb-4 text-[0.82rem] text-ink-3">{c.location}</div>
              <p className="mb-4 text-[0.92rem] leading-6 text-ink-2">
                {c.story}
              </p>
              <div className="mt-auto rounded-xl border-l-2 border-accent bg-bg-alt p-4">
                <div className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
                  Pathway {c.pathway} · {c.pathwayLabel}
                </div>
                <p className="m-0 text-[0.88rem] leading-snug text-ink-2">
                  {c.outcome}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// RUN BY EXPERTS
// ============================================================
function RunByExperts() {
  const experts = [
    {
      role: "Finance & Capital Readiness",
      bench:
        "Fractional CFO work: management accounts, forecasting, cash and working capital, financial models and investor or lender preparation.",
    },
    {
      role: "Operations & Systems",
      bench:
        "Accounting and reporting set-up, internal controls, operating rhythm and practical automation.",
    },
    {
      role: "Governance & Strategy",
      bench:
        "Board reporting, governance structures and strategy support for growth-stage businesses.",
    },
    {
      role: "Enterprise Development",
      bench:
        "Diagnostics, segmentation and tailored technical assistance for accelerator and development-partner programmes.",
    },
  ];
  return (
    <section id="team" className="py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-[60px] grid items-end gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
              Who leads the work
            </span>
            <h2 className="mb-5 max-w-[640px]">Senior-led, with specialists matched to each engagement.</h2>
            <p className="m-0 max-w-[620px] text-[1.1rem] text-ink-2">
              CFO Innovation Partners is led by Mary Ndinda, Founder &amp;
              Managing Partner, who brings 12+ years in SME finance, enterprise
              development and investment advisory. We diagnose, design and
              implement alongside the businesses and institutions we serve.
            </p>
          </div>
          <Card className="bg-bg-alt p-6">
            <div className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-accent-2">
              How we work
            </div>
            <p className="m-0 text-[0.95rem] leading-6 text-ink-2">
              Senior advisory access without the bench cost of a permanent
              hire. Each engagement is matched to a practitioner with the right
              sector, stage, and constraint experience.
            </p>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {experts.map((e) => (
            <Card key={e.role} className="p-7">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-ink">
                Practice area
              </div>
              <h3 className="mb-3 text-[1.15rem]">{e.role}</h3>
              <p className="m-0 text-[0.95rem] text-ink-2">{e.bench}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// JOURNAL TEASER
// ============================================================
function JournalTeaser() {
  const latest = POSTS.slice(0, 3);
  return (
    <section className="bg-bg-alt py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-[50px] grid items-end gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
              From the journal
            </span>
            <h2 className="mb-5 max-w-[640px]">
              What we are learning from the cohort.
            </h2>
            <p className="m-0 max-w-[620px] text-[1.05rem] text-ink-2">
              Diagnostic insights, cohort findings, and the operating beliefs
              behind the model, published as we learn them.
            </p>
          </div>
          <div className="flex justify-end">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">
                Read the journal <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <Card className="flex h-full flex-col overflow-hidden p-0 transition-all group-hover:-translate-y-0.5 group-hover:shadow-card">
                <BlogCover post={post} className="aspect-[16/10]" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-accent-2">
                    {post.category} · {post.readTime}
                  </div>
                  <h3 className="mb-2 text-[1.1rem] leading-tight">
                    {post.title}
                  </h3>
                  <p className="m-0 text-[0.9rem] text-ink-2">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[0.85rem] font-semibold text-accent-2 group-hover:text-accent">
                    Read more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
function ContactSection() {
  return (
    <section id="contact" className="bg-ink py-[80px] text-white">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid items-start gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent">
              From this conversation to a working relationship
            </span>
            <h2 className="mb-5 text-white">
              There is a route from here to a structured engagement.
            </h2>
            <p className="mb-8 max-w-[560px] text-[1.05rem] text-slate-300">
              Take the diagnostic. Book a review. Or write directly. We read
              every founder email and reply within two working days.
            </p>
            <div className="flex flex-wrap gap-3">
              <CheckupTrigger variant="accent">
                Take the diagnostic
              </CheckupTrigger>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/40 bg-transparent px-[22px] py-[14px] text-[0.95rem] font-semibold text-white transition-all hover:bg-white hover:text-ink"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <Card className="border-0 bg-white p-7 text-ink">
            <h3 className="mb-5 text-[1.2rem]">CFO Innovation Partners</h3>
            <div className="space-y-3.5 text-[0.95rem]">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-ink-2 hover:text-ink"
              >
                <Mail className="h-4 w-4 flex-none text-accent" />
                <span>{CONTACT_EMAIL}</span>
              </a>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="flex items-center gap-3 text-ink-2 hover:text-ink"
              >
                <Phone className="h-4 w-4 flex-none text-accent" />
                <span>{CONTACT_PHONE}</span>
              </a>
              <div className="flex items-start gap-3 text-ink-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent" />
                <span>
                  {OFFICE_ADDRESS.line1}
                  <br />
                  {OFFICE_ADDRESS.city} {OFFICE_ADDRESS.postcode},{" "}
                  {OFFICE_ADDRESS.country}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// FINDER: interactive room selector
// ============================================================
function FinderSection() {
  return (
    <section className="py-[90px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
              Try it now
            </span>
            <h2 className="mb-5">Not sure which room to start in?</h2>
            <p className="mb-4 text-[1.1rem] text-ink-2">
              Answer three quick questions and we will point you at the
              Executive Room where your business has the most to gain. It takes
              less than a minute and nothing is recorded.
            </p>
            <p className="m-0 text-[0.95rem] text-ink-3">
              For the full picture, the free Business Growth Check-Up scores
              your business across six pillars and gives you a written
              recommendation.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <RoomFinder />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================
function FAQSection() {
  return (
    <section id="faq" className="bg-bg-alt py-[90px]">
      <div className="mx-auto max-w-[920px] px-6">
        <Reveal>
          <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
            Common questions
          </span>
          <h2 className="mb-10">Answers before you ask.</h2>
        </Reveal>
        <Reveal delay={100}>
          <FAQ />
        </Reveal>
      </div>
    </section>
  );
}


// ============================================================
// SERVICES: scroll-driven showcase of the four service groups
// ============================================================
function Services() {
  return (
    <section id="services" className="bg-ink pb-[40px] pt-[90px] text-white">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent">
            Our services
          </span>
          <h2 className="mb-5 max-w-[820px] text-white">
            Four service groups. One integrated firm.
          </h2>
          <p className="mb-6 max-w-[720px] text-[1.05rem] leading-7 text-slate-300">
            Everything we deliver sits in one of four groups, and every
            engagement starts from the diagnostic, so the support you buy
            matches the constraint the data surfaced. Scroll to walk through
            them.
          </p>
        </Reveal>
        <ServicesShowcase />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-card border border-white/15 bg-white/5 px-7 py-6">
          <p className="m-0 max-w-[560px] text-[0.95rem] text-slate-300">
            Not sure which service fits? Start with the free diagnostic and
            we will route you to the right one.
          </p>
          <div className="flex flex-wrap gap-3">
            <CheckupTrigger variant="accent">
              Take the diagnostic
            </CheckupTrigger>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/40 px-[22px] py-[14px] text-[0.95rem] font-semibold text-white transition-all hover:bg-white hover:text-ink"
            >
              Talk to us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
