import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import playwrightPlugin from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    // Apply these rules to all TypeScript files
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      playwright: playwrightPlugin,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json', // This tells ESLint to look at your aliases defined in tsconfig.json
        },
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...playwrightPlugin.configs.recommended.rules,

      // --- GENERAL CODE QUALITY RULES ---
      'prefer-const': 'warn', //Suggest using const for varaibles that are never reassigned after declaration
      'no-console': 'warn', //Warn against using console.log and other console methods in production code
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], //Error on unused variables, but ignore those that start with an underscore (commonly used for intentionally unused parameters)
      '@typescript-eslint/no-explicit-any': 'off', //Allow the use of the 'any' type in TypeScript, which can be useful in certain situations where type safety is not a concern or when dealing with third-party libraries that do not have type definitions.
      'import/no-unresolved': 'error', // Specifically checks if an import can be found

      // --- MODERN PLAYWRIGHT STANDARDS ---
      // 'playwright/no-raw-locators': 'error', //Warn against using raw locators like css selectors or XPath in Playwright tests, encouraging the use of more robust locator strategies (e.g., data-testid attributes) for better test maintainability and reliability.
      'playwright/prefer-native-locators': 'error', //This will error if someone uses page.locator('button') instead of the more resilient page.getByRole('button')
      'playwright/missing-playwright-await': 'error', // Ensure all actions are awaited to prevent unhadled promise rejections
      'playwright/no-focused-test': 'error', //Prevent commitetd code from containing focused tests (e.g. test.only)

      // --- ALIAS ENFORCEMENT RULES ---
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['src/constants/*', 'src/pages/*', 'src/fixtures/*', 'src/utils/*'],
              message: 'Please use path aliases (e.g., @constants/tags) instead of relative paths or src/ paths.',
            },
          ],
        },
      ],

      // --- CODE STYLE ENFORCEMENT RULES ---
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
            accessors: 'explicit',
            properties: 'explicit',
            methods: 'explicit',
          },
        },
      ],
    },
  },
  {
    ignores: ['node_modules/', 'test-results/', 'playwright-report/'],
  },
  eslintConfigPrettier,
];
