"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteIndexTemplatePlugin = void 0;
const promises_1 = require("fs/promises");
const index_1 = require("../constans/index");
function viteIndexTemplatePlugin() {
    return {
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
                            src: `/@fs/${index_1.CLIENT_ENTRY_PATH}`,
                        },
                        injectTo: 'body',
                    },
                ],
            };
        },
        configureServer(server) {
            return () => {
                server.middlewares.use(async (req, res, next) => {
                    // 读取内容
                    try {
                        let html = await (0, promises_1.readFile)(index_1.TEMPLATE_HTML_PATH, 'utf-8');
                        html = await server.transformIndexHtml(req.url, html, req.originalUrl);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');
                        // 响应给浏览器
                        res.end(html);
                    }
                    catch (e) {
                        return next(e);
                    }
                });
            };
        },
    };
}
exports.viteIndexTemplatePlugin = viteIndexTemplatePlugin;
