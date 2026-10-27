import { PrismaClient } from '@prisma/client';
import { registerGracefulShutdown } from './shutdown.js';

declare global {
  var __notesPrismaClient: PrismaClient | undefined;
}

export const prisma =
  globalThis.__notesPrismaClient ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.__notesPrismaClient = prisma;
}

// Vercel sends SIGTERM before an instance is torn down and allows ~500ms for cleanup.
registerGracefulShutdown({ cleanups: [() => prisma.$disconnect()], timeoutMs: 400 });
