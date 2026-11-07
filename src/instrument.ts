import * as Sentry from '@sentry/react';

const dsn = import.meta.env.VITE_SENTRY_DSN || import.meta.env.REACT_APP_SENTRY_DSN;

Sentry.init({
  dsn,
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || import.meta.env.MODE,
  release: import.meta.env.VITE_SENTRY_RELEASE || undefined,
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1,
  sendDefaultPii: false,
});
