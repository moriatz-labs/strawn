import { expect, test, type Page } from "@playwright/test";

const widths = [320, 375, 768, 862, 1440, 1920];

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
    await expect(page.getByRole("heading", { level: 1, name: "One font. One React icon library." })).toBeVisible();
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
    expect(palette).toEqual({ background: "#ffffff", surface: "#ffffff", primary: "#0a0a0a" });

    await page.goto("/font");
    await expect(page.getByRole("heading", { level: 1, name: "Moriatz Sans" })).toBeAttached();
    const fontMetrics = await horizontalLayout(page);
    expect(fontMetrics.overflow, JSON.stringify(fontMetrics.offenders)).toBe(false);
    const fontPageBox = await page.locator(".font-page").boundingBox();
    expect(fontPageBox).not.toBeNull();
    expect(fontPageBox!.x).toBeGreaterThanOrEqual(0);
    expect(fontPageBox!.x + fontPageBox!.width).toBeLessThanOrEqual(fontMetrics.viewport + 1);
  });
}
