import type { VercelRequest, VercelResponse } from '@vercel/node';
import { allowMethods } from '../../_lib/http.js';
import { SESSION_COOKIE, clearCookie, readCookie, type SessionPayload } from '../../_lib/google.js';

/** POST /api/auth/google/session — one-time swap of the handoff cookie for { token, user }. */
export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (!allowMethods(req, res, ['POST'])) return;
  res.setHeader('Set-Cookie', clearCookie(SESSION_COOKIE));
  res.setHeader('Cache-Control', 'no-store');
  try {
    const parsed = JSON.parse(readCookie(req, SESSION_COOKIE) ?? '') as SessionPayload;
    if (typeof parsed?.token === 'string' && parsed.user?.id) {
      res.status(200).json(parsed);
      return;
    }
  } catch {
    /* fall through */
  }
  res.status(401).json({ error: 'Google sign-in session expired. Please try again.' });
}
