export function parseBooleanFlag(value: string | undefined): boolean;

export function loadProjectEnv(): void;

export function resolvePrismaProvider(
  env?: NodeJS.ProcessEnv
): 'sqlite' | 'mysql' | 'postgresql';
