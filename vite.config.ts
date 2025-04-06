import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    base: mode === 'production' ? '/' : '/', // Adjust base if needed for production
    build: {
      outDir: 'dist',
    },
  };
});
