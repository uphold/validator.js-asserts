
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';

/**
 * Export `BigNumberEqualToAssert`.
 */

export default function bigNumberEqualToAssert(value) {
  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  /**
   * Class name.
   */

  this.__class__ = 'BigNumberEqualTo';

  if (typeof value === 'undefined') {
    throw new Error('A value is required.');
  }

  this.value = new BigNumber(value);

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    BigNumber.DEBUG = true;

    try {
      const number = new BigNumber(value);

      if (!number.isEqualTo(this.value)) {
        throw new Error();
      }
    } catch (e) {
      const context = { value: this.value.toString() };

      if (e.message.startsWith('[BigNumber Error]')) {
        context.message = e.message;
      }

      throw new Violation(this, value, context);
    }

    return true;
  };

  return this;
}
