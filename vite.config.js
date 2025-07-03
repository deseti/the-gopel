// vite.config.js - DENGAN KONFIGURASI PROXY

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Setiap permintaan ke '/api' akan diteruskan ke target
      '/api': {
        target: 'https://api-mainnet.magiceden.dev',
        changeOrigin: true,
        // Menghapus '/api' dari path sebelum meneruskan permintaan
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
