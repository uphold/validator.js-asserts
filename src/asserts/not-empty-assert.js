
/**
 * Module dependencies.
 */

import { Violation } from 'validator.js';
import { isEmpty } from 'lodash';

/**
 * Export `NotEmptyAssert`.
 */

export default function notEmptyAssert() {
  /**
   * Class name.
   */

  this.__class__ = 'NotEmpty';

  /**
   * Validation algorithm.
   */

  this.validate = value => {
    if (isEmpty(value)) {
      throw new Violation(this, value);
    }

    return true;
  };

  return this;
}
