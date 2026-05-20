import { DIAGNOSTIC_URL } from "@/lib/links";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "accent" | "outline" | "ghost";
}

const variantStyles: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-ink text-white hover:bg-ink-2 hover:-translate-y-0.5 hover:shadow-card",
  accent:
    "bg-accent text-white hover:bg-accent-2 hover:-translate-y-0.5 hover:shadow-card",
  outline:
    "bg-transparent text-ink border-[1.5px] border-ink hover:bg-ink hover:text-white",
  ghost: "bg-transparent text-ink-2 hover:text-ink",
};

/**
 * Primary CTA across the site. Sends visitors to the live Business Growth
 * Check-Up hosted on Notion (the canonical diagnostic that generates real
 * submission data). Opens in a new tab so visitors don't lose the marketing
 * page.
 */
export function CheckupTrigger({
  children,
  className = "",
  variant = "primary",
}: Props) {
  return (
    <a
      href={DIAGNOSTIC_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-[22px] py-[14px] text-[0.95rem] font-semibold transition-all duration-150 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
