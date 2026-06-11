/**
 * Shared external links and contact details used across the site.
 * Edit here once — every component imports from this file.
 */

// The live Business Growth Check-Up — hosted on Notion.
// Every "Take the Free Check-Up" CTA across the site sends visitors here.
export const DIAGNOSTIC_URL =
  "https://cfo-partners.notion.site/bbaec335aee34909978384f0d91ba971?pvs=105";

// Contact details.
export const CONTACT_EMAIL = "partner@cfopartners.fund";
export const CONTACT_PHONE = "+254 748 918 910";
export const CONTACT_PHONE_TEL = "+254748918910"; // for tel: links
export const OFFICE_ADDRESS = {
  line1: "Cove Court, Watermark Business Park",
  city: "Nairobi",
  postcode: "0000",
  country: "Kenya",
};

// Social.
export const LINKEDIN_URL = "https://www.linkedin.com/company/cfo-partners";

// Helper to build mailto: links with subjects.
export function mailto(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}
