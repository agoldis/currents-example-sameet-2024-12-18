# Playwright Global Setup Failure

## Exceptions in `globalSetup`

An uncaught exception in `globalSetup` prevents Playwright from running the tests. Playwright stops the execution and never reports test results to **any** of its reporters (including Currents).

A normal case when `globalSetup` is successful:

```mermaid
sequenceDiagram
    User->>PW: playwright test --project XXX
    PW->>GlobalSetup: run global setup
    GlobalSetup->>GlobalSetup: run
    PW-->>Reporter: running X tests in Y projects

    activate Reporter
    PW-->>Reporter: Done!
    deactivate Reporter

    PW->>User: Done!
```

When `globalSetup` throws:

```mermaid
sequenceDiagram
    User->>PW: playwright test --project XXX
    PW->>GlobalSetup: run global setup
    GlobalSetup->>GlobalSetup: 💥 exception!
    PW-->>Reporter: running 0 tests in 0 projects (no tests)
    activate Reporter

    Reporter->>Reporter: Nothing to report 😔
    deactivate Reporter
    PW->>User: Done
```

## Example

This repo `packages/global-setup`:

- has [`global-setup.ts`](./global-setup.ts) that always throws
- has Currents and the default `html` reporter [configured](./playwright.config.ts): `reporter: [currentsReporter(currentsConfig), ["html"]]`

Running:

```sh
npx playwright test
```

- Playwright doesn't report any tests - only the global error.
- Currents (and other reporters) get no test results.

![currents-2024-12-18-00 34 09@2x](https://github.com/user-attachments/assets/ecb917e1-e838-40bf-a7e6-5f9957dd58cb)

![currents-2024-12-18-00 33 45@2x](https://github.com/user-attachments/assets/24a771ed-a300-45c0-b002-40a68aee26ab)

## Multi-shard Environments

For multi-shard runs, `globalSetup` can succeed on some shards and fail on others.

- Successful shards will scan and report the list of tests that are supposed to be reported, but will only run as subset of tests allocated for the shar
- Failed shards will never run the tests

As a result, Currents marks the associated run as timedout because some tests were never reported.
