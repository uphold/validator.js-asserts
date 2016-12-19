
/**
 * Module dependencies.
 */

import { Validator, Violation } from 'validator.js';

/**
 * Int regex.
 */

const int = {
  signed: /^(?:[-+]?(?:0|[1-9][0-9]*))$/,
  unsigned: /^(?:\d+)$/
};

/**
 * Export `IntegerAssert`.
 */

export default function integerAssert({ allowString = false, unsigned = false } = {}) {
  /**
   * Class name.
   */

  this.__class__ = 'Integer';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'number' && !allowString) {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_a_number });
    }

    if (unsigned && int.unsigned.test(value) !== true) {
      throw new Violation(this, value);
    }

    if (int.signed.test(value) !== true) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
