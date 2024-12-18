import { CurrentsConfig, currentsReporter } from "@currents/playwright";
import { defineConfig, devices } from "@playwright/test";

const currentsConfig: CurrentsConfig = {
  recordKey: "xxx",
  projectId: "yyy",
};

const config = defineConfig({
  retries: 0,
  workers: 1,

  timeout: 30000,
  fullyParallel: true,
  reporter: [currentsReporter(currentsConfig), ["html"]],

  expect: {
    timeout: 500,
  },
  globalSetup: "./global-setup",
  use: {
    trace: "on",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",
});

export default config;