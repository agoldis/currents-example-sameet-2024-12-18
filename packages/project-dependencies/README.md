# Playwright Setup Project Failure

## Failed `setup` project

Playwright has [project dependencies](https://playwright.dev/docs/test-global-setup-teardown) that can be used instead of `globalSetup`. A typical use case would be to have a `setup` project that implements an equivalent of `globalSetup`.

`setup` project has a few advantages compared to `globalSetup`, from [Playwright documentation](https://playwright.dev/docs/test-global-setup-teardown) + [pending PR](https://github.com/microsoft/playwright/pull/34063):

> Using `globalSetup` and `globalTeardown` will not produce traces or artifacts, and options like `headless` or `testIdAttribute` specified in the config file are not applied. If you want to produce traces and artifacts and respect config options, use project dependencies.

## Example

This directory has `setup` project that is a [dependency](./playwright.config.ts) for the main project:

```ts
projects: [
    {
      name: "setup",
      testMatch: "setup.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "chromium",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
```

Even if `setup` project fails, Playwright correctly reports **all the results** to the reporters, marking all the tests in the dependent projects as `skipped`.

```sh
npx playwright test
```

![currents-2024-12-18-00 53 05@2x](https://github.com/user-attachments/assets/1e318bef-f2e1-4859-bcdd-b97a2d9f526e)

![currents-2024-12-18-00 52 10@2x](https://github.com/user-attachments/assets/c0f0d5fc-20cf-4ba0-a92e-93ca08392e82)

![currents-2024-12-18-00 54 33@2x](https://github.com/user-attachments/assets/f811c835-7240-4511-8d58-e34d410cfcc5)
