import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/node/cli.ts'],
  bundle: true,
  splitting: true,
  shims: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
});
