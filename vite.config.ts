import { fileRoutes } from 'filesystem-routing/vite';
import { defineConfig } from 'vitest/config';
import solid from '@solidjs/vite-plugin';

export default defineConfig({
  plugins: [
    // The site is hosted as static files on Vercel. Keep SSR disabled so the
    // Vite build writes its entry HTML directly to dist/ for Vercel to serve.
    solid({ start: true, ssr: false, extensions: ['.jsx', '.tsx'], diagnostics: true }),
    fileRoutes({ types: true }),
  ],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./vitest-setup.ts'],
    isolate: false,
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    outDir: 'dist',
  },
});
