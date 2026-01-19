'use strict';

/**
 * Module dependencies.
 */

import { defineConfig } from 'eslint/config';
import uphold from 'eslint-config-uphold';

/**
 * `ESLint` configuration.
 */

export default defineConfig([
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
