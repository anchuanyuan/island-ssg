"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_HTML_PATH = exports.PACKAGE_ROOT = void 0;
const path = require("path");
exports.PACKAGE_ROOT = path.join(__dirname, '../../../');
exports.TEMPLATE_HTML_PATH = path.join(exports.PACKAGE_ROOT, 'src/template.html');
console.log(exports.TEMPLATE_HTML_PATH);
