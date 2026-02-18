# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint (flat config, next/core-web-vitals + next/typescript)
```

No test framework is configured.

## What This Is

Jestermaxx AI is a single-page app that rewrites text into "looksmax speak" (the -maxxing/-mogging/-cel vocabulary from Clavicular's community). Two modes:
- **Translate** — rewrites user text preserving meaning
- **Generate** — writes new content from scratch given a description

## Architecture

**Streaming AI flow:** Client (`app/page.tsx`, client component) → `POST /api/chat` → AI SDK `streamText` → streamed text response. The client reads the stream manually via `fetch` + `ReadableStream`, not the AI SDK React hooks.

**System prompts:** Loaded at startup from markdown files via `lib/prompts.ts`:
- `lib/translate.md` — translate mode system prompt
- `lib/generate.md` — generate mode system prompt

These are read with `readFileSync` at import time. Editing them requires a dev server restart.

**Model config:** Set via `DEFAULT_MODEL` env var (defaults to `minimax/minimax-m2.5`). The API route also accepts a `model` field in the request body.

## Key Files

- `app/page.tsx` — entire UI (client component, single-page app)
- `app/api/chat/route.ts` — streaming API route using AI SDK
- `lib/prompts.ts` — reads system prompts from markdown files
- `lib/translate.md`, `lib/generate.md` — system prompt content
- `app/opengraph-image.tsx` — dynamic OG image generation (Next.js Image Response API)
- `app/dev/page.tsx` — internal asset preview page at `/dev`

## Stack Details

- **Next.js 16** with App Router
- **AI SDK v6** (`ai` + `@ai-sdk/react`) with `@google/genai` provider
- **Tailwind v4** with `@tailwindcss/postcss` (no `tailwind.config` file — config is in `app/globals.css` via `@theme inline`)
- **shadcn/ui** (new-york style, neutral base, CSS variables, `components.json` configured)
- **Geist + Geist Mono** fonts via `next/font/google`
- Path alias: `@/*` maps to project root
- Light mode only (no dark mode configured, `--radius: 0` for sharp corners)
