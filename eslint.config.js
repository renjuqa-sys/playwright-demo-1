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

      // Enforcing "Private Locator" team standard
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
