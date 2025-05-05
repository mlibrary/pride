import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import mochaPlugin from 'eslint-plugin-mocha';

export default [
  mochaPlugin.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly'
      }
    }
  },
  {
    plugins: {
      '@stylistic': stylistic
    }
  },
  stylistic.configs.recommended,
  {
    rules: {
      ...pluginJs.configs.all.rules,

      'arrow-body-style': ['error', 'always'],
      'camelcase': 'off',
      'complexity': 'off',
      'default-param-last': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'no-ternary': 'off',
      'no-magic-numbers': 'off',
      'one-var': ['error', { initialized: 'never' }],
      'sort-imports': ['error', { 'ignoreCase': true }], 

      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/spaced-comment': ['error', 'always', { 'block': { 'balanced': true } }],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-line' }],
      '@stylistic/operator-linebreak': ['error', 'before'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', 'always']
    }
  },
  {
    files: ['spec/**/*.spec.js'],
    rules: {
      'mocha/no-exclusive-tests': 'off', // Alow use of `.only` to run specific tests
      'mocha/no-exports': 'off', // Allow exports, such as `siblingFileIsProperty` to reduce repeated code
      'mocha/no-setup-in-describe': 'off', // Allows functions to be called inside `describe` blocks to reduce repeated code
      'mocha/no-skipped-tests': 'off', // Remove this rule when `./spec/Pride/Util/RequestBuffer.spec.js` is rebuilt and passing
      'mocha/no-top-level-hooks': 'off' // Allows functions to use 'before'/'after' hooks to reduce repeated code
    }
  }
];
