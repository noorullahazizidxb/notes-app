import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../_lib/prisma';
import { allowMethods } from '../_lib/http';
import { requireAuth } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (!allowMethods(req, res, ['GET'])) return;

  const userId = requireAuth(req, res);
  if (!userId) return;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.status(200).json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error.';
    res.status(500).json({ error: message });
  }
}
