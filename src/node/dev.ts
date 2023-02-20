import { createServer } from 'vite';
import { viteIndexTemplatePlugin } from './vite-plugins/indexHtmlPlugin';

export async function createViteServe(root = process.cwd()) {
  return createServer({
    root,
    plugins: [viteIndexTemplatePlugin()],
  });
}
