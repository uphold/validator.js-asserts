'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');

/**
 * Account number regex.
 */

const accountNumberRegex = /^[a-zA-Z0-9]{5,17}$/;

/**
 * Export `AbaAccountNumberAssert`.
 */

module.exports = function abaAccountNumberAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'AbaAccountNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!accountNumberRegex.test(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
