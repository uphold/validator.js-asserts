'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usZipCodeAssert;

var _validator = require('validator.js');

/**
 * US zip code regular expression.
 */

const regexp = new RegExp(/^\d{5}(?:[- ]?\d{4})?$/);

/**
 * Export `UsZipCodeAssert`.
 */

/**
 * Module dependencies.
 */

function usZipCodeAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'UsZipCode';

  /**
   * Validation algorithm.
   */

  this.validate = function (value) {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    if (!regexp.test(value)) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
module.exports = exports['default'];