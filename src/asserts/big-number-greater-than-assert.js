
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';

/**
 * Export `BigNumberGreaterThanAssert`.
 */

export default function bigNumberGreaterThanAssert(threshold) {
  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberGreaterThan';

  if (typeof threshold === 'undefined') {
    throw new Error('A threshold value is required.');
  }

  this.threshold = new BigNumber(threshold);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    try {
      const number = new BigNumber(value);

      if (!number.greaterThan(this.threshold)) {
        throw new Error();
      }
    } catch (e) {
      const context = { threshold: this.threshold.toString() };

      if (e.name === 'BigNumber Error') {
        context.message = e.message;
      }

      throw new Violation(this, value, context);
    }

    return true;
  };

  return this;
}
