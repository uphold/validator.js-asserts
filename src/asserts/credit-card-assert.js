'use strict';

/**
 * Module dependencies.
 */

const { Violation } = require('validator.js');
let creditcard;

/**
 * Optional peer dependencies.
 */

try {
  creditcard = require('creditcard');
  // eslint-disable-next-line no-empty
} catch {}

/**
 * Export `CreditCardAssert`.
 */

module.exports = function creditCardAssert() {
  if (!creditcard) {
    throw new Error('creditcard is not installed');
  }

  /**
   * Class name.
   */

  this.__class__ = 'CreditCard';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    // A card number is an identifier, not a quantity: it must be carried as a string. Accepting a
    // JS number silently loses precision, because `String(Number(x))` rounds any value above
    // 2^53. The Luhn-valid 19-digit `7992739871000000003` validated as a string but failed as a
    // number (`'7992739871000000000'`), so a number supplied by a form or a JSON parser was
    // checked against a different value than the one the customer typed.
    if (typeof value !== 'string') {
      throw new Violation(this, value, { value: 'must_be_a_string' });
    }

    if (creditcard.validate(value) !== true) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
};
