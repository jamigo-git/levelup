import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  optimizeDeps: {
    include: ['react-helmet-async', '@ant-design/icons', '@ant-design/icons-svg', 'rc-util'],
  },
  ssr: {
    noExternal: ['react-helmet-async', '@ant-design/icons', '@ant-design/icons-svg', 'rc-util'],
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: '.',
      filename: 'service-worker.ts',
      includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Level Up!',
        short_name: 'LvlUp!',
        description: 'Level Up! - Игра tower defense',
        theme_color: '#fa8c16',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      injectManifest: {
        injectionPoint: undefined,
      },
    }),
  ],
  resolve: {
    alias: {
      '@/api': '/src/api',
      '@/hooks': '/src/hooks',
      '@/pages': '/src/pages',
      '@/assets': '/src/assets',
      '@/slices': '/src/store/slices',
      '@/store': '/src/store',
      '@/routing': '/src/routing',
      '@/components': '/src/components',
      '@/utils': '/src/utils',
      '@/types': '/src/types',
      '@/constants': '/src/constants',
      '@/__mocks__': '/src/__mocks__',
    },
  },
})
