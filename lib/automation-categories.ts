/**
 * The four automation categories. Administrative work is the entry
 * point; delivery, marketing, and leadership build on it.
 */

export interface AutomationCategory {
  key: "admin" | "delivery" | "marketing" | "leadership";
  name: string;
  tagline: string;
  description: string;
  examples: string[];
  dashboardTitle: string;
}

export const AUTOMATION_CATEGORIES: AutomationCategory[] = [
  {
    key: "admin",
    name: "Administrative work",
    tagline: "Where automation starts",
    description:
      "The repeating back-office work that eats founder hours: reconciling, filing, copying data between systems, and remembering deadlines. It is the easiest place to start because the rules are already clear.",
    examples: [
      "Payment reconciliation across M-Pesa, bank, and till",
      "Document filing and organisation",
      "Data entry between systems",
      "Compliance and KRA deadline reminders",
      "Meeting scheduling and follow-up notes",
    ],
    dashboardTitle: "Admin autopilot",
  },
  {
    key: "delivery",
    name: "Delivery",
    tagline: "From customer engagement to invoicing",
    description:
      "Everything between a customer saying yes and the money arriving: confirmations, status updates, invoices going out on time, and polite chasing when they are not paid.",
    examples: [
      "Order confirmations and status updates",
      "Invoice generation and sending",
      "Overdue payment follow-ups",
      "Delivery scheduling and dispatch alerts",
      "Customer onboarding flows",
    ],
    dashboardTitle: "Delivery pipeline",
  },
  {
    key: "marketing",
    name: "Marketing",
    tagline: "Consistent presence without the daily grind",
    description:
      "The businesses that grow are the ones that show up consistently. Automation keeps the content going out, the leads captured, and the follow-ups sent even in your busiest weeks.",
    examples: [
      "Content calendar and post scheduling",
      "WhatsApp and email broadcasts",
      "Lead capture and routing",
      "Follow-up sequences for quiet leads",
      "Monthly marketing performance summary",
    ],
    dashboardTitle: "Marketing engine",
  },
  {
    key: "leadership",
    name: "Leadership",
    tagline: "The system that helps you make smart decisions",
    description:
      "Think of what a leader actually does: evaluates the skills in the team and works on upskilling, looks for where work is stuck and removes the friction, and makes decisions with the full picture instead of a gut feel. Automation assembles that picture every week so leading takes judgement, not admin.",
    examples: [
      "Team skills map with upskilling plans per person",
      "Friction detection: where work waits, stalls, or gets done twice",
      "Goal tracking against current targets",
      "Data-backed decision briefs before big commitments",
      "Weekly KPI digest and board pack assembly",
    ],
    dashboardTitle: "Leadership decision cockpit",
  },
];
