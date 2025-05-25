import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isDev = process.env.NODE_ENV !== 'production'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'src', 'components', 'pages', 'About.jsx'),
        // history: resolve(__dirname, 'src', 'components', 'History.jsx'),
      },
    },
  },
  server: isDev
    ? {
        proxy: {
          '/api': {
            target: 'http://localhost:3001', // your local backend (if testing with Express)
            changeOrigin: true,
          },
        },
      }
    : undefined,
})
