import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
//import next from 'eslint-config-next';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.url });

export default [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript']
  }),
  tseslint.config(
  {
    files: ['**/*.{ts}'],
  },
  {
    ignores: ['node_modules/'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    rules: {
      // eslint
      'dot-notation': 'error',
      eqeqeq: 'error',
      'no-caller': 'error',
      'no-constant-condition': ['error', { checkLoops: false }],
      'no-eval': 'error',
      'no-extra-bind': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-return-await': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'unicode-bom': ['error', 'never'],

      // @typescript-eslint/eslint-plugin
      /* '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-deprecated': 'off', */
    },
  },
)]
