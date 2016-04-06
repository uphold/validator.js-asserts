
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';

/**
 * Export `NullOrDateAssert`.
 */

export default function nullOrDateAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'NullOrDate';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'string' && value !== null && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new Violation(this, value, { value: 'must_be_null_or_a_date' });
    }

    if (value === null) {
      return true;
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
