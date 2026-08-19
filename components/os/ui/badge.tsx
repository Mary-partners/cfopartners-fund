import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      tone: {
        neutral: "bg-ink/5 text-ink",
        success: "bg-green-50 text-green-700",
        warning: "bg-amber-50 text-amber-700",
        danger: "bg-red-50 text-red-700",
        info: "bg-blue-50 text-blue-700",
        gold: "bg-accent/15 text-ink",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & { dotClassName?: string };

// A status dot alongside the label so status is never conveyed by colour
// alone (WCAG 2.2 AA — see /docs/qa-plan.md).
export function Badge({ className, tone, dotClassName, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      <span
        aria-hidden
        className={cn("h-1.5 w-1.5 rounded-full bg-current opacity-70", dotClassName)}
      />
      {children}
    </span>
  );
}
