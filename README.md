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
// Widget fields are injected by StreamElements via onWidgetLoad.
// The library initializes automatically — just use window.erdbeerpfoetchen.

const client = window.erdbeerpfoetchen;

// Write a collection entry for a viewer
// userKey:       unique viewer identifier (e.g. SE username)
// collectionKey: slot name within the collection (e.g. "highscore")
// data:          any JSON-serializable value
await client.writeCollection('viewer123', 'highscore', { score: 9001, level: 3 });

// Read it back
const data = await client.readCollection('viewer123', 'highscore');
console.log(data); // → { score: 9001, level: 3 }
```

### Field configuration in StreamElements

Open your overlay in the StreamElements editor, go to **Fields** and add:

| Field name | Value |
|------------|-------|
| `apiToken` | Your erdbeerpfoetchen Bearer token |
| `streamerName` | Your streamer name (matches your API account) |
| `apiBaseUrl` | *(optional)* Custom API URL — leave blank for default |
| `collectionType` | *(optional)* Collection type — defaults to `default` |

Missing `apiToken` or `streamerName` logs a warning and skips all requests — the overlay will never crash.

## Development

```bash
npm install
npm run lint
npm run build
```

## License

MIT
