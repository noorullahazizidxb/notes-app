import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { DEFAULT_DESCRIPTION, FAQ, FEATURES, PRODUCTS, STEPS, homeJsonLd } from './src/seo/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Fills the static SEO base of index.html from src/seo/site.ts so crawlers that do
 * not run JavaScript get the same JSON-LD and landing copy React renders at "/".
 */
const staticSeo = (): Plugin => ({
  name: 'static-seo',
  transformIndexHtml(html) {
    const jsonLd = JSON.stringify(homeJsonLd).replace(/</g, '\\u003c');
    const body = [
      '<h1>DevMinds Notes — the free note taking app for your online notes</h1>',
      `<p>${esc(DEFAULT_DESCRIPTION)}</p>`,
      '<p><a href="/register">Create a free account</a> · <a href="/login">Sign in to your notes</a></p>',
      '<h2>Note taking features</h2><ul>',
      ...FEATURES.map((f) => `<li><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></li>`),
      '</ul><h2>How it works</h2><ol>',
      ...STEPS.map((s) => `<li><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></li>`),
      '</ol><h2>Frequently asked questions</h2>',
      ...FAQ.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`),
      '<nav aria-label="DevMinds products"><h2>More DevMinds products</h2><ul>',
      ...PRODUCTS.map((p) => `<li><a href="${p.url}">${esc(p.label)}</a></li>`),
      '</ul></nav>',
    ].join('');
    return html
      .replace('<!--seo-jsonld-->', `<script type="application/ld+json" data-seo>${jsonLd}</script>`)
      .replace('<!--seo-static-->', body);
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
