import { PfoetckenClientImpl, PfoetckenClient } from './client';

interface WidgetLoadDetail {
  fieldData: Partial<{
    apiBaseUrl: string;
    apiToken: string;
    streamerName: string;
    collectionType: string;
  }>;
}

declare global {
  interface Window {
    erdbeerpfoetchen: PfoetckenClient | undefined;
  }
  interface WindowEventMap {
    onWidgetLoad: CustomEvent<WidgetLoadDetail>;
    onSessionUpdate: Event;
  }
}

window.addEventListener('onWidgetLoad', (evt) => {
  const fields = evt.detail?.fieldData ?? {};
  window.erdbeerpfoetchen = new PfoetckenClientImpl({
    apiBaseUrl: fields.apiBaseUrl ?? 'https://api.erdbeerpfoetchen.de',
    apiToken: fields.apiToken ?? '',
    streamerName: fields.streamerName ?? '',
    collectionType: fields.collectionType ?? 'default',
  });
}, { once: true });

window.addEventListener('onSessionUpdate', () => {
  // optional: react to session data
});
