const SITEVERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const MIN_SCORE = 0.5;
const VERIFY_TIMEOUT_MS = 5000;

export type RecaptchaAction = 'login' | 'register';

interface SiteverifyResponse {
  success?: boolean;
  score?: number;
  action?: string;
}

export class RecaptchaError extends Error {
  constructor(message = 'reCAPTCHA verification failed.') {
    super(message);
    this.name = 'RecaptchaError';
  }
}

export const forwardedClientIp = (forwardedFor: string | string[] | undefined): string | undefined => {
  const raw = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  const ip = raw?.split(',')[0]?.trim();
  return ip ? ip : undefined;
};

const accepted = (result: SiteverifyResponse, expectedAction: RecaptchaAction): boolean => {
  if (result.success !== true) return false;
  if (result.action !== expectedAction) return false;
  if (typeof result.score !== 'number' || !Number.isFinite(result.score)) return false;
  return result.score >= MIN_SCORE;
};

/**
 * Verifies a reCAPTCHA v3 token. Skips entirely when RECAPTCHA_SECRET_KEY is
 * unset so local development can sign in without Google credentials.
 */
export const verifyRecaptcha = async (
  token: string | undefined,
  expectedAction: RecaptchaAction,
  remoteIp?: string
): Promise<void> => {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) return;

  const responseToken = token?.trim();
  if (!responseToken) throw new RecaptchaError();

  const params = new URLSearchParams({ secret, response: responseToken });
  if (remoteIp) params.set('remoteip', remoteIp);

  let payload: SiteverifyResponse;
  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });
    if (!response.ok) throw new RecaptchaError();
    payload = (await response.json()) as SiteverifyResponse;
  } catch (error) {
    if (error instanceof RecaptchaError) throw error;
    throw new RecaptchaError();
  }

  if (!accepted(payload, expectedAction)) throw new RecaptchaError();
};
