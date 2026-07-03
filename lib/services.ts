/**
 * The four service groups. One integrated firm.
 * Source: CFOIP Company Presentation, June 2026 (Our products and services).
 */

export interface ServiceGroup {
  key: string;
  name: string;
  question: string;
  summary: string;
  caption: string;
  items: string[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    key: "diagnostics",
    name: "Founder Diagnostics",
    question: "Do we know where the business actually stands?",
    caption:
      "Every engagement starts with a scored diagnostic: six pillars, an archetype, and a written recommendation on what to fix first.",
    summary:
      "Structured instruments that show where the business stands and what to fix first.",
    items: [
      "Business Growth Assessment",
      "Scale-Up Business Assessment",
      "Founder Growth Report",
      "Business readiness review",
    ],
  },
  {
    key: "advisory",
    name: "Advisory & Governance",
    question: "Who pressure-tests the big decisions?",
    caption:
      "Board packs, decision memos, and a monthly advisory rhythm give founders board-level thinking before they have a formal board.",
    summary:
      "Senior decision support for founders who need more than a one-off conversation.",
    items: [
      "Expert Advisory Panel",
      "Virtual Board",
      "Strategy Committee",
      "Board packs and decision memos",
    ],
  },
  {
    key: "finance",
    name: "Finance & Capital Readiness",
    question: "Are the numbers ready for a bank or an investor?",
    caption:
      "Cash tracked against plan, clean management accounts, and a data room that survives due diligence.",
    summary:
      "The finance function, delivered fractionally, from monthly numbers to the data room.",
    items: [
      "Fractional CFO support",
      "Management accounts and reporting",
      "Cash flow forecasting",
      "Financial model review",
      "Investor and bank readiness",
      "Data room preparation",
    ],
  },
  {
    key: "execution",
    name: "Execution Support",
    question: "Does the plan actually get implemented?",
    caption:
      "KPI dashboards and a weekly accountability rhythm move the plan from paper into the business.",
    summary:
      "Hands-on implementation that moves the plan from paper into the business.",
    items: [
      "Operational support pod",
      "Systems and automation sprint",
      "AI capacity building",
      "KPI dashboards",
      "Team accountability rhythm",
    ],
  },
];
