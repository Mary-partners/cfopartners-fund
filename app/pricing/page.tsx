import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { CheckupTrigger } from "@/components/CheckupTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DIAGNOSTIC_URL, mailto } from "@/lib/links";

export const metadata: Metadata = {
  title: "Pricing — CFO Partners",
  description:
    "Pricing built for founders, growing SMEs, and institutional partners. Start free, then choose tools, expert guidance, implementation support, or executive bench — whatever your business needs next.",
};

interface Plan {
  name: string;
  label: string;
  price: string;
  period: string;
  description: string;
  bestFor: string;
  cta: string;
  ctaHref?: string;
  isCheckup?: boolean;
  highlighted?: boolean;
  features: string[];
}

const PLANS: Plan[] = [
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
    ctaHref: mailto("Founder OS Starter enrolment"),
    features: [
      "AI business assistants",
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
    ctaHref: mailto("Founder OS Growth enrolment"),
    highlighted: true,
    features: [
      "All AI executive assistants",
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
    ctaHref: mailto("Business Readiness Review enquiry"),
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
    ctaHref: mailto("Business Build Sprint enrolment"),
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
    ctaHref: mailto("Virtual Executive Bench enquiry"),
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

const INSTITUTIONAL_FEATURES = [
  "Cohort diagnostics for accelerators and programs",
  "Portfolio dashboards for banks, DFIs, and foundations",
  "Readiness scoring and risk segmentation",
  "Intervention recommendations",
  "Progress tracking across founder cohorts",
  "Custom reporting for funders and partners",
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f2] text-ink">
      <Nav />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.9rem] text-ink-2 shadow-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            Pricing built for founders, growing SMEs, and institutional partners
          </div>
          <h1 className="font-serif text-[2.6rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-[3.5rem] lg:text-[4.2rem]">
            Choose the level of support your business needs next.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[1.1rem] leading-8 text-ink-2">
            Start with a free diagnosis. Then move into the tools, expert
            guidance, implementation support, or executive bench your business
            needs to become structured, bankable, fundable, and scalable.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CheckupTrigger variant="primary" className="px-8 py-4 text-base">
              Take the Free Check-Up
              <ArrowRight className="h-4 w-4" />
            </CheckupTrigger>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-4 text-base"
            >
              <a href={mailto("Talk to CFO Partners")}>Talk to CFO Partners</a>
            </Button>
          </div>
        </div>

        {/* PRICING GRID */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </section>

      {/* INSTITUTIONAL */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-ink p-8 text-white md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[0.88rem] text-white/80">
              <Building2 className="h-4 w-4" />
              For banks, accelerators, DFIs, foundations, and ecosystem builders
            </div>
            <h2 className="font-serif text-[2.2rem] font-bold tracking-tight text-white sm:text-[2.8rem]">
              Portfolio Intelligence Platform
            </h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-white/75">
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

          <Card className="rounded-[24px] border-0 bg-white p-7 text-ink">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink-3">
              Institutional pricing
            </p>
            <h3 className="mt-3 font-serif text-[2rem] font-bold">Custom</h3>
            <p className="mt-3 text-[0.9rem] leading-6 text-ink-2">
              Pricing depends on cohort size, platform access, reporting
              requirements, implementation support, and partner needs.
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
            <Button asChild size="lg" className="mt-7 w-full">
              <a
                href={mailto(
                  "Portfolio Intelligence Platform — Institutional enquiry",
                )}
              >
                Request Institutional Pricing
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <p className="mt-4 text-[0.75rem] leading-5 text-ink-3">
              Internal anchor: cohort diagnostics from KES 500,000; platform
              licensing from USD 15,000/year; custom engagements from USD
              50,000+.
            </p>
          </Card>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24 text-center lg:px-8">
        <h2 className="font-serif text-[2.2rem] font-bold tracking-tight sm:text-[2.6rem]">
          Not sure where to start?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-8 text-ink-2">
          Take the free diagnostic first. It will show whether your business
          needs finance structure, operating discipline, growth support, risk
          clarity, or executive-level guidance.
        </p>
        <div className="mt-8">
          <CheckupTrigger variant="primary" className="px-8 py-4 text-base">
            Start with the Free Check-Up
            <ArrowRight className="h-4 w-4" />
          </CheckupTrigger>
        </div>
      </section>
    </main>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <Card
      className={`relative flex h-full flex-col rounded-3xl bg-white ${
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
      <CardContent className="flex h-full flex-col p-7">
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
            <span className="font-serif text-[1.9rem] font-bold tracking-tight text-ink">
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
              <Check className="mt-0.5 h-4 w-4 flex-none text-ink" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
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
