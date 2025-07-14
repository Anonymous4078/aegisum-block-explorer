// eslint.config.mjs (or .js if "type": "module" is set)

import pluginNext from '@next/eslint-plugin-next';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  // 1️⃣ Register Next.js plugin
  {
    plugins: { '@next/next': pluginNext },
  },
  // 2️⃣ Apply rules for .ts/.tsx files, including Next's recommended set
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: { project: './tsconfig.json' },
    },
    extends: [],  // flat config doesn't support `extends`, so we copy rules manually
    rules: {
      ...pluginNext.configs.recommended.rules,
      // Uncomment for Core Web Vitals support:
      // ...pluginNext.configs['core-web-vitals'].rules,

      // Your custom rules:
      'dot-notation': 'error',
      eqeqeq: 'error',
      // …other ESLint rules…
    },
  },
  // 3️⃣ Add your TypeScript strict & stylistic rules
  tseslint.config(
    { files: ['**/*.{ts,tsx}'] },
    { ignores: ['node_modules/'] },
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked
  ),
];
