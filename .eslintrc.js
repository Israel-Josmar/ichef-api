module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  plugins: ['jest'],
  env: {
    node: true,
    'jest/globals': true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {},
}
