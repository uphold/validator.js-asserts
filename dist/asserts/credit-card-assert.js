'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = creditCardAssert;

var _validator = require('validator.js');

/**
 * Export `CreditCardAssert`.
 */

function creditCardAssert() {
  /**
   * Optional peer dependencies.
   */

  const creditcard = require('creditcard');

  /**
   * Class name.
   */

  this.__class__ = 'CreditCard';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new _validator.Violation(this, value, { value: 'must_be_a_string_or_a_number' });
    }

    if (creditcard.validate(value) !== true) {
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