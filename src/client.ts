export interface PfoetckenClient {
  writeCollection(userKey: string, collectionKey: string, data: unknown): Promise<void>;
  readCollection(userKey: string, collectionKey: string): Promise<unknown>;
}

export interface ClientConfig {
  apiBaseUrl: string;
  apiToken: string;
  streamerName: string;
  collectionType: string;
  timeoutMs?: number;
}

export class PfoetckenClientImpl implements PfoetckenClient {
  constructor(private readonly config: ClientConfig) {}

  async writeCollection(userKey: string, collectionKey: string, data: unknown): Promise<void> {
    if (!this.guard('writeCollection')) return;
    const url = `${this.config.apiBaseUrl}/api/v1/collection/${encodeURIComponent(this.config.streamerName)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.config.timeoutMs ?? 10_000);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json',
          'X-USER-KEY': userKey,
          'X-COLLECTION-KEY': collectionKey,
          'X-COLLECTION-TYPE': this.config.collectionType,
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      if (!res.ok) {
        console.error(`[erdbeerpfoetchen] writeCollection HTTP ${res.status}`);
      }
    } catch (err) {
      console.error('[erdbeerpfoetchen] writeCollection failed:', err);
    } finally {
      clearTimeout(timer);
    }
  }

  async readCollection(userKey: string, collectionKey: string): Promise<unknown> {
    if (!this.guard('readCollection')) return undefined;
    const url = `${this.config.apiBaseUrl}/api/v1/collection/${encodeURIComponent(this.config.streamerName)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.config.timeoutMs ?? 10_000);
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.config.apiToken}`,
          'X-USER-KEY': userKey,
          'X-COLLECTION-KEY': collectionKey,
        },
        signal: controller.signal,
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as unknown;
    } catch (err) {
      console.error('[erdbeerpfoetchen] readCollection failed:', err);
      return undefined;
    } finally {
      clearTimeout(timer);
    }
  }

  private guard(op: string): boolean {
    if (!this.config.apiToken) {
      console.warn(`[erdbeerpfoetchen] apiToken missing — skipping ${op}`);
      return false;
    }
    if (!this.config.streamerName) {
      console.warn(`[erdbeerpfoetchen] streamerName missing — skipping ${op}`);
      return false;
    }
    return true;
  }
}
