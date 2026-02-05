import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import playwrightPlugin from 'eslint-plugin-playwright';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    // Apply these rules to all TypeScript files
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      playwright: playwrightPlugin,
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

      // Enforcing your "Private Locator" team standard
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
