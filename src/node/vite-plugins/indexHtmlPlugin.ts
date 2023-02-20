import { readFile } from 'fs/promises';
import { Plugin, ViteDevServer } from 'vite';
import { TEMPLATE_HTML_PATH } from '../constans/index';

export function viteIndexTemplatePlugin(): Plugin {
  return {
    name: 'vite-plugin-template-html',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // 读取内容
          try {
            let html = await readFile(TEMPLATE_HTML_PATH, 'utf-8');
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            // 响应给浏览器
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    },
  };
}
