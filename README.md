# Qwortex — Retro AI Learning Portal

Qwortex is a React + TypeScript portal shell for the TSA Webmaster artificial-intelligence learning-portal challenge. The current build focuses on a cohesive retro coding/game interface while the lesson content is still being planned.

## Current experience

- `/` — dashboard-style landing screen with a featured blank zone, profile panel, and community board
- `/learn` — empty learning-zone directory ready for future modules
- `/module/:moduleId` — reserved blank state for each future zone
- `/practice` — reserved practice area
- `/build` — reserved project/workshop area
- `/community` — reserved community area
- `/dashboard` — blank player console without seeded progress or XP
- `/achievements` — empty badge vault with locked placeholders
- `/about` — project and reference desk

There are intentionally no lessons, exercises, XP totals, streaks, or progress records yet. The content layer in `src/data.ts` only defines the future zones and navigation labels so the visual system can be reviewed first.

## Visual direction

The interface uses a dark navy arcade palette, pixel-inspired typography, cyan/yellow signal accents, terminal panels, pixel mascot elements, animated cursor/loading details, responsive navigation, and game-like hover states. Shared layout and components live in `src/components.tsx` and `src/styles.css`; route-level screens live in `src/pages.tsx`.

## Local development

```bash
npm install
npm run dev
```

### Authentication setup

Qwortex uses Supabase Auth for Google, GitHub, and email/password sign-in. Copy `.env.example` to `.env.local`, then add the project URL and public anon key from the Supabase project settings:

```bash
cp .env.example .env.local
```

In Supabase Authentication settings, enable Google and GitHub providers and add the local and deployed site URLs to the redirect allow list. Email confirmation can be enabled or disabled in the email provider settings. Never commit `.env.local` or a service-role key.

For a production build:

```bash
npm run build
npm run preview
```

The Vite bundle uses relative asset paths, so the generated `dist/index.html` can also be opened from the built folder after `npm run build`. The source `index.html` should be served through Vite rather than opened directly, because the source entry uses TypeScript/JSX.

## Competition notes

The `/about` reference desk is ready for the final source list, Student Copyright Checklist PDF, and Resources & AI Reflection PDF required by the supplied TSA guide. The framework disclosure currently lists React, TypeScript, Vite, and the custom CSS design system.

Before submission, replace the placeholder reference entries with the final sources and required PDFs, confirm the final event-year rules, and deploy the production build to a public URL that does not require login credentials.
