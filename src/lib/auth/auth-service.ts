import { constants } from "@/config/constants";
import { createApiClient, type ApiClient } from "@/lib/api/client";
import { sessionSchema, type LoginPayload, type Session } from "./schemas";

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private readonly client: ApiClient;

  private constructor() {
    this.client = createApiClient({
      baseUrl: constants.BASE_URL,
      credentials: "include",
      getToken: () => this.token ?? null
    });
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  getToken() {
    return this.token;
  }

  async login(payload: LoginPayload): Promise<Session> {
    const session = await this.client({
      path: "/auth/login",
      method: "POST",
      body: payload,
      schema: sessionSchema,
      authMode: "cookie"
    });
    this.token = session.token;
    return session;
  }

  async logout(): Promise<void> {
    await this.client({
      path: "/auth/logout",
      method: "POST",
      authMode: "cookie"
    });
    this.token = null;
  }

  async getSession(): Promise<Session | null> {
    try {
      const session = await this.client({
        path: "/auth/session",
        method: "GET",
        schema: sessionSchema,
        authMode: "cookie"
      });
      this.token = session.token;
      return session;
    } catch {
      this.token = null;
      return null;
    }
  }
}

export const authService = AuthService.getInstance();
