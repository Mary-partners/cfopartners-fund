import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";
import { allRoomSlugs } from "@/lib/rooms";

const SITE = "https://www.cfopartners.fund";

// Public marketing pages only. /os and /portal are private and excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/contact", "/ai-automations", "/resources", "/blog"].map(
    (path) => ({ url: `${SITE}${path}` }),
  );
  const rooms = allRoomSlugs().map((slug) => ({
    url: `${SITE}/rooms/${slug}`,
  }));
  const posts = POSTS.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: p.date,
  }));
  return [...pages, ...rooms, ...posts];
}
