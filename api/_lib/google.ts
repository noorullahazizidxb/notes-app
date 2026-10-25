import { randomBytes, timingSafeEqual } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from './prisma.js';
import { signToken } from './auth.js';

export const GOOGLE_SCOPE = 'openid email profile';
export const STATE_COOKIE = 'notes_g_oauth';
export const SESSION_COOKIE = 'notes_g_session';
const COOKIE_PATH = '/api/auth/google';

export const APP_URL = (process.env.APP_URL?.trim() || 'https://notes.devminds.net').replace(/\/+$/, '');
export const googleConfig = () => ({
  clientId: process.env.GOOGLE_CLIENT_ID?.trim() ?? '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET?.trim() ?? '',
  redirectUri: process.env.GOOGLE_REDIRECT_URI?.trim() || `${APP_URL}/api/auth/google/callback`,
});

/** Error codes surfaced to the login page as ?error=<code> (never raw messages). */
export class GoogleAuthError extends Error {
  constructor(public readonly code: string) {
    super(code);
  }
}

export const randomToken = (): string => randomBytes(32).toString('base64url');

export const safeEqual = (a: string, b: string): boolean => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length > 0 && x.length === y.length && timingSafeEqual(x, y);
};

export const readCookie = (req: VercelRequest, name: string): string | undefined => {
  for (const part of (req.headers.cookie ?? '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) {
      try {
        return decodeURIComponent(part.slice(i + 1).trim());
      } catch {
        return undefined;
      }
    }
  }
  return undefined;
};

const secureFlag = (): string => (process.env.VERCEL === '1' || process.env.NODE_ENV === 'production' ? '; Secure' : '');
export const setCookie = (name: string, value: string, maxAgeSec: number): string =>
  `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSec}; Path=${COOKIE_PATH}; HttpOnly; SameSite=Lax${secureFlag()}`;
export const clearCookie = (name: string): string => setCookie(name, '', 0);

export const redirect = (res: VercelResponse, location: string, cookies: string[] = []): void => {
  if (cookies.length) res.setHeader('Set-Cookie', cookies);
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Location', location);
  res.status(302).end();
};

export const failRedirect = (res: VercelResponse, code: string, cookies: string[] = []): void =>
  redirect(res, `${APP_URL}/login?error=${encodeURIComponent(code)}`, cookies);

export const authorizeUrl = (state: string, nonce: string): string => {
  const { clientId, redirectUri } = googleConfig();
  if (!clientId) throw new GoogleAuthError('google_unavailable');
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: GOOGLE_SCOPE,
    state,
    nonce,
    prompt: 'select_account',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

export type SessionPayload = { token: string; user: { id: string; email: string; name: string | null } };

/** Exchanges the code, verifies the id_token (signature, aud, iss, exp, nonce) and resolves the user. */
export const signInWithGoogle = async (code: string, nonce: string): Promise<SessionPayload> => {
  const { clientId, clientSecret, redirectUri } = googleConfig();
  if (!clientId || !clientSecret) throw new GoogleAuthError('google_unavailable');
  const client = new OAuth2Client({ clientId, clientSecret, redirectUri });

  let idToken: string | null | undefined;
  try {
    ({ tokens: { id_token: idToken } } = await client.getToken(code));
  } catch {
    throw new GoogleAuthError('google_exchange_failed');
  }
  if (!idToken) throw new GoogleAuthError('google_exchange_failed');

  let payload;
  try {
    // verifyIdToken checks the RS256 signature against Google's certs, aud, iss and exp.
    payload = (await client.verifyIdToken({ idToken, audience: clientId })).getPayload();
  } catch {
    throw new GoogleAuthError('google_invalid_token');
  }
  if (!payload?.sub || !payload.nonce || !safeEqual(payload.nonce, nonce)) throw new GoogleAuthError('google_invalid_token');

  const issue = (u: { id: string; email: string; name: string | null }): SessionPayload => ({
    token: signToken(u.id),
    user: { id: u.id, email: u.email, name: u.name },
  });

  const byGoogle = await prisma.user.findUnique({ where: { googleId: payload.sub } });
  if (byGoogle) return issue(byGoogle);

  const email = payload.email?.trim().toLowerCase();
  // Never link or create on an unverified email: prevents account takeover / email squatting.
  if (!email || payload.email_verified !== true) throw new GoogleAuthError('google_email_unverified');

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    if (existing.googleId && existing.googleId !== payload.sub) throw new GoogleAuthError('google_account_conflict');
    return issue(await prisma.user.update({ where: { id: existing.id }, data: { googleId: payload.sub } }));
  }

  const name = payload.name?.trim().slice(0, 64) || null;
  return issue(await prisma.user.create({ data: { email, password: null, googleId: payload.sub, name } }));
};
