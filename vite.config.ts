import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { homeJsonLd } from './src/seo/site';
import { sentryVitePlugin } from '@sentry/vite-plugin';

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


function releaseName() {
  return process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA || undefined;
}

function sentryVitePlugins() {
  const authToken = process.env.SENTRY_AUTH_TOKEN;
  if (!authToken) return [];
  return [
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken,
      disable: !authToken,
      release: { name: releaseName() },
      sourcemaps: { filesToDeleteAfterUpload: ['./dist/**/*.map'] },
    }),
  ];
}

export default defineConfig({
  define: {
    'import.meta.env.VITE_SENTRY_RELEASE': JSON.stringify(releaseName() || ''),
    'import.meta.env.VITE_SENTRY_ENVIRONMENT': JSON.stringify(process.env.VERCEL_ENV || process.env.NODE_ENV || 'development'),
  },
  plugins: [react(), staticSeo(), ...sentryVitePlugins()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: Boolean(process.env.SENTRY_AUTH_TOKEN),
  },
});
