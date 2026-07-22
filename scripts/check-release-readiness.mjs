import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const packageRoot = resolve(import.meta.dirname, "..", "packages", "strawn-icons");
const publicIndex = readFileSync(resolve(packageRoot, "src", "index.ts"), "utf8");
const restrictedIcon = resolve(packageRoot, "src", "components", "LinkedInIcon.tsx");

if (publicIndex.includes("LinkedInIcon") || existsSync(restrictedIcon)) {
  console.error("Release blocked: the restricted LinkedIn brand asset must not ship in strawn-icons.");
  process.exit(1);
}

console.log("Brand icon release review passed: the restricted LinkedIn asset is excluded.");
