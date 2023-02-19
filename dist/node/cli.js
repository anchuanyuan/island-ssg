"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = require("cac");
const path = require("path");
const { version, name: cliName } = require('../../package.json');
const dev_1 = require("./dev");
const cli = (0, cac_1.cac)(cliName).version(version).help();
cli
    .command('[root] start dev server')
    .alias('dev')
    .action(async (root) => {
    root = root ? path.resolve(root) : process.cwd();
    const server = await (0, dev_1.createViteServe)(root);
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
