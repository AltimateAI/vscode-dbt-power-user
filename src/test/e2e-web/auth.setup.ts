import playwright from "playwright-core";
import { test as setup, expect } from "@playwright/test";

const authFile = "./.auth/user.json";

setup("authenticate", async ({}) => {
  const browser = await playwright.chromium.launchPersistentContext(
    process.env.CHROME_PROFILE_PATH,
    { headless: false, channel: "chrome", args: ["--start-maximized"] },
  );

  const page = await browser.newPage();
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://github.com/login");
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL("https://github.com/");
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  //   await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
