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

for (const width of [320, 375]) {
  test(`@visual ${width}px inspector metrics do not overlap`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/font");
    const layout = await page.evaluate(() => {
      const labels = [...document.querySelectorAll<HTMLElement>(".font-inspector-labels span")]
        .map((label) => label.getBoundingClientRect());
      const svg = document.querySelector<SVGElement>(".font-inspector-stage svg")?.getBoundingClientRect();
      const overlaps = labels.some((first, index) => labels.slice(index + 1).some((second) =>
        first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top
      ));
      return { overlaps, labelsBottom: Math.max(...labels.map(({ bottom }) => bottom)), svgTop: svg?.top ?? 0 };
    });
    expect(layout.overlaps).toBe(false);
    expect(layout.labelsBottom).toBeLessThanOrEqual(layout.svgTop);
  });
}

for (const width of [1440, 1920]) {
  test(`@visual ${width}px hero aligns optically with the navbar label`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/font");
    const alignment = await page.evaluate(() => {
      const brand = document.querySelector<HTMLElement>(".docs-nav-brand");
      const heading = document.querySelector<HTMLElement>(".font-hero-title");
      const description = document.querySelector<HTMLElement>(".font-hero-description");
      if (!brand?.firstChild || !heading || !description) return null;
      const range = document.createRange();
      range.selectNodeContents(brand.firstChild);
      const descriptionRect = description.getBoundingClientRect();
      return {
        brand: range.getBoundingClientRect().left,
        heading: heading.getBoundingClientRect().left,
        description: { left: descriptionRect.left, width: descriptionRect.width },
      };
    });
    expect(alignment).not.toBeNull();
    expect(Math.abs(alignment!.brand - alignment!.heading)).toBeLessThanOrEqual(1);
    expect(Math.abs(alignment!.description.left - alignment!.heading)).toBeLessThanOrEqual(1);
    expect(alignment!.description.width).toBeGreaterThan(1000);
  });
}
