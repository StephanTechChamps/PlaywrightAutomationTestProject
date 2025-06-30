// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { trace } from "console";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000, // Maximum time expect() should wait for the condition to be met.
  },
  reporter: "html", // Use 'html' for a detailed report, or 'list' for a simple console output.
  // Maximum time one test can run for.

  use: {
    browserName: "webkit", // Use 'chromium', 'firefox', or 'webkit'.
    headless: true,
    screenshot: "on",
    trace: "on",
  },
};

module.exports = config;
