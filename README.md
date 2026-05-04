# erdbeerpfoetchen-js

StreamElements embed interface for the [erdbeerpfoetchen](https://github.com/ripmav/erdbeerpfoetchen) API.

Compiled to a single embeddable JS file for use in StreamElements overlay widgets.

## Status

> 🚧 Work in progress — see [SPEC.md](./SPEC.md) for planned implementation.

## Overview

This library provides a StreamElements widget client that communicates with the erdbeerpfoetchen API to read and write per-viewer JSON collections.

## Embed Usage (planned)

1. Build or download `dist/erdbeerpfoetchen.js` from releases
2. Add as custom JS in StreamElements overlay editor
3. Configure widget fields:
   - `apiBaseUrl` — API base URL
   - `apiToken` — Bearer token
   - `streamerName` — your streamer name
   - `collectionType` — collection type (default: `default`)

## Development

```bash
npm install
npm run lint
npm run build
```

## License

MIT
