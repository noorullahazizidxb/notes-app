import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { homeJsonLd } from './src/seo/site';

/**
 * Injects the home JSON-LD from src/seo/site.ts into the static <head> so crawlers that
 * do not run JavaScript still get structured data. All other SEO lives in <head> via Helmet.
 */
const staticSeo = (): Plugin => ({
  name: 'static-seo',
  transformIndexHtml(html) {
    const jsonLd = JSON.stringify(homeJsonLd).replace(/</g, '\\u003c');
    return html.replace('<!--seo-jsonld-->', `<script type="application/ld+json" data-seo>${jsonLd}</script>`);
  },
});

export default defineConfig({
  plugins: [react(), staticSeo()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
