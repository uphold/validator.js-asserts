'use strict';

/**
 * Module dependencies.
 */

const { defineConfig } = require('eslint/config');
const uphold = require('eslint-config-uphold');

/**
 * `ESLint` configuration.
 */

module.exports = defineConfig([
  uphold,
  {
    files: ['src/asserts/*.js'],
    name: 'validator.js-asserts/config',
    rules: {
      // Add exception to the `no-underscore-dangle` rule required by validator.js to set the class name.
      'no-underscore-dangle': ['error', { allow: ['__class__'] }]
    }
  },
  {
    name: 'validator.js-asserts/tests',
    rules: {
      'sql-template/no-unsafe-query': 'off'
    }
  }
]);
