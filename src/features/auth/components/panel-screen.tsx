"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "../stores/auth-store";
import { useAuthGuard } from "../hooks/use-auth-guard";

export function PanelScreen() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { status, hasHydrated } = useAuthGuard("/login");

  if (!hasHydrated || status === "idle") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking session…</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Protected panel</CardTitle>
          <CardDescription>Only visible when a valid mock token exists (cookie or bearer).</CardDescription>
        </div>
        <Button variant="outline" onClick={() => logout()}>
          Logout
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <p className="text-lg font-semibold">{user?.email ?? "anonymous"}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Try removing the cookie or logging out—the guard will send you back to the login page. The
          mock API stores the token inside both an HTTP-only cookie (for SSR) and inside the auth
          service singleton for bearer calls.
        </p>
      </CardContent>
    </Card>
  );
}
