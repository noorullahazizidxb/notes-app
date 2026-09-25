import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../_lib/prisma';
import { allowMethods, readJsonBody } from '../_lib/http';
import { toApiNote, validatePatchPayload } from '../_lib/notes';
import { requireAuth } from '../_lib/auth';

const getId = (req: VercelRequest): string | null => {
  const param = req.query.id;
  if (Array.isArray(param)) return param[0] ?? null;
  return typeof param === 'string' ? param : null;
};

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    if (!allowMethods(req, res, ['GET', 'PATCH', 'DELETE'])) return;

    const userId = requireAuth(req, res);
    if (!userId) return;

    const id = getId(req);
    if (!id) {
      res.status(400).json({ error: 'Missing note id.' });
      return;
    }

    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) {
      res.status(404).json({ error: 'Note not found.' });
      return;
    }

    if (note.userId !== userId) {
      res.status(403).json({ error: 'Forbidden.' });
      return;
    }

    if (req.method === 'GET') {
      res.status(200).json({ note: toApiNote(note) });
      return;
    }

    if (req.method === 'PATCH') {
      const payload = validatePatchPayload(readJsonBody(req));

      const updated = await prisma.note.update({
        where: { id },
        data: {
          ...(payload.title !== undefined ? { title: payload.title || 'Untitled note' } : {}),
          ...(payload.content !== undefined ? { content: payload.content } : {}),
          ...(payload.tags !== undefined ? { tagsJson: JSON.stringify(payload.tags) } : {}),
          ...(payload.isFavorite !== undefined ? { isFavorite: payload.isFavorite } : {}),
        },
      });

      res.status(200).json({ note: toApiNote(updated) });
      return;
    }

    await prisma.note.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error.';
    const status = message.toLowerCase().includes('not found') ? 404 : 400;
    res.status(status).json({ error: message });
  }
}
