import { readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const assets = resolve(import.meta.dirname, "..", "apps", "docs", "dist", "assets");
const files = readdirSync(assets);
const javascript = files.filter((file) => file.endsWith(".js"));
const fonts = files.filter((file) => file.endsWith(".woff2"));
const sizeOf = (names) => names.reduce((total, file) => total + statSync(join(assets, file)).size, 0);
const javascriptBytes = sizeOf(javascript);
const fontBytes = sizeOf(fonts);

console.log(`specimen JavaScript: ${(javascriptBytes / 1024).toFixed(1)} KB / 500 KB budget`);
console.log(`Strawn webfont: ${(fontBytes / 1024).toFixed(1)} KB / 32 KB budget`);

if (javascript.length !== 1) {
  console.error(`Expected one JavaScript entry chunk, found ${javascript.length}.`);
  process.exitCode = 1;
}
if (fonts.length !== 1) {
  console.error(`Expected one Strawn WOFF2 asset, found ${fonts.length}.`);
  process.exitCode = 1;
}
if (javascriptBytes > 500 * 1024 || fontBytes > 32 * 1024) process.exitCode = 1;
