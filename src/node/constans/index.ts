import * as path from 'path';

export const PACKAGE_ROOT = path.join(__dirname, '../../../');

export const TEMPLATE_HTML_PATH = path.join(PACKAGE_ROOT, 'src/template.html');

console.log(TEMPLATE_HTML_PATH);
