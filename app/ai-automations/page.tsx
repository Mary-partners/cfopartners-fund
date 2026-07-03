import type { Metadata } from "next";
import {
  Bot,
  ClipboardList,
  FileSpreadsheet,
  MessageSquare,
  ReceiptText,
  Repeat,
  Workflow,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { AutomationIntake } from "@/components/AutomationIntake";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "AI Automations | CFO Partners",
  description:
    "Tell us what you want to automate, what success looks like, your timeline, and who is involved. We scope it, build it with you, and train your team to run it.",
};

const EXAMPLES = [
  {
    icon: ReceiptText,
    name: "Payment reconciliation",
    detail:
      "Match M-Pesa, bank, and till payments to invoices automatically, with a daily summary instead of a weekend spreadsheet session.",
  },
  {
    icon: MessageSquare,
    name: "Customer follow-up",
    detail:
      "Polite, automatic reminders for overdue invoices and quotes that went quiet, over WhatsApp or email.",
  },
  {
    icon: FileSpreadsheet,
    name: "Reporting",
    detail:
      "Monthly management accounts, KPI dashboards, and board-pack numbers assembled from your existing tools without manual copying.",
  },
  {
    icon: ClipboardList,
    name: "Compliance deadlines",
    detail:
      "KRA filing reminders, document checklists, and status tracking so nothing slips past the 9th or the 20th.",
  },
  {
    icon: Repeat,
    name: "Order and delivery flows",
    detail:
      "From order received to dispatch confirmed: status updates, stock alerts, and handoffs between teammates.",
  },
  {
    icon: Bot,
    name: "AI assistants for your team",
    detail:
      "Internal assistants trained on your prices, policies, and processes, so the team stops asking you everything.",
  },
];

const PROCESS = [
  {
    num: "01",
    name: "Send the brief",
    detail:
      "Four questions: what to automate, what success looks like, your timeline, and who is involved. Five minutes.",
  },
  {
    num: "02",
    name: "Scoping reply",
    detail:
      "Within two working days you get an honest read: what to automate, what to fix first instead, and what it would take.",
  },
  {
    num: "03",
    name: "Build sprint",
    detail:
      "We design and build the automation with you, connected to the tools you already use, tested on real work.",
  },
  {
    num: "04",
    name: "Handover and training",
    detail:
      "Your team learns to run and adjust it. AI capacity building is part of the sprint, not an extra.",
  },
];

export default function AIAutomationsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <Nav />

      {/* HERO + FORM */}
      <header className="hero-gradient py-[72px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.82rem] font-semibold text-ink-2 shadow-sm">
                <Workflow className="h-4 w-4 text-accent" />
                AI Automations, from the Execution Support group
              </span>
              <h1 className="mb-6">
                Stop doing the work a system should be doing.
              </h1>
              <p className="mb-4 text-[1.1rem] text-ink-2">
                Most founders lose hours every week to work that repeats
                exactly the same way: reconciling payments, chasing invoices,
                assembling reports, reminding the team. That is automation
                territory.
              </p>
              <p className="mb-4 text-[1.1rem] text-ink-2">
                Tell us what you want to automate, what success looks like,
                how much time you have, and who else is involved. We scope it,
                build it with you, and train your team to run it.
              </p>
              <p className="text-[0.95rem] text-ink-3">
                Your brief also shapes the AI Automation Diagnostic we are
                building. Submit one and you are first in line when it goes
                live.
              </p>
            </div>
            <AutomationIntake />
          </div>
        </div>
      </header>

      {/* WHAT WE AUTOMATE */}
      <section className="py-[80px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
              What founders automate with us
            </span>
            <h2 className="mb-5 max-w-[780px]">
              If it repeats every week, it is a candidate.
            </h2>
            <p className="mb-12 max-w-[720px] text-[1.05rem] text-ink-2">
              Six patterns come up again and again in our diagnostic
              submissions. Yours does not have to fit one of them; the brief
              form takes anything.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EXAMPLES.map((e, i) => {
              const Icon = e.icon;
              return (
                <Reveal key={e.name} delay={i * 70}>
                  <Card className="h-full p-6 transition-all hover:-translate-y-0.5 hover:shadow-card">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft text-accent-2">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 text-[1.05rem]">{e.name}</h3>
                    <p className="m-0 text-[0.9rem] leading-6 text-ink-2">
                      {e.detail}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-ink py-[80px] text-white">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent">
              How it works
            </span>
            <h2 className="mb-12 max-w-[720px] text-white">
              From brief to running automation in four steps.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.num} delay={i * 90}>
                <div className="h-full rounded-card border-t-4 border-accent bg-white/5 p-6 backdrop-blur">
                  <div className="mb-3 font-serif text-[1.6rem] text-accent">
                    {p.num}
                  </div>
                  <h3 className="mb-2 text-[1.05rem] text-white">{p.name}</h3>
                  <p className="m-0 text-[0.9rem] leading-6 text-slate-300">
                    {p.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-10 rounded-card border border-white/15 bg-white/5 px-7 py-6">
              <p className="m-0 max-w-[820px] text-[0.95rem] leading-7 text-slate-300">
                One honest caveat: automation multiplies whatever structure
                already exists. If the underlying records are not in place, we
                will tell you, and we will point you at the structural fix
                first. That is the difference between automating a process and
                automating a mess.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIAGNOSTIC TEASER */}
      <section className="py-[80px]">
        <div className="mx-auto max-w-[820px] px-6 text-center">
          <Reveal>
            <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
              Coming soon
            </span>
            <h2 className="mb-4">The AI Automation Diagnostic</h2>
            <p className="mx-auto mb-4 max-w-[620px] text-[1.05rem] text-ink-2">
              We are building a scored diagnostic that maps your business for
              automation readiness: which tasks to automate first, what they
              cost you today, and what to fix before the build.
            </p>
            <p className="mx-auto mb-0 max-w-[620px] text-[0.95rem] text-ink-3">
              It is being built together with the founders who send briefs
              through this page. Send yours above and you will run it before
              anyone else.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
