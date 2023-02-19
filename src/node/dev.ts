import { createServer } from 'vite';

export async function createViteServe(root = process.cwd()) {
  return createServer({
    root,
  });
}
