'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uuidAssert;

var _validator = require('validator.js');

/**
 * Uuid regexes.
 */

const uuid = {
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
};

/**
 * Export `UuidAssert`.
 */

/**
 * Module dependencies.
 */

function uuidAssert(version) {
  /**
   * Class name.
   */

  this.__class__ = 'Uuid';

  if (version && [3, 4, 5].indexOf(version) === -1) {
    throw new Error('UUID version specified is not supported.');
  }

  /**
   * Uuid version.
   */

  this.version = version || 'all';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    if (uuid[this.version].test(value) !== true) {
      throw new _validator.Violation(this, value, { version: this.version });
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];