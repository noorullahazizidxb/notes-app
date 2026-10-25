import type { VercelRequest, VercelResponse } from '@vercel/node';
import { allowMethods } from '../../_lib/http.js';
import {
  APP_URL, GoogleAuthError, SESSION_COOKIE, STATE_COOKIE, clearCookie, failRedirect, readCookie, redirect, safeEqual, setCookie, signInWithGoogle,
} from '../../_lib/google.js';

const first = (v: string | string[] | undefined): string | undefined => (Array.isArray(v) ? v[0] : v);

/**
 * GET /api/auth/google/callback — verifies state, exchanges the code and signs the user in.
 * The JWT is never placed in a URL: it is handed off in a 60s httpOnly cookie that the SPA
 * swaps for the session via POST /api/auth/google/session.
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ['GET'])) return;
  const cleared = clearCookie(STATE_COOKIE);
  const error = first(req.query.error);
  if (error) {
    failRedirect(res, error === 'access_denied' ? 'google_cancelled' : 'google_failed', [cleared]);
    return;
  }
  const [expected, nonce] = (readCookie(req, STATE_COOKIE) ?? '').split('.');
  const state = first(req.query.state);
  if (!state || !expected || !nonce || !safeEqual(state, expected)) {
    failRedirect(res, 'google_state_mismatch', [cleared]);
    return;
  }
  const code = first(req.query.code);
  if (!code) {
    failRedirect(res, 'google_failed', [cleared]);
    return;
  }
  try {
    const session = await signInWithGoogle(code, nonce);
    redirect(res, `${APP_URL}/auth/google/complete`, [cleared, setCookie(SESSION_COOKIE, JSON.stringify(session), 60)]);
  } catch (e) {
    failRedirect(res, e instanceof GoogleAuthError ? e.code : 'google_failed', [cleared]);
  }
}
