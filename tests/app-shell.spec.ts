import { expect, test } from "@playwright/test";

test("mobile navigation opens, focuses, closes with Escape, and targets departments", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile navigation behavior is tested on the mobile project.");
  await page.goto("/");
  const menu = page.locator('button[aria-controls="mobile-navigation"]');
  await menu.focus();
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Foundation sections" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Overview" })).toBeFocused();
  for (const id of ["media-lab", "playlist-studio", "social-studio", "converter-lab", "research-desk", "asset-desk"]) {
    await expect(page.locator(`#department-${id}`)).toHaveCount(1);
    await expect(page.getByRole("link", { name: new RegExp(id.replaceAll("-", " "), "i") })).toHaveAttribute("href", id === "social-studio" ? "/social-studio" : `#department-${id}`);
  }
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
});

test("department grid resets responsive borders at two and three columns", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop grid geometry is tested on the desktop project.");
  await page.goto("/");
  const cards = page.locator(".department-grid > article");
  await expect(cards).toHaveCount(6);

  for (const width of [640, 767, 768, 800, 1023]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(cards.nth(0)).toHaveCSS("border-right-width", "2px");
    await expect(cards.nth(1)).toHaveCSS("border-right-width", "0px");
    await expect(cards.nth(4)).toHaveCSS("border-bottom-width", "0px");
    await expect(cards.nth(5)).toHaveCSS("border-bottom-width", "0px");
  }

  await page.setViewportSize({ width: 639, height: 900 });
  await expect(cards.nth(0)).toHaveCSS("border-right-width", "0px");

  for (const width of [1024, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(cards.nth(0)).toHaveCSS("border-right-width", "2px");
    await expect(cards.nth(1)).toHaveCSS("border-right-width", "2px");
    await expect(cards.nth(2)).toHaveCSS("border-right-width", "0px");
    await expect(cards.nth(5)).toHaveCSS("border-right-width", "0px");
    await expect(cards.nth(4)).toHaveCSS("border-bottom-width", "0px");
  }
});

test("interactive controls expose visible focus and Space Mono resolves", async ({ page }) => {
  await page.goto("/");
  const home = page.getByRole("link", { name: "RADARKit home" });
  await home.focus();
  await expect(home).toHaveCSS("outline-style", "solid");
  await expect(page.locator(".eyebrow").first()).toHaveCSS("font-family", /Space Mono/);
});
