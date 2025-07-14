import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginNext from '@next/eslint-plugin-next';

export default [
  {
    plugins: {
      '@next/next': pluginNext,
    },
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      ...pluginNext.configs.recommended.rules,
      // If you want Core Web Vitals too:
       ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
//  pluginNext(),
  tseslint.config(
    {
      files: ['**/*.{ts,tsx}'],
    },
    {
      ignores: ['node_modules/'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: { project: './tsconfig.json' }
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
      }
    }
  )
];
