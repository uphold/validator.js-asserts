'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nullOrStringAssert;

var _validator = require('validator.js');

/**
 * Export `NullOrStringAssert`.
 */

function nullOrStringAssert(boundaries) {
  /**
   * Class name.
   */

  this.__class__ = 'NullOrString';

  /**
   * Boundaries.
   */

  boundaries = boundaries || {};

  this.min = boundaries.min;
  this.max = boundaries.max;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (value !== null && typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: 'must_be_null_or_a_string' });
    }

    if (value === null) {
      return true;
    }

    if (typeof value === 'string' && typeof this.min === 'undefined' && typeof this.max === 'undefined') {
      return true;
    }

    try {
      _validator.Assert.ofLength({ max: this.max, min: this.min }).validate(value);
    } catch (e) {
      throw new _validator.Violation(this, value, e.violation);
    }

    return true;
  };

  return this;
}
/**
 * Module dependencies.
 */

module.exports = exports['default'];