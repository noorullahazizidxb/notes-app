export const mergeTags = (tags: string[]): string[] =>
  [...new Set(tags.map((t) => t.trim().toLowerCase()).filter(Boolean))].slice(0, 24);
