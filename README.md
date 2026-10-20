# DevMinds Notes

A modern notes workspace built with React + TypeScript, now upgraded to support API-backed persistence with Prisma, Vercel deployment, and provider-selectable databases.

## Highlights

- Editorial-first UI refresh with improved typography, spacing, and navigation.
- Rich text editing powered by TipTap.
- API-first persistence with automatic local fallback when API is unavailable.
- Prisma-powered storage layer with selectable SQLite, MySQL, or PostgreSQL schema.
- One-time import path for existing local notes into the API database.
- Vercel-ready frontend and serverless API routing.

## Runtime Requirements

- Node.js 22+ (tested with Node 22.23.2)
- npm 10+

A `.nvmrc` file is included:

```bash
nvm use
```

## Tech Stack

- Frontend: Vite, React 18, TypeScript, Tailwind CSS, Zustand, Framer Motion, TipTap
- API: Vercel Functions (`api/`)
- Validation/Safety: Zod + sanitize-html
- ORM: Prisma
- Databases: SQLite (local), MySQL (recommended production), PostgreSQL (Vercel-compatible hosted option)

## Install

```bash
npm install
```

## Environment Setup

1. Copy or edit `.env`.
1. Keep exactly one provider flag as `true`:

```env
DB_SQLITE=true
DB_MYSQL=false
DB_POSTGRES=false
DATABASE_URL="file:./prisma/dev.db"
```

1. For MySQL or PostgreSQL, set `DATABASE_URL` accordingly and flip flags.
1. Leave `VITE_API_BASE_URL=""` for same-origin `/api` calls.

## Database Workflow

Select and generate Prisma client for the active provider:

```bash
npm run prisma:generate
```

Create local development migrations:

```bash
npm run prisma:migrate:dev -- --name init
```

Deploy migrations in hosted environments:

```bash
npm run prisma:migrate:deploy
```

## Local Development

```bash
npm run dev
```

App runs at:

- <http://localhost:3000>

## Quality Checks

Type check frontend and API:

```bash
npm run typecheck
```

Build production assets:

```bash
npm run build
```

## Vercel Deployment

### Build Configuration

`vercel.json` uses:

- `buildCommand`: `npm run vercel-build`
- `outputDirectory`: `dist`
- SPA rewrite for non-API routes to `index.html`

### Required Environment Variables on Vercel

Set these in Vercel Project Settings for Production (and Preview, if previews should hit a database). `npm run vercel-build` selects the Prisma schema, generates the client, and runs `prisma migrate deploy` for that provider.

- `DB_SQLITE=false`
- `DB_MYSQL=true` or `DB_POSTGRES=true` (pick exactly one)
- `DATABASE_URL=<managed database connection string>`
- `JWT_SECRET=<long random secret>` (required in production; the API falls back to a dev secret only when this is unset)
- `VITE_API_BASE_URL=` (empty for same-origin `/api` calls; Vite reads this at build time)
- `VITE_RECAPTCHA_SITE_KEY=<reCAPTCHA v3 site key>` (Vite reads this at build time; login and register call `grecaptcha.execute` and send `recaptchaToken`)
- `RECAPTCHA_SECRET_KEY=<reCAPTCHA v3 secret key>` (server verifies the token with Google; when unset, verification is skipped so local dev still works)

Node.js is pinned to `22.x` in `package.json` `engines` and `.nvmrc`. An open range such as `>=22` makes Vercel select the newest supported major (currently 24.x).

For Postgres, use a connection string the build can migrate and functions can query. Add `connection_limit=1` on serverless pools. MySQL note bodies are stored as `TEXT` so editor HTML is not truncated.

### Domain Setup (`note-app.devminds.net`)

1. Open Vercel project settings and add `note-app.devminds.net` under Domains.
2. In your DNS provider for `devminds.net`, create the CNAME record Vercel requests.
3. Wait for verification and TLS provisioning in Vercel.

## Project Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build frontend assets
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Type-check frontend and API
- `npm run prisma:generate` - Select schema + generate Prisma client
- `npm run prisma:migrate:dev` - Run dev migrations
- `npm run prisma:migrate:deploy` - Run deploy migrations
- `npm run vercel-build` - Select schema, generate Prisma client, deploy migrations, Vite build

## Notes on Data Modes

- `Cloud mode`: API reachable, notes persisted in database through Prisma.
- `Local mode`: API unreachable, note edits persist to browser storage.
- On first successful cloud sync with an empty DB, legacy local notes can be imported once.
