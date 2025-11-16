# Project structure

```
src
├─ app/                → Next.js App Router entry points
├─ components/
│  ├─ layout/          → Global scaffolding components (AppShell, nav, etc.)
│  └─ ui/              → shadcn/ui primitives (Button, Card, Input…)
├─ config/             → Runtime configuration helpers (env, constants)
├─ features/
│  ├─ posts/           → Post feed sample (TanStack Query + zustand slice)
│  ├─ auth/            → Mock auth flow (forms, guard, store)
│  └─ forms/           → Example RHF + Zod form
├─ lib/
│  ├─ api/             → API client factory + query helpers
│  ├─ auth/            → Auth service + schemas
│  └─ utils.ts         → UI helpers (`cn`, async helpers…)
├─ providers/          → Cross-cutting React context providers (QueryProvider)
└─ styles/             → (future) extracted tokens when globals.css grows
```

## Folder responsibilities

| Path | What lives here | Notes |
| --- | --- | --- |
| `src/app` | Route segments, metadata, layouts | Keep components lean by delegating logic to feature modules. |
| `src/components/layout` | Foundation layout pieces shared across screens | Prefer composition over deep prop drilling. |
| `src/components/ui` | shadcn/ui primitives | Managed by the `shadcn` CLI via `components.json`. |
| `src/config` | Deterministic config (env/constants) | Expose base URLs, cookie keys, or feature flags from a single place. |
| `src/features/<feature>` | Feature-specific slices | Includes `api/`, `components/`, `hooks/`, `schemas/`, `stores/`. Each folder can be added as needed. |
| `src/lib/api` | HTTP/TanStack helpers | Keep request/response handling consistent and schema-driven. |
| `src/lib/auth` | Auth schemas + singleton service | Swappable layer that understands cookies, bearer tokens, and multiple clients. |
| `src/providers` | Wrappers that wire libraries (TanStack Query, theming) | Imported once in `app/layout.tsx`. |

## Feature workflow

1. **Model data** inside `src/features/<feature>/schemas.ts` using Zod so you can reuse it for forms and API parsing.
2. **Read/write data** through functions inside `src/features/<feature>/api.ts` that call the shared `apiClient`.
3. **Register queries** with TanStack Query (`src/features/<feature>/hooks`) so components stay declarative.
4. **Store UI state** (filters, local toggles, session state) with a dedicated Zustand slice in `src/features/<feature>/stores`.
5. **Render UI** in `src/features/<feature>/components` while leaning on the primitives inside `src/components/ui`.

This flow keeps any new feature self-contained: the route simply imports the composed feature component.

## Working with the stack

- **Shadcn / Tailwind v4** – add new primitives with `npx shadcn@latest add button` (respects `components.json`) and extend tokens in `src/app/globals.css`.
- **TanStack Query** – centralised inside `QueryProvider`. Queries live close to features; share keys via `createQueryKeys`.
- **Zustand** – prefer small slices per feature. They can be colocated or extracted when multiple features reuse a store. The auth slice is a singleton that reuses `authService`.
- **React Hook Form + Zod** – compose form schemas once, reuse them both in `createPost`, `<PostForm />`, `<LoginForm />`, or any other feature form.
- **Auth** – configure cookies/tokens via `src/config/constants.ts`; the mock API routes live under `src/app/api/mock`.
- **Biome** – run `npm run format` before commits for consistent formatting, and `npm run lint:biome` to lint non-TypeScript files.

Adapt this layout as your app grows: add `src/services/`, `src/server/`, or `src/tests/` siblings while keeping the “feature-first” mindset intact.
