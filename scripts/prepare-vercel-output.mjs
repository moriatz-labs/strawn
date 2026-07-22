import { access, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const docsDist = resolve(repositoryRoot, "apps/docs/dist");
const outputRoot = resolve(repositoryRoot, ".vercel/output");
const staticOutput = resolve(outputRoot, "static");

await access(resolve(docsDist, "index.html"));
await rm(outputRoot, { force: true, recursive: true });
await mkdir(staticOutput, { recursive: true });
await cp(docsDist, staticOutput, { recursive: true });

const config = {
  version: 3,
  routes: [
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/index.html" },
  ],
};

await writeFile(
  resolve(outputRoot, "config.json"),
  `${JSON.stringify(config, null, 2)}\n`,
  "utf8",
);

console.log("Prepared Vercel Build Output API artifact from apps/docs/dist.");
