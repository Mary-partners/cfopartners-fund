import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";
import { AUDIENCES, SERVICES } from "@/lib/content";
import { OFFERS } from "@/lib/content/offers";

const SITE = "https://www.cfopartners.fund";

// Public, indexable pages only. /os, /portal and /case-studies (noindex
// until approved case studies exist) are excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/our-approach", "/insights", "/resources", "/contact", "/privacy"].map(
    (path) => ({ url: `${SITE}${path}` }),
  );
  const audiences = AUDIENCES.map((a) => ({ url: `${SITE}/${a.slug}` }));
  const services = SERVICES.map((s) => ({ url: `${SITE}/${s.slug}` }));
  const offers = OFFERS.map((o) => ({ url: `${SITE}/${o.slug}` }));
  const posts = POSTS.map((p) => ({ url: `${SITE}/insights/${p.slug}`, lastModified: p.date }));
  return [...pages, ...offers, ...audiences, ...services, ...posts];
}
