const { test, expect, request } = require("@playwright/test");
let token;
const loginPayload = {
  userEmail: "stephan@techchamps.io",
  userPassword: "Susanne81",
};

test.beforeAll(async () => {
  // login to the API and get the token
  // this is done only once before all tests
  // we can use the token in the beforeEach hook to set it in local storage
  // so that it is available in the browser context for all tests
  // this is a good practice to avoid logging in for each test
  // and to speed up the tests
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginJsonResponseJson = await loginResponse.json();
  token = await loginJsonResponseJson.token;
});

test.beforeEach(async ({ page }) => {
  // before each test, set the token in local storage
  // this will make the token available in the browser context
  // so that we don't have to log in for each test
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
});

test("@regression Run first test", async ({ page }) => {
  // This test will run after the beforeAll hook and beforeEach hook
  // and will have the token set in local storage
  // so we can access the protected resources without logging in again
  // this is a good practice to avoid logging in for each test
  // and to speed up the tests
  await page.goto("https://rahulshettyacademy.com/client/");
  expect(await page.title()).toBe("Let's Shop");
  expect(
    await page
      .locator("//p[normalize-space()='Automation Practice']")
      .isVisible()
  ).toBeTruthy();
  //   expect(await page.title()).toBe("Let's Shop");
  //   expect(await page.locator("input[id='userEmail']").isVisible()).toBeTruthy();
  //   await page.locator("input[id='userEmail']").fill(userName);
  //   await page.locator("input[id='userPassword']").fill(password);
  //   await page.locator("#login").click();
});
