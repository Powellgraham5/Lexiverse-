import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    preact(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      // public/manifest.webmanifest is the single source of truth.
      manifest: false,
      workbox: {
        // Only Latin font subsets are precached; other scripts load on demand.
        globPatterns: ['**/*.{js,css,html,svg,webmanifest}', 'icons/*.png', 'assets/*latin*.woff2', 'data/*.json', 'data/*.txt'],
        navigateFallback: '/index.html',
        // Control the very first visit too, so fonts and chunks fetched then are cached for offline use.
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/assets/') && url.pathname.endsWith('.woff2'),
            handler: 'CacheFirst',
            options: { cacheName: 'lx-fonts', expiration: { maxEntries: 40 } }
          },
          {
            // The on-device voice engine (Yoruba): kept after the first download so it works offline.
            urlPattern: ({ url }) => url.host === 'cdn.jsdelivr.net' && url.pathname.startsWith('/npm/@huggingface/transformers@'),
            handler: 'CacheFirst',
            options: { cacheName: 'lx-voice-engine', expiration: { maxEntries: 8 }, cacheableResponse: { statuses: [200] } }
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/splash/'),
            handler: 'CacheFirst',
            options: { cacheName: 'lx-splash', expiration: { maxEntries: 4 } }
          }
        ]
      }
    })
  ],
  worker: { format: 'es' },
  build: { target: 'es2020' }
});
