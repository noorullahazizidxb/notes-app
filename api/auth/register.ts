import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { prisma } from '../_lib/prisma.js';
import { allowMethods, readJsonBody } from '../_lib/http.js';
import { hashPassword, signToken } from '../_lib/auth.js';
import { forwardedClientIp, verifyRecaptcha } from '../_lib/recaptcha.js';

const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.').max(128),
  name: z.string().trim().min(1).max(64).optional(),
  recaptchaToken: z.string().max(4096).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ['POST'])) return;

  try {
    const body = readJsonBody(req);
    const { email, password, name, recaptchaToken } = registerSchema.parse(body);
    await verifyRecaptcha(
      recaptchaToken,
      'register',
      forwardedClientIp(req.headers['x-forwarded-for'])
    );

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ error: 'An account with that email already exists.' });
      return;
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashed, name: name ?? null },
    });

    const token = signToken(user.id);
    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed.';
    res.status(400).json({ error: message });
  }
}
