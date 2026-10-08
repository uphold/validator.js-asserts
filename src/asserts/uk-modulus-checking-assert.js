'use strict';

/**
 * Module dependencies.
 */

const { Validator, Violation } = require('validator.js');
let UkModulusChecking;

/**
 * Optional peer dependencies.
 */

try {
  UkModulusChecking = require('uk-modulus-checking');
  // eslint-disable-next-line no-empty
} catch {}

/**
 * Export `UkModulusCheckingAssert`.
 */

module.exports = function ukModulusCheckingAssert() {
  if (!UkModulusChecking) {
    throw new Error('uk-modulus-checking is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'UkModulusChecking';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    // A default parameter only applies to `undefined`, so `validate(null)` used to reach the
    // destructuring pattern and threw `TypeError: Cannot destructure property 'accountNumber' of
    // '(intermediate value)' as it is null`. `Assert.check()` swallows any throw and returns it as
    // the failure value, so a nullable body field produced a TypeError instead of a
    // `must_be_a_string` violation, turning a 400-class input error into a 500.
    if (value === null || typeof value !== 'object') {
      throw new Violation(this, value, { accountNumber: Validator.errorCode.must_be_a_string });
    }

    const { accountNumber, sortCode } = value;

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
};
