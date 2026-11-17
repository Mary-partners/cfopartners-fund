/**
 * Organisation identity used across the public site and its structured
 * data. Keep this identical to the wording on third-party profiles
 * (LinkedIn, CB Insights, VC4A, Google Business Profile).
 */
import { CONTACT_EMAIL, CONTACT_PHONE, LINKEDIN_URL, OFFICE_ADDRESS } from "@/lib/links";

export const SITE_URL = "https://www.cfopartners.fund";

export const ORG = {
  name: "CFO Innovation Partners",
  shortName: "CFOIP",
  foundingYear: "2024",
  description:
    "CFO Innovation Partners (CFOIP) is a Nairobi-based advisory and implementation firm. We provide fractional CFO support, investment readiness and financial systems implementation for growing SMEs; portfolio financial management and post-investment support for investment funds and DFIs; and enterprise development, technical assistance and programme design for accelerators and development partners.",
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
  address: OFFICE_ADDRESS,
  areaServed: ["Kenya", "East Africa"],
  // Profiles that describe the firm consistently. Add CB Insights,
  // Crunchbase and the renamed LinkedIn page once they are updated.
  sameAs: [LINKEDIN_URL],
} as const;

export const FOUNDER = {
  name: "Mary Ndinda",
  jobTitle: "Founder & Managing Partner",
  knowsAbout: [
    "SME finance",
    "Fractional CFO services",
    "Investment readiness",
    "Portfolio financial management",
    "Enterprise development",
    "Technical assistance",
  ],
} as const;
