import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("@functional renders the documentation shell without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("clear thread");
  const headingSize = await page.getByRole("heading", { level: 1 }).evaluate((heading) => Number.parseFloat(getComputedStyle(heading).fontSize));
  expect(headingSize).toBeGreaterThanOrEqual(40);
  await expect(page.getByRole("navigation", { name: "Documentation" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("@functional thread signature updates its live readout", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Language/ }).click();
  await expect(page.getByTestId("thread-readout")).toContainText("3 faces");
  await expect(page.getByTestId("thread-readout")).toContainText("Bricolage");
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
  for (const path of ["/", "/components", "/components/csv-import-dialog", "/icons", "/navbar-lab", "/theming"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === "serious" || impact === "critical"), path).toEqual([]);
  }
});
