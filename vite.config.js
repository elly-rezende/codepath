import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Three.js is unavoidably ~533KB (powers the 3D Bit mascot).
  // We chunk-split aggressively (HeroSection, Profile, etc. all lazy)
  // so users only pay for it when they visit those views.
  // Bump the warning limit to acknowledge this is intentional.
  build: {
    chunkSizeWarningLimit: 900,
  },

  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // Use the manifest file we hand-wrote in /public for full control
      manifest: false,
      injectRegister: 'auto',
      registerType: 'autoUpdate', // service worker updates without prompting

      // Enable PWA in dev mode for easier testing
      devOptions: {
        enabled: true,
        type: 'module',
      },

      workbox: {
        // What to precache (the app shell)
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,webp,woff2}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB

        // Runtime caching strategies
        runtimeCaching: [
          // Google Fonts — cache-first, long expiration
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // Anthropic API — never cache (contains personal data + LLM responses)
          {
            urlPattern: /^https:\/\/api\.anthropic\.com\/.*/i,
            handler: 'NetworkOnly',
          },
        ],

        navigateFallbackDenylist: [/^\/api/, /^\/sw\.js/, /^\/manifest\.webmanifest/],
      },

      includeAssets: ['icon-192.svg', 'icon-512.svg', 'icon-maskable.svg', 'favicon.svg'],
    }),
  ],
})
