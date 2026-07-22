import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const temporary = mkdtempSync(join(tmpdir(), "strawn-package-check-"));
const fixture = join(temporary, "fixture");
const packageNames = ["strawn-icons", "strawn"];

function run(command, args, options = {}) {
  const { capture = false, ...spawnOptions } = options;
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    shell: process.platform === "win32" && command === "npm",
    stdio: capture ? "pipe" : "inherit",
    ...spawnOptions,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    if (capture) process.stderr.write(result.stderr || result.stdout || "");
    process.exit(result.status ?? 1);
  }
  return result.stdout?.trim();
}

try {
  for (const packageName of packageNames) {
    const cwd = join(root, "packages", packageName);
    run("bunx", ["publint"], { cwd });
    run("npm", ["pack", "--dry-run"], { cwd, capture: true });
    run("npm", ["pack", "--json", "--pack-destination", temporary], { cwd, capture: true });
  }

  const tarballs = Object.fromEntries(
    readdirSync(temporary)
      .filter((file) => file.endsWith(".tgz"))
      .map((file) => [file.startsWith("strawn-icons-") ? "strawn-icons" : "strawn", join(temporary, file)]),
  );
  for (const packageName of packageNames) {
    if (!tarballs[packageName]) throw new Error(`Missing tarball for ${packageName}`);
  }

  mkdirSync(fixture);
  run("npm", ["init", "--yes"], { cwd: fixture });
  const fixtureManifestPath = join(fixture, "package.json");
  const fixtureManifest = JSON.parse(readFileSync(fixtureManifestPath, "utf8"));
  fixtureManifest.private = true;
  fixtureManifest.type = "module";
  writeFileSync(fixtureManifestPath, `${JSON.stringify(fixtureManifest, null, 2)}\n`);

  run("npm", [
    "install",
    "--ignore-scripts",
    "--no-audit",
    "--no-fund",
    tarballs["strawn-icons"],
    tarballs.strawn,
    "react@19.2.0",
    "react-dom@19.2.0",
    "typescript@5.9.3",
    "@types/react@19.2.7",
    "@types/react-dom@19.2.3",
  ], { cwd: fixture });

  writeFileSync(join(fixture, "runtime.mjs"), `
import React from "react";
import { renderToString } from "react-dom/server";
import { Button, CsvImportDialog, ThemeProvider, getCssText, styled } from "strawn";
import { DownloadIcon, GitHubIcon } from "strawn-icons";

const Specimen = styled("div", { color: "$primary" });
const markup = renderToString(
  React.createElement(ThemeProvider, null,
    React.createElement(Specimen, null,
      React.createElement(Button, { leftIcon: React.createElement(DownloadIcon) }, "Import CSV"),
      React.createElement(GitHubIcon, { title: "GitHub" }),
      React.createElement(CsvImportDialog, {
        trigger: React.createElement(Button, null, "Open import"),
        onFileSelect: () => undefined,
      }),
    ),
  ),
);

if (!markup.includes("Import CSV") || !markup.includes("Open import")) {
  throw new Error("SSR output is missing Strawn components");
}
if (!getCssText().includes("--colors-primary")) {
  throw new Error("SSR CSS extraction did not include the Stitches theme");
}
`);

  writeFileSync(join(fixture, "types.tsx"), `
import type { CSS, ColorMode, MotionPreference, StrawnTheme } from "strawn";
import { Button, CsvImportDialog, ThemeProvider, createTheme, css, tokens } from "strawn";
import { DownloadIcon, GitHubIcon } from "strawn-icons";

const mode: ColorMode = "dark";
const motion: MotionPreference = "reduced";
const theme: StrawnTheme = createTheme({ light: { colors: { primary: "#765092" } } });
const styles: CSS = { color: "$primary" };
css(styles);
void tokens.space[4];

export const fixture = (
  <ThemeProvider theme={theme} defaultColorMode={mode} motionPreference={motion}>
    <Button leftIcon={<DownloadIcon />}>Continue</Button>
    <GitHubIcon title="GitHub" />
    <CsvImportDialog trigger={<Button>Import CSV</Button>} onFileSelect={() => undefined} />
  </ThemeProvider>
);
`);

  writeFileSync(join(fixture, "tsconfig.json"), `${JSON.stringify({
    compilerOptions: {
      strict: true,
      noEmit: true,
      jsx: "react-jsx",
      module: "NodeNext",
      moduleResolution: "NodeNext",
      target: "ES2022",
      skipLibCheck: false,
    },
    include: ["types.tsx"],
  }, null, 2)}\n`);

  run("node", ["runtime.mjs"], { cwd: fixture });
  run("node", [join(fixture, "node_modules", "typescript", "bin", "tsc"), "--project", "tsconfig.json"], { cwd: fixture });

  console.log(`Clean fixture installed ${packageNames.map((name) => basename(tarballs[name])).join(" and ")}.`);
  console.log("ESM imports, declarations, SSR rendering, and CSS extraction passed.");
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
