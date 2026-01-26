// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 👇 ADD THIS ENTIRE 'server' BLOCK
  server: {
    proxy: {
      // This line says: "If a request starts with '/recipe'..."
      '/recipe': {
        // "...send it to this backend server instead."
        target: 'http://localhost:5000',
        changeOrigin: true, // Needed for the proxy to work correctly
      }
    }
  }
})