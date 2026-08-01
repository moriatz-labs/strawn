import { expect, test, type Page } from "@playwright/test";

const widths = [320, 375, 768, 1440, 1920];

async function horizontalLayout(page: Page) {
  return page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    viewport: document.documentElement.clientWidth,
    offenders: Array.from(document.querySelectorAll<HTMLElement>("body *"))
      .map((element) => ({ element: element.tagName.toLowerCase(), className: String(element.className), bounds: element.getBoundingClientRect().toJSON() }))
      .filter(({ bounds }) => bounds.left < -1 || bounds.right > document.documentElement.clientWidth + 1)
      .slice(0, 8),
  }));
}

for (const width of widths) {
  test(`@visual ${width}px documentation routes remain centered without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Tools with a clear thread." })).toBeVisible();
    const homeMetrics = await horizontalLayout(page);
    expect(homeMetrics.overflow, JSON.stringify(homeMetrics.offenders)).toBe(false);
    const heroBox = await page.locator(".hero").boundingBox();
    expect(heroBox).not.toBeNull();
    expect(heroBox!.x).toBeGreaterThanOrEqual(0);
    expect(heroBox!.x + heroBox!.width).toBeLessThanOrEqual(homeMetrics.viewport + 1);
    const palette = await page.locator("html").evaluate((element) => ({
      background: getComputedStyle(element).getPropertyValue("--background").trim(),
      surface: getComputedStyle(element).getPropertyValue("--surface").trim(),
      primary: getComputedStyle(element).getPropertyValue("--primary").trim(),
    }));
    expect(palette).toEqual({ background: "#ffffff", surface: "#ffffff", primary: "#5b3cc4" });

    await page.goto("/components");
    await expect(page.getByRole("heading", { level: 1, name: "A precise kit for product work." })).toBeVisible();
    const componentMetrics = await horizontalLayout(page);
    expect(componentMetrics.overflow, JSON.stringify(componentMetrics.offenders)).toBe(false);
    const workflowBox = await page.locator(".workflow-specimen").boundingBox();
    expect(workflowBox).not.toBeNull();
    expect(workflowBox!.x).toBeGreaterThanOrEqual(0);
    expect(workflowBox!.x + workflowBox!.width).toBeLessThanOrEqual(componentMetrics.viewport + 1);

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
