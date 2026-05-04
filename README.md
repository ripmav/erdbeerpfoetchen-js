# erdbeerpfoetchen-js

StreamElements embed interface for the [erdbeerpfoetchen](https://github.com/ripmav/erdbeerpfoetchen) API.

Compiled to a single embeddable JS file for use in StreamElements overlay widgets.

## Overview

TypeScript client library for the erdbeerpfoetchen API, packaged as a single self-contained JS file for StreamElements overlay widgets. Reads and writes per-viewer JSON collections.

## Embed Usage

1. Download `dist/erdbeerpfoetchen.js` from [releases](../../releases) or build from source
2. Add as custom JS in the StreamElements overlay editor
3. Configure widget fields:

   | Field | Default | Description |
   |-------|---------|-------------|
   | `apiBaseUrl` | `https://api.erdbeerpfoetchen.de` | API base URL |
   | `apiToken` | — | Bearer token for streamer auth |
   | `streamerName` | — | Streamer name (path param) |
   | `collectionType` | `default` | Collection type header value |

4. Access the client in widget scripts via `window.erdbeerpfoetchen`:

```js
const client = window.erdbeerpfoetchen;
await client.writeCollection(userKey, collectionKey, { score: 42 });
const data = await client.readCollection(userKey, collectionKey);
```

## Development

```bash
npm install
npm run lint
npm run build
```

## License

MIT
