# next16-template

Feature-first Next.js 16 starter that ships the exact stack you requested: Tailwind v4, shadcn/ui primitives, TanStack Query for client fetching, Zustand slices, React Hook Form + Zod, Biome for formatting, plus a cookie/bearer mock auth flow.

## Stack

- **Next.js 16 + App Router** with TypeScript and the official Tailwind v4 preset.
- **shadcn/ui** drives the design system (`components.json` configured).
- **TanStack Query** wires HTTP requests through a reusable `apiClient`.
- **Zustand** stores UI-only state (filters, feature toggles).
- **React Hook Form + Zod** validates and reuses schemas on both forms and API calls.
- **Biome** handles formatting + linting alongside the stock `next lint`.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the sample feature (post feed + composer). Extra routes:

- `/login` – mock login form with Zod + RHF.
- `/panel` – protected screen (redirects to `/login` when the cookie/token is missing).
- `/forms` – example form that posts through the shared API client.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js in dev mode. |
| `npm run build` / `npm start` | Production build + serve. |
| `npm run lint` | Next.js ESLint config. |
| `npm run lint:biome` | Run Biome’s linter across TS/CSS/config files. |
| `npm run format` | Format with Biome (writes in place). |
| `npm run typecheck` | TypeScript in CI mode. |
| `npm run check` | Convenience command that chains lint + biome + typecheck. |

## Folder structure

The repo follows a feature-based layout. Each feature owns its API calls, hooks, stores, schemas, and UI. Shared primitives live alongside them.

```
src
├─ app/            → Next.js routes, metadata, layouts
├─ components/     → layout scaffolding + shadcn/ui primitives
├─ config/         → env/constants (BASE_URL, mock token, cookie keys)
├─ features/       → feature slices (posts, auth, forms, etc.)
├─ lib/            → shared helpers (api client, query keys, auth service, utils)
└─ providers/      → global providers (QueryProvider, future ThemeProvider)
```

See `docs/STRUCTURE.md` for a breakdown of every folder plus the recommended workflow when adding new features.

## Working with this template

1. **Model data** with Zod inside `src/features/<feature>/schemas.ts`. Those schemas feed both `react-hook-form` and the API.
2. **Call APIs** via `src/lib/api/client.ts` to get consistent error handling and schema validation. Use TanStack Query hooks in `src/features/<feature>/hooks`.
3. **Store UI state** with small Zustand slices inside `src/features/<feature>/stores`.
4. **Compose UI** via components under `src/features/<feature>/components`, reusing shadcn primitives from `src/components/ui`.
5. **Document decisions** inside `docs/` as the template evolves.

### shadcn/ui

- Configure new primitives with `components.json`.
- Add components with `npx shadcn@latest add <component>`.
- Tokens + CSS variables live inside `src/app/globals.css` (Tailwind v4 `@theme inline`).

### TanStack Query + client fetching

- Queries run in the client thanks to `QueryProvider` (`src/providers/query-provider.tsx`).
- Use `createQueryKeys` (`src/lib/api/query-keys.ts`) to keep cache keys consistent.
- Sample: `src/features/posts/hooks/use-posts.ts` shows query + mutation wiring.

### Auth + protected routes

- `src/config/constants.ts` exposes `BASE_URL`, `MOCK_AUTH_TOKEN`, and the cookie key. Override the env vars to point at a real backend.
- `src/lib/api/client.ts` now accepts an `authMode` per request so you can switch between bearer tokens or cookie-based sessions. Instantiate multiple clients with `createApiClient`.
- `src/lib/auth/auth-service.ts` is a singleton that keeps the bearer token in memory, hits the `/auth/*` mock routes, and exposes `login/logout/getSession`.
- `src/features/auth/*` wires the service to Zustand + React Hook Form. `/panel` is protected by `useAuthGuard`, which redirects to `/login` if you lose the cookie/token.

### Local state + forms

- `src/features/posts/stores/post-filter-store.ts` is a template for Zustand slices per feature.
- `src/features/posts/components/post-form.tsx` demonstrates how to combine `react-hook-form`, `zodResolver`, and TanStack mutations.
- `src/features/forms/components/example-form.tsx` shows a second RHF + Zod pipeline that calls `POST /forms/example` via the shared `apiClient`.

- `src/features/posts/stores/post-filter-store.ts` is a template for Zustand slices per feature.
- `src/features/posts/components/post-form.tsx` demonstrates how to combine `react-hook-form`, `zodResolver`, and TanStack mutations.

## Documentation

- `docs/STRUCTURE.md` – folder responsibilities, feature workflow, and stack-specific tips.
- Inline comments are intentionally minimal; prefer docs for higher-level reasoning.

This project is ready to clone, rename, and extend. Add CI, tests, or connect the mock auth endpoints to a real backend—while keeping the feature-first boundaries intact.
