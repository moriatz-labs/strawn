import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("@functional renders the documentation shell without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("focused design system");
  await expect(page.getByRole("navigation", { name: "Documentation" })).toBeVisible();
  expect(errors).toEqual([]);
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
  for (const path of ["/", "/components", "/components/csv-import-dialog", "/icons", "/theming"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === "serious" || impact === "critical"), path).toEqual([]);
  }
});
