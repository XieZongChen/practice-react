import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  base: '/practice-react/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  dev: {
    sourcemap: true,
  },
  build: {
    sourcemap: true,
    outDir: 'docs',
  },
});
