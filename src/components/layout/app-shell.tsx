import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type AppShellProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function AppShell({ children, title = "next16-template", description }: AppShellProps) {
  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
        <header>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            starter / shadcn + tw4 + zustand + tanstack
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-foreground">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">{description}</p>
          ) : null}
        </header>
        <main className={cn("grid gap-6", "md:grid-cols-[2fr_1fr]")}>{children}</main>
      </div>
    </div>
  );
}
