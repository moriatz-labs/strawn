import { build } from "esbuild";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { execSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const budgets = { strawn: 150 * 1024, "strawn-icons": 50 * 1024 };

for (const [packageName, budget] of Object.entries(budgets)) {
  const output = execSync("npm pack --json --dry-run", {
    cwd: join(root, "packages", packageName),
    encoding: "utf8",
  });
  const [{ size }] = JSON.parse(output);
  console.log(`${packageName}: ${(size / 1024).toFixed(1)} KB / ${(budget / 1024).toFixed(0)} KB tarball budget`);
  if (size > budget) process.exitCode = 1;
}

const temporary = mkdtempSync(join(tmpdir(), "strawn-bundle-"));
try {
  const entry = join(temporary, "entry.tsx");
  const outfile = join(temporary, "bundle.js");
  writeFileSync(entry, 'import { DownloadIcon } from "strawn-icons"; export { DownloadIcon };');
  await build({ entryPoints: [entry], outfile, bundle: true, format: "esm", minify: true, external: ["react"], absWorkingDir: root, nodePaths: [join(root, "node_modules")] });
  const bytes = gzipSync(readFileSync(outfile)).byteLength;
  console.log(`single icon: ${bytes} bytes gzip / 1024 byte budget`);
  if (bytes > 1024) process.exitCode = 1;
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
