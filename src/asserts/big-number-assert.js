
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';

/**
 * Export `BigNumberAssert`.
 */

export default function bigNumberAssert() {
  /**
   * Optional peer dependencies.
   */

  const BigNumber = require('bignumber.js');

  /**
   * Class name.
   */

  this.__class__ = 'BigNumber';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    try {
      new BigNumber(value); // eslint-disable-line no-new
    } catch (e) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
