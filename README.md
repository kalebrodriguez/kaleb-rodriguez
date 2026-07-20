# Kaleb Rodriguez — Personal Website

A personal portfolio for Kaleb Rodriguez, a Tampa-based high-school student
researcher working on neurodegeneration, bioinformatics, and assistive
software. The site presents his research, projects, experience, and leadership
in a single, fast, accessible page.

**Live:** https://kalebrodriguez.github.io/kaleb-rodriguez/

## Design

The visual direction is a "specimen field / research journal": a dark
microscopy-inspired canvas with a fluorescence-cyan signal accent, a
geometric futuristic masthead (Syne), body type in Space Grotesk, and section
eyebrows set as figure labels
(`Fig. 01 — About`) that mirror the way figures are numbered in a paper. The
signature element is an abstract **connectome** — a node/edge graph behind the
hero. A light theme is fully supported and respects `prefers-color-scheme`.

## Tech stack

| Concern      | Choice                                   |
| ------------ | ---------------------------------------- |
| Build        | [Vite](https://vite.dev)                 |
| UI           | React 19 + TypeScript                    |
| Styling      | Tailwind CSS v4 (`@tailwindcss/vite`)    |
| Motion       | Framer Motion (restrained, reveal-only)  |
| Icons        | lucide-react (+ one inline GitHub mark)  |
| Fonts        | Syne, Space Grotesk, JetBrains Mono (self-hosted via `@fontsource`, no external requests) |
| Hosting      | GitHub Pages via GitHub Actions          |

Chosen over a heavier framework because the site is fully static, needs no
server, loads fast, and is trivial to maintain.

## Local development

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
```

## Build & quality checks

```bash
npm run lint       # oxlint
npx tsc -b         # type check
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which lints, type
checks, builds, and publishes `dist/` to GitHub Pages. Because the site is
served from a project page, the Vite `base` is set to `/kaleb-rodriguez/` in
`vite.config.ts` — update that if the repository is renamed.

## Project structure

```
├── index.html                # metadata, Open Graph, JSON-LD
├── vite.config.ts            # base path + plugins
├── public/                   # favicon.svg, og.png, 404.html, .nojekyll
└── src/
    ├── main.tsx
    ├── index.css             # theme tokens (light/dark) + fonts
    ├── App.tsx               # page composition
    ├── data/content.ts       # ALL site content lives here
    └── components/           # Nav, Hero, Connectome, sections, Footer
```

## Updating content

Almost everything is data-driven from **`src/data/content.ts`** — edit that
file and the sections update. No component changes are usually needed.

### Add a new project

Append an entry to the `projects` array in `src/data/content.ts`:

```ts
{
  name: 'Project Name',
  status: 'active',          // active | ongoing | shipped | prototype | concept
  kind: 'Short descriptor',
  summary: 'One or two sentences on what it does and who it is for.',
  stack: ['Tech', 'Tags'],
  link: 'https://github.com/kalebrodriguez/repo',
}
```

### Public assets

Static files (favicon, Open Graph image, a downloadable resume) go in
`public/` and are served from the site root under the `/kaleb-rodriguez/` base
path.

## Privacy note

This repository contains **only** public-facing portfolio content. No private
source documents, notes, databases, embeddings, credentials, contact numbers,
academic records, or unpublished research data are included. See
[CONTENT_SOURCES.md](./CONTENT_SOURCES.md) for the general categories of
material that informed the copy.

## License

[MIT](./LICENSE) — original website code.
