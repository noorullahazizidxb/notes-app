import type { VercelRequest, VercelResponse } from '@vercel/node';

export const allowMethods = (
  req: VercelRequest,
  res: VercelResponse,
  methods: ReadonlyArray<string>
): boolean => {
  if (!req.method || !methods.includes(req.method)) {
    res.setHeader('Allow', methods.join(', '));
    res.status(405).json({ error: `Method ${req.method ?? 'UNKNOWN'} not allowed.` });
    return false;
  }

  return true;
};

export const readJsonBody = <T>(req: VercelRequest): T => {
  if (!req.body) {
    return {} as T;
  }

  if (typeof req.body === 'string') {
    return JSON.parse(req.body) as T;
  }

  return req.body as T;
};
