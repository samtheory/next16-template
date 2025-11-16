"use client";

import { create } from "zustand";
import { authService } from "@/lib/auth/auth-service";
import type { LoginPayload, Session } from "@/lib/auth/schemas";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  token: string | null;
  user: Session["user"] | null;
  status: AuthStatus;
  hasHydrated: boolean;
  error: string | null;
  login: (values: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  status: "idle",
  hasHydrated: false,
  error: null,
  async login(values) {
    set({ status: "loading", error: null });
    try {
      const session = await authService.login(values);
      set({
        token: session.token,
        user: session.user,
        status: "authenticated",
        error: null
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to login.";
      set({
        token: null,
        user: null,
        status: "unauthenticated",
        error: message
      });
      throw error;
    }
  },
  async logout() {
    await authService.logout();
    set({
      token: null,
      user: null,
      status: "unauthenticated"
    });
  },
  async hydrate() {
    if (get().hasHydrated) return;
    const session = await authService.getSession();
    set({
      token: session?.token ?? null,
      user: session?.user ?? null,
      status: session ? "authenticated" : "unauthenticated",
      hasHydrated: true,
      error: null
    });
  }
}));
