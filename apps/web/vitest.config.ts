/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup-vitest.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      '@cn': resolve(__dirname, 'libs/cn.ts'),
    },
  },
});
