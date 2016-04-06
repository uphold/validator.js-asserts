
/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';

/**
 * Bic regex.
 */

const bic = /^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/;

/**
 * Export `BankIdentifierCodeAssert`.
 */

export default function bankIdentifierCodeAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'BankIdentifierCode';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_string });
    }

    if (!bic.test(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
