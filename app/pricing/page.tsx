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
import { Footer } from "@/components/Footer";
import { CheckupTrigger } from "@/components/CheckupTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mailto } from "@/lib/links";
import { TIERS, priceLine, type Tier } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing | CFO Partners",
  description:
    "Pricing built for founders, growing SMEs, and institutional partners. Start free, then choose the tools, expert guidance, implementation support, or executive bench your business needs next.",
};



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
          {TIERS.map((plan) => (
            <PricingCard key={plan.key} plan={plan} />
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
                  "Portfolio Intelligence Platform: Institutional enquiry",
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

      <Footer />
    </main>
  );
}

function PricingCard({ plan }: { plan: Tier }) {
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
          {plan.priceUsd === null ? (
            <div className="font-serif text-[1.9rem] font-bold tracking-tight text-ink">
              {plan.priceKes}
            </div>
          ) : (
            <div>
              <div className="flex items-end gap-1.5">
                {plan.fromPrice && (
                  <span className="pb-1 text-[0.95rem] font-medium text-ink-3">
                    From
                  </span>
                )}
                <span className="font-serif text-[1.9rem] font-bold tracking-tight text-ink">
                  KES {plan.priceKes}
                </span>
                {plan.period && (
                  <span className="pb-1 text-[0.9rem] text-ink-3">
                    {plan.period}
                  </span>
                )}
              </div>
              <div className="mt-0.5 text-[0.95rem] font-medium text-accent-2">
                (USD {plan.priceUsd}
                {plan.period === "/ month" ? " / month" : ""})
              </div>
            </div>
          )}
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
            <a href={mailto(`${plan.name} enquiry`)}>
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
