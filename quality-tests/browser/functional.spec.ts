import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("@functional renders the documentation shell without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toHaveText("Tools with a clear thread.");
  await expect(heading).toHaveCSS("text-transform", "none");
  const headingSize = await page.getByRole("heading", { level: 1 }).evaluate((heading) => Number.parseFloat(getComputedStyle(heading).fontSize));
  expect(headingSize).toBeGreaterThanOrEqual(40);
  await expect(page.getByRole("navigation", { name: "Documentation" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("@functional constrains the homepage to a narrower visual viewport", async ({ browser }) => {
  const visualWidth = 862;
  const context = await browser.newContext({ viewport: { width: 1366, height: 958 } });
  await context.addInitScript((width) => {
    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: {
        width,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      },
    });
  }, visualWidth);
  const page = await context.newPage();

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-compact-visual-viewport", "true");

  for (const selector of [".docs-marketing-nav", ".page-shell", ".hero", ".thread-console", ".principles"]) {
    const box = await page.locator(selector).boundingBox();
    expect(box, selector).not.toBeNull();
    expect(box!.x, selector).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width, selector).toBeLessThanOrEqual(visualWidth + 1);
  }

  const heroColumns = await page.locator(".hero").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" "));
  expect(heroColumns).toHaveLength(1);
  await context.close();
});

test("@functional thread signature updates its live readout", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Language/ }).click();
  await expect(page.getByTestId("thread-readout")).toContainText("1 face");
  await expect(page.getByTestId("thread-readout")).toContainText("Moriatz Sans");
});

test("@functional Moriatz Sans owns every typography role", async ({ page }) => {
  await page.goto("/font");
  await page.evaluate(() => document.fonts.ready);
  const families = await page.locator("body, h1, .font-live-sample, .font-glyphs, .font-details dd").evaluateAll((elements) => (
    elements.map((element) => getComputedStyle(element).fontFamily)
  ));
  expect(families.length).toBeGreaterThanOrEqual(4);
  for (const family of families) expect(family).toContain("Moriatz Sans Variable");
});

test("@functional Moriatz Sans balances mixed-case cap, x-height, ascender, and descender zones", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const metrics = await page.getByRole("heading", { level: 1 }).evaluate((heading) => {
    const style = getComputedStyle(heading);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas context is unavailable");
    context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const measure = (glyph: string) => {
      const result = context.measureText(glyph);
      return { ascent: result.actualBoundingBoxAscent, descent: result.actualBoundingBoxDescent };
    };
    return { cap: measure("T"), xHeight: measure("o"), ascender: measure("h"), descender: measure("g") };
  });

  expect(metrics.xHeight.ascent / metrics.cap.ascent).toBeGreaterThan(0.65);
  expect(metrics.xHeight.ascent / metrics.cap.ascent).toBeLessThan(0.8);
  expect(metrics.ascender.ascent / metrics.cap.ascent).toBeGreaterThan(0.85);
  expect(metrics.ascender.ascent).toBeGreaterThan(metrics.xHeight.ascent);
  expect(metrics.descender.descent).toBeGreaterThan(0);
});

test("@functional font page exposes an editable variable-weight specimen", async ({ page }) => {
  await page.goto("/font");
  await expect(page.getByRole("heading", { level: 1, name: "Moriatz Sans" })).toBeVisible();

  const sampleInput = page.getByLabel("Sample text");
  await sampleInput.fill("DARKER SYSTEMS");
  await expect(page.getByTestId("font-live-sample")).toHaveText("DARKER SYSTEMS");

  const weightInput = page.getByLabel("Weight");
  await weightInput.fill("700");
  await expect(page.getByTestId("font-live-sample")).toHaveCSS("font-weight", "700");

  await page.getByRole("button", { name: "Inspect A", exact: true }).click();
  await expect(page.getByRole("img", { name: "A aligned to font metrics" })).toBeVisible();
  await expect(page.getByText("Cap height", { exact: true }).first()).toBeVisible();
});

test("@functional documentation stays light when stored and system preferences are dark", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("strawn-color-mode", "dark");
    window.localStorage.setItem("strawn-docs-color-mode-v2", "dark");
    window.localStorage.setItem("strawn-docs-color-mode-v3", "dark");
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-color-mode", "light");
  await expect(page.locator("html")).toHaveAttribute("data-color-mode-preference", "light");
  const palette = await page.locator("html").evaluate((element) => ({
    background: getComputedStyle(element).getPropertyValue("--background").trim(),
    primary: getComputedStyle(element).getPropertyValue("--primary").trim(),
  }));
  expect(palette).toEqual({ background: "#ffffff", primary: "#0a0a0a" });
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(({ impact }) => impact === "serious" || impact === "critical")).toEqual([]);
});

test("@functional removable badge keeps a 44px keyboard-operable target", async ({ page }) => {
  await page.goto("/components");
  const removeButton = page.getByRole("button", { name: "Remove Generic tag" });
  const box = await removeButton.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
  await removeButton.focus();
  await page.keyboard.press("Enter");
  await expect(removeButton).toHaveCount(0);
});

test("@functional navbar lab compares five compact keyboard-operable glass directions", async ({ page }) => {
  await page.goto("/navbar-lab");
  await expect(page.getByRole("heading", { level: 1, name: "Glass, with structure." })).toBeVisible();
  await expect(page.locator("main nav[aria-label$='preview']")).toHaveCount(5);

  for (const action of await page.locator("main .glass-nav-action").all()) {
    const box = await action.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeLessThanOrEqual(96);
  }

  const firstAction = page.getByRole("link", { name: "GitHub, Original capsule preview" });
  await firstAction.focus();
  await expect(firstAction).toBeFocused();
});

test("@functional CSV dialog opens only from its trigger and accepts a file", async ({ page }) => {
  await page.goto("/components/csv-import-dialog");
  await expect(page.getByRole("dialog", { name: "Import CSV" })).toHaveCount(0);
  await page.getByRole("button", { name: "Import CSV" }).click();
  const dialog = page.getByRole("dialog", { name: "Import CSV" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Choose CSV file" })).toBeFocused();
  await page.locator('input[type="file"][aria-label="Choose CSV file"]').setInputFiles({
    name: "people.csv",
    mimeType: "text/csv",
    buffer: Buffer.from("name,birthday\nAda,1815-12-10"),
  });
  await expect(dialog).toHaveCount(0);
  await expect(page.getByText("Selected people.csv")).toBeVisible();
});

test("@functional has no serious accessibility violations", async ({ page }) => {
  for (const path of ["/", "/components", "/components/csv-import-dialog", "/icons", "/font", "/navbar-lab", "/theming"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === "serious" || impact === "critical"), path).toEqual([]);
  }
});
