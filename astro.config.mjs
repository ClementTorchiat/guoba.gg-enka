import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import viteCompression from 'vite-plugin-compression';

// https://astro.build/config
export default defineConfig({
  site: 'https://guoba.clement-torchiat.fr',
  integrations: [sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  vite: {
    plugins: [
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
        deleteOriginFile: false
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false
      })
    ]
  },
  server: {
    port: 4321
  }
});


