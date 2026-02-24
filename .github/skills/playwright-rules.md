# 🎭 Playwright Framework: Gold Standard Rules

This document defines the architectural rules for the `playwright-demo-1` repository. AI Agents and human contributors MUST follow these patterns.

## 1. Authentication & Role Management
- **Centralized Auth**: Do NOT perform manual logins in test files.
- **Roles**: Use the `UserRole` enum (`Admin`, `Customer`, `Guest`).
- **Setup**: All authentication is handled by `tests/auth/auth.setup.ts`. 
- **Credentials**: Fetch credentials via `getCredentialForRole(role, workerIndex)` to ensure parallel test safety.

## 2. Page Object Model (POM) Architecture
- **Fixture Injection**: Always use the custom fixtures from `fixtures/baseTest.ts`. 
- **Usage**:
  - `webLoginPage`: For all login/account actions.
  - `webProductPage`: For catalog and shirt selection.
- **Strict Isolation**: Spec files should only contain assertions and high-level actions. Locators must live inside Page classes as `protected readonly` properties.

## 3. Locator Strategy (Priority Order)
1. **User-Facing Attributes**: `page.getByTestId()`, `page.getByRole()`, `page.getByLabel()`.
2. **Text**: `page.getByText()` (only for static UI elements).
3. **Avoid**: Never use CSS classes (e.g., `.btn-primary`) or XPath, as these are brittle and fail when the site theme updates.

## 4. Test Data & State
- **Independent Tests**: Every test must be capable of running in isolation. 
- **Session Cleanup**: If a test modifies a cart or account, ensure it clears state or uses a fresh session to avoid "dirty state" failures.
- **Environment**: Use `process.env.BASE_URL` via the `dotenv` configuration.

## 5. Coding Standards (Linter Friendly)
- **Assertions**: Every test MUST have at least one `expect()`.
- **Async/Await**: Every Playwright action must be awaited.
- **Naming**: Tests should be named `[feature].spec.ts` and reside in `tests/web/` or `tests/mobile/`.