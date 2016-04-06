
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';

/**
 * Export `CreditCardAssert`.
 */

export default function creditCardAssert() {
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
      throw new Violation(this, value, { value: 'must_be_a_string_or_a_number' });
    }

    if (creditcard.validate(value) !== true) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
