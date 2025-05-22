import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import'
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix'
import nextPlugin from '@next/eslint-plugin-next'
import stylisticPlugin from '@stylistic/eslint-plugin'

// Define ignored patterns - be explicit and separate from the configurations
const IGNORE_PATTERNS = [
  '.next/**',
  'dist_worker/**',
  '**/dist_worker/**',
  'dist_hourly/**',
  'local/**',
  'prisma/generated/**',
]

export default [
  // Base ignores
  {
    ignores: [
      '.next',
      '.next/**',
      '**/.next/**',
      'eslint.config.mjs',
      '**/*.d.ts',
      ...IGNORE_PATTERNS
    ]
  },
  {
    ...js.configs.all,
    ignores: IGNORE_PATTERNS,
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: IGNORE_PATTERNS,
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      react: reactPlugin,
      'sort-keys-fix': sortKeysFixPlugin,
      '@next/next': nextPlugin,
      '@stylistic': stylisticPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        __dirname: true,
        console: true,
        process: true,
        React: true,
        window: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': ['error'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      'capitalized-comments': 'off',
      'complexity': 'off',
      'consistent-return': 'off',
      'curly': ['error', 'multi-line'],
      'func-names': ['error', 'as-needed'],
      'func-style': 'off',
      'id-length': 'off',
      'import/first': 'error',
      'import/order': 'error',
      'init-declarations': 'off',
      'line-comment-position': 'off',
      'max-statements': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-params': 'off',
      'multiline-comment-style': 'off',
      'new-cap': 'off',
      'no-await-in-loop': 'off',
      'no-continue': 'off',
      'no-inline-comments': 'off',
      'no-magic-numbers': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-shadow': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-vars': 'off',
      'no-void': ['error', { allowAsStatement: true }],
      'no-warning-comments': 'off',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'prefer-destructuring': 'off',
      'react/forbid-component-props': 'off',
      'react/jsx-max-props-per-line': 'off',
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx'],
        },
      ],
      'react/jsx-indent': 'off',
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-max-depth': 'off',
      'react/jsx-newline': 'off',
      'react/jsx-no-bind': 'off',
      'react/jsx-no-literals': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-one-prop-per-line': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'sort-imports': 'off',
      'sort-keys': 'off',
      'sort-keys-fix/sort-keys-fix': 'error',
      'sort-vars': 'off',
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/max-len': [
        'error',
        {
          code: 120,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/jsx-max-props-per-line': ['error', { 'maximum': 1, 'when': 'multiline' }],
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
      '@stylistic/jsx-indent': ['error', 2],
      '@stylistic/jsx-indent-props': ['error', 2],
      '@stylistic/indent': ['error', 2],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      '@stylistic/eol-last': ['error', 'always']
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    ignores: IGNORE_PATTERNS,
    rules: {
      'one-var': ['error', 'never'],
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]
