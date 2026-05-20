export type PillarKey =
  | "revenue"
  | "customer"
  | "cost"
  | "finance"
  | "ops"
  | "growth";

export interface Pillar {
  key: PillarKey;
  name: string;
}

export interface QuestionOption {
  t: string;
  s: number;
}

export interface Question {
  pillar: PillarKey;
  q: string;
  a: [QuestionOption, QuestionOption, QuestionOption, QuestionOption];
}

export interface Archetype {
  key: "Hustler" | "Operator" | "Stabilizer" | "Scaler";
  min: number;
  max: number;
  tier: string;
  tierPrice: string;
  blurb: string;
}

export const PILLARS: Pillar[] = [
  { key: "revenue", name: "Revenue Clarity" },
  { key: "customer", name: "Customer Base" },
  { key: "cost", name: "Cost Structure" },
  { key: "finance", name: "Financial Readiness" },
  { key: "ops", name: "Operations & Systems" },
  { key: "growth", name: "Growth Path & Vision" },
];

export const QUESTIONS: Question[] = [
  // REVENUE CLARITY
  {
    pillar: "revenue",
    q: "Do you know exactly how much revenue your business made last month?",
    a: [
      { t: "No idea", s: 0 },
      { t: "I have a rough sense", s: 1 },
      { t: "Yes — I can quote a figure", s: 3 },
      { t: "Yes — with a clean recorded breakdown", s: 5 },
    ],
  },
  {
    pillar: "revenue",
    q: "How do you record sales?",
    a: [
      { t: "From memory", s: 0 },
      { t: "A notebook", s: 1 },
      { t: "A spreadsheet", s: 3 },
      { t: "Accounting software (QuickBooks, Zoho, etc.)", s: 5 },
    ],
  },
  {
    pillar: "revenue",
    q: "Do you track each customer's contribution to revenue?",
    a: [
      { t: "No", s: 0 },
      { t: "Top customer only", s: 1 },
      { t: "Top 3–5 customers", s: 3 },
      { t: "All customers tracked", s: 5 },
    ],
  },
  {
    pillar: "revenue",
    q: "Can you split one-time vs. recurring revenue?",
    a: [
      { t: "I don't know the difference for my business", s: 0 },
      { t: "I could roughly estimate", s: 1 },
      { t: "Yes — quarterly", s: 3 },
      { t: "Yes — monthly with a breakdown", s: 5 },
    ],
  },
  {
    pillar: "revenue",
    q: "Do you know your average order or transaction size?",
    a: [
      { t: "No", s: 0 },
      { t: "A guess", s: 1 },
      { t: "Calculated occasionally", s: 3 },
      { t: "Tracked continuously", s: 5 },
    ],
  },

  // CUSTOMER BASE
  {
    pillar: "customer",
    q: "What share of revenue comes from your single largest customer?",
    a: [
      { t: "More than 75%", s: 0 },
      { t: "50–75%", s: 1 },
      { t: "25–50%", s: 3 },
      { t: "Less than 25%", s: 5 },
    ],
  },
  {
    pillar: "customer",
    q: "How do you mainly acquire new customers?",
    a: [
      { t: "Word of mouth only", s: 0 },
      { t: "Referrals + walk-ins", s: 1 },
      { t: "Some marketing + referrals", s: 3 },
      { t: "Multi-channel marketing with a clear engine", s: 5 },
    ],
  },
  {
    pillar: "customer",
    q: "Do you have repeat customers?",
    a: [
      { t: "I don't track this", s: 0 },
      { t: "A few", s: 1 },
      { t: "Most are repeat", s: 3 },
      { t: "Yes — I track repeat rate explicitly", s: 5 },
    ],
  },
  {
    pillar: "customer",
    q: "How many active customers do you have right now?",
    a: [
      { t: "Fewer than 10", s: 0 },
      { t: "10–50", s: 1 },
      { t: "50–200", s: 3 },
      { t: "More than 200", s: 5 },
    ],
  },
  {
    pillar: "customer",
    q: "Do you collect customer contact info?",
    a: [
      { t: "No", s: 0 },
      { t: "Some informally", s: 1 },
      { t: "Most, in a list", s: 3 },
      { t: "All, in a CRM or proper system", s: 5 },
    ],
  },

  // COST STRUCTURE
  {
    pillar: "cost",
    q: "Do you know your monthly fixed costs?",
    a: [
      { t: "No", s: 0 },
      { t: "Rough estimate", s: 1 },
      { t: "Yes — clearly", s: 3 },
      { t: "Yes — tracked monthly with categories", s: 5 },
    ],
  },
  {
    pillar: "cost",
    q: "Do you know your gross margin per product or service?",
    a: [
      { t: "No", s: 0 },
      { t: "An estimate", s: 1 },
      { t: "Yes — for top items", s: 3 },
      { t: "Yes — for everything you sell", s: 5 },
    ],
  },
  {
    pillar: "cost",
    q: "Have you separated personal vs. business expenses?",
    a: [
      { t: "No — they're mixed", s: 0 },
      { t: "Trying to", s: 1 },
      { t: "Mostly separated", s: 3 },
      { t: "Fully separated with discipline", s: 5 },
    ],
  },
  {
    pillar: "cost",
    q: "Do you track variable costs (materials, labour, delivery)?",
    a: [
      { t: "No", s: 0 },
      { t: "Sometimes", s: 1 },
      { t: "Monthly", s: 3 },
      { t: "Per transaction or per job", s: 5 },
    ],
  },
  {
    pillar: "cost",
    q: "Do you know your break-even revenue?",
    a: [
      { t: "No", s: 0 },
      { t: "A rough idea", s: 1 },
      { t: "Yes — calculated", s: 3 },
      { t: "Yes — tracked against actuals monthly", s: 5 },
    ],
  },

  // FINANCIAL READINESS
  {
    pillar: "finance",
    q: "Do you have a business bank account?",
    a: [
      { t: "No — I use my personal account", s: 0 },
      { t: "I use M-Pesa till only", s: 1 },
      { t: "Personal account but with discipline", s: 3 },
      { t: "Yes — proper registered business account", s: 5 },
    ],
  },
  {
    pillar: "finance",
    q: "Are you registered with KRA and current on taxes?",
    a: [
      { t: "Not registered", s: 0 },
      { t: "Registered but behind on filings", s: 1 },
      { t: "Current with PIN and most filings", s: 3 },
      { t: "Fully current — PIN, VAT, and annual returns", s: 5 },
    ],
  },
  {
    pillar: "finance",
    q: "Do you pay yourself a regular salary or draw?",
    a: [
      { t: "No", s: 0 },
      { t: "I draw when I can", s: 1 },
      { t: "A variable amount most months", s: 3 },
      { t: "Yes — a consistent amount", s: 5 },
    ],
  },
  {
    pillar: "finance",
    q: "Do you have monthly financial statements?",
    a: [
      { t: "No", s: 0 },
      { t: "Some notes", s: 1 },
      { t: "Yes — I prepare them", s: 3 },
      { t: "Yes — prepared with an accountant", s: 5 },
    ],
  },
  {
    pillar: "finance",
    q: "Have you ever prepared for an investor, loan, or grant?",
    a: [
      { t: "Never", s: 0 },
      { t: "Tried but it didn't go well", s: 1 },
      { t: "Yes — informally", s: 3 },
      { t: "Yes — with professionally prepared docs", s: 5 },
    ],
  },

  // OPERATIONS & SYSTEMS
  {
    pillar: "ops",
    q: "Do you have written processes for your key tasks?",
    a: [
      { t: "No", s: 0 },
      { t: "They're in my head", s: 1 },
      { t: "Some are written", s: 3 },
      { t: "Most are documented", s: 5 },
    ],
  },
  {
    pillar: "ops",
    q: "Do you use software to run your business?",
    a: [
      { t: "None", s: 0 },
      { t: "WhatsApp only", s: 1 },
      { t: "A few useful apps", s: 3 },
      { t: "An integrated stack", s: 5 },
    ],
  },
  {
    pillar: "ops",
    q: "Can your business run for a week without you?",
    a: [
      { t: "No", s: 0 },
      { t: "Half a day maybe", s: 1 },
      { t: "2–3 days", s: 3 },
      { t: "A week or longer", s: 5 },
    ],
  },
  {
    pillar: "ops",
    q: "Do you have employees with defined roles?",
    a: [
      { t: "Solo", s: 0 },
      { t: "Casual help", s: 1 },
      { t: "Yes — informal roles", s: 3 },
      { t: "Yes — with contracts and job descriptions", s: 5 },
    ],
  },
  {
    pillar: "ops",
    q: "Do you track KPIs weekly or monthly?",
    a: [
      { t: "No", s: 0 },
      { t: "Occasionally", s: 1 },
      { t: "Monthly", s: 3 },
      { t: "Weekly — on a dashboard", s: 5 },
    ],
  },

  // GROWTH PATH & VISION
  {
    pillar: "growth",
    q: "Do you have a written growth plan?",
    a: [
      { t: "No", s: 0 },
      { t: "In my head", s: 1 },
      { t: "Yes — basic version", s: 3 },
      { t: "Yes — with milestones and dates", s: 5 },
    ],
  },
  {
    pillar: "growth",
    q: "Do you have revenue targets for the next 12 months?",
    a: [
      { t: "No", s: 0 },
      { t: "A hope", s: 1 },
      { t: "Monthly targets", s: 3 },
      { t: "Targets with an action plan behind them", s: 5 },
    ],
  },
  {
    pillar: "growth",
    q: "Have you identified your next growth blocker?",
    a: [
      { t: "No", s: 0 },
      { t: "Yes — intuitively", s: 1 },
      { t: "Yes — with data", s: 3 },
      { t: "Yes — with data and a clear action plan", s: 5 },
    ],
  },
  {
    pillar: "growth",
    q: "Do you have a 3-year vision for the business?",
    a: [
      { t: "No", s: 0 },
      { t: "Vague", s: 1 },
      { t: "Clear in my mind", s: 3 },
      { t: "Documented, with a strategy attached", s: 5 },
    ],
  },
  {
    pillar: "growth",
    q: "Are you ready to delegate to grow?",
    a: [
      { t: "No", s: 0 },
      { t: "Reluctant", s: 1 },
      { t: "Willing", s: 3 },
      { t: "Already delegating effectively", s: 5 },
    ],
  },
];

export const ARCHETYPES: Archetype[] = [
  {
    key: "Hustler",
    min: 0,
    max: 50,
    tier: "Bankable Foundation",
    tierPrice: "KES 12,500 · 4 weeks",
    blurb:
      "You're building from the ground up. The first job isn't growth — it's making the business bankable. Separate personal and business money, register with KRA, and get records that an outsider can read. That's the unlock.",
  },
  {
    key: "Operator",
    min: 51,
    max: 90,
    tier: "Founder Cohort",
    tierPrice: "KES 150,000 · 8 weeks",
    blurb:
      "You have a business that works — but it works because you do. The next step is installing the systems and discipline that let it run without depending on you for every decision.",
  },
  {
    key: "Stabilizer",
    min: 91,
    max: 120,
    tier: "Strategic Diagnostic",
    tierPrice: "KES 580,000 · 6 weeks",
    blurb:
      "You've built something real. Now it's time to make it investor-ready and strategically clear — financial pack, board reporting, and a 90-day execution roadmap that gets you to the next stage.",
  },
  {
    key: "Scaler",
    min: 121,
    max: 150,
    tier: "Virtual CFO Bench",
    tierPrice: "From KES 195,000/mo",
    blurb:
      "You're scaling. What you need now is an embedded fractional CFO with an AI-powered platform behind them — running monthly board reporting, supporting your capital raise, and giving you the strategic partnership a Series-stage business demands.",
  },
];

export function archetypeFor(score: number): Archetype {
  return (
    ARCHETYPES.find((a) => score >= a.min && score <= a.max) ?? ARCHETYPES[0]
  );
}
