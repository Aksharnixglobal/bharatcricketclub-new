import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/dcl': {
        target: 'https://dallascricket.org:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/dcl/, ''),
        secure: false,
        headers: {
          Origin: 'https://www.dallascricket.org',
          Referer: 'https://www.dallascricket.org/',
        },
      },
    },
  },
})
