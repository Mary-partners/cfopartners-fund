/**
 * Conversion events for Vercel Web Analytics. The analytics script is
 * loaded in app/layout.tsx; custom events need a Vercel plan that supports
 * them, and are ignored otherwise.
 */
type EventName =
  | "institutional_enquiry"
  | "sme_enquiry"
  | "diagnostic_start"
  | "resource_download"
  | "newsletter_signup"
  | "whatsapp_click";

declare global {
  interface Window {
    va?: (event: "event", props: { name: string; data?: Record<string, string> }) => void;
  }
}

export function track(name: EventName, data?: Record<string, string>) {
  try {
    window.va?.("event", { name, data });
  } catch {
    // Analytics must never break the page.
  }
}
