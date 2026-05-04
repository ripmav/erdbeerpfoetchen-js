# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install deps
npm run lint      # ESLint (must pass before commit)
npm run build     # bundle → dist/erdbeerpfoetchen.js
```

No test suite — lint + type-check serve as correctness gates.

## Architecture

Single-file IIFE bundle targeting ES2020 browsers. No Node.js runtime deps, no external imports in output.

Source entry point compiles to `dist/erdbeerpfoetchen.js` via esbuild or rollup (T4 in SPEC).

### Key seams

- **`PfoetckenClient`** — HTTP client wrapping two endpoints on `/api/v1/collection/{streamerName}` with Bearer auth and custom headers (`X-USER-KEY`, `X-COLLECTION-KEY`, `X-COLLECTION-TYPE`)
- **Widget wrapper** — reads config from StreamElements field API via `onWidgetLoad`, wires into `PfoetckenClient`; `onSessionUpdate` optional
- **Guard invariants** (§V): missing `apiToken` or `streamerName` → warn + no-op, never throw into overlay

### CI triggers

- Lint workflow: every push + PR
- Build+release workflow: tag push matching `v*` only

## Spec

SPEC.md is the source of truth. Read it before implementing tasks. Use the Spec skill (`/spec`) for all mutations to SPEC.md.
