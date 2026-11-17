/**
 * Enquiry form definitions shared by the form (client) and the API route
 * (server), so both validate the same fields.
 */
import { z } from "zod";

export const ORG_TYPES = [
  "Investment fund (impact, PE or VC)",
  "Development finance institution",
  "Bank or non-bank lender",
  "Foundation",
  "Accelerator or incubator",
  "Development partner or donor programme",
  "Technical assistance facility",
  "Other",
] as const;

export const INSTITUTIONAL_SUPPORT = [
  "Portfolio financial management",
  "Pre- or post-investment support",
  "Investment readiness for portfolio or pipeline companies",
  "Fractional CFO support for portfolio companies",
  "Enterprise development and technical assistance",
  "Programme design and implementation",
  "Portfolio reporting dashboards",
  "Not sure yet",
] as const;

export const INSTITUTIONAL_OFFERS = [
  "Portfolio Finance System: Portfolio Diagnostic",
  "Portfolio Finance System: 90-day pilot",
  "Portfolio Finance System: Embedded retainer",
  "Individual services",
  "Not sure yet",
] as const;

export const FINANCE_CAPACITY = [
  "Most companies have no dedicated finance staff",
  "Bookkeepers or accountants only",
  "Finance managers in some companies",
  "CFO-level finance leads in most companies",
  "Not sure",
] as const;

export const SME_CHALLENGES = [
  "Cash flow is tight or unpredictable",
  "Reports are late or unreliable",
  "Not sure which products or customers make money",
  "Preparing for a loan or investment",
  "No senior finance lead",
  "Something else",
] as const;

export const SME_SUPPORT = [
  "90-Day Financial Performance System",
  "Fractional CFO (monthly)",
  "Investment readiness",
  "Access to finance (debt or grants)",
  "Financial modelling",
  "Financial systems and reporting",
  "Not sure yet",
] as const;

export const BUSINESS_STAGES = [
  "Pre-revenue",
  "Early revenue (under 2 years)",
  "Growing (2+ years of revenue)",
  "Established and scaling",
] as const;

export const START_OPTIONS = [
  "Within a month",
  "In 1 to 3 months",
  "In 3 to 6 months",
  "Exploring options",
] as const;

export const BUDGET_OPTIONS = [
  "Prefer to discuss",
  "Under USD 10,000",
  "USD 10,000 to 50,000",
  "USD 50,000 to 150,000",
  "Over USD 150,000",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (max: number) => z.string().trim().max(max);
const required = (max: number, label: string) =>
  text(max).min(1, `Please enter ${label}.`);
const email = z
  .string()
  .trim()
  .toLowerCase()
  .regex(EMAIL_RE, "Please enter a valid email address.");

/** Attribution captured with every enquiry (landing page, referrer, UTM tags). */
const source = z
  .object({
    landingPage: text(300).optional(),
    referrer: text(300).optional(),
    utmSource: text(100).optional(),
    utmMedium: text(100).optional(),
    utmCampaign: text(100).optional(),
  })
  .optional();

export const institutionalSchema = z.object({
  kind: z.literal("institutional"),
  organisation: required(160, "your organisation"),
  name: required(120, "your name"),
  email,
  orgType: z.enum(ORG_TYPES, { message: "Please choose an organisation type." }),
  country: required(160, "your countries of operation"),
  offer: z.enum(INSTITUTIONAL_OFFERS, { message: "Please choose how you would like to start." }),
  support: z.enum(INSTITUTIONAL_SUPPORT, { message: "Please choose the support you need." }),
  capacity: z.enum(FINANCE_CAPACITY, { message: "Please describe the finance capacity in your companies." }),
  size: text(80).optional(),
  start: z.enum(START_OPTIONS, { message: "Please choose a start date." }),
  budget: z.enum(BUDGET_OPTIONS).optional(),
  message: required(3000, "a short description"),
  website: text(200).optional(), // honeypot: must stay empty
  source,
});

export const smeSchema = z.object({
  kind: z.literal("sme"),
  business: required(160, "your business name"),
  sector: required(100, "your sector"),
  country: required(80, "a country"),
  stage: z.enum(BUSINESS_STAGES, { message: "Please choose your business stage." }),
  challenge: z.enum(SME_CHALLENGES, { message: "Please choose your main financial challenge." }),
  support: z.enum(SME_SUPPORT, { message: "Please choose what you are interested in." }),
  timeline: z.enum(START_OPTIONS, { message: "Please choose a timeline." }),
  name: required(120, "your name"),
  email,
  phone: text(40).optional(),
  message: required(3000, "a short description"),
  website: text(200).optional(), // honeypot: must stay empty
  source,
});

export const enquirySchema = z.discriminatedUnion("kind", [
  institutionalSchema,
  smeSchema,
]);

export type Enquiry = z.infer<typeof enquirySchema>;
