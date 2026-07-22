import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  splitting: true,
  treeshake: true,
  clean: true,
  outDir: "dist",
});
