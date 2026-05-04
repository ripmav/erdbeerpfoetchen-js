# SPEC — erdbeerpfoetchen-js

## §G Goal

TypeScript client library: embeddable StreamElements widget that communicates with the erdbeerpfoetchen API. Compiled to single self-contained JS file for direct embed into StreamElements overlay editor.

## §C Constraints

- TypeScript (strict mode)
- Target: ES2020 browser bundle — no Node.js runtime deps
- Build output: single `dist/erdbeerpfoetchen.js` (IIFE or UMD, no external imports)
- Lint: ESLint + TypeScript rules, enforced in CI
- CI: GitHub Actions — lint on push/PR, build+bundle on tag push
- No backend logic — pure HTTP client + StreamElements widget lifecycle
- API base URL configurable at embed time (widget property)
- Bearer token configurable at embed time (widget property)
- StreamElements widget field API used for config injection

## §I Interfaces

### StreamElements Widget Fields (embed config)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `apiBaseUrl` | string | `https://api.erdbeerpfoetchen.de` | erdbeerpfoetchen API base URL |
| `apiToken` | string | — | Bearer token for streamer auth |
| `streamerName` | string | — | Streamer name (path param) |
| `collectionType` | string | `default` | X-COLLECTION-TYPE header value |

### API Client Interface

```typescript
interface PfoetckenClient {
  writeCollection(userKey: string, collectionKey: string, data: unknown): Promise<void>
  readCollection(userKey: string, collectionKey: string): Promise<unknown>
}
```

### HTTP Calls (maps to erdbeerpfoetchen API)

| Method | Endpoint | Headers |
|--------|----------|---------|
| POST | `/api/v1/collection/{streamerName}` | `Authorization: Bearer <token>`, `X-USER-KEY`, `X-COLLECTION-KEY`, `X-COLLECTION-TYPE` |
| GET  | `/api/v1/collection/{streamerName}` | `Authorization: Bearer <token>`, `X-USER-KEY`, `X-COLLECTION-KEY` |

### StreamElements Widget Lifecycle Hooks

```typescript
window.addEventListener('onWidgetLoad', (obj) => { /* init with field values */ })
window.addEventListener('onSessionUpdate', (obj) => { /* optional: react to session data */ })
```

### Build Outputs

| File | Description |
|------|-------------|
| `dist/erdbeerpfoetchen.js` | Bundled IIFE/UMD, single file, no external deps |

## §V Invariants

- `apiToken` absent → no requests made, console.warn logged
- `streamerName` absent → no requests made, console.warn logged
- All fetch errors caught and logged — widget must never crash StreamElements overlay
- `Content-Type: application/json` set on POST requests
- Bundle contains zero external runtime dependencies (tree-shaken, self-contained)
- ESLint must pass with zero errors before merge (enforced in CI)
- Build workflow only triggers on git tag push (`v*`)
- Lint workflow triggers on every push and pull_request

## §T Tasks

| id | task | status | cites |
|----|------|--------|-------|
| T1 | TypeScript project scaffold (tsconfig, package.json, eslint config) | x | §C |
| T2 | API client implementation (`PfoetckenClient`) | x | §I,V1,V2,V3,V4 |
| T3 | StreamElements widget wrapper (lifecycle hooks, field injection) | x | §I,V1,V2 |
| T4 | Bundle config (esbuild or rollup → single IIFE file) | x | §C,V5 |
| T5 | GitHub Actions: lint workflow | x | §C,V6,V7 |
| T6 | GitHub Actions: build+bundle workflow (tag-triggered) | x | §C,V7 |
| T7 | README with embed instructions | x | §I |

## §B Bugs

| id | date | cause | fix |
|----|------|-------|-----|
