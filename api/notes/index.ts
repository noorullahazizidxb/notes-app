import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../_lib/prisma';
import { allowMethods, readJsonBody } from '../_lib/http';
import { toApiNote, validateCreatePayload } from '../_lib/notes';
import { requireAuth } from '../_lib/auth';

type ImportRequest = {
  notes?: Array<{
    id?: string;
    title?: string;
    content?: string;
    tags?: string[];
    isFavorite?: boolean;
  }>;
};

const listNotes = async (userId: string, res: VercelResponse) => {
  const notes = await prisma.note.findMany({
    where: { userId },
    orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
  });

  res.status(200).json({ notes: notes.map(toApiNote) });
};

const createNote = async (userId: string, req: VercelRequest, res: VercelResponse) => {
  const payload = validateCreatePayload(readJsonBody(req));

  const created = await prisma.note.create({
    data: {
      ...(payload.id ? { id: payload.id } : {}),
      userId,
      title: payload.title,
      content: payload.content,
      tagsJson: JSON.stringify(payload.tags),
      isFavorite: payload.isFavorite ?? false,
    },
  });

  res.status(201).json({ note: toApiNote(created) });
};

const importNotes = async (userId: string, req: VercelRequest, res: VercelResponse) => {
  const body = readJsonBody<ImportRequest>(req);
  const importCandidates: NonNullable<ImportRequest['notes']> = Array.isArray(body.notes)
    ? body.notes
    : [];

  if (importCandidates.length === 0) {
    res.status(200).json({ imported: 0 });
    return;
  }

  const existingCount = await prisma.note.count({ where: { userId } });
  if (existingCount > 0) {
    res.status(200).json({ imported: 0 });
    return;
  }

  const sanitized = importCandidates.map((candidate) =>
    validateCreatePayload({
      id: candidate.id,
      title: candidate.title,
      content: candidate.content,
      tags: candidate.tags,
      isFavorite: candidate.isFavorite,
    })
  );

  await prisma.$transaction(
    sanitized.map((payload) =>
      prisma.note.create({
        data: {
          ...(payload.id ? { id: payload.id } : {}),
          userId,
          title: payload.title,
          content: payload.content,
          tagsJson: JSON.stringify(payload.tags),
          isFavorite: payload.isFavorite ?? false,
        },
      })
    )
  );

  res.status(200).json({ imported: sanitized.length });
};

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    if (!allowMethods(req, res, ['GET', 'POST'])) return;

    const userId = requireAuth(req, res);
    if (!userId) return;

    if (req.method === 'GET') {
      await listNotes(userId, res);
      return;
    }

    const action = typeof req.query.action === 'string' ? req.query.action : undefined;
    if (action === 'import') {
      await importNotes(userId, req, res);
      return;
    }

    await createNote(userId, req, res);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error.';
    res.status(400).json({ error: message });
  }
}
