import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "primary" | "outline";
};

export function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variant === "primary"
          ? "bg-foreground/10 text-foreground"
          : "border border-border text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
