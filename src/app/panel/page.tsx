import { AppShell } from "@/components/layout/app-shell";
import { PanelScreen } from "@/features/auth";
import Link from "next/link";

export default function PanelPage() {
  return (
    <AppShell
      title="Secure panel"
      description="Access requires the mock cookie/token combo. Use the login form to obtain a token."
    >
      <PanelScreen />
      <div className="space-y-4 rounded-lg border border-border bg-background p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          This panel is client-protected via a Zustand-powered singleton auth service. Reloading the
          page hydrates the cookie session and keeps you signed in.
        </p>
        <p className="text-sm text-muted-foreground">
          Try visiting the <Link className="underline" href="/login">login screen</Link> or test out the{" "}
          <Link className="underline" href="/forms">form examples</Link>.
        </p>
      </div>
    </AppShell>
  );
}
