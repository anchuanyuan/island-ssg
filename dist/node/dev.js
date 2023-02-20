"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViteServe = void 0;
const vite_1 = require("vite");
const indexHtmlPlugin_1 = require("./vite-plugins/indexHtmlPlugin");
const plugin_react_1 = require("@vitejs/plugin-react");
async function createViteServe(root = process.cwd()) {
    return (0, vite_1.createServer)({
        root,
        plugins: [(0, indexHtmlPlugin_1.viteIndexTemplatePlugin)(), (0, plugin_react_1.default)()],
    });
}
exports.createViteServe = createViteServe;
