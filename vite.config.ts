import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'generateSW',
      manifest: {
        name: '萌萌表情包',
        short_name: '萌萌表情包',
        description: '海量二次元梦么表情包，一键下载，轻松斗图，让聊天更有趣。',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'PWA/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: "any"
          },
          {
            src: 'PWA/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
      workbox: {
        skipWaiting: true,
        globPatterns: ['**/*.{html,js,css,png}'],
      },
    }),
  ],
})
