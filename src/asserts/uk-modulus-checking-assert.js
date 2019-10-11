'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');

/**
 * Export `UkModulusCheckingAssert`.
 */

module.exports = function ukModulusCheckingAssert() {
  /**
   * Optional peer dependencies.
   */

  const UkModulusChecking = require('uk-modulus-checking');

  /**
   * Class name.
   */

  this.__class__ = 'UkModulusChecking';

  /**
   * Validation algorithm.
   */

  this.validate = ({ accountNumber, sortCode } = {}) => {
    if (typeof accountNumber !== 'string') {
      throw new Violation(this, accountNumber, { accountNumber: Validator.errorCode.must_be_a_string });
    }

    if (typeof sortCode !== 'string') {
      throw new Violation(this, sortCode, { sortCode: Validator.errorCode.must_be_a_string });
    }

    const ukModulusChecking = new UkModulusChecking({ accountNumber, sortCode });

    if (!ukModulusChecking.isValid()) {
      throw new Violation(this, { accountNumber, sortCode });
    }

    return true;
  };

  return this;
}
