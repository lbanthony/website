import { defineConfig, devices } from "@playwright/test";

const previewURL = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  use: { baseURL: previewURL || "http://127.0.0.1:3000", trace: "retain-on-failure" },
  webServer: previewURL ? undefined : {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "tablet",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 768, height: 1024 },
      },
    },
    { name: "iphone", use: { ...devices["iPhone 13"] } },
    { name: "small-iphone", use: { ...devices["iPhone SE"] } },
  ],
});
