import { expect, test, type Page } from "@playwright/test";

const widths = [320, 375, 768, 862, 1440, 1920];

async function horizontalLayout(page: Page) {
  return page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    viewport: document.documentElement.clientWidth,
  }));
}

for (const width of widths) {
  test(`@visual ${width}px font specimen remains centered without horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/font");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const layout = await horizontalLayout(page);
    expect(layout.overflow).toBe(false);
    const fontPage = await page.locator(".font-page").boundingBox();
    expect(fontPage).not.toBeNull();
    expect(fontPage!.x).toBeGreaterThanOrEqual(0);
    expect(fontPage!.x + fontPage!.width).toBeLessThanOrEqual(layout.viewport + 1);
  });
}
