
/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';
import iban from 'iban';

/**
 * Export `InternationalBankAccountNumberAssert`.
 */

export default function() {

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
