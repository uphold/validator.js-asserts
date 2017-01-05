
/**
 * Module dependencies.
 */

import { Violation, Assert as is } from 'validator.js';

/**
 * Export `CreditCardVerificationValueAssert`.
 */

export default function creditCardVerificationValueAssert(type) {
  /**
   * Class name.
   */

  this.__class__ = 'CreditCardVerificationValue';

  /**
   * Check if `type` is defined.
   */

  if (typeof type === 'undefined') {
    throw new Error('A type value is required.');
  }

  /**
   * Card type.
   */

  this.type = type;

  /**
   * Validation algorithm.
   */

  this.validate = function(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new Violation(this, value, { value: 'must_be_a_string_or_a_number' });
    }

    const length = this.type === 'AMEX' ? 4 : 3;

    try {
      is.ofLength({ max: length, min: length }).validate(value.toString());
    } catch (e) {
      throw new Violation(this, value, e.violation);
    }

    return true;
  };

  return this;
};
