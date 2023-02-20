"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPage = exports.build = void 0;
const vite_1 = require("vite");
const constants_1 = require("./constants");
const path = require("path");
//  fs-extra 库
const fs = require("fs-extra");
async function build(root = process.cwd()) {
    // todo
    const clientBuild = async () => {
        return (0, vite_1.build)({
            mode: 'production',
            root,
            build: {
                outDir: 'build',
                rollupOptions: {
                    input: constants_1.CLIENT_ENTRY_PATH,
                    output: {
                        format: 'esm',
                    },
                },
            },
        });
    };
    const serverBuild = async () => {
        return (0, vite_1.build)({
            mode: 'production',
            root,
            build: {
                ssr: true,
                outDir: 'buildServer',
                rollupOptions: {
                    input: constants_1.SERVER_ENTRY_PATH,
                    output: {
                        format: 'cjs',
                    },
                },
            },
        });
    };
    const clientBuildRes = await clientBuild();
    await serverBuild();
    //  serverEntry产物如何引入????
    const serverEntryPath = path.join(root, 'buildServer', 'ssr-entry.js');
    const { ssrRender } = require(serverEntryPath);
    await renderPage(ssrRender, root, clientBuildRes);
}
exports.build = build;
async function renderPage(render, root, clientBundle) {
    const clientChunk = clientBundle.output.find((chunk) => chunk.type === 'chunk' && chunk.isEntry);
    console.log(`Rendering page in server side...`);
    const appHtml = render();
    const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
    await fs.ensureDir(path.join(root, 'buildClient'));
    await fs.writeFile(path.join(root, 'build/index.html'), html);
    await fs.remove(path.join(root, 'buildServer'));
}
exports.renderPage = renderPage;
