import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { prisma } from '../_lib/prisma';
import { allowMethods, readJsonBody } from '../_lib/http';
import { verifyPassword, signToken } from '../_lib/auth';

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ['POST'])) return;

  try {
    const body = readJsonBody(req);
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    // Constant-time: always run verifyPassword even on missing user to prevent timing attacks.
    const passwordHash = user?.password ?? '$2a$12$invalidhashpadding00000000000000000000';
    const valid = user ? await verifyPassword(password, passwordHash) : false;

    if (!user || !valid) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const token = signToken(user.id);
    res.status(200).json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed.';
    res.status(400).json({ error: message });
  }
}
