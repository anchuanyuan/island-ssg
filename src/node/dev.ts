import { createServer } from 'vite';
import { viteIndexTemplatePlugin } from './vite-plugins/indexHtmlPlugin';

import pluginReact from '@vitejs/plugin-react';

export async function createViteServe(root = process.cwd()) {
  return createServer({
    root,
    plugins: [viteIndexTemplatePlugin(), pluginReact()],
  });
}
