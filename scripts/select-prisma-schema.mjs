import { copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProjectEnv, resolvePrismaProvider } from './prisma-provider.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const prismaDir = resolve(rootDir, 'prisma');

loadProjectEnv();

let provider;

try {
  provider = resolvePrismaProvider();
} catch (error) {
  const message = error instanceof Error ? error.message : 'Invalid database provider flags.';
  console.error(message);
  process.exit(1);
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
