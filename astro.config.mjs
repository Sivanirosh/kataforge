// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const crossOriginIsolationHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'credentialless',
};

export default defineConfig({
  integrations: [react()],
  vite: {
    optimizeDeps: {
      exclude: ['pyodide'],
    },
    worker: {
      format: 'es',
    },
    server: {
      headers: crossOriginIsolationHeaders,
    },
    preview: {
      headers: crossOriginIsolationHeaders,
    },
  },
});
