
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';
import BigNumber from 'bignumber.js';

/**
 * Export `BigNumberAssert`.
 */

export default function() {

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
