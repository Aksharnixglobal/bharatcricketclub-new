import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        team: resolve(__dirname, 'team.html'),
        leagues: resolve(__dirname, 'leagues.html'),
        fixtures: resolve(__dirname, 'fixtures.html'),
        leaders: resolve(__dirname, 'leaders.html'),
        sponsors: resolve(__dirname, 'sponsors.html'),
        communityPartner: resolve(__dirname, 'community-partner.html'),
        donate: resolve(__dirname, 'donate.html'),
        join: resolve(__dirname, 'join.html'),
      },
    },
  },
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
