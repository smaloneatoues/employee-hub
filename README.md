# OUES Helio — Employee Hub

Internal employee hub for OU Education Services. Surfaces announcements, upcoming events, the bi-weekly management newsletter, a team directory, quick links, and support resources — all managed through Sanity CMS.

## Stack

- **Frontend**: React 19 + TypeScript + Vite, Tailwind CSS v4, shadcn-style UI components (Base UI / Radix primitives)
- **Content**: [Sanity](https://www.sanity.io/) (queries via `@sanity/client`, rich text via Portable Text)
- **Routing**: React Router
- **Hosting**: Vercel (SPA rewrite configured in `vercel.json`)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Sanity project values
npm run dev
```

### Environment variables

| Variable | Description |
| --- | --- |
| `VITE_SANITY_PROJECT_ID` | Sanity project ID |
| `VITE_SANITY_DATASET` | Sanity dataset (usually `production`) |

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Sanity Studio

The CMS lives in `studio/` and is a separate package:

```bash
cd studio
npm install
npm run dev   # studio at http://localhost:3333
```

Content types (schemas in `studio/schemas/`): `announcement`, `event`, `teamMember`, `quickLink`, `stat`, `supportArea`, `newsletter`.

Icons for stats, quick links, and support areas are referenced by name (e.g. `Laptop`, `HelpCircle`) and must exist in `src/lib/icons.ts`.

## Project structure

```
src/
  components/      # feature cards, header, error state
  components/ui/   # shadcn-style primitives
  lib/             # Sanity client, GROQ queries, icons, useQuery hook
  pages/           # routed pages (newsletter, support, 404)
  App.tsx          # home dashboard
studio/            # Sanity Studio + schemas
```

## Deployment

Pushes to `main` deploy via Vercel. Set the two `VITE_SANITY_*` environment variables in the Vercel project settings. The studio is deployed separately with `npx sanity deploy` from `studio/`.
