import { AppShell } from "@/components/layout/app-shell";
import { ExampleForm } from "@/features/forms";

export default function FormsPage() {
  return (
    <AppShell
      title="Form playground"
      description="Reusable React Hook Form + Zod setup that posts through the shared API client."
    >
      <div className="space-y-6">
        <ExampleForm />
      </div>
      <div className="space-y-4 rounded-lg border border-border bg-background p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Duplicate this structure whenever you need a new form. The shared schema ensures your
          client, API routes, and TanStack Query mutations all speak the same language.
        </p>
      </div>
    </AppShell>
  );
}
