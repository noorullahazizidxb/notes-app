import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const prismaDir = resolve(rootDir, 'prisma');
const envPath = resolve(rootDir, '.env');

const loadDotEnv = () => {
  if (!existsSync(envPath)) {
    return;
  }

  const raw = readFileSync(envPath, 'utf8');
  const lines = raw.split(/\r?\n/);

  for (const line of lines) {
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

loadDotEnv();

const parseBoolean = (value) => {
  if (!value) return false;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

const sqlite = parseBoolean(process.env.DB_SQLITE);
const mysql = parseBoolean(process.env.DB_MYSQL);
const postgres = parseBoolean(process.env.DB_POSTGRES);

const enabled = [
  ['sqlite', sqlite],
  ['mysql', mysql],
  ['postgresql', postgres],
].filter(([, isOn]) => isOn);

let provider = 'sqlite';

if (enabled.length > 1) {
  console.error('Only one of DB_SQLITE, DB_MYSQL, DB_POSTGRES can be true.');
  process.exit(1);
}

if (enabled.length === 1) {
  provider = enabled[0][0];
}

if (process.env.VERCEL === '1' && provider === 'sqlite') {
  console.error('SQLite is not supported for Vercel production deployments. Use MySQL or PostgreSQL.');
  process.exit(1);
}

const sourceFile = resolve(prismaDir, `schema.${provider}.prisma`);
const targetFile = resolve(prismaDir, 'schema.prisma');

if (!existsSync(sourceFile)) {
  console.error(`Prisma schema template not found for provider: ${provider}`);
  process.exit(1);
}

copyFileSync(sourceFile, targetFile);
console.log(`Prisma schema selected: ${provider}`);
