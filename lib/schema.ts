/**
 * schema.org structured data. Every object here must describe what the
 * page visibly says. Never add reviews, ratings, awards, prices or
 * outcome claims.
 */
import { FOUNDER, ORG, SITE_URL } from "@/lib/site";
import type { Faq } from "@/lib/content/types";

const ORG_ID = `${SITE_URL}/#organization`;
const FOUNDER_ID = `${SITE_URL}/about#mary-ndinda`;

export function organizationSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: ORG.name,
    alternateName: [ORG.shortName, "CFO Partners"],
    url: SITE_URL,
    description: ORG.description,
    email: ORG.email,
    telephone: ORG.phone,
    foundingDate: ORG.foundingYear,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.address.line1,
      addressLocality: ORG.address.city,
      addressCountry: "KE",
    },
    areaServed: ORG.areaServed.map((name) => ({ "@type": "Place", name })),
    founder: { "@id": FOUNDER_ID },
    sameAs: ORG.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: ORG.name,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
  };
}

export function founderSchema() {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: FOUNDER.name,
    jobTitle: FOUNDER.jobTitle,
    worksFor: { "@id": ORG_ID },
    knowsAbout: FOUNDER.knowsAbout,
    url: `${SITE_URL}/about`,
  };
}

export function serviceSchema(s: {
  name: string;
  path: string;
  description: string;
  audience: string[];
}) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${s.path}#service`,
    name: s.name,
    serviceType: s.name,
    url: `${SITE_URL}${s.path}`,
    description: s.description,
    provider: { "@id": ORG_ID },
    areaServed: ORG.areaServed.map((name) => ({ "@type": "Place", name })),
    audience: s.audience.map((audienceType) => ({
      "@type": "Audience",
      audienceType,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(a: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  const isFounder = a.authorName.startsWith(FOUNDER.name);
  return {
    "@type": "Article",
    "@id": `${SITE_URL}${a.path}#article`,
    headline: a.headline,
    description: a.description,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    url: `${SITE_URL}${a.path}`,
    author: isFounder
      ? { "@id": FOUNDER_ID }
      : { "@type": "Organization", name: a.authorName },
    publisher: { "@id": ORG_ID },
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
