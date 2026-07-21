import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/components/*.tsx", "src/types/*.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  bundle: false,
  splitting: false,
  clean: true,
  outDir: "dist",
});
