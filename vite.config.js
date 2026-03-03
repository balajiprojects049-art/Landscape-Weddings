import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy vendor libs into separate cached chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer': ['framer-motion'],
          'lucide': ['lucide-react'],
        },
      },
    },
    // Raise the warning limit a little (bundles after splitting will be small)
    chunkSizeWarningLimit: 600,
  },
})
