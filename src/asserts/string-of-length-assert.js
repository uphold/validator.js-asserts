
/**
 * Module dependencies.
 */

import { Assert as is } from 'validator.js';

/**
 * Exports `StringOfLengthAssert`.
 */

export default function stringOfLengthAssert({ max, min = 1 } = {}) {
  this.max = max;
  this.min = min;

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    is.string().validate(value);
    is.ofLength({ max: this.max, min: this.min }).validate(value);

    return true;
  };

  return this;
}
