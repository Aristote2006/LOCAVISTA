import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/lab': resolve(__dirname, 'src/components/LabComponents.jsx'),
    },
  },
  optimizeDeps: {
    include: ['@mui/material/Tabs', '@mui/material/Tab'],
    exclude: ['@mui/lab'],
  },
  build: {
    rollupOptions: {
      external: ['@mui/lab'],
      output: {
        manualChunks: {
          mui: ['@mui/material', '@mui/icons-material'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
