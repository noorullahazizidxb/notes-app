import { EventEmitter } from 'node:events';
import { describe, expect, it, vi } from 'vitest';
import { createShutdown, registerGracefulShutdown, type ShutdownProcess } from './shutdown.js';

const silent = { info: () => {}, error: () => {} };
const tick = () => new Promise((r) => setTimeout(r, 5));

function fakeProc() {
  const proc = new EventEmitter() as EventEmitter & ShutdownProcess & { exits: number[] };
  proc.exits = [];
  proc.exit = (code?: number) => proc.exits.push(code ?? 0);
  return proc;
}

describe('graceful shutdown', () => {
  it('closes the server and runs cleanups once, exit 0, even on repeated signals', async () => {
    const proc = fakeProc();
    const cleanup = vi.fn(async () => {});
    const server = { close: vi.fn((cb?: (err?: Error) => void) => cb?.()) };
    registerGracefulShutdown({ server, cleanups: [cleanup], logger: silent, proc });
    proc.emit('SIGTERM', 'SIGTERM');
    proc.emit('SIGINT', 'SIGINT');
    await tick();
    expect(server.close).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(proc.exits).toEqual([0, 0]);
  });

  it('registers only once per process', () => {
    const proc = fakeProc();
    const a = registerGracefulShutdown({ logger: silent, proc });
    const b = registerGracefulShutdown({ logger: silent, proc });
    expect(a).toBe(b);
    expect(proc.listenerCount('SIGTERM')).toBe(1);
    a.dispose();
    expect(proc.listenerCount('SIGTERM')).toBe(0);
  });

  it('returns exit code 1 when cleanup exceeds the timeout', async () => {
    const shutdown = createShutdown({ cleanups: [() => new Promise(() => {})], timeoutMs: 20, logger: silent });
    expect(await shutdown('SIGTERM')).toBe(1);
  });

  it('keeps running remaining cleanups after a failure and returns 1', async () => {
    const after = vi.fn();
    const shutdown = createShutdown({
      cleanups: [() => Promise.reject(new Error('boom')), after],
      logger: silent,
    });
    expect(await shutdown('SIGINT')).toBe(1);
    expect(after).toHaveBeenCalledTimes(1);
  });

  it('with exit:false sets exitCode instead of exiting', async () => {
    const proc = fakeProc();
    registerGracefulShutdown({ exit: false, logger: silent, proc });
    proc.emit('SIGTERM', 'SIGTERM');
    await tick();
    expect(proc.exits).toEqual([]);
    expect(proc.exitCode).toBe(0);
  });
});
