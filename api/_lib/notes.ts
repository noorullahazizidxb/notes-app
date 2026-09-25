import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

const tagSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1)
  .max(32)
  .regex(/^[a-z0-9-]+$/, 'Tags can only use letters, numbers, and dashes.');

const notesPayloadSchema = z.object({
  id: z.string().min(3).max(128).optional(),
  title: z.string().trim().max(180).default('Untitled note'),
  content: z.string().max(60000).default(''),
  tags: z.array(tagSchema).max(24).default([]),
  isFavorite: z.boolean().optional(),
});

const notesPatchSchema = z.object({
  title: z.string().trim().max(180).optional(),
  content: z.string().max(60000).optional(),
  tags: z.array(tagSchema).max(24).optional(),
  isFavorite: z.boolean().optional(),
});

export type NotePayload = z.infer<typeof notesPayloadSchema>;
export type NotePatchPayload = z.infer<typeof notesPatchSchema>;

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'p',
    'br',
    'strong',
    'em',
    'u',
    's',
    'ul',
    'ol',
    'li',
    'blockquote',
    'code',
    'pre',
    'h1',
    'h2',
    'h3',
    'h4',
    'a',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
};

const normalizeTags = (tags: string[]): string[] => {
  return [...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))].sort();
};

export const validateCreatePayload = (payload: unknown): NotePayload => {
  const parsed = notesPayloadSchema.parse(payload);

  return {
    ...parsed,
    title: parsed.title.trim() || 'Untitled note',
    content: sanitizeHtml(parsed.content, sanitizeOptions),
    tags: normalizeTags(parsed.tags),
  };
};

export const validatePatchPayload = (payload: unknown): NotePatchPayload => {
  const parsed = notesPatchSchema.parse(payload);

  return {
    ...parsed,
    title: parsed.title?.trim(),
    content: parsed.content ? sanitizeHtml(parsed.content, sanitizeOptions) : parsed.content,
    tags: parsed.tags ? normalizeTags(parsed.tags) : parsed.tags,
  };
};

export type ApiNote = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export const toApiNote = (note: {
  id: string;
  title: string;
  content: string;
  tagsJson: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}): ApiNote => {
  let tags: string[] = [];

  try {
    const parsedTags = JSON.parse(note.tagsJson);
    if (Array.isArray(parsedTags)) {
      tags = parsedTags.filter((item) => typeof item === 'string');
    }
  } catch {
    tags = [];
  }

  return {
    id: note.id,
    title: note.title,
    content: note.content,
    tags,
    isFavorite: note.isFavorite,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  };
};
