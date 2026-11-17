import { AUDIENCES } from "./audiences";
import { BUSINESS_SERVICES } from "./services-business";
import { INSTITUTIONAL_SERVICES } from "./services-institutional";
import type { AudienceContent, AudienceSlug, ServiceContent, ServiceSlug } from "./types";

export const SERVICES: ServiceContent[] = [...BUSINESS_SERVICES, ...INSTITUTIONAL_SERVICES];
export { AUDIENCES, BUSINESS_SERVICES, INSTITUTIONAL_SERVICES };

export function serviceFor(slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function audienceFor(slug: string): AudienceContent | undefined {
  return AUDIENCES.find((a) => a.slug === slug);
}

export function servicesBySlug(slugs: ServiceSlug[]): ServiceContent[] {
  return slugs.map((s) => serviceFor(s)).filter((s): s is ServiceContent => !!s);
}

export function audienceName(slug: AudienceSlug): string {
  return audienceFor(slug)?.name ?? slug;
}

/** First sentence of a summary, for cards. */
export function firstSentence(text: string): string {
  const m = text.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
}
