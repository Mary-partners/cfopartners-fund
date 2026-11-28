import Link from "next/link";

// Paths that redirect off-site (see next.config.mjs). A plain <a> avoids
// Next.js prefetching a cross-origin redirect.
const OFFSITE_REDIRECTS = new Set(["/diagnostic"]);

/** next/link for internal pages, a plain anchor for off-site redirects. */
export function SmartLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (OFFSITE_REDIRECTS.has(href) || /^https?:/.test(href)) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
