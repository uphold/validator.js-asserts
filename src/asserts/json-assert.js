
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';

/**
 * Export `JsonAssert`.
 */

export default function jsonAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'JSON';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    try {
      JSON.parse(value);
    } catch (e) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
