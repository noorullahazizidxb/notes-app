import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const TRUTHY = new Set(['1', 'true', 'yes', 'on']);

const envPath = resolve(dirname(fileURLToPath(import.meta.url)), '..', '.env');

/**
 * Prisma skips its built-in .env load when prisma.config.ts exists.
 * Existing process env wins, so Vercel project variables stay in place.
 */
export const loadProjectEnv = () => {
  if (!existsSync(envPath)) {
    return;
  }

  const raw = readFileSync(envPath, 'utf8');

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separator = trimmed.indexOf('=');
    if (separator < 0) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    if (!key || process.env[key] !== undefined) {
      continue;
    }

    const value = trimmed.slice(separator + 1).trim().replace(/^"|"$/g, '');
    process.env[key] = value;
  }
};

export const parseBooleanFlag = (value) => {
  if (!value) return false;
  return TRUTHY.has(String(value).toLowerCase());
};

/** Exactly one of DB_SQLITE, DB_MYSQL, DB_POSTGRES. Defaults to sqlite. */
export const resolvePrismaProvider = (env = process.env) => {
  const enabled = [
    ['sqlite', parseBooleanFlag(env.DB_SQLITE)],
    ['mysql', parseBooleanFlag(env.DB_MYSQL)],
    ['postgresql', parseBooleanFlag(env.DB_POSTGRES)],
  ].filter(([, isOn]) => isOn);

  if (enabled.length > 1) {
    throw new Error('Only one of DB_SQLITE, DB_MYSQL, DB_POSTGRES can be true.');
  }

  if (enabled.length === 1) {
    return enabled[0][0];
  }

  return 'sqlite';
};
