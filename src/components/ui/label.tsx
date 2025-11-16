"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, children, ...props }, ref) => {
  return (
    /* biome-ignore lint/a11y/noLabelWithoutControl: forwarded props define htmlFor or wrap controls */
    <label
      ref={ref}
      className={cn("text-sm font-medium leading-none text-muted-foreground", className)}
      {...props}
    >
      {children}
    </label>
  );
});
Label.displayName = "Label";

export { Label };
