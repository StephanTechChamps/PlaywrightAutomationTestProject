const { test, expect } = require("@playwright/test");
const { log } = require("console");

const globalmenubutton = "[id='globalnav-menubutton-link-bag']";
const ciclythingie =
  "[class='ac-gn-bagview-nav-image-container'] g[id='person.crop.circle_regular']";

test("@smoke @regression First playwright test", async ({ page }) => {
  await page.goto("https://apple.com");
  expect(await page.title()).toBe("Apple");
  await page.locator(globalmenubutton).click();
  await page.locator(ciclythingie).click();
});

test("@regression Second playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  await expect(page).toHaveTitle("Google");
});
test("@regression Third playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  await expect(page).toHaveTitle("Google");
});

test("@regression Fourth playwright test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/LoginpagePractise/");
});
