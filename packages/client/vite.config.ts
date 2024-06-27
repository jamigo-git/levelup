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
<<<<<<< HEAD
=======
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
    },
  },
>>>>>>> 60768d0 (LVL-36: Реализовать логику авторизации)
})
