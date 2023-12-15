import { test, expect } from "@playwright/test";
import playwright from "playwright-core";
import { getLineagePanelIframe, getQueryPanelIframe } from "./utils";

test("test", async ({ page }) => {
  // const browser = await playwright.chromium.connectOverCDP('ws://127.0.0.1:9222/devtools/browser/da743e66-ac39-4282-a12c-51b750a4ef83');
  // const browser = await playwright.chromium.launchPersistentContext(
  //   "/Users/saravanan/projects/altimate/chromeprofile",
  //   { headless: false, channel: "chrome", args: ["--start-maximized"] }
  // );

  // const page = await browser.newPage();
  test.setTimeout(120000);
  await page.goto(process.env.APP_URL);
  await expect(
    page
      .getByText(
        "Thanks for installing dbt Power User. Do you need help setting up the extension?",
      )
      .first(),
  ).toBeInViewport({ timeout: 120000 });
  await page.getByText("Query Results").click();
  await getQueryPanelIframe(page)
    .getByRole("spinbutton", { name: "Query Limit" })
    .fill("10");
  await expect(
    getQueryPanelIframe(page).getByRole("spinbutton", { name: "Query Limit" }),
  ).toHaveValue("10");

  await page.locator(".command-center-quick-pick").click();
  await page
    .getByPlaceholder(
      "Search files by name (append : to go to line or @ to go to symbol)",
    )
    .fill("customer");
  await page
    .locator("a")
    .filter({ hasText: /^customers\.sql$/ })
    .click();
  await page.getByRole("tab", { name: "Lineage" }).getByText("Lineage").click();
  await getLineagePanelIframe(page)
    .locator("[data-id='model.jaffle_shop.stg_customers']")
    .click();
  const viewDetailsButton = getLineagePanelIframe(page)
    .locator("[data-id='model.jaffle_shop.stg_customers']")
    .getByText("View Details");
  console.log(viewDetailsButton);
  await getLineagePanelIframe(page)
    .locator("[data-id='model.jaffle_shop.stg_customers']")
    .getByText("View Details")
    .click();
  await getLineagePanelIframe(page)
    .locator("[data-id='model.jaffle_shop.stg_customers']")
    .getByText("View Details")
    .click();

  await expect(
    getLineagePanelIframe(page).locator("#sidebar").getByText("stg_customers"),
  ).toBeVisible();
});
