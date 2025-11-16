import { env } from "@/config/env";
import type { ZodSchema } from "zod";

export type AuthMode = "none" | "cookie" | "bearer";

export type ApiRequestOptions<T> = {
  path: string;
  method?: RequestInit["method"];
  body?: BodyInit | Record<string, unknown>;
  config?: Omit<RequestInit, "body" | "method" | "headers" | "credentials">;
  schema?: ZodSchema<T>;
  authMode?: AuthMode;
  tokenOverride?: string;
};

export type ApiClientOptions = {
  baseUrl?: string;
  defaultHeaders?: HeadersInit;
  credentials?: RequestCredentials;
  defaultAuthMode?: AuthMode;
  getToken?: () => string | null;
};

export type ApiClient = <T>(options: ApiRequestOptions<T>) => Promise<T>;

async function parseBody(body?: BodyInit | Record<string, unknown>) {
  if (!body) return undefined;
  if (typeof body === "string" || body instanceof FormData || body instanceof URLSearchParams) {
    return body;
  }
  return JSON.stringify(body);
}

function resolveUrl(baseUrl: string | undefined, path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const sanitizedBase = (baseUrl ?? env.apiUrl).replace(/\/$/, "");
  if (!path) return sanitizedBase;
  const sanitizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${sanitizedBase}${sanitizedPath}`;
}

export function createApiClient(options: ApiClientOptions = {}): ApiClient {
  return async function apiRequest<T>({
    path,
    method = "GET",
    body,
    config,
    schema,
    authMode,
    tokenOverride
  }: ApiRequestOptions<T>): Promise<T> {
    const mode = authMode ?? options.defaultAuthMode ?? "none";
    const { headers: configHeaders, credentials: configCredentials, ...restConfig } = config ?? {};
    const headers = new Headers({
      "Content-Type": "application/json",
      ...(options.defaultHeaders ?? {})
    });

    let credentials: RequestCredentials | undefined = configCredentials ?? options.credentials;

    if (mode === "bearer") {
      const token = tokenOverride ?? options.getToken?.();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    if (mode === "cookie") {
      credentials = "include";
    }

    const extraHeaders = configHeaders ? new Headers(configHeaders as HeadersInit) : null;
    if (extraHeaders) {
      extraHeaders.forEach((value, key) => {
        headers.set(key, value);
      });
    }

    const payload = await parseBody(body);
    const requestConfig: RequestInit = {
      method,
      headers,
      ...restConfig,
      credentials
    };

    if (payload !== undefined) {
      requestConfig.body = payload;
    }

    const response = await fetch(resolveUrl(options.baseUrl, path), requestConfig);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const data = (await response.json()) as T;
    return schema ? schema.parse(data) : data;
  };
}

export const apiClient = createApiClient({
  baseUrl: env.apiUrl
});
