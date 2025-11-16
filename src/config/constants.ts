import { env } from "./env";

export const constants = {
  BASE_URL: env.apiUrl,
  AUTH_COOKIE_KEY: env.authCookieName,
  MOCK_AUTH_TOKEN: env.mockAuthToken
};
