import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  FileText,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CheckupTrigger } from "@/components/CheckupTrigger";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ResourceGate } from "@/components/ResourceGate";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Free Resources | CFO Partners",
  description:
    "Practical, free tools for African founders. Start with the KRA Filing Checklist: every filing a Kenyan SME needs to make, month by month.",
};

const KRA_PDF = "/resources/CFO-Partners-KRA-Filing-Checklist.pdf";

const UPCOMING = [
  {
    icon: LineChart,
    name: "Cash Flow Tracker",
    room: "CFO Room",
    note: "A weekly cash in, cash out, and runway template for businesses on M-Pesa, bank, and till accounts.",
  },
  {
    icon: Users,
    name: "Customer Concentration Tracker",
    room: "CRO Room",
    note: "See what share of revenue depends on your top customers, and what happens if one leaves.",
  },
  {
    icon: CalendarCheck,
    name: "Weekly Operating Rhythm",
    room: "COO Room",
    note: "The meeting cadence that keeps a small team aligned without wasting hours.",
  },
  {
    icon: ShieldCheck,
    name: "Compliance Checklist",
    room: "CRO Room",
    note: "Registration, permits, NSSF, and SHIF in one page. Confirm you are current on everything.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-bg">
      <Nav />

      {/* HEADER */}
      <header className="border-b border-line bg-bg-alt py-[60px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
            Free resources
          </span>
          <h1 className="mb-4 max-w-[820px]">
            Practical tools you can use this week.
          </h1>
          <p className="m-0 max-w-[720px] text-[1.1rem] text-ink-2">
            Built from the same playbooks we use inside paid engagements.
            Download, use, and share them. No payment, just an email address so
            we can send you new tools as they ship.
          </p>
        </div>
      </header>

      {/* FEATURED: KRA CHECKLIST */}
      <section className="py-[70px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold-soft px-3.5 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-accent-2">
                <FileText className="h-3.5 w-3.5" />
                From the CFO Room · PDF · 2 pages
              </div>
              <h2 className="mb-4">The KRA Filing Checklist</h2>
              <p className="mb-4 text-[1.05rem] text-ink-2">
                Every filing a Kenyan SME needs to make, month by month. PIN
                registration, eTIMS, PAYE, VAT, Turnover Tax, instalment tax,
                annual returns, and the compliance certificate, each with its
                deadline and the penalty for missing it.
              </p>
              <p className="mb-6 text-[1.05rem] text-ink-2">
                It closes with the five compliance mistakes we see most often
                in diagnostic submissions, so you can avoid them before they
                cost you.
              </p>
              <ul className="mb-2 space-y-2 text-[0.95rem] text-ink-2">
                {[
                  "One-time registrations: PIN, obligations, eTIMS, NSSF and SHIF",
                  "Monthly deadlines: PAYE by the 9th, VAT and Turnover Tax by the 20th",
                  "Quarterly and annual: instalment tax, returns, compliance certificate",
                  "The five most common compliance mistakes and how to avoid them",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ResourceGate
                resourceSlug="kra-filing-checklist"
                fileUrl={KRA_PDF}
                fileLabel="Download the KRA Filing Checklist"
              />
            </div>
          </div>
        </div>
      </section>

      {/* COMING NEXT */}
      <section className="bg-bg-alt py-[70px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
            Coming next
          </span>
          <h2 className="mb-5 max-w-[720px]">
            More tools are on the way.
          </h2>
          <p className="mb-10 max-w-[680px] text-[1.05rem] text-ink-2">
            Each Executive Room ships its tools in turn. Join the journal below
            and you will get each one the week it lands.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {UPCOMING.map((r) => {
              const Icon = r.icon;
              return (
                <Card key={r.name} className="flex h-full flex-col p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft text-accent-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-accent-2">
                    {r.room}
                  </div>
                  <h3 className="mb-2 text-[1.05rem]">{r.name}</h3>
                  <p className="m-0 text-[0.88rem] text-ink-2">{r.note}</p>
                  <span className="mt-4 inline-block rounded-full border border-line bg-bg px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-ink-3">
                    In production
                  </span>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-ink py-[70px] text-white">
        <div className="mx-auto max-w-[820px] px-6 text-center">
          <h2 className="mb-4 text-white">Get each new tool as it ships.</h2>
          <p className="mx-auto mb-8 max-w-[560px] text-slate-300">
            One email a month: cohort findings from the diagnostic, plus every
            new free tool. Written by practitioners, not a content calendar.
          </p>
          <div className="mx-auto max-w-[520px] text-left">
            <NewsletterSignup source="resources-page" variant="dark" />
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC CTA */}
      <section className="py-[70px]">
        <div className="mx-auto max-w-[820px] px-6 text-center">
          <h2 className="mb-4">Want the full picture, not just one tool?</h2>
          <p className="mx-auto mb-7 max-w-[560px] text-ink-2">
            The free Business Growth Check-Up scores your business across six
            pillars, including tax compliance, and tells you what to fix first.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CheckupTrigger variant="accent">
              Take the free diagnostic
            </CheckupTrigger>
            <Link
              href="/rooms/cfo"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-[22px] py-[14px] text-[0.95rem] font-semibold text-ink transition-all hover:bg-ink hover:text-white"
            >
              Explore the CFO Room
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
