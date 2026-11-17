/**
 * Content model for the public marketing pages.
 *
 * Every service and audience page is plain data in lib/content, rendered by
 * one shared template. Edit copy here; the page, its metadata and its
 * structured data all update together.
 *
 * Writing rules (see the website revamp brief):
 * - Plain, specific, commercial language. No "unlock", "empower",
 *   "transform", "bridge the gap" or similar filler.
 * - No fees, prices or success-fee rates.
 * - Never promise or imply guaranteed financing, investment or approval.
 * - Figures only from FOUNDER_EXPERIENCE (lib/impact.ts), attributed to the
 *   founder. Investment figures are recommendations for consideration.
 * - Digital tools support advisors; they are never described as replacing
 *   professional judgement, and only existing tools are described as live.
 */

export type ServiceSlug =
  | "fractional-cfo-services"
  | "investment-readiness"
  | "access-to-finance-advisory"
  | "portfolio-financial-management"
  | "pre-post-investment-support"
  | "enterprise-development-technical-assistance"
  | "financial-modelling"
  | "financial-systems"
  | "programme-design"
  | "portfolio-intelligence";

export type AudienceSlug =
  | "investment-funds"
  | "accelerators-development-partners"
  | "growing-businesses";

/** Which enquiry form a page's main call to action opens. */
export type EnquiryKind = "institutional" | "sme";

export interface Faq {
  q: string;
  a: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Deliverable {
  name: string;
  detail: string;
  /** e.g. "Monthly", "Once, week 3", "Quarterly". Optional. */
  cadence?: string;
}

export interface Step {
  /** One of the six stages: Diagnose, Interpret, Recommend, Advise, Execute, Track. */
  stage: "Diagnose" | "Interpret" | "Recommend" | "Advise" | "Execute" | "Track";
  detail: string;
}

export interface Evidence {
  title: string;
  text: string;
  /** Internal link, e.g. "/case-studies". Optional. */
  href?: string;
}

export interface SeoFields {
  /** <title>, ideally under ~60 characters. */
  title: string;
  /** Meta description, ideally 140-160 characters. */
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
}

export interface ServiceContent {
  slug: ServiceSlug;
  /** Short name used in nav, cards and breadcrumbs. */
  name: string;
  seo: SeoFields;
  /** Small label above the H1, e.g. "For growing businesses". */
  eyebrow: string;
  h1: string;
  /**
   * Two or three factual sentences directly under the H1: what the service
   * is, who it is for, where, and the main deliverables. Quotable on its own.
   */
  summary: string;
  /** "At a glance" facts: who it's for, duration, cadence, team, location, how to start. */
  atAGlance: Fact[];
  /** Who the service is for, as short bullet points. */
  whoFor: string[];
  /** 4-6 specific problems in the buyer's words. */
  problems: string[];
  deliverables: Deliverable[];
  /** The six stages applied to this service. */
  process: Step[];
  /** Typical engagement structure: duration, cadence, inputs needed. No fees. */
  engagement: Fact[];
  evidence: Evidence | null;
  faqs: Faq[];
  related: ServiceSlug[];
  audiences: AudienceSlug[];
  cta: { kind: EnquiryKind; label: string };
  /** Shown as a status label where the service includes a digital tool. */
  status?: "Available" | "Delivered within engagements" | "In development";
}

export interface AudienceContent {
  slug: AudienceSlug;
  name: string;
  seo: SeoFields;
  eyebrow: string;
  h1: string;
  summary: string;
  /** Who we work with in this group, as bullet points. */
  whoFor: string[];
  problems: string[];
  /** Services offered to this audience, in priority order. */
  services: ServiceSlug[];
  /** How the six stages work for this audience. */
  process: Step[];
  evidence: Evidence | null;
  faqs: Faq[];
  cta: { kind: EnquiryKind; label: string };
  secondaryCta: { label: string; href: string };
}
