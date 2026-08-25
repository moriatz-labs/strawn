import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const files = globSync(["apps/docs/src/**/*.{ts,tsx,css}"], { cwd: root })
  .filter((file) => !file.replaceAll("\\", "/").includes("/dist/") && !file.replaceAll("\\", "/").includes("/node_modules/"));
const exemptTimingFiles = new Set();
const violations = [];

for (const file of files) {
  const normalized = file.replaceAll("\\", "/");
  const lines = readFileSync(resolve(root, file), "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/transition\s*:\s*["']?all\b/.test(line)) violations.push(`${normalized}:${index + 1} uses transition: all`);
    if (/willChange|will-change/.test(line)) violations.push(`${normalized}:${index + 1} uses permanent will-change`);
    if (/transition\s*:\s*["'][^"']*\bwidth\b/.test(line)) violations.push(`${normalized}:${index + 1} animates width`);
    if (/scale\(0(?:\)|,)/.test(line)) violations.push(`${normalized}:${index + 1} scales from zero`);
    if (!exemptTimingFiles.has(normalized) && /(transition|animation)\s*:/.test(line) && /\b\d+(?:\.\d+)?m?s\b/.test(line)) {
      violations.push(`${normalized}:${index + 1} uses a raw motion duration`);
    }
  });
}

if (violations.length) {
  console.error(`Motion policy failed with ${violations.length} violation(s):`);
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log(`Motion policy passed across ${files.length} source files.`);
}
