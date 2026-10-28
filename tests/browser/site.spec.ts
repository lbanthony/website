import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("page loads local images, has no horizontal overflow, and passes accessibility checks", async ({
  page,
}) => {
  const errors: string[] = [];
  const externalRequests: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:3000"))
      externalRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Hi, I’m Laura/,
  );
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(() =>
      page.evaluate(() =>
        [...document.images]
          .filter((i) => i.loading !== "lazy")
          .every((i) => i.complete && i.naturalWidth > 0),
      ),
    )
    .toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  const violations = results.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => ({ target: n.target, reason: n.failureSummary })),
  }));
  expect(violations).toEqual([]);
  expect(errors).toEqual([]);
  expect(externalRequests).toEqual([]);
  await expect(page.getByRole("link", { name: "Say hello" })).toHaveAttribute(
    "href",
    "mailto:lbanthony91@gmail.com",
  );
});

test("questions stay in the browser and project details open by tap and keyboard", async ({
  page,
}) => {
  const chatRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/api/chat")) chatRequests.push(request.url());
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Why private AI?" }).click();
  await expect(page.locator(".answer-copy")).toContainText(
    "organization-owned infrastructure",
  );
  await page.getByRole("button", { name: "Clear answer" }).click();
  await expect(page.getByRole("textbox")).toBeFocused();
  await page.getByRole("textbox").fill("What’s the weather?");
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".answer-copy")).toContainText("couldn’t match");
  expect(chatRequests).toEqual([]);
  await page.locator("#mills-lake summary").click();
  await expect(page.locator("#mills-lake")).toHaveAttribute("open", "");
  await expect(page.locator("#mills-lake .project-expanded")).toContainText(
    "compilation",
  );
  await page.locator("#mills-lake summary").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#mills-lake")).not.toHaveAttribute("open", "");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
