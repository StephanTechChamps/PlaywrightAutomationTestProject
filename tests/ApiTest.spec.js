const {test,expect} = require("@playwright/test");

const userName = "stephan@techchamps.io";
const password = "Susanne81";


test('@smoke @regression @apiTest', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    expect(await page.title()).toBe("Let's Shop");
    expect(await page.locator("input[id='userEmail']").isVisible()).toBeTruthy();
    await page.locator("input[id='userEmail']").fill(userName);
    await page.locator("input[id='userPassword']").fill(password);
    await page.locator("#login").click();
});

test('@smoke @regression @apiTest second test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    expect(await page.title()).toBe("Let's Shop");
    expect(await page.locator("input[id='userEmail']").isVisible()).toBeTruthy();
    await page.locator("input[id='userEmail']").fill(userName);
    await page.locator("input[id='userPassword']").fill(password);
    await page.locator("#logn").click();
});

test('@smoke @regression second test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    expect(await page.title()).toBe("Let's Shop");
    expect(await page.locator("input[id='userEmail']").isVisible()).toBeTruthy();
    await page.locator("input[id='userEmail']").fill(userName);
    await page.locator("input[id='userPassword']").fill(password);
    await page.locator("#logn").click();
});