/**
 * Shared external links and contact details used across the site.
 * Edit here once. Every component imports from this file.
 */

// The live Business Growth Check-Up, hosted on Notion.
// Every "Take the Free Check-Up" CTA across the site sends visitors here.
export const DIAGNOSTIC_URL =
  "https://cfo-partners.notion.site/bbaec335aee34909978384f0d91ba971?pvs=105";

// Contact details.
export const CONTACT_EMAIL = "partner@cfopartners.fund";
export const CONTACT_PHONE = "+254 748 918 910";
export const CONTACT_PHONE_TEL = "+254748918910"; // for tel: links
export const WHATSAPP_URL =
  "https://wa.me/254748918910?text=" +
  encodeURIComponent(
    "Hello CFO Partners, I would like to learn more about your services.",
  );
export const OFFICE_ADDRESS = {
  line1: "Cove Court, Watermark Business Park",
  city: "Nairobi",
  postcode: "0000",
  country: "Kenya",
};

// Social profiles.
export const LINKEDIN_URL =
  "https://www.linkedin.com/company/cfo-lead-solutions/";
export const INSTAGRAM_URL = "https://www.instagram.com/cfopartners_";
export const FACEBOOK_URL =
  "https://www.facebook.com/share/1HFnfjneCY/?mibextid=wwXIfr";

// Helper to build mailto: links with subjects.
export function mailto(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}
