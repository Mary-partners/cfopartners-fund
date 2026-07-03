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
    tagline: "Your goals, visible every week",
    description:
      "Leadership activities that slip when the weeks get busy: tracking goals against reality, reviewing KPIs, preparing board updates, and keeping the team accountable. Automation puts them in front of you without the assembly work.",
    examples: [
      "Goal tracking against current targets",
      "Weekly KPI digest to your inbox or WhatsApp",
      "Board pack and investor update assembly",
      "Team accountability nudges",
      "Decision log with follow-through tracking",
    ],
    dashboardTitle: "Leadership goals dashboard",
  },
];
