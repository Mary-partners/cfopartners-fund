import type { Metadata } from "next";
import { Workflow } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { AutomationIntake } from "@/components/AutomationIntake";
import { AutomationCategories } from "@/components/AutomationCategories";

export const metadata: Metadata = {
  title: "AI Automations | CFO Partners",
  description:
    "Tell us what you want to automate, what success looks like, your timeline, and who is involved. We scope it, build it with you, and train your team to run it.",
};



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

      {/* CATEGORIES */}
      <section className="py-[80px]">
        <div className="mx-auto max-w-[1180px] px-6">
          <Reveal>
            <span className="mb-3 inline-block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent-2">
              What can be automated
            </span>
            <h2 className="mb-5 max-w-[780px]">
              Four categories, in the order most businesses adopt them.
            </h2>
            <p className="mb-10 max-w-[720px] text-[1.05rem] text-ink-2">
              Administrative work is where automation starts, because the
              rules are already clear. Delivery and marketing follow once the
              basics run themselves. Leadership automations come last and pay
              the most: your goals and numbers in front of you every week
              without the assembly work.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <AutomationCategories />
          </Reveal>
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
