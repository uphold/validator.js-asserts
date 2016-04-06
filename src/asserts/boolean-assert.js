
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';

/**
 * Export `BooleanAssert`.
 */

export default function booleanAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'Boolean';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (typeof value !== 'boolean') {
      throw new Violation(this, value, { value: 'must_be_a_boolean' });
    }

    return true;
  };

  return this;
}
