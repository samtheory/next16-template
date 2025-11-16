const DEFAULT_API_BASE_URL = "/api/mock";
const DEFAULT_AUTH_COOKIE = "next16_auth_token";
const DEFAULT_MOCK_TOKEN = "mock-next16-token";

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL,
  authCookieName: process.env.NEXT_PUBLIC_AUTH_COOKIE ?? DEFAULT_AUTH_COOKIE,
  mockAuthToken: process.env.NEXT_PUBLIC_MOCK_TOKEN ?? DEFAULT_MOCK_TOKEN
};
