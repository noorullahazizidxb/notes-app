export const getInitials = (name?: string | null, email?: string | null): string => {
  if (name?.trim()) {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  return (email?.[0] ?? '?').toUpperCase();
};
