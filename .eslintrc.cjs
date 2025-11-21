// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { resolve } = require('node:path')

// eslint-disable-next-line no-undef
const project = resolve(process.cwd(), 'tsconfig.json')

/** @type { import("eslint").Linter.BaseConfig } */
// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parserOptions: {
    project,
  },
  parser: '@typescript-eslint/parser',
  env: { browser: true, es6: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['unused-imports', 'react-hooks', 'prettier', 'react-refresh'],
  ignorePatterns: [
    '.eslintrc.*js',
    'public',
    'dist',
    'node_modules',
    '.cache',
    '.vscode',
    '.idea',
    '.turbo',
  ],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
    },
    {
      files: ['**/*.*js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
    {
      files: ['**/*.js?(x)'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: '2015',
      },
    },
    {
      files: ['*.json'], // Specify the extension or pattern you want to parse as JSON.
      parser: 'jsonc-eslint-parser',
    },
    {
      // server 폴더에 대한 별도 설정
      files: ['server/**/*.ts'],
      parserOptions: {
        project: './tsconfig.server.json', // server 전용 tsconfig 사용
      },
      env: {
        browser: false, // 브라우저 환경 비활성화
        node: false, // Node.js 환경 비활성화
        es6: true,
      },
      rules: {
        // Google Apps Script 환경에 맞는 규칙 조정
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'no-console': 'off', // Logger 사용을 위해 console 허용
      },
    },
  ],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'require-await': 'error',
    'no-unused-expressions': [2, { allowShortCircuit: false, allowTernary: false }],
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-misused-promises': 'off',
  },
}
