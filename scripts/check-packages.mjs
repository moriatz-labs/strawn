import { spawnSync } from "node:child_process";

for (const packageName of ["strawn", "strawn-icons"]) {
  const cwd = `packages/${packageName}`;
  for (const [command, args] of [
    ["bunx", ["publint"]],
    ["npm", ["pack", "--dry-run"]],
  ]) {
    const result = spawnSync(command, args, { cwd, shell: process.platform === "win32", stdio: "inherit" });
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
}

console.log("Package metadata and tarball contents are valid.");
