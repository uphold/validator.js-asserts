'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dateAssert;

var _validator = require('validator.js');

/**
 * Export `DateAssert`.
 */

function dateAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'Date';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string' && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new _validator.Violation(this, value, { value: 'must_be_a_date_or_a_string' });
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