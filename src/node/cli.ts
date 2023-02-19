import { cac } from 'cac';
import * as path from 'path';
const { version, name: cliName } = require('../../package.json');

import { createViteServe } from './dev';

const cli = cac(cliName).version(version).help();

cli
  .command('[root] start dev server')
  .alias('dev')
  .action(async (root: string) => {
    root = root ? path.resolve(root) : process.cwd();
    const server = await createViteServe(root);
    await server.listen();
    server.printUrls();
  });

cli
  .command('[root] build for production')
  .alias('build')
  .action(async () => {
    await console.log('building...');
  });

cli.parse();
