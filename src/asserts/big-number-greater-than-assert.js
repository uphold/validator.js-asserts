
/**
 * Module dependencies.
 */

import BigNumberAssert from './big-number-assert';
import { Assert as BaseAssert, Violation } from 'validator.js';

/**
 * Export `BigNumberGreaterThanAssert`.
 */

export default function bigNumberGreaterThanAssert(threshold, { validateSignificantDigits = true } = {}) {
  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  BigNumber.DEBUG = !!validateSignificantDigits;

  /**
   * Extend `Assert` with `BigNumberAssert`.
   */

  const Assert = BaseAssert.extend({ BigNumber: BigNumberAssert });

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberGreaterThan';

  if (typeof threshold === 'undefined') {
    throw new Error('A threshold value is required.');
  }

  new Assert().BigNumber({ validateSignificantDigits }).validate(threshold);

  this.threshold = new BigNumber(threshold);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    new Assert().BigNumber({ validateSignificantDigits }).validate(value);

    try {
      const number = new BigNumber(value);

      if (!number.isGreaterThan(this.threshold)) {
        throw new Error();
      }
    } catch (e) {
      const context = { threshold: this.threshold.toString() };

      if (e.message.startsWith('[BigNumber Error]')) {
        context.message = e.message;
      }

      throw new Violation(this, value, context);
    }

    return true;
  };

  return this;
}
