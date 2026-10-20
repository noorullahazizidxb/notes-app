import { defineConfig } from 'prisma/config';
import { loadProjectEnv, resolvePrismaProvider } from './scripts/prisma-provider.mjs';

loadProjectEnv();

const provider = resolvePrismaProvider();

export default defineConfig({
  schema: `prisma/schema.${provider}.prisma`,
  migrations: {
    path: `prisma/migrations-${provider}`,
  },
});
