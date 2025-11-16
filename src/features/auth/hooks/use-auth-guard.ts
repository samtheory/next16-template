"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/auth-store";

export function useAuthGuard(redirectTo = "/login") {
  const router = useRouter();
  const { token, status, hasHydrated, hydrate } = useAuthStore((state) => ({
    token: state.token,
    status: state.status,
    hasHydrated: state.hasHydrated,
    hydrate: state.hydrate
  }));

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (status === "unauthenticated") {
      router.replace(redirectTo);
    }
  }, [status, router, redirectTo, hasHydrated]);

  return {
    token,
    status,
    hasHydrated,
    isReady: hasHydrated && status === "authenticated"
  };
}
