import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("@functional presents Strawn as one font-only experience", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/font");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Toothpick nation,rise up!");
  await expect(page.getByRole("heading", { name: "Playground" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Inspect" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Weights" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Full list" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Details" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("@functional redirects former design-system routes to the font", async ({ page }) => {
  for (const route of ["/", "/components", "/icons", "/theming", "/nav-lab"]) {
    await page.goto(route);
    await expect(page).toHaveURL(/\/font$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Toothpick nation,rise up!");
  }
});

test("@functional keeps the font tester and glyph inspector keyboard operable", async ({ page }) => {
  await page.goto("/font");
  await page.getByRole("button", { name: "Try the font" }).click();
  await expect(page.getByLabel("Sample text")).toBeFocused();
  await page.getByLabel("Sample text").fill("Lorem ipsum dolor sit amet");
  await expect(page.getByTestId("font-live-sample")).toContainText("Lorem ipsum");

  await page.getByRole("button", { name: "Inspect A", exact: true }).click();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: "Inspect B", exact: true })).toBeFocused();
  await expect(page.getByRole("img", { name: "B aligned to font metrics" })).toBeVisible();
});

test("@functional has no serious accessibility violations", async ({ page }) => {
  await page.goto("/font");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(({ impact }) => impact === "serious" || impact === "critical")).toEqual([]);
});
