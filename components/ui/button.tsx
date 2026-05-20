import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-bg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-white hover:bg-ink-2 hover:-translate-y-0.5 hover:shadow-card",
        accent:
          "bg-accent text-white hover:bg-accent-2 hover:-translate-y-0.5 hover:shadow-card",
        outline:
          "border-[1.5px] border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
        ghost: "bg-transparent text-ink-2 hover:text-ink",
        link: "text-accent-2 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-[22px] py-[14px]",
        sm: "px-4 py-2.5 text-[0.9rem]",
        lg: "px-7 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
