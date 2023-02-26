import { readFile } from 'fs/promises';
import { Plugin, ViteDevServer } from 'vite';
import { TEMPLATE_HTML_PATH, CLIENT_ENTRY_PATH } from '../constants/index';

export function viteIndexTemplatePlugin(): Plugin {
  return {
    // @ts-ignore
    name: 'vite-plugin-template-html',
    apply: 'serve',
    // 作用: 自动注入所需script入口文件
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}`,
            },
            injectTo: 'body',
          },
        ],
      };
    },
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
