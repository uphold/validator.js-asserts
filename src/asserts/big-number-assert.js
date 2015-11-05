
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';

/**
 * Export `BigNumberAssert`.
 */

export default function() {

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

  this.validate = (value) => {
    try {
      new BigNumber(value);
    } catch (e) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
