export type RecaptchaAction = 'login' | 'register';

interface GrecaptchaClient {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: RecaptchaAction }) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: GrecaptchaClient;
  }
}

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim() ?? '';
const EXECUTE_TIMEOUT_MS = 10000;

let loader: Promise<void> | null = null;

const loadRecaptcha = (): Promise<void> => {
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.dataset.recaptcha = 'v3';
    script.onload = () => resolve();
    script.onerror = () => {
      loader = null;
      script.remove();
      reject(new Error('Could not load reCAPTCHA. Check your connection and try again.'));
    };
    document.head.appendChild(script);
  });

  return loader;
};

/** Starts the v3 script download when a site key is configured. */
export const preloadRecaptcha = (): void => {
  if (!siteKey) return;
  void loadRecaptcha().catch(() => {
    // Submit surfaces the load error.
  });
};

/**
 * Returns a v3 token for the given action. When VITE_RECAPTCHA_SITE_KEY is
 * unset, returns undefined so local login and register keep working.
 */
export const executeRecaptcha = async (action: RecaptchaAction): Promise<string | undefined> => {
  if (!siteKey) return undefined;

  await loadRecaptcha();
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha) {
    throw new Error('reCAPTCHA is unavailable. Refresh the page and try again.');
  }

  const token = await new Promise<string>((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      reject(new Error('reCAPTCHA is unavailable. Refresh the page and try again.'));
    }, EXECUTE_TIMEOUT_MS);
    grecaptcha.ready(() => {
      grecaptcha
        .execute(siteKey, { action })
        .then((value) => {
          window.clearTimeout(timeout);
          resolve(value);
        })
        .catch((error: unknown) => {
          window.clearTimeout(timeout);
          reject(error instanceof Error ? error : new Error('reCAPTCHA verification failed.'));
        });
    });
  });

  if (!token) {
    throw new Error('reCAPTCHA did not return a token. Try again.');
  }

  return token;
};
