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
        globPatterns: ['**/*.{js,css,html,svg,webmanifest}', 'icons/*.png', 'assets/*latin*.woff2', 'data/*.json'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/assets/') && url.pathname.endsWith('.woff2'),
            handler: 'CacheFirst',
            options: { cacheName: 'lx-fonts', expiration: { maxEntries: 40 } }
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
  build: { target: 'es2020' }
});
