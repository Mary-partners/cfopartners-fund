import { Compass, LineChart, ShieldCheck, Users, Lightbulb, Target, type LucideIcon } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

const ICON_MAP: Record<BlogPost["imageIcon"], LucideIcon> = {
  compass: Compass,
  chart: LineChart,
  shield: ShieldCheck,
  users: Users,
  lightbulb: Lightbulb,
  target: Target,
};

interface Props {
  post: BlogPost;
  className?: string;
  size?: "card" | "hero";
}

/**
 * Branded SVG cover image for blog posts. Zero external asset dependency —
 * the gradient + icon + category badge IS the cover. Renders crisp at any size.
 */
export function BlogCover({ post, className = "", size = "card" }: Props) {
  const Icon = ICON_MAP[post.imageIcon];
  const [c1, c2] = post.imageGradient;
  const gradId = `g-${post.slug}`;
  const patternId = `p-${post.slug}`;

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 800 450"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={post.title}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.08)" />
          </pattern>
        </defs>
        <rect width="800" height="450" fill={`url(#${gradId})`} />
        <rect width="800" height="450" fill={`url(#${patternId})`} />
        {/* Decorative circles */}
        <circle cx="650" cy="100" r="120" fill="rgba(255,255,255,0.05)" />
        <circle cx="700" cy="380" r="90" fill="rgba(255,255,255,0.04)" />
        <circle cx="100" cy="380" r="60" fill="rgba(255,255,255,0.06)" />
      </svg>
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        <div className="flex items-center gap-2 self-start rounded-full bg-white/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur">
          {post.category}
        </div>
        <div className="flex items-end justify-between gap-4">
          <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
            <Icon
              className={`text-white ${size === "hero" ? "h-10 w-10" : "h-7 w-7"}`}
            />
          </div>
          {size === "hero" && (
            <div className="font-serif text-[1.1rem] italic text-white/80">
              CFOIP Journal
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
