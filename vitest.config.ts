import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: { jsx: "automatic" },
  resolve: { dedupe: ["react", "react-dom"] },
  test: {
    environment: "jsdom",
    include: ["quality-tests/unit/**/*.test.tsx"],
    setupFiles: ["./quality-tests/unit/setup.ts"],
    restoreMocks: true,
  },
});
