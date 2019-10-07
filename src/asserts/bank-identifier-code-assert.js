
/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';

/**
 * Bic regex.
 */

const bic = /^[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}$/i;

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
