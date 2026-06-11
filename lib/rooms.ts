/**
 * Executive Rooms — the seven business functions that make up the
 * CFO Partners platform. Each room pairs an AI assistant with named
 * tools (templates, calculators, checklists) and an escalation path
 * to human experts when needed.
 *
 * This file is the single source of truth for room + tool data.
 * Both the homepage Executive Rooms section and the per-room pages
 * (/rooms/[slug]) read from here.
 */

export type RoomSlug =
  | "ceo"
  | "cfo"
  | "coo"
  | "cmo"
  | "cro"
  | "board"
  | "experts";

export type TierLabel = "Free" | "Starter" | "Growth" | "Expert";

export interface Tool {
  name: string;
  description: string;
  tier: TierLabel;
}

export interface Room {
  slug: RoomSlug;
  name: string;
  shortName: string;
  role: string;
  assistant: string;
  iconKey: string;
  blurb: string;
  longBlurb: string;
  prompt: string;
  helps: string[];
  tools: Tool[];
  highlighted?: boolean;
}

export const ROOMS: Room[] = [
  {
    slug: "ceo",
    name: "The CEO Room",
    shortName: "CEO Room",
    role: "Strategy & Direction",
    assistant: "CEO Advisor",
    iconKey: "compass",
    blurb:
      "Clarify your business model, goals, priorities, and growth path. Pressure-test strategic decisions before you commit.",
    longBlurb:
      "Every serious business needs a thinking partner — someone to pressure-test the strategy, question the numbers, name the priorities. Large companies have CEOs and boards. Most African founders have themselves. The CEO Room gives you a structured way to think like a CEO when you don't have one.",
    prompt:
      "Based on my diagnostic results, what are the top 3 strategic decisions I need to make this quarter?",
    helps: [
      "Business model clarity",
      "Strategic planning & 90-day priorities",
      "Founder accountability",
      "Decision-making frameworks",
      "Expansion & market entry readiness",
    ],
    tools: [
      {
        name: "Business Model Canvas (Africa edition)",
        description:
          "Map your value proposition, customers, channels, costs, and revenue streams — adapted for African market realities.",
        tier: "Starter",
      },
      {
        name: "90-Day Priority Tracker",
        description:
          "Three priorities per quarter, mapped to weekly actions, with founder review checkpoints.",
        tier: "Starter",
      },
      {
        name: "Strategic Decision Memo Template",
        description:
          "Structure any major decision (hire, raise, pivot, expand) into a one-page memo you can revisit later.",
        tier: "Growth",
      },
      {
        name: "Founder Accountability Sheet",
        description:
          "Monthly check-in template: what did you say you'd do, what did you actually do, what's blocking you.",
        tier: "Starter",
      },
    ],
  },
  {
    slug: "cfo",
    name: "The CFO Room",
    shortName: "CFO Room",
    role: "Finance & Bankability",
    assistant: "Virtual CFO",
    iconKey: "line-chart",
    blurb:
      "Revenue, costs, cash flow, margins, founder salary discipline, investor and loan readiness. Our strongest wedge — and where most founders should start.",
    longBlurb:
      "The CFO Room is where most African founders should start. Our diagnostic data is clear: when founders blame capital, the real blocker is almost always financial structure. Separate money. Track revenue. Pay yourself a real salary. Pass the Bankability Score. Then — and only then — does capital become the right conversation.",
    prompt:
      "Am I ready to borrow money, and what would a lender worry about?",
    helps: [
      "Revenue, cost & cash flow tracking",
      "Founder salary discipline",
      "Bankability & loan readiness",
      "Investor pack preparation",
      "Pricing & margin clarity",
      "KRA compliance & tax filing",
    ],
    tools: [
      {
        name: "Cash Flow Tracker",
        description:
          "Weekly cash in / cash out / runway view — designed for businesses on M-Pesa, bank, and till accounts.",
        tier: "Starter",
      },
      {
        name: "Bankability Calculator",
        description:
          "Score your business on the seven factors a Kenyan bank or SACCO looks at before approving credit.",
        tier: "Growth",
      },
      {
        name: "Investor Pack Generator",
        description:
          "Auto-build a one-page financial summary, traction sheet, and use-of-funds breakdown from your monthly data.",
        tier: "Growth",
      },
      {
        name: "KRA Filing Checklist",
        description:
          "Month-by-month checklist for VAT, PAYE, and annual returns — never miss a filing, never pay a penalty.",
        tier: "Free",
      },
    ],
    highlighted: true,
  },
  {
    slug: "coo",
    name: "The COO Room",
    shortName: "COO Room",
    role: "Operations & Systems",
    assistant: "Operations Architect",
    iconKey: "wrench",
    blurb:
      "Workflows, team roles, SOPs, delivery systems, weekly operating rhythm, internal controls, execution discipline.",
    longBlurb:
      "If your business only works when you're in it, you don't have a business — you have a job. The COO Room installs the systems and rhythms that let the business run without depending on you for every decision. SOPs, weekly check-ins, role clarity, internal controls — the boring stuff that quietly compounds.",
    prompt:
      "Create a simple operating system for my business based on my team size and revenue stage.",
    helps: [
      "Workflow & process design",
      "Team role clarity",
      "Standard Operating Procedures (SOPs)",
      "Weekly operating rhythm",
      "Internal controls & accountability",
      "Delegation discipline",
    ],
    tools: [
      {
        name: "SOP Builder",
        description:
          "Step-by-step template for documenting any recurring task so it can be delegated to a junior team member.",
        tier: "Growth",
      },
      {
        name: "Weekly Operating Rhythm Template",
        description:
          "Monday standup → Wednesday check-in → Friday review. The cadence that keeps small teams aligned.",
        tier: "Starter",
      },
      {
        name: "Team Role Clarity Sheet",
        description:
          "Define who owns what, who decides what, and who is consulted — for every key area of the business.",
        tier: "Starter",
      },
      {
        name: "Process Map Template",
        description:
          "Map any process (sale, delivery, hire, complaint) into a flowchart you can hand to a new employee.",
        tier: "Growth",
      },
    ],
  },
  {
    slug: "cmo",
    name: "The CMO Room",
    shortName: "CMO Room",
    role: "Sales, Marketing & Growth",
    assistant: "Growth Strategist",
    iconKey: "megaphone",
    blurb:
      "Customer segmentation, sales scripts, offer design, lead generation, content strategy, customer retention.",
    longBlurb:
      "Most early-stage African businesses don't have a marketing problem — they have an offer problem, a positioning problem, or a customer concentration problem. The CMO Room helps you diagnose which one you actually have, then gives you the tools to fix it.",
    prompt:
      "Help me create a 30-day customer acquisition plan for my business.",
    helps: [
      "Offer design & pricing communication",
      "Customer segmentation & ideal profile",
      "Sales scripts & objection handling",
      "Lead generation campaigns",
      "Content strategy & calendar",
      "Customer retention & repeat rate",
    ],
    tools: [
      {
        name: "Offer Builder",
        description:
          "Structure your offer as a problem-solution-proof-price-package so customers can say yes faster.",
        tier: "Growth",
      },
      {
        name: "Customer Profile Worksheet",
        description:
          "Define your best customer, your worst customer, and the one you should stop selling to.",
        tier: "Starter",
      },
      {
        name: "Sales Script Generator",
        description:
          "Discovery questions, objection handling, and close scripts adapted to your offer and price point.",
        tier: "Growth",
      },
      {
        name: "30-Day Marketing Calendar",
        description:
          "Daily content prompts, weekly themes, and monthly campaign templates for WhatsApp, Instagram, and LinkedIn.",
        tier: "Growth",
      },
    ],
  },
  {
    slug: "cro",
    name: "The CRO Room",
    shortName: "CRO Room",
    role: "Risk, Compliance & Resilience",
    assistant: "Risk Advisor",
    iconKey: "shield-check",
    blurb:
      "KRA basics, registration, customer concentration risk, cash flow risk, debt risk, governance basics, business continuity.",
    longBlurb:
      "The biggest risks in an African SME are almost never the ones founders worry about. It's not the macro economy — it's the one customer who owes you 60% of your revenue. It's not currency — it's that your business isn't actually registered. The CRO Room makes the invisible risks visible.",
    prompt:
      "What are the biggest risks in my business based on my current diagnostic score?",
    helps: [
      "KRA registration & tax compliance",
      "Customer concentration tracking",
      "Cash flow & debt risk",
      "Governance basics for SMEs",
      "Business continuity planning",
      "Climate & disruption risk",
    ],
    tools: [
      {
        name: "Risk Register",
        description:
          "List your top 10 business risks with likelihood, impact, and a documented mitigation plan for each.",
        tier: "Growth",
      },
      {
        name: "Customer Concentration Tracker",
        description:
          "Visualise what % of revenue comes from your top 1, 3, and 5 customers — and what happens if you lose them.",
        tier: "Starter",
      },
      {
        name: "Compliance Checklist",
        description:
          "KRA PIN, business registration, NSSF, NHIF, business permit — confirm you're current on everything.",
        tier: "Free",
      },
      {
        name: "Business Continuity Plan",
        description:
          "What happens if the founder is sick for 30 days, the biggest customer leaves, or the lease ends.",
        tier: "Growth",
      },
    ],
  },
  {
    slug: "board",
    name: "The Board Room",
    shortName: "Board Room",
    role: "Governance & Decision Support",
    assistant: "Board Advisor",
    iconKey: "briefcase",
    blurb:
      "Monthly board-style reports, decision memos, investor updates, partner updates, KPI tracking. Board-level thinking before you have a formal board.",
    longBlurb:
      "Even small businesses need board-level thinking before they have a formal board. The Board Room gives you the reports, memos, and structured reviews that force you to step outside the day-to-day and look at the business the way an investor or a senior advisor would.",
    prompt:
      "Prepare a one-page board update from my monthly business data.",
    helps: [
      "Monthly board-style reports",
      "Investor & partner updates",
      "Decision memos for major moves",
      "Management reporting",
      "KPI dashboards",
      "Governance maturity",
    ],
    tools: [
      {
        name: "Monthly Board Report Template",
        description:
          "One-page report covering revenue, cash, headcount, top wins, top risks, and asks. Investor-ready format.",
        tier: "Growth",
      },
      {
        name: "Decision Memo Template",
        description:
          "Frame any major decision as context → options → recommendation → risk. Forces clarity before commitment.",
        tier: "Growth",
      },
      {
        name: "KPI Dashboard",
        description:
          "Six core KPIs every African SME should track weekly. Editable, exportable, presentable.",
        tier: "Growth",
      },
      {
        name: "Investor Update Template",
        description:
          "Monthly format used by funded startups: highlights, lowlights, asks. Builds the relationship before the raise.",
        tier: "Growth",
      },
    ],
  },
  {
    slug: "experts",
    name: "The Expert Marketplace",
    shortName: "Expert Marketplace",
    role: "Human Escalation",
    assistant: "Vetted practitioners",
    iconKey: "users",
    blurb:
      "When AI isn't enough: tax, accounting cleanup, legal, fundraising, credit readiness, strategy workshops, operational implementation. The Sndbx model, rebuilt digitally.",
    longBlurb:
      "AI handles the first layer. But sometimes you need a real human — a tax advisor to clean up three years of filings, a lawyer to draft a shareholders' agreement, a senior CFO to walk you through your first capital raise. The Expert Marketplace gives you direct booking access to vetted East African practitioners, with CFO Partners standing behind every recommendation.",
    prompt:
      "Book a 45-minute session with a vetted CFO, accountant, or strategist.",
    helps: [
      "Tax cleanup & KRA negotiation",
      "Accounting catch-up & audit prep",
      "Legal: contracts, IP, shareholders' agreements",
      "Fundraising & investor introductions",
      "Credit readiness & loan applications",
      "Operational implementation sprints",
    ],
    tools: [
      {
        name: "Tax & Accounting Expert",
        description:
          "Vetted KRA-fluent accountants for monthly bookkeeping, tax cleanup, and audit preparation.",
        tier: "Expert",
      },
      {
        name: "Legal & Compliance Expert",
        description:
          "Contracts, IP protection, shareholders' agreements, employment law — booked by the hour or the engagement.",
        tier: "Expert",
      },
      {
        name: "Fundraising Advisor",
        description:
          "Senior practitioners who've raised from DFIs, banks, and angels in East Africa — pitch coaching and intros.",
        tier: "Expert",
      },
      {
        name: "Strategy Workshop Facilitator",
        description:
          "Half-day or full-day offsite to set 12-month strategy with you and your senior team.",
        tier: "Expert",
      },
    ],
  },
];

export function roomFor(slug: string): Room | undefined {
  return ROOMS.find((r) => r.slug === slug);
}

export function allRoomSlugs(): RoomSlug[] {
  return ROOMS.map((r) => r.slug);
}
