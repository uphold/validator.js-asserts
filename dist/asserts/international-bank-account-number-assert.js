'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = internationalBankAccountNumberAssert;

var _validator = require('validator.js');

/**
 * Export `InternationalBankAccountNumberAssert`.
 */

function internationalBankAccountNumberAssert() {
  /**
   * Optional peer dependencies.
   */

  const iban = require('iban');

  /**
   * Class name.
   */

  this.__class__ = 'InternationalBankAccountNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new _validator.Violation(this, value, { value: _validator.Validator.errorCode.must_be_a_string });
    }

    if (!iban.isValid(value)) {
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