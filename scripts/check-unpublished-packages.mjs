import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const packageNames = ["strawn", "strawn-icons"];
const unpublished = [];

for (const packageDirectory of packageNames) {
  const manifest = JSON.parse(readFileSync(join(root, "packages", packageDirectory, "package.json"), "utf8"));
  const specifier = `${manifest.name}@${manifest.version}`;
  const result = spawnSync("npm", ["view", specifier, "version", "--json"], {
    cwd: root,
    encoding: "utf8",
    shell: process.platform === "win32",
  });

  if (result.status === 0) continue;
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  if (/E404|404 Not Found|is not in this registry/i.test(output)) {
    unpublished.push(specifier);
    continue;
  }
  throw new Error(`Unable to query ${specifier}:\n${output.trim()}`);
}

console.error(unpublished.length ? `Unpublished versions: ${unpublished.join(", ")}` : "All package versions are already published.");
console.log(`should-publish=${unpublished.length > 0}`);
