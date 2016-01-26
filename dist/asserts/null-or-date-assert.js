'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nullOrDateAssert;

var _validator = require('validator.js');

/**
 * Export `NullOrDateAssert`.
 */

function nullOrDateAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'NullOrDate';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string' && value !== null && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new _validator.Violation(this, value, { value: 'must_be_null_or_a_date' });
    }

    if (value === null) {
      return true;
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new _validator.Violation(this, value);
    }

    return true;
  };

  return this;
}
/**
 * Module dependencies.
 */

module.exports = exports['default'];