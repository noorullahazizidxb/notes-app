import type { VercelRequest, VercelResponse } from '@vercel/node';
import { allowMethods } from '../../_lib/http.js';
import { STATE_COOKIE, authorizeUrl, failRedirect, randomToken, redirect, setCookie } from '../../_lib/google.js';

/** GET /api/auth/google — starts the Google OAuth code flow with a random state + nonce. */
export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (!allowMethods(req, res, ['GET'])) return;
  const state = randomToken();
  const nonce = randomToken();
  let url: string;
  try {
    url = authorizeUrl(state, nonce);
  } catch {
    failRedirect(res, 'google_unavailable');
    return;
  }
  redirect(res, url, [setCookie(STATE_COOKIE, `${state}.${nonce}`, 600)]);
}
