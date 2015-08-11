
/**
 * Module dependencies.
 */

import { Assert, Violation } from 'validator.js';

/**
 * Export `NullOrStringAssert`.
 */

export default function(boundaries) {

  /**
   * Class name.
   */

  this.__class__ = 'NullOrString';

  /**
   * Boundaries.
   */

  boundaries = boundaries || {};

  this.min = boundaries.min;
  this.max = boundaries.max;

  /**
   * Validation algorithm.
   */

  this.validate = (value) => {
    if (value !== null && typeof value !== 'string') {
      throw new Violation(this, value, { value: 'must_be_null_or_a_string' });
    }

    if (value === null) {
      return true;
    }

    if (typeof value === 'string' && typeof this.min === 'undefined' && typeof this.max === 'undefined') {
      return true;
    }

    try {
      new Assert().Length({ min: this.min, max: this.max }).validate(value);
    } catch (e) {
      throw new Violation(this, value, e.violation);
    }

    return true;
  };

  return this;
}
