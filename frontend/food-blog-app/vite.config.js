import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // Existing recipe API proxy
      '/recipe': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})