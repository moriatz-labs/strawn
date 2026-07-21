import { mkdirSync, readFileSync } from "node:fs";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const root = resolve(import.meta.dirname, "..");
const reports = resolve(root, ".lighthouseci");
const profile = resolve(root, ".cache", `lighthouse-profile-${Date.now()}`);
mkdirSync(reports, { recursive: true });
mkdirSync(profile, { recursive: true });

function freePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolvePort(address.port));
    });
  });
}

async function waitFor(url, attempts = 120) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The preview server or Chrome debugger is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function run(command, args) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: "inherit", windowsHide: true });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolveRun() : reject(new Error(`${command} exited with ${code}`)));
  });
}

const previewPort = await freePort();
const debugPort = await freePort();
const preview = spawn("bun", ["run", "--cwd", "apps/docs", "preview", "--host", "127.0.0.1", "--port", String(previewPort)], {
  cwd: root,
  stdio: "ignore",
  windowsHide: true,
});
const chrome = spawn(chromium.executablePath(), [
  "--headless=new",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--no-sandbox",
  "--no-first-run",
  "--no-default-browser-check",
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profile}`,
  "about:blank",
], { cwd: root, stdio: "ignore", windowsHide: true });

const failures = [];

try {
  await Promise.all([
    waitFor(`http://127.0.0.1:${previewPort}/`),
    waitFor(`http://127.0.0.1:${debugPort}/json/version`),
  ]);

  for (const [name, pathname] of [["root", "/"], ["components", "/components"]]) {
    const reportPath = resolve(reports, `${name}.json`);
    await run("bun", [
      "x", "lighthouse", `http://127.0.0.1:${previewPort}${pathname}`,
      `--port=${debugPort}`,
      "--output=json",
      `--output-path=${reportPath}`,
      "--only-categories=performance,accessibility,best-practices,seo",
      "--preset=desktop",
      "--quiet",
    ]);

    const report = JSON.parse(readFileSync(reportPath, "utf8"));
    const scores = Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)]));
    const lcp = report.audits["largest-contentful-paint"].numericValue;
    const cls = report.audits["cumulative-layout-shift"].numericValue;
    console.log(`${pathname} — performance ${scores.performance}, accessibility ${scores.accessibility}, best-practices ${scores["best-practices"]}, SEO ${scores.seo}, LCP ${Math.round(lcp)}ms, CLS ${cls.toFixed(3)}`);

    for (const [category, score] of Object.entries(scores)) {
      if (score < 90) failures.push(`${pathname} ${category} score ${score} is below 90`);
    }
    if (lcp >= 2500) failures.push(`${pathname} LCP ${Math.round(lcp)}ms is not below 2500ms`);
    if (cls >= 0.1) failures.push(`${pathname} CLS ${cls.toFixed(3)} is not below 0.1`);
  }
} finally {
  preview.kill();
  chrome.kill();
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
