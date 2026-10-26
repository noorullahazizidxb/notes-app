import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './app/App';
import './index.css';
import './fonts';
import { ProgressProviders } from './lib/progress/ProgressProviders';

// index.html ships a static SEO base for crawlers that do not run JavaScript.
// Once React runs, react-helmet-async owns those tags, so drop the static copies
// to keep exactly one title/description/canonical/robots/JSON-LD in the DOM.
document.querySelectorAll('head [data-seo]').forEach((node) => node.remove());

ReactDOM.createRoot(document.getElementById('root')!).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      HelmetProvider,
      null,
      React.createElement(ProgressProviders, null, React.createElement(App)),
    ),
  ),
);
