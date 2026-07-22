import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const [file] = process.argv.slice(2);
if (!file) throw new Error("Provide the built JavaScript file to update.");
const path = resolve(process.cwd(), file);
const content = readFileSync(path, "utf8");
if (!content.startsWith('"use client";')) writeFileSync(path, `"use client";\n${content}`);
