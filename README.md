# Setup failures in Playwright

This repo demonstrates the differences of reporting for Playwright projects using [`globalSetup` vs project dependencies](https://playwright.dev/docs/test-global-setup-teardown)

- a failure in [`globalSetup`](./packages/global-setup/) prevents reporting
- a failure of a [`setup` project](./packages/project-dependencies/) does more correct reporting

Check out the examples in [./packages](./packages/) directory.

Note: set proper Currents credentials

```ts
const currentsConfig: CurrentsConfig = {
  recordKey: "xxx",
  projectId: "xxx",
};
```
