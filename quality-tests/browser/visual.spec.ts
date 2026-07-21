import { expect, test } from "@playwright/test";

const widths = [375, 768, 1440, 1920];

for (const width of widths) {
  test(`@visual ${width}px remains centered without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/components/csv-import-dialog");
    await page.getByRole("button", { name: "Import CSV" }).click();
    await expect(page.getByRole("dialog", { name: "Import CSV" })).toBeVisible();
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      viewport: document.documentElement.clientWidth,
    }));
    expect(metrics.overflow).toBe(false);
    const box = await page.getByRole("button", { name: "Choose CSV file" }).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(metrics.viewport - (width <= 375 ? 32 : 48));
    expect(box!.height).toBeGreaterThanOrEqual(180);
  });
}
