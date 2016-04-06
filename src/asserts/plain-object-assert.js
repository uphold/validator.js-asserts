
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';
import { isPlainObject } from 'lodash';

/**
 * Export `PlainObjectAssert`.
 */

export default function plainObjectAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'PlainObject';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (!isPlainObject(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
