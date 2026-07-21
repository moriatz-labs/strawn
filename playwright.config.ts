import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./quality-tests/browser",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  projects: [
    { name: "functional", testMatch: /functional\.spec\.ts/ },
    { name: "visual", testMatch: /visual\.spec\.ts/ },
  ],
  use: {
    baseURL: "http://127.0.0.1:4183",
    browserName: "chromium",
    colorScheme: "light",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "bun run --cwd apps/docs preview -- --host 127.0.0.1 --port 4183",
    port: 4183,
    reuseExistingServer: false,
  },
});
