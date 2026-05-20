/**
 * Shared external links used across the site.
 * Edit here once — every component imports from this file.
 */

// The live Business Growth Check-Up — hosted on Notion.
// This is where every "Take the Free Check-Up" CTA across the site sends visitors.
export const DIAGNOSTIC_URL =
  "https://cfo-partners.notion.site/5bc77e593652472990211dac0cf0ef34?pvs=105";

// Primary contact route for tier enquiries.
export const CONTACT_EMAIL = "hello@cfopartners.fund";

// Helper to build mailto: links with subjects.
export function mailto(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}
