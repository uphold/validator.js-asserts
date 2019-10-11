'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');

/**
 * Export `InternationalBankAccountNumberAssert`.
 */

module.exports = function internationalBankAccountNumberAssert() {
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
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!iban.isValid(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
