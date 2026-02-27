## Playwright Demo 1 – Test Framework

This repository contains a Playwright-based end-to-end test framework for web (and mobile-style) flows. It uses a Page Object Model, custom fixtures, tagging, and reporting to keep tests maintainable and fast for a growing SDET team.

### Prerequisites

- **Node.js**: `v20.18.1` (or compatible `>=20.18.1 <21`)
  - Recommended: use `nvm` or another version manager.
- **Package manager**: `npm` (shipped with Node).
- **Browsers**: Installed automatically by Playwright.

### 1. Cloning & Node setup

```bash
git clone <your-repo-url> playwright-demo-1
cd playwright-demo-1

# Use the team Node version
nvm install          # reads .nvmrc and installs v20.18.1
nvm use              # switches your shell to that version
```

If you use another manager (fnm, asdf, Volta), point it at **Node 20.18.1**.

### 2. Install dependencies

```bash
npm install
```

This will also run Playwright’s postinstall hooks to install browsers and set up agents/hooks.

### 3. Environment configuration

This project uses `dotenv` to manage environment variables.

1. Create a `.env` file in the project root (or copy from any provided example, if present).
2. Ensure required variables for your target environment are set.
3. Validate your config:

```bash
npx playwright test tests/setup/validate-env.setup.ts
```

You should see a message that all environment variables are valid.

### 4. Running tests

Common scripts (all run from the project root):

```bash
# Full Playwright run
npm test

# Web smoke / regression suites
npm run test:web:smoke
npm run test:web:regression

# Mobile smoke / regression suites
npm run test:mobile:smoke
npm run test:mobile:regression

# Run a specific test file
npx playwright test tests/web/cart1.test.ts

# Open the Playwright UI test runner
npm run test:ui
```

#### Auth setup & teardown

Some projects rely on pre-authenticated storage state:

```bash
# Generate auth states for web roles
npm run auth:setup
```

Teardown is wired into the global teardown and auth cleanup tests; it runs automatically at the end of test runs.

### 5. Playwright CLI agents (AI helpers)

This repo is wired to use the Playwright CLI agents to help generate, inspect and maintain tests.

```bash
# One-time (or occasional) setup – installs helpers and skills
npm run ai:init

# See available agents and how to invoke them
npm run ai:show
```

Basic flow:

- From your terminal or editor, run `npm run ai:show` to see which agents are available (e.g. test generator, planner, healer).
- Use the examples from that command to invoke an agent against a specific spec, directory, or scenario.
- Agents typically propose changes; always review generated tests/Page Objects before committing them.

> Note: Some advanced AI features may require additional configuration (e.g. Copilot / MCP setup) depending on your environment.

### 6. Reports

#### Playwright HTML report

```bash
# After a test run
npx playwright show-report
```

#### Allure report

```bash
# Generate and open Allure report
npm run allure:generate
npm run allure:open

# Or run tests and immediately serve an Allure report
npm run test:report
```

### 7. Code quality

```bash
# Type-check TypeScript
npm run typecheck

# Lint
npm run lint

# Auto-fix linting / formatting issues
npm run lint:fix
npm run format
```

Husky + lint-staged run linting/formatting on staged files before each commit.

### 8. Project structure (high level)

- `playwright.config.ts` – Playwright projects, test configuration, reporters.
- `src/fixtures/baseTest.ts` – Custom test fixtures (page objects, routes, tags, i18n helper `t()`).
- `src/pages/web/**` – Web Page Objects extending `BasePage` (e.g. catalogue, product).
- `src/pages/common/**` – Shared components/traits like navigation bar and toaster handling.
- `src/utils/i18n.ts` – Type-safe translation helper and translation key types.
- `src/lang/en.json` – English locale strings for UI text and assertions.
- `tests/**` – Test specs (web, mobile, setup/teardown).

### 9. Conventions for contributors

- **Use Page Objects**: Put locators and actions in `src/pages/**`, not directly in tests.
- **Use the `t()` helper**: For any user-facing text in locators or assertions, use `this.t('KEY')` or the `t` fixture in tests.
- **Tag tests**: Use `TAGS` (e.g. `SMOKE`, `REGRESSION`, `AUTH`) so tests participate in the correct project/suite.
- **Keep tests focused**: Each test should verify one main behavior and delegate UI details to page objects.

If you’re new to the project, start by reading `playwright.config.ts`, `src/fixtures/baseTest.ts`, and a few specs under `tests/web` to see patterns in action.

