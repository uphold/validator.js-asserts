
/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';

/**
 * Account number regex.
 */

const accountNumber = /^(\d){7,8}$/;

/**
 * Export `UkAccountNumberAssert`.
 */

export default function ukAccountNumberAssert(sortCode) {
  /**
   * Optional peer dependencies.
   */

  const Modcheck = require('modcheck');

  /**
   * Class name.
   */

  this.__class__ = 'UkAccountNumber';

  /**
   * Validation algorithm.
   */

  this.validate = (value) => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (typeof sortCode !== 'string') {
      throw new Violation(this, value, { sortCode: Validator.errorCode.must_be_a_string });
    }

    if (!accountNumber.test(value)) {
      throw new Violation(this, value);
    }

    const modcheck = new Modcheck(value, sortCode);

    if (!modcheck.check()) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
