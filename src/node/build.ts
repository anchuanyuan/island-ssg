import { build as viteBuild } from 'vite';

import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import * as path from 'path';
//  fs-extra 库
import * as fs from 'fs-extra';
import { log } from 'console';

export async function build(root: string = process.cwd()) {
  // todo
  const clientBuild = async () => {
    return viteBuild({
      mode: 'production',
      root,
      build: {
        outDir: 'build',
        rollupOptions: {
          input: CLIENT_ENTRY_PATH,
          output: {
            format: 'esm',
          },
        },
      },
    });
  };
  const serverBuild = async () => {
    return viteBuild({
      mode: 'production',
      root,
      build: {
        ssr: true,
        outDir: 'buildServer',
        rollupOptions: {
          input: SERVER_ENTRY_PATH,
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

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle
) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
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
    <div id="app">${appHtml}</div>
    <script type="module" src="/${clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
  await fs.ensureDir(path.join(root, 'buildClient'));
  await fs.writeFile(path.join(root, 'build/index.html'), html);
  await fs.remove(path.join(root, 'buildServer'));
}
