import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const siteUrl = (process.env.VITE_SITE_URL || 'https://www.utilitools.com.br').replace(/\/+$/, '')

export default defineConfig({
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
