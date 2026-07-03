/**
 * The four service groups. One integrated firm.
 * Source: CFOIP Company Presentation, June 2026 (Our products and services).
 */

export interface ServiceGroup {
  key: string;
  name: string;
  summary: string;
  items: string[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    key: "diagnostics",
    name: "Founder Diagnostics",
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
