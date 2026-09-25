import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production';
const BCRYPT_ROUNDS = 12;
const TOKEN_EXPIRY = '30d';

type JwtPayload = { sub: string; iat: number; exp: number };

export const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, BCRYPT_ROUNDS);

export const verifyPassword = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);

export const signToken = (userId: string): string =>
  jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

export const verifyToken = (token: string): string | null => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return payload.sub;
  } catch {
    return null;
  }
};

const extractBearerToken = (req: VercelRequest): string | null => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice(7);
};

export const getAuthUserId = (req: VercelRequest): string | null => {
  const token = extractBearerToken(req);
  return token ? verifyToken(token) : null;
};

/** Reads userId from the request or writes 401 and returns null. */
export const requireAuth = (req: VercelRequest, res: VercelResponse): string | null => {
  const userId = getAuthUserId(req);
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized.' });
    return null;
  }
  return userId;
};
