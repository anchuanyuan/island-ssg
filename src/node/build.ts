import { build as viteBuild } from 'vite';

import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import * as path from 'path';
//  fs-extra 库
import fs from 'fs-extra';
import { log } from 'console';
//  todo clientBuild 与 serverBuild 相同代码较多可以抽离成公共方法
export async function build(root: string = process.cwd()) {
  // 客户端构建产物 生成到build目录中 构建后用到所需的js等静态资源
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
  // 服务端构建 产物 构建组件代码对应的html字符串
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
  //客户端产物对象
  const clientBuildRes = await clientBuild();
  // debugger
  //  服务端产物 构建只临时目录  buildServer中
  await serverBuild();
  const serverEntryPath = path.join(root, 'buildServer', 'ssr-entry.js');
  const { ssrRender } = await import(serverEntryPath);
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
  await fs.ensureDir(path.join(root, 'build'));
  await fs.writeFile(path.join(root, 'build/index.html'), html);
  // 移除服务端生成的文件
  await fs.remove(path.join(root, 'buildServer'));
}
