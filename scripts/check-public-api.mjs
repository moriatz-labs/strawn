import { readFileSync, readdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const currentFile = resolve(import.meta.filename);
const packageNames = ["strawn", "strawn-icons"];
const forbiddenExports = ["app", "data", "integrations", "ai", "collaboration", "commerce", "account", "marketing", "markdown"];
const failures = [];

for (const packageName of packageNames) {
  const manifest = JSON.parse(readFileSync(join(root, "packages", packageName, "package.json"), "utf8"));
  if (manifest.name !== packageName) failures.push(`${packageName} manifest name is ${manifest.name}`);
  if (JSON.stringify(Object.keys(manifest.exports)) !== JSON.stringify(["."])) {
    failures.push(`${packageName} must expose only its root entrypoint`);
  }
}

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && [".git", "node_modules", "dist", ".cache", ".lighthouseci"].includes(entry.name)) return [];
    return entry.isDirectory() ? sourceFiles(path) : [path];
  });
}

for (const file of sourceFiles(root).filter((file) => [".ts", ".tsx", ".json", ".md", ".yml"].includes(extname(file)))) {
  if (resolve(file) === currentFile) continue;
  const content = readFileSync(file, "utf8");
  if (/(@paul\/|paul-design-system|paul-(?:spin|progress|skeleton))/i.test(content)) {
    failures.push(`${file.slice(root.length + 1)} contains a legacy design-system identifier`);
  }
}

const strawnIndex = readFileSync(join(root, "packages/strawn/src/index.ts"), "utf8").toLowerCase();
for (const name of forbiddenExports) {
  if (strawnIndex.includes(`/${name}`) || strawnIndex.includes(`.${name}`)) failures.push(`strawn exports forbidden ${name} surface`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Public API is limited to the two Strawn root entrypoints.");
