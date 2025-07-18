// eslint.config.js
import xo from 'eslint-config-xo';
import xoReact from 'eslint-config-xo-react';
import xoTypeScript from 'eslint-config-xo-typescript';

export default [
	...xo,
  ...xoReact,
  ...xoTypeScript,
	{
    rules: {
	    'curly': 'off',
	    '@stylistic/semi': 'off',
	    '@stylistic/indent': 'off',
	    '@stylistic/no-trailing-spaces': 'off',
	    '@stylistic/object-curly-spacing': 'off',
	    '@stylistic/quotes': 'off',
	    '@stylistic/block-spacing': 'off'	    
    }
	}
];
/*import xo from 'xo';

export default xo.xoToEslintConfig([{space: true, prettier: 'compat', react: true }]);*/

/*import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['/*.{ts,tsx,js,jsx}'],
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
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-deprecated': 'off', 
    },
  },
);*/
