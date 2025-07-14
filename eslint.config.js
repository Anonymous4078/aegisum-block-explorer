import pluginNext from '@next/eslint-plugin-next';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    plugins: { '@next/next': pluginNext },
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      ...pluginNext.configs.recommended.rules,
      // optionally include core-web-vitals:
      // ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  tseslint.config(
    { files: ['**/*.{ts,tsx}'] },
    { ignores: ['node_modules/'] },
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: { project: './tsconfig.json' },
      },
    },
    {
      rules: {
        'dot-notation': 'error',
        eqeqeq: 'error',
        'no-var': 'error',
        // … other custom rules …
      },
    }
  ),
];
