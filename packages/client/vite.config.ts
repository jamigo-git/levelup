import { defineConfig } from 'vite'
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
  plugins: [react()],
  resolve: {
    alias: {
      '@/api': '/src/api',
      '@/hooks': '/src/hooks',
      '@/pages': '/src/pages',
      '@/assets': '/src/assets',
      '@/slices': '/src/store/slices',
      '@/routing': '/src/routing',
      '@/components': '/src/components',
    },
  },
})
