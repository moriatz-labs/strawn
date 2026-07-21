import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

const [declarationFile, stitchesTypesDirectory] = process.argv.slice(2);
if (!declarationFile || !stitchesTypesDirectory) {
  throw new Error("Provide the bundled declaration file and the Stitches types directory.");
}

const declarationPath = resolve(process.cwd(), declarationFile);
const sourceTypes = resolve(process.cwd(), stitchesTypesDirectory);
const compatibilityDirectory = join(dirname(declarationPath), "_stitches");

function addJavaScriptExtensions(source) {
  return source.replace(
    /(from\s+["'])(\.{1,2}\/[^"']+)(["'])/g,
    (_, prefix, specifier, suffix) => `${prefix}${specifier}.js${suffix}`,
  );
}

mkdirSync(compatibilityDirectory, { recursive: true });

for (const entry of readdirSync(sourceTypes, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".d.ts")) continue;
  const target = join(compatibilityDirectory, basename(entry.name));
  copyFileSync(join(sourceTypes, entry.name), target);

  let source = addJavaScriptExtensions(readFileSync(target, "utf8"));
  source = source.replaceAll("keyof JSX.IntrinsicElements", "keyof React.JSX.IntrinsicElements");
  if (source.includes("React.") && !/from\s+["']react["']/.test(source)) {
    source = `import type * as React from "react";\n${source}`;
  }
  writeFileSync(target, source);
}

let declaration = readFileSync(declarationPath, "utf8");
declaration = declaration
  .replace("import * as Util from './util';", "import * as Util from './_stitches/util.js';")
  .replace("import * as Native from './css';", "import * as Native from './_stitches/css.js';")
  .replace("import * as Config from './config';", "import * as Config from './_stitches/config.js';")
  .replace("import * as ThemeUtil from './theme';", "import * as ThemeUtil from './_stitches/theme.js';")
  .replace("import { CSS as CSS$2 } from '@stitches/react';", "import { CSS as CSS$2 } from './_stitches/index.js';")
  .replaceAll("keyof JSX.IntrinsicElements", "keyof react.JSX.IntrinsicElements");

writeFileSync(declarationPath, declaration);
