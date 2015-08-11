
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';

/**
 * Export `DateAssert`.
 */

export default function() {

  /**
   * Class name.
   */

  this.__class__ = 'Date';

  /**
   * Validation algorithm.
   */

  this.validate = (value) => {
    if (typeof value !== 'string' && Object.prototype.toString.call(value) !== '[object Date]') {
      throw new Violation(this, value, { value: 'must_be_a_date_or_a_string' });
    }

    if (isNaN(Date.parse(value)) === true) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
